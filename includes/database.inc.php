<?php
$db_type = 'mysql'; // mysql or sqlite
if ($db_type == 'mysql') {
	$url = getenv('JAWSDB_URL');
	$dbparts = parse_url($url);
	/* Database config */
	$db_host		= $dbparts['host'];
	$db_user		= $dbparts['user'];
	$db_pass		= $dbparts['pass'];
	$db_database	= ltrim($dbparts['path'],'/');
	/* End config */
	$pdo = new PDO('mysql:host='.$db_host.';port=3306;dbname='.$db_database,$db_user,$db_pass);
	$pdo->query('SET names UTF8');
} else if ($db_type == 'sqlite') {
	$db_path = realpath($_SERVER['DOCUMENT_ROOT']).'/db/nsh.db';
	$pdo = new PDO('sqlite:'.$db_path);
}
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);