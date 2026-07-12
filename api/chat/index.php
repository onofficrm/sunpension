<?php
include_once dirname(__DIR__, 2) . '/common.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    poolvila_board_api_json(array('ok' => false, 'message' => 'POST만 허용됩니다.'), 405);
}

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!is_array($body)) {
    poolvila_board_api_json(array('ok' => false, 'message' => 'JSON 본문이 필요합니다.'), 400);
}

$message = isset($body['message']) ? (string) $body['message'] : '';
$history = isset($body['history']) && is_array($body['history']) ? $body['history'] : array();

$result = poolvila_gemini_chat($message, $history);
if (empty($result['ok'])) {
    poolvila_board_api_json(array('ok' => false, 'error' => $result['message']), 500);
}

poolvila_board_api_json(array('ok' => true, 'reply' => $result['text']));
