<?php
require realpath($_SERVER['DOCUMENT_ROOT']).'/includes/init_member.inc.php';
require realpath($_SERVER['DOCUMENT_ROOT']).'/includes/init_trigger.inc.php';
if (isset($_POST['fullname']) && isset($_POST['dob'])) {
	create_person($_POST['fullname'],$_POST['dob']);
}
?>