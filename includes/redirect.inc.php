<?php
if (substr($_SERVER['HTTP_HOST'], 0, 4) === 'www.') {
	header("HTTP/1.1 301 Moved Permanently");
	header('Location: http'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on' ? 's':'').'://'.substr($_SERVER['HTTP_HOST'], 4).$_SERVER['REQUEST_URI']);
	exit;
}
?>