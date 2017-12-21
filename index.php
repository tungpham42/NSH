<?php
error_reporting(-1);
ini_set('display_errors', 'On');
$basepath = realpath($_SERVER['DOCUMENT_ROOT']);
$template_path = $basepath.'/templates/';
require_once $basepath.'/includes/redirect.inc.php';
require_once $basepath.'/includes/init.inc.php';
require_once $basepath.'/includes/template.inc.php';
//include_once $basepath.'/includes/compressor.inc.php';
?>
<!DOCTYPE html>
<html lang="<?php echo $lang_code; ?>">
<head>
<?php
include template('head');
include template('google_analytics');
include template('page_level_ads');
include template('fb_pixel');
//include template('track');
if ($hotjar):
	include template('hotjar');
endif;
if ($smartlook):
	include template('smartlook');
endif;
?>
</head>
<body lang="<?php echo $lang_code; ?>" class="<?php echo $body_class.(has_one_lang() ? ' one_lang': ''); ?>">
<?php
if (!isset($_GET['p']) || $_GET['p'] == 'home'):
	include template('sitelinks_searchbox');
endif;
include template('variables');
include template('img_desc');
if ($clicktale):
	include template('clicktale_top');
endif;
if (isset($_SESSION['loggedin'])):
	include template('toolbar');
endif;
if (!is_birthday() && $show_ad):
	include template('adsense_top');
endif;
?>
	<!-- Start Header -->
	<header id="header">
		<div class="inner">
<?php
include template('header');
?>
		</div>
	</header>
	<!-- End Header -->
	<!-- Start Main -->
	<main id="main">
		<div id="content">
<?php
include template('router');
?>
		</div>
	</main>
	<!-- End Main -->
	<!-- Start Footer -->
	<footer id="footer">
		<div class="inner">
<?php
include template('footer');
?>
		</div>
	</footer>
	<!-- End Footer -->
	<div class="clear"></div>
<?php
include template('loading');
include template('to_top');
//if (!isset($hide_nav)):
//	include template('register_modal');
//endif;
if (!isset($_GET['p']) && $embed == 0 || in_array($p, $navs)):
	if ($show_sumome):
		include template('sumome');
	endif;
	if ($show_addthis):
		include template('addthis');
	endif;
	//if (!is_birthday() && $show_ad):
	if (!is_birthday()):
		include template('banner_160x600');
	endif;
endif;
if ($clicktale):
	include template('clicktale_bottom');
endif;
include template('scripts_bottom');
//if ($p == 'home' || $p == 'member/home'):
//	include template('music');
//endif;
//include template('clicky');
?>
</body>
</html>