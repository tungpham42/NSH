<?php
if (!isset($_SESSION['loggedin'])):
?>
<form method="post" action="/login/">
	<?php
	if (isset($_POST['login'])):
		if ($err):
			echo '<span style="color: red" colspan="2">'.implode('<br />',$err).'</span>';
		endif;
	endif;
	?>
	<div class="m-input-prepend m-input-append">
		<span class="add-on">Username</span>
		<input class="m-wrap" size="20" type="text" name="username" placeholder="Username" title="Fill in your username" tabindex="1">
		<button class="m-btn blue bt_login" type="submit" name="login" tabindex="3">Login</button>
	</div>
	<div class="m-input-prepend">
		<span class="add-on">Password</span>
		<input class="m-wrap" size="20" type="password" name="password" placeholder="Password" title="Fill in your password" tabindex="2">
	</div>
</form>
<?php
elseif (isset($_SESSION['loggedin'])):
	echo '<h2>You have logged in!</h2>';
endif;
?>