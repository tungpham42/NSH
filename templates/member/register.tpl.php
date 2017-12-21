<?php
if (isset($_COOKIE['NSH:member']) && !invalid_email($_COOKIE['NSH:member'])) {
	header('Location: http'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on' ? 's':'').'://'.$_SERVER['HTTP_HOST'].'/member/'.$_COOKIE['NSH:member'].'/');
	exit;
}
$member_register_errors = array();
$inputted_email = isset($_POST['member_register_email']) ? $_POST['member_register_email']: '';
$inputted_fullname = isset($_POST['member_register_fullname']) ? $_POST['member_register_fullname']: (isset($_COOKIE['NSH:remembered_fullname']) ? $_COOKIE['NSH:remembered_fullname']: '');
$inputted_dob = isset($_POST['member_register_dob']) ? $_POST['member_register_dob']: (isset($_COOKIE['NSH:remembered_dob']) ? $_COOKIE['NSH:remembered_dob']: '');
if (isset($_POST['member_register_submit'])) {
	if (!$_POST['member_register_email'] || !$_POST['member_register_fullname'] || !$_POST['member_register_password'] || !$_POST['member_register_repeat_password'] || !$_POST['member_register_dob']) {
		$member_register_errors[] = translate_error('not_filled');
	} else {
		if (invalid_email($_POST['member_register_email'])) {
			$member_register_errors[] = translate_error('invalid_email');
		} else if (taken_email($_POST['member_register_email'])) {
			$member_register_errors[] = translate_error('taken_email');
		}
		if (short_pass($_POST['member_register_password'])) {
			$member_register_errors[] = translate_error('short_pass');
		}
		if (long_pass($_POST['member_register_password'])) {
			$member_register_errors[] = translate_error('long_pass');
		}
		if (no_number_pass($_POST['member_register_password'])) {
			$member_register_errors[] = translate_error('no_number_pass');
		}
		if (no_letter_pass($_POST['member_register_password'])) {
			$member_register_errors[] = translate_error('no_letter_pass');
		}
		/*
		if (no_caps_pass($_POST['member_register_password'])) {
			$member_register_errors[] = translate_error('no_caps_pass');
		}
		if (no_symbol_pass($_POST['member_register_password'])) {
			$member_register_errors[] = translate_error('no_symbol_pass');
		}
		*/
		if (not_match_pass($_POST['member_register_password'], $_POST['member_register_repeat_password'])) {
			$member_register_errors[] = translate_error('not_match_pass');
		}
		if (invalid_dob($_POST['member_register_dob'])) {
			$member_register_errors[] = translate_error('invalid_dob');
		}
	}
	if (!count($member_register_errors)) {
		create_member(strtolower($_POST['member_register_email']), $_POST['member_register_fullname'], $_POST['member_register_password'], $_POST['member_register_dob'], $lang_code);
		email_create_member(strtolower($_POST['member_register_email']), $_POST['member_register_fullname'], $_POST['member_register_password'], $_POST['member_register_dob']);
		header('Location: http'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on' ? 's':'').'://'.$_SERVER['HTTP_HOST'].'/member/login/?registered=✓');
		exit;
	}
}
?>
<form id="register_form" method="POST" action="/member/register/">
	<div class="m-input-prepend">
		<span class="add-on"><?php echo translate_span('email'); ?></span>
		<input class="m-wrap required" size="20" type="text" name="member_register_email" placeholder="john@example.com" value="<?php echo $inputted_email; ?>" tabindex="1" required>
	</div>
	<div class="m-input-prepend">
		<span class="add-on"><?php echo translate_span('fullname'); ?></span>
		<input class="m-wrap required" size="20" type="text" name="member_register_fullname" placeholder="John Doe" value="<?php echo $inputted_fullname; ?>" tabindex="2" required>
	</div>
	<div class="m-input-prepend">
		<span class="add-on"><?php echo translate_span('dob'); ?></span>
		<input id="member_register_dob" class="m-wrap required" size="20" type="text" name="member_register_dob" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" value="<?php echo $inputted_dob; ?>" tabindex="3" required>
	</div>
	<div class="m-input-prepend">
		<span class="add-on"><?php echo translate_span('password'); ?></span>
		<input class="m-wrap translate required" size="20" type="password" name="member_register_password" data-lang-ja="<?php echo $input_interfaces['password']['ja']; ?>" data-lang-zh="<?php echo $input_interfaces['password']['zh']; ?>" data-lang-es="<?php echo $input_interfaces['password']['es']; ?>" data-lang-ru="<?php echo $input_interfaces['password']['ru']; ?>" data-lang-en="<?php echo $input_interfaces['password']['en']; ?>" data-lang-vi="<?php echo $input_interfaces['password']['vi']; ?>" placeholder="<?php echo $input_interfaces['password'][$lang_code]; ?>" tabindex="4" required>
	</div>
	<div class="m-input-prepend">
		<span class="add-on"><?php echo translate_span('repeat_password'); ?></span>
		<input class="m-wrap translate required" size="20" type="password" name="member_register_repeat_password" data-lang-ja="<?php echo $input_interfaces['repeat_password']['ja']; ?>" data-lang-zh="<?php echo $input_interfaces['repeat_password']['zh']; ?>" data-lang-es="<?php echo $input_interfaces['repeat_password']['es']; ?>" data-lang-ru="<?php echo $input_interfaces['repeat_password']['ru']; ?>" data-lang-en="<?php echo $input_interfaces['repeat_password']['en']; ?>" data-lang-vi="<?php echo $input_interfaces['repeat_password']['vi']; ?>" placeholder="<?php echo $input_interfaces['repeat_password'][$lang_code]; ?>" tabindex="5" required>
	</div>
	<input class="m-btn translate green" name="member_register_submit" type="submit" data-lang-ja="<?php echo $button_interfaces['register']['ja']; ?>" data-lang-zh="<?php echo $button_interfaces['register']['zh']; ?>" data-lang-es="<?php echo $button_interfaces['register']['es']; ?>" data-lang-ru="<?php echo $button_interfaces['register']['ru']; ?>" data-lang-en="<?php echo $button_interfaces['register']['en']; ?>" data-lang-vi="<?php echo $button_interfaces['register']['vi']; ?>" value="<?php echo $button_interfaces['register'][$lang_code]; ?>" tabindex="6" />
	<h5><?php echo translate_span('already_registered'); ?></h5>
	<a id="member_login" class="m-btn blue button_changeable" href="/member/login/" tabindex="7"><?php echo translate_button('login'); ?></a>
</form>
<div class="clear"></div>
<script>
maskField('#member_register_dob');
disableHyphen('member_register_dob');
$('#member_register_dob').datepicker({
	dateFormat: 'yy-mm-dd',
	changeYear: true,
	changeMonth: true,
	yearRange: '0:<?php echo date('Y') ?>',
	defaultDate: '<?php echo ($inputted_dob != '') ? date('Y-m-d',strtotime($inputted_dob)): '1961-09-26'; ?>',
	maxDate: '<?php echo date('Y-m-d'); ?>',
	showButtonPanel: true,
	showAnim: ''
});
$('#register_form').on('change keypress keyup keydown', '#member_register_dob', function(){
	if (isDate($('#member_register_dob').val())) {
		$('#member_register_dob').datepicker('hide');
	} else if (!isDate($('#member_register_dob').val())) {
		$('#member_register_dob').datepicker('show');
	}
});
</script>
<?php
if (isset($_POST['member_register_submit'])) {
	if ($member_register_errors) {
		echo '<span class="error">'.implode('<br />',$member_register_errors).'</span>';
	}
}
?>