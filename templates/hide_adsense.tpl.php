<?php
//if (preg_match('/^180\.93\.([0-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-5]))\.([0-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-5]))$/', $_SERVER['REMOTE_ADDR']) || preg_match('/^116\.118\.([3-4][0-9]|50)\.([0-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-5]))$/', $_SERVER['REMOTE_ADDR']) || $_SERVER['REMOTE_ADDR'] == '113.161.69.52'):
if (isset($_COOKIE['NSH:show_ad']) && $_COOKIE['NSH:show_ad'] == 0 && isset($_GET['ad']) && $_GET['ad'] == 1):
?>
<!-- AdSense is shown -->
<?php
elseif (isset($_COOKIE['NSH:show_ad']) && $_COOKIE['NSH:show_ad'] == 1 && isset($_GET['ad']) && $_GET['ad'] == 0):
?>
<!-- AdSense is hidden -->
<link rel="stylesheet" href="/min/f=css/hide_adsense.css&amp;1" />
<?php
elseif ((isset($_COOKIE['NSH:show_ad']) && $_COOKIE['NSH:show_ad'] == 1) || (isset($_GET['ad']) && $_GET['ad'] == 1)):
?>
<!-- AdSense is shown -->
<?php
elseif ((isset($_COOKIE['NSH:show_ad']) && $_COOKIE['NSH:show_ad'] == 0) || (isset($_GET['ad']) && $_GET['ad'] == 0)):
?>
<!-- AdSense is hidden -->
<link rel="stylesheet" href="/min/f=css/hide_adsense.css&amp;1" />
<?php
endif;
?>