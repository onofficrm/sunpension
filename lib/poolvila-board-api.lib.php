<?php
/**
 * 세부풀빌라 — 게시판 JSON API · 프로비저닝
 */
if (!defined('_GNUBOARD_')) {
    exit;
}

if (!function_exists('poolvila_allowed_boards')) {
    function poolvila_allowed_boards()
    {
        return array('cebu', 'mactan', 'news', 'diary', 'free', 'notice');
    }
}

if (!function_exists('poolvila_maybe_render_spa_board')) {
    /**
     * /bbs/board.php?bo_table=* 직접 접속 시 그누보드 레이아웃 대신
     * 홈과 동일한 poolvila SPA(헤더·푸터, 로그인 박스 없음)를 출력한다.
     * ?classic=1 이면 기존 그누보드 스킨으로 폴백.
     *
     * @return bool 렌더 후 종료했으면 true
     */
    function poolvila_maybe_render_spa_board()
    {
        if (PHP_SAPI === 'cli') {
            return false;
        }

        $method = isset($_SERVER['REQUEST_METHOD']) ? strtoupper((string) $_SERVER['REQUEST_METHOD']) : 'GET';
        if ($method !== 'GET' && $method !== 'HEAD') {
            return false;
        }

        if (!empty($_GET['classic']) || !empty($_GET['g5_classic'])) {
            return false;
        }

        $script = isset($_SERVER['SCRIPT_NAME']) ? (string) $_SERVER['SCRIPT_NAME'] : '';
        $script_base = strtolower(basename($script));
        if ($script_base !== 'board.php') {
            return false;
        }

        $bo_table = isset($_GET['bo_table']) ? poolvila_board_sanitize_table($_GET['bo_table']) : '';
        if ($bo_table === '' || !in_array($bo_table, poolvila_allowed_boards(), true)) {
            return false;
        }

        if (!function_exists('onoff_builder_render_import_page')) {
            $bootstrap = G5_PLUGIN_PATH . '/onoff-builder-bridge/bootstrap.php';
            if (is_file($bootstrap)) {
                include_once $bootstrap;
            }
        }

        if (!function_exists('onoff_builder_home_enabled') || !onoff_builder_home_enabled()) {
            return false;
        }

        $id = function_exists('onoff_builder_get_home_bridge_id')
            ? onoff_builder_get_home_bridge_id()
            : '';
        if ($id === '' || !function_exists('onoff_builder_render_import_page')) {
            return false;
        }

        onoff_builder_render_import_page($id);

        return true;
    }
}

if (!function_exists('poolvila_board_api_json')) {
    function poolvila_board_api_json(array $payload, $status = 200)
    {
        if (!headers_sent()) {
            http_response_code((int) $status);
            header('Content-Type: application/json; charset=utf-8');
            header('Cache-Control: no-store, no-cache, must-revalidate');
        }

        echo json_encode($payload, JSON_UNESCAPED_UNICODE);
        exit;
    }
}

if (!function_exists('poolvila_board_sanitize_table')) {
    function poolvila_board_sanitize_table($bo_table)
    {
        $bo_table = preg_replace('/[^a-z0-9_]/', '', strtolower(trim((string) $bo_table)));

        return in_array($bo_table, poolvila_allowed_boards(), true) ? $bo_table : '';
    }
}

if (!function_exists('poolvila_board_exists')) {
    function poolvila_board_exists($bo_table)
    {
        global $g5;

        $bo_table = poolvila_board_sanitize_table($bo_table);
        if ($bo_table === '') {
            return false;
        }

        $row = sql_fetch(" select bo_table from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");

        return !empty($row['bo_table']);
    }
}

if (!function_exists('poolvila_board_format_date')) {
    function poolvila_board_format_date($datetime)
    {
        $ts = strtotime((string) $datetime);

        return $ts ? date('Y.m.d', $ts) : '';
    }
}

if (!function_exists('poolvila_board_is_new')) {
    function poolvila_board_is_new($datetime, $days = 7)
    {
        $ts = strtotime((string) $datetime);
        if (!$ts) {
            return false;
        }

        return $ts >= strtotime('-' . (int) $days . ' days');
    }
}

