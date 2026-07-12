<?php
include_once dirname(__DIR__, 3) . '/common.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    poolvila_board_api_json(array('ok' => false, 'message' => 'GET만 허용됩니다.'), 405);
}

$bo_table = isset($_GET['bo_table']) ? (string) $_GET['bo_table'] : '';
$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$per_page = isset($_GET['rows']) ? (int) $_GET['rows'] : (isset($_GET['per_page']) ? (int) $_GET['per_page'] : 15);

$result = poolvila_board_api_list($bo_table, $page, $per_page);
$status = !empty($result['ok']) ? 200 : 400;
poolvila_board_api_json($result, $status);
