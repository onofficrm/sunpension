<?php
/**
 * 세부풀빌라 — Gemini API (챗봇·일정 플래너)
 */
if (!defined('_GNUBOARD_')) {
    exit;
}

if (!function_exists('poolvila_gemini_api_key')) {
    function poolvila_gemini_api_key()
    {
        if (function_exists('onoff_builder_config_get')) {
            $key = trim((string) onoff_builder_config_get('gemini_api_key', ''));
            if ($key !== '') {
                return $key;
            }
        }

        $env = getenv('GEMINI_API_KEY');
        if ($env !== false && trim((string) $env) !== '') {
            return trim((string) $env);
        }

        return '';
    }
}

if (!function_exists('poolvila_gemini_model')) {
    function poolvila_gemini_model()
    {
        $model = 'gemini-2.0-flash-lite';
        if (function_exists('onoff_builder_config_get')) {
            $model = trim((string) onoff_builder_config_get('gemini_model', $model));
        }

        return $model !== '' ? $model : 'gemini-2.0-flash-lite';
    }
}

if (!function_exists('poolvila_gemini_http_post_json')) {
    function poolvila_gemini_http_post_json($url, array $payload, $timeout = 30)
    {
        $body = json_encode($payload, JSON_UNESCAPED_UNICODE);
        if ($body === false) {
            return array('ok' => false, 'message' => '요청 JSON 인코딩 실패');
        }

        if (function_exists('curl_init')) {
            $ch = curl_init($url);
            curl_setopt_array($ch, array(
                CURLOPT_POST           => true,
                CURLOPT_POSTFIELDS     => $body,
                CURLOPT_HTTPHEADER     => array('Content-Type: application/json'),
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT        => (int) $timeout,
            ));
            $raw = curl_exec($ch);
            $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $err = curl_error($ch);
            curl_close($ch);

            if ($raw === false) {
                return array('ok' => false, 'message' => $err !== '' ? $err : 'API 연결 실패');
            }

            $decoded = json_decode($raw, true);
            if (!is_array($decoded)) {
                return array('ok' => false, 'message' => 'API 응답 파싱 실패', 'http_code' => $code);
            }

            if ($code < 200 || $code >= 300) {
                $message = isset($decoded['error']['message']) ? (string) $decoded['error']['message'] : 'API 오류';

                return array('ok' => false, 'message' => $message, 'http_code' => $code, 'data' => $decoded);
            }

            return array('ok' => true, 'data' => $decoded, 'http_code' => $code);
        }

        $ctx = stream_context_create(array(
            'http' => array(
                'method'  => 'POST',
                'header'  => "Content-Type: application/json\r\n",
                'content' => $body,
                'timeout' => (int) $timeout,
            ),
        ));
        $raw = @file_get_contents($url, false, $ctx);
        if ($raw === false) {
            return array('ok' => false, 'message' => 'API 연결 실패');
        }

        $decoded = json_decode($raw, true);
        if (!is_array($decoded)) {
            return array('ok' => false, 'message' => 'API 응답 파싱 실패');
        }

        return array('ok' => true, 'data' => $decoded);
    }
}

if (!function_exists('poolvila_gemini_extract_text')) {
    function poolvila_gemini_extract_text(array $data)
    {
        if (!isset($data['candidates'][0]['content']['parts']) || !is_array($data['candidates'][0]['content']['parts'])) {
            return '';
        }

        $text = '';
        foreach ($data['candidates'][0]['content']['parts'] as $part) {
            if (isset($part['text'])) {
                $text .= (string) $part['text'];
            }
        }

        return trim($text);
    }
}

if (!function_exists('poolvila_gemini_generate')) {
    function poolvila_gemini_generate($system_instruction, $contents, $timeout = 30)
    {
        $api_key = poolvila_gemini_api_key();
        if ($api_key === '') {
            return array('ok' => false, 'message' => 'Gemini API Key가 설정되지 않았습니다. data/onoff-builder.config.php를 확인하세요.');
        }

        $model = poolvila_gemini_model();
        $endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/' . rawurlencode($model) . ':generateContent?key=' . rawurlencode($api_key);

        $payload = array(
            'contents' => $contents,
            'generationConfig' => array(
                'temperature' => 0.8,
                'topP' => 0.95,
                'maxOutputTokens' => 2048,
            ),
        );

        if ($system_instruction !== '') {
            $payload['systemInstruction'] = array(
                'parts' => array(
                    array('text' => (string) $system_instruction),
                ),
            );
        }

        $resp = poolvila_gemini_http_post_json($endpoint, $payload, $timeout);
        if (empty($resp['ok'])) {
            return $resp;
        }

        $text = poolvila_gemini_extract_text($resp['data']);
        if ($text === '') {
            return array('ok' => false, 'message' => 'AI 응답이 비어 있습니다.');
        }

        return array('ok' => true, 'text' => $text);
    }
}

if (!function_exists('poolvila_gemini_chat')) {
    function poolvila_gemini_chat($message, array $history = array())
    {
        $message = trim((string) $message);
        if ($message === '') {
            return array('ok' => false, 'message' => '메시지를 입력하세요.');
        }

        $contents = array();
        foreach ($history as $row) {
            if (!is_array($row)) {
                continue;
            }
            $role = isset($row['role']) && $row['role'] === 'user' ? 'user' : 'model';
            $text = isset($row['text']) ? trim((string) $row['text']) : '';
            if ($text === '') {
                continue;
            }
            $contents[] = array(
                'role' => $role,
                'parts' => array(array('text' => $text)),
            );
        }

        $contents[] = array(
            'role' => 'user',
            'parts' => array(array('text' => $message)),
        );

        $system = "당신은 '세부풀빌라(Cebu Pool Villa)'의 AI 맞춤형 풀빌라 추천 챗봇입니다.\n"
            . "고객의 인원수, 여행 목적(가족, 친구, 골프 등), 선호 지역(세부시티, 막탄), 특별한 요구사항을 분석하여\n"
            . "적합한 풀빌라 유형과 팁을 친절하게 추천해주세요. 마크다운을 사용하여 깔끔하게 답변하세요.";

        return poolvila_gemini_generate($system, $contents);
    }
}

if (!function_exists('poolvila_gemini_itinerary')) {
    function poolvila_gemini_itinerary(array $params)
    {
        $days = trim((string) ($params['days'] ?? ''));
        $location = trim((string) ($params['location'] ?? ''));
        $purpose = trim((string) ($params['purpose'] ?? ''));
        $people = trim((string) ($params['people'] ?? ''));
        $pace = trim((string) ($params['pace'] ?? ''));

        $prompt = "세부 풀빌라 여행을 위한 맞춤형 일정을 추천해주세요.\n"
            . "- 여행 기간: {$days}\n"
            . "- 선호 지역: {$location}\n"
            . "- 여행 목적: {$purpose}\n"
            . "- 인원: {$people}명\n"
            . "- 여행 스타일/페이스: {$pace}\n\n"
            . "일차별 추천 일정을 작성해주세요. 풀빌라 휴식, 현지 맛집, 마사지, 호핑투어 등을 적절히 섞어주세요.\n"
            . "마크다운 형식으로 보기 좋게 정리해주세요.";

        $system = '당신은 세부 여행 일정을 기획하는 전문가입니다. 유익하고 실용적인 일정을 마크다운으로 예쁘게 작성해주세요.';
        $contents = array(
            array(
                'role' => 'user',
                'parts' => array(array('text' => $prompt)),
            ),
        );

        return poolvila_gemini_generate($system, $contents, 45);
    }
}
