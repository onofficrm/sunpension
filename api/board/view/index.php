<?php
include_once dirname(__DIR__, 3) . '/common.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    poolvila_board_api_json(array('ok' => false, 'message' => 'GET만 허용됩니다.'), 405);
}

$bo_table = isset($_GET['bo_table']) ? (string) $_GET['bo_table'] : '';
$wr_id = isset($_GET['wr_id']) ? (int) $_GET['wr_id'] : 0;

$result = poolvila_board_api_view($bo_table, $wr_id);
$status = !empty($result['ok']) ? 200 : 404;
poolvila_board_api_json($result, $status);