if (!function_exists('poolvila_board_extract_summary')) {
    function poolvila_board_extract_summary($content, $length = 120)
    {
        $text = trim(strip_tags((string) $content));
        $text = preg_replace('/\s+/u', ' ', $text);
        if ($text === '') {
            return '';
        }
        if (function_exists('cut_str')) {
            return cut_str($text, (int) $length);
        }

        return mb_strlen($text, 'UTF-8') > $length
            ? mb_substr($text, 0, $length, 'UTF-8') . '…'
            : $text;
    }
}

if (!function_exists('poolvila_board_extract_thumbnail')) {
    function poolvila_board_extract_thumbnail($content, $bo_table = '', $wr_id = 0)
    {
        $content = (string) $content;
        if (preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', $content, $m)) {
            return poolvila_board_normalize_image_url($m[1]);
        }

        $bo_table = poolvila_board_sanitize_table($bo_table);
        $wr_id = (int) $wr_id;
        if ($bo_table !== '' && $wr_id > 0 && function_exists('get_list_thumbnail')) {
            $thumb = get_list_thumbnail($bo_table, $wr_id, 640, 480, false, true);
            if (is_array($thumb) && !empty($thumb['src'])) {
                return poolvila_board_normalize_image_url($thumb['src']);
            }
        }

        return '';
    }
}

if (!function_exists('poolvila_board_normalize_image_url')) {
    function poolvila_board_normalize_image_url($url)
    {
        $url = trim((string) $url);
        if ($url === '') {
            return '';
        }
        if (preg_match('#^https?://#i', $url)) {
            return $url;
        }
        if ($url[0] === '/') {
            return rtrim(G5_URL, '/') . $url;
        }

        return G5_DATA_URL . '/' . ltrim($url, '/');
    }
}

