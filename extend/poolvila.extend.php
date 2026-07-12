<?php
if (!defined('_GNUBOARD_')) {
    exit;
}

$poolvila_lib = G5_LIB_PATH . '/poolvila-board-api.lib.php';
if (is_file($poolvila_lib)) {
    include_once $poolvila_lib;
}

$poolvila_gemini_lib = G5_LIB_PATH . '/poolvila-gemini-api.lib.php';
if (is_file($poolvila_gemini_lib)) {
    include_once $poolvila_gemini_lib;
}
