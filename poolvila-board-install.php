<?php
/**
 * 세부풀빌라 게시판 6종 자동 생성 (1회 실행)
 * 브라우저에서 최고관리자로 접속 후 [게시판 생성] 클릭
 */
include_once './_common.php';

if (!$is_admin) {
    alert('최고관리자만 실행할 수 있습니다.', G5_URL);
}

$action = isset($_REQUEST['action']) ? (string) $_REQUEST['action'] : '';
$results = array();
$status = poolvila_board_install_status();

if ($action === 'install') {
    check_admin_token();
    $results = poolvila_board_install_all(true);
    $status = poolvila_board_install_status();
}

$g5['title'] = '세부풀빌라 게시판 설치';
include_once G5_PATH . '/head.sub.php';
?>
<style>
.poolvila-install { max-width: 720px; margin: 40px auto; padding: 24px; font-family: sans-serif; }
.poolvila-install h1 { font-size: 1.5rem; margin-bottom: 8px; }
.poolvila-install table { width: 100%; border-collapse: collapse; margin: 20px 0; }
.poolvila-install th, .poolvila-install td { border: 1px solid #e5e7eb; padding: 10px 12px; text-align: left; }
.poolvila-install .ok { color: #059669; font-weight: 700; }
.poolvila-install .no { color: #dc2626; font-weight: 700; }
.poolvila-install .btn { display: inline-block; background: #10B981; color: #fff; padding: 12px 20px; border-radius: 10px; text-decoration: none; border: 0; cursor: pointer; font-weight: 700; }
.poolvila-install .note { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; margin-top: 16px; font-size: 14px; line-height: 1.6; }
</style>
<main class="poolvila-install">
  <h1>세부풀빌라 게시판 설치</h1>
  <p>빌더 디자인에 연결할 게시판 6개를 생성합니다.</p>

  <table>
    <thead>
      <tr><th>게시판 ID</th><th>상태</th></tr>
    </thead>
    <tbody>
      <?php foreach (poolvila_allowed_boards() as $bo_table) { ?>
      <tr>
        <td><?php echo htmlspecialchars($bo_table, ENT_QUOTES, 'UTF-8'); ?></td>
        <td class="<?php echo !empty($status[$bo_table]) ? 'ok' : 'no'; ?>">
          <?php echo !empty($status[$bo_table]) ? '생성됨' : '미생성'; ?>
        </td>
      </tr>
      <?php } ?>
    </tbody>
  </table>

  <?php if ($action === 'install' && $results) { ?>
  <div class="note">
    <strong>실행 결과</strong><br>
    <?php foreach ($results as $bo_table => $row) { ?>
      - <?php echo htmlspecialchars($bo_table, ENT_QUOTES, 'UTF-8'); ?>:
      <?php echo htmlspecialchars((string) ($row['message'] ?? ''), ENT_QUOTES, 'UTF-8'); ?><br>
    <?php } ?>
  </div>
  <?php } ?>

  <form method="post">
    <input type="hidden" name="action" value="install">
    <?php echo get_admin_token(); ?>
    <button type="submit" class="btn">게시판 생성 + 샘플 글 등록</button>
  </form>

  <div class="note">
    <strong>스킨 동기화</strong><br>
    이미 생성된 게시판도 다시 실행하면 권장 스킨으로 맞춥니다.
    (공지사항 → <code>basic-notice</code>)<br><br>
    <strong>AI 챗봇·일정 플래너</strong><br>
    서버의 <code>data/onoff-builder.config.php</code>에 <code>ONOFF_BUILDER_GEMINI_API_KEY</code>를 설정하면
    <code>/api/chat</code>, <code>/api/itinerary</code>가 동작합니다.<br><br>
    설치 후 이 파일은 보안을 위해 삭제하거나 이름을 변경하세요.
  </div>
</main>
<?php
include_once G5_PATH . '/tail.sub.php';