if (!function_exists('poolvila_board_is_notice')) {
    function poolvila_board_is_notice($bo_table, $wr_id)
    {
        global $g5;

        $bo_table = poolvila_board_sanitize_table($bo_table);
        $wr_id = (int) $wr_id;
        if ($bo_table === '' || $wr_id <= 0) {
            return false;
        }

        $board_row = sql_fetch(" select bo_notice from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
        if (empty($board_row['bo_notice'])) {
            return false;
        }

        foreach (explode(',', (string) $board_row['bo_notice']) as $nid) {
            if ((int) trim($nid) === $wr_id) {
                return true;
            }
        }

        return false;
    }
}

if (!function_exists('poolvila_board_row_to_item')) {
    function poolvila_board_row_to_item(array $row, $bo_table, $include_content = false)
    {
        $bo_table = poolvila_board_sanitize_table($bo_table);
        $wr_id = isset($row['wr_id']) ? (int) $row['wr_id'] : 0;
        $content = isset($row['wr_content']) ? (string) $row['wr_content'] : '';

        $item = array(
            'wr_id'        => $wr_id,
            'subject'      => isset($row['wr_subject']) ? get_text(strip_tags((string) $row['wr_subject'])) : '',
            'summary'      => poolvila_board_extract_summary($content, 140),
            'date'         => poolvila_board_format_date($row['wr_datetime'] ?? ''),
            'datetime'     => isset($row['wr_datetime']) ? (string) $row['wr_datetime'] : '',
            'hit'          => isset($row['wr_hit']) ? (int) $row['wr_hit'] : 0,
            'category'     => isset($row['ca_name']) ? get_text((string) $row['ca_name']) : '',
            'is_notice'    => poolvila_board_is_notice($bo_table, $wr_id),
            'is_new'       => poolvila_board_is_new($row['wr_datetime'] ?? ''),
            'thumbnail'    => poolvila_board_extract_thumbnail($content, $bo_table, $wr_id),
            'link'         => G5_BBS_URL . '/board.php?bo_table=' . rawurlencode($bo_table) . '&wr_id=' . $wr_id,
            'capacity'     => isset($row['wr_1']) ? get_text((string) $row['wr_1']) : '',
            'bedrooms'     => isset($row['wr_2']) ? get_text((string) $row['wr_2']) : '',
            'pool_info'    => isset($row['wr_3']) ? get_text((string) $row['wr_3']) : '',
            'features'     => isset($row['wr_4']) ? get_text((string) $row['wr_4']) : '',
            'region_label' => isset($row['wr_5']) ? get_text((string) $row['wr_5']) : '',
        );

        if ($include_content) {
            $item['content'] = $content;
            $item['content_text'] = poolvila_board_extract_summary($content, 5000);
        }

        return $item;
    }
}

if (!function_exists('poolvila_board_api_list')) {
    function poolvila_board_api_list($bo_table, $page = 1, $per_page = 15)
    {
        global $g5;

        $bo_table = poolvila_board_sanitize_table($bo_table);
        if ($bo_table === '') {
            return array('ok' => false, 'message' => '허용되지 않은 게시판입니다.');
        }
        if (!poolvila_board_exists($bo_table)) {
            return array('ok' => false, 'message' => '게시판이 아직 생성되지 않았습니다. /poolvila-board-install.php 를 실행하세요.');
        }

        $page = max(1, (int) $page);
        $per_page = max(1, min(50, (int) $per_page));
        $from_record = ($page - 1) * $per_page;
        $write_table = $g5['write_prefix'] . $bo_table;

        $total_row = sql_fetch(" select count(*) as cnt from {$write_table} where wr_is_comment = 0 ");
        $total = isset($total_row['cnt']) ? (int) $total_row['cnt'] : 0;

        $sql = " select * from {$write_table}
                 where wr_is_comment = 0
                 order by wr_num, wr_reply
                 limit {$from_record}, {$per_page} ";
        $result = sql_query($sql);

        $items = array();
        while ($row = sql_fetch_array($result)) {
            $items[] = poolvila_board_row_to_item($row, $bo_table, false);
        }

        return array(
            'ok'       => true,
            'bo_table' => $bo_table,
            'total'    => $total,
            'page'     => $page,
            'per_page' => $per_page,
            'items'    => $items,
        );
    }
}

if (!function_exists('poolvila_board_api_view')) {
    function poolvila_board_api_view($bo_table, $wr_id)
    {
        global $g5;

        $bo_table = poolvila_board_sanitize_table($bo_table);
        $wr_id = (int) $wr_id;
        if ($bo_table === '' || $wr_id <= 0) {
            return array('ok' => false, 'message' => '잘못된 요청입니다.');
        }
        if (!poolvila_board_exists($bo_table)) {
            return array('ok' => false, 'message' => '게시판이 아직 생성되지 않았습니다.');
        }

        $write_table = $g5['write_prefix'] . $bo_table;
        $row = sql_fetch(" select * from {$write_table} where wr_id = '{$wr_id}' and wr_is_comment = 0 ");
        if (empty($row['wr_id'])) {
            return array('ok' => false, 'message' => '게시글을 찾을 수 없습니다.');
        }

        return array(
            'ok'   => true,
            'item' => poolvila_board_row_to_item($row, $bo_table, true),
        );
    }
}

if (!function_exists('poolvila_board_install_definitions')) {
    function poolvila_board_install_definitions()
    {
        return array(
            'cebu' => array(
                'bo_subject' => '세부시티 풀빌라',
                'bo_skin'    => 'gallery-grid',
                'bo_mobile_skin' => 'gallery-grid',
            ),
            'mactan' => array(
                'bo_subject' => '막탄 풀빌라',
                'bo_skin'    => 'gallery-grid',
                'bo_mobile_skin' => 'gallery-grid',
            ),
            'news' => array(
                'bo_subject' => '새소식',
                'bo_skin'    => 'basic-modern',
                'bo_mobile_skin' => 'basic-modern',
            ),
            'diary' => array(
                'bo_subject' => '여행 다이어리',
                'bo_skin'    => 'post-thumb',
                'bo_mobile_skin' => 'post-thumb',
                'bo_use_category' => '1',
                'bo_category_list' => '여행후기|현지정보|이용팁',
            ),
            'free' => array(
                'bo_subject' => '자유게시판',
                'bo_skin'    => 'basic-clean',
                'bo_mobile_skin' => 'basic-clean',
            ),
            'notice' => array(
                'bo_subject' => '공지사항',
                'bo_skin'    => 'basic-notice',
                'bo_mobile_skin' => 'basic-notice',
            ),
        );
    }
}

if (!function_exists('poolvila_board_create_table')) {
    function poolvila_board_create_table($bo_table)
    {
        if (function_exists('icrm_member_board_create_table')) {
            return icrm_member_board_create_table($bo_table);
        }

        global $g5;
        $bo_table = preg_replace('/[^a-z0-9_]/', '', strtolower((string) $bo_table));
        if ($bo_table === '') {
            return false;
        }

        $admin_dir = defined('G5_ADMIN_DIR') ? G5_ADMIN_DIR : 'adm';
        $sql_file = G5_PATH . '/' . $admin_dir . '/sql_write.sql';
        if (!is_file($sql_file)) {
            return false;
        }

        $file = file($sql_file);
        if (!is_array($file)) {
            return false;
        }
        if (function_exists('get_db_create_replace')) {
            $file = get_db_create_replace($file);
        }
        $sql = implode("\n", $file);
        $create_table = $g5['write_prefix'] . $bo_table;
        $sql = preg_replace(array('/__TABLE_NAME__/', '/;/'), array($create_table, ''), $sql);
        sql_query($sql, false);

        $board_path = G5_DATA_PATH . '/file/' . $bo_table;
        @mkdir($board_path, G5_DIR_PERMISSION, true);
        @chmod($board_path, G5_DIR_PERMISSION);

        return true;
    }
}

if (!function_exists('poolvila_board_install_one')) {
    function poolvila_board_install_one($bo_table, array $def)
    {
        global $g5;

        $bo_table = poolvila_board_sanitize_table($bo_table);
        if ($bo_table === '') {
            return array('ok' => false, 'message' => '잘못된 게시판 ID');
        }

        $bo_subject = trim((string) ($def['bo_subject'] ?? $bo_table));
        $skin = preg_replace('/[^a-z0-9_-]/i', '', (string) ($def['bo_skin'] ?? 'basic-clean'));
        $mobile_skin = preg_replace('/[^a-z0-9_-]/i', '', (string) ($def['bo_mobile_skin'] ?? $skin));
        $use_category = !empty($def['bo_use_category']) ? '1' : '0';
        $category_list = isset($def['bo_category_list']) ? (string) $def['bo_category_list'] : '';

        if (!is_dir(G5_SKIN_PATH . '/board/' . $skin)) {
            $skin = 'basic-clean';
        }
        if (!is_dir(G5_MOBILE_PATH . '/skin/board/' . $mobile_skin)) {
            $mobile_skin = $skin;
        }

        $exists = sql_fetch(" select bo_table, bo_skin, bo_mobile_skin from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
        if (!empty($exists['bo_table'])) {
            // 기존 게시판도 poolvila 권장 스킨으로 동기화 (예: notice → basic-notice)
            sql_query(" update {$g5['board_table']}
                set bo_skin = '" . sql_real_escape_string($skin) . "',
                    bo_mobile_skin = '" . sql_real_escape_string($mobile_skin) . "'
                where bo_table = '" . sql_real_escape_string($bo_table) . "' ", false);

            return array(
                'ok'       => true,
                'message'  => '스킨 동기화 (' . $skin . ')',
                'bo_table' => $bo_table,
                'skipped'  => true,
                'synced'   => true,
            );
        }

        $gr_id = 'community';
        $gr = sql_fetch(" select gr_id from {$g5['group_table']} where gr_id = '" . sql_real_escape_string($gr_id) . "' ");
        if (empty($gr['gr_id'])) {
            $gr_id = '';
        }

        sql_query(" insert into {$g5['board_table']}
            set bo_table = '" . sql_real_escape_string($bo_table) . "',
                gr_id = '" . sql_real_escape_string($gr_id) . "',
                bo_subject = '" . sql_real_escape_string($bo_subject) . "',
                bo_mobile_subject = '" . sql_real_escape_string($bo_subject) . "',
                bo_device = 'both',
                bo_admin = '',
                bo_list_level = '1',
                bo_read_level = '1',
                bo_write_level = '2',
                bo_reply_level = '10',
                bo_comment_level = '1',
                bo_upload_level = '2',
                bo_download_level = '1',
                bo_use_category = '" . sql_real_escape_string($use_category) . "',
                bo_category_list = '" . sql_real_escape_string($category_list) . "',
                bo_use_dhtml_editor = '1',
                bo_select_editor = 'smarteditor2',
                bo_use_secret = '0',
                bo_use_comment = '1',
                bo_use_search = '1',
                bo_read_point = '0',
                bo_write_point = '0',
                bo_comment_point = '0',
                bo_download_point = '0',
                bo_skin = '" . sql_real_escape_string($skin) . "',
                bo_mobile_skin = '" . sql_real_escape_string($mobile_skin) . "',
                bo_order = '0' ", false);

        if (!poolvila_board_create_table($bo_table)) {
            sql_query(" delete from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");

            return array('ok' => false, 'message' => '게시판 테이블 생성 실패: ' . $bo_table);
        }

        if (function_exists('auto_comment_ensure_board_config')) {
            auto_comment_ensure_board_config($bo_table);
        }

        return array('ok' => true, 'message' => '생성 완료', 'bo_table' => $bo_table, 'skipped' => false);
    }
}

if (!function_exists('poolvila_board_insert_sample_post')) {
    function poolvila_board_insert_sample_post($bo_table, array $post)
    {
        global $g5, $config;

        $bo_table = poolvila_board_sanitize_table($bo_table);
        if ($bo_table === '' || !poolvila_board_exists($bo_table)) {
            return false;
        }

        $write_table = $g5['write_prefix'] . $bo_table;
        $subject = sql_real_escape_string((string) ($post['subject'] ?? ''));
        if ($subject === '') {
            return false;
        }

        $exists = sql_fetch(" select wr_id from {$write_table} where wr_subject = '{$subject}' limit 1 ");
        if (!empty($exists['wr_id'])) {
            return false;
        }

        $mb_id = isset($config['cf_admin']) ? (string) $config['cf_admin'] : 'admin';
        $name = '관리자';
        $content = sql_real_escape_string((string) ($post['content'] ?? ''));
        $wr_1 = sql_real_escape_string((string) ($post['wr_1'] ?? ''));
        $wr_2 = sql_real_escape_string((string) ($post['wr_2'] ?? ''));
        $wr_3 = sql_real_escape_string((string) ($post['wr_3'] ?? ''));
        $wr_4 = sql_real_escape_string((string) ($post['wr_4'] ?? ''));
        $wr_5 = sql_real_escape_string((string) ($post['wr_5'] ?? ''));
        $ca_name = sql_real_escape_string((string) ($post['ca_name'] ?? ''));
        $notice = !empty($post['notice']) ? 1 : 0;
        $now = G5_TIME_YMDHIS;
        $ip = isset($_SERVER['REMOTE_ADDR']) ? sql_real_escape_string((string) $_SERVER['REMOTE_ADDR']) : '';

        $num_row = sql_fetch(" select ifnull(min(wr_num), 0) as min_wr_num from {$write_table} ");
        $wr_num = isset($num_row['min_wr_num']) ? ((int) $num_row['min_wr_num'] - 1) : -1;

        sql_query(" insert into {$write_table}
            set wr_num = '{$wr_num}',
                wr_reply = '',
                wr_comment = 0,
                ca_name = '{$ca_name}',
                wr_option = '',
                wr_subject = '{$subject}',
                wr_content = '{$content}',
                wr_link1 = '', wr_link2 = '',
                wr_link1_hit = 0, wr_link2_hit = 0,
                wr_hit = 0, wr_good = 0, wr_nogood = 0,
                mb_id = '" . sql_real_escape_string($mb_id) . "',
                wr_password = '',
                wr_name = '" . sql_real_escape_string($name) . "',
                wr_email = '', wr_homepage = '',
                wr_datetime = '{$now}', wr_file = 0,
                wr_last = '{$now}', wr_ip = '{$ip}',
                wr_1 = '{$wr_1}', wr_2 = '{$wr_2}', wr_3 = '{$wr_3}',
                wr_4 = '{$wr_4}', wr_5 = '{$wr_5}',
                wr_6 = '', wr_7 = '', wr_8 = '', wr_9 = '', wr_10 = '' ", false);

        $wr_id = sql_insert_id();
        if ($wr_id > 0) {
            sql_query(" update {$write_table} set wr_parent = '{$wr_id}' where wr_id = '{$wr_id}' ");
            if ($notice) {
                $board_row = sql_fetch(" select bo_notice from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
                $notice_ids = array();
                if (!empty($board_row['bo_notice'])) {
                    foreach (explode(',', (string) $board_row['bo_notice']) as $nid) {
                        $nid = (int) trim($nid);
                        if ($nid > 0) {
                            $notice_ids[] = $nid;
                        }
                    }
                }
                if (!in_array($wr_id, $notice_ids, true)) {
                    $notice_ids[] = $wr_id;
                }
                sql_query(" update {$g5['board_table']} set bo_notice = '" . sql_real_escape_string(implode(',', $notice_ids)) . "' where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
            }
        }

        return $wr_id > 0;
    }
}

if (!function_exists('poolvila_board_install_samples')) {
    function poolvila_board_install_samples()
    {
        $img = 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop';

        poolvila_board_insert_sample_post('notice', array(
            'notice' => true,
            'subject' => '세부풀빌라 상담 업무 시간 안내 (매일 09:00 - 18:00)',
            'content' => '<p>평일 및 주말 09:00~18:00(한국시간) 상담이 가능합니다.</p>',
        ));
        poolvila_board_insert_sample_post('notice', array(
            'subject' => '보이스피싱 및 허위 예약 사이트 주의 안내',
            'content' => '<p>공식 상담 채널을 통해서만 예약을 진행해 주세요.</p>',
        ));
        poolvila_board_insert_sample_post('news', array(
            'notice' => true,
            'subject' => '세부시티 신규 프라이빗 맨션 예약 오픈 안내',
            'content' => '<p><img src="' . $img . '" alt="세부시티 풀빌라"></p><p>신규 오픈 프라이빗 맨션 예약을 시작합니다.</p>',
        ));
        poolvila_board_insert_sample_post('news', array(
            'subject' => '겨울 성수기 (12월~2월) 예약 마감 임박',
            'content' => '<p>성수기 일정은 빠르게 마감되고 있습니다. 미리 상담해 주세요.</p>',
        ));
        poolvila_board_insert_sample_post('diary', array(
            'ca_name' => '여행후기',
            'subject' => '가족들과 함께한 완벽한 3박 4일 세부 풀빌라 여행',
            'content' => '<p><img src="' . $img . '" alt="여행 후기"></p><p>아이들과 함께 머물기 좋은 세부시티 프라이빗 풀빌라 후기입니다.</p>',
        ));
        poolvila_board_insert_sample_post('cebu', array(
            'subject' => '세부시티 프리미엄 풀빌라 A',
            'content' => '<p><img src="' . $img . '" alt="풀빌라"></p><p>프라이빗 수영장과 넓은 거실을 갖춘 프리미엄 풀빌라입니다.</p>',
            'wr_1' => '기준 6인 / 최대 10인',
            'wr_2' => '침실 4개',
            'wr_3' => '프라이빗 수영장',
            'wr_4' => '노래방|바비큐|가족여행 추천',
            'wr_5' => '세부시티',
        ));
        poolvila_board_insert_sample_post('mactan', array(
            'subject' => '막탄 오션뷰 프리미엄 빌라',
            'content' => '<p><img src="' . $img . '" alt="막탄 풀빌라"></p><p>공항 접근성이 좋은 막탄 프리미엄 풀빌라입니다.</p>',
            'wr_1' => '기준 8인 / 최대 12인',
            'wr_2' => '침실 4개',
            'wr_3' => '프라이빗 수영장',
            'wr_4' => '오션뷰|바비큐 가능|한국어 상담',
            'wr_5' => '막탄',
        ));
        poolvila_board_insert_sample_post('free', array(
            'subject' => '세부 풀빌라 처음 가보는데 추천 부탁드려요',
            'content' => '<p>가족 6명이 3박 4일 일정인데 막탄/세부시티 중 어디가 좋을까요?</p>',
        ));
    }
}

if (!function_exists('poolvila_board_install_all')) {
    function poolvila_board_install_all($with_samples = true)
    {
        $results = array();
        foreach (poolvila_board_install_definitions() as $bo_table => $def) {
            $results[$bo_table] = poolvila_board_install_one($bo_table, $def);
        }

        if ($with_samples) {
            poolvila_board_install_samples();
        }

        return $results;
    }
}

if (!function_exists('poolvila_board_install_status')) {
    function poolvila_board_install_status()
    {
        $status = array();
        foreach (poolvila_allowed_boards() as $bo_table) {
            $status[$bo_table] = poolvila_board_exists($bo_table);
        }

        return $status;
    }
}
