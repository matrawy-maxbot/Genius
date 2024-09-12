<?php

class Router {

	public static function rouute($action, Closure $callback)
	{
		global $routees;
		$action = trim($action, '/');
		$routees[$action] = $callback;
	}

	public static function getRoute($act)
	{
		global $routees;
		$act = trim($act, '/');
		foreach ($routees as $key => $value) {
			
			$st1 = $key;
			$st2 = $act;
		
			$rrtrt = explode("/", $st1);
			$rrtrt2 = explode("/", $st2);
			
			foreach ($rrtrt as $key2 => $value2) {
		
				if(preg_match("/^({).*(})$/", $value2) === 1) {
					if(isset($rrtrt[$key2]) && isset($rrtrt2[$key2])){

						$rrtrt[$key2] = $rrtrt2[$key2];
						$rrtrt_implode = implode("/", $rrtrt);
						$st1 = $rrtrt_implode;
						$arg = $rrtrt2[$key2];
						if($st1 == $st2){
							$callback = $value;
							$a = $arg;
							return true;
						}

					}
				} else {
					if($st1 == $st2){
						$callback = $value;
						return true;
					}
				}
		
			}

		}

		return false;
	}

	function dispatch($action)
	{
        if(!$action == "" && $action !== "/"){
			$http = "http";
			if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") { 
				$http = "https";
			}
            if($action[strlen($action) - 1] == "/") header('Location: '."$http://".$_SERVER["HTTP_HOST"]."/".trim($action, '/'));
        }
		global $routees;
		$action = trim($action, '/');
		foreach ($routees as $key => $value) {
			
			$st1 = $key;
			$st2 = $action;
		
			$rrtrt = explode("/", $st1);
			$rrtrt2 = explode("/", $st2);
			
			foreach ($rrtrt as $key2 => $value2) {
		
				if(preg_match("/^({).*(})$/", $value2) === 1) {
					if(isset($rrtrt[$key2]) && isset($rrtrt2[$key2])){

						$rrtrt[$key2] = $rrtrt2[$key2];
						$rrtrt_implode = implode("/", $rrtrt);
						$st1 = $rrtrt_implode;
						$arg = $rrtrt2[$key2];
						if($st1 == $st2){
							$callback = $value;
							$a = $arg;
							call_user_func($callback, $a);
							break;
						}

					}
				} else {
					if($st1 == $st2){
						$callback = $value;
						call_user_func($callback);
						break;
					}
				}
		
			}

		}
	}


}

function checkDatabase_Tables($databaseNAME, $tableNAME, $table_structure, $insert_values = false){

	$servername = "localhost";
	$username = "root";
	$password = "";
    $port = 0;
	$dbname = $databaseNAME;

	$conn = new mysqli($servername, $username, $password, "");
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "CREATE DATABASE IF NOT EXISTS `$dbname` DEFAULT CHARACTER SET utf8";
	if ($conn->query($sql) === TRUE) {
	} else {
		echo "Error creating database: " . $conn->error;
	}

	$conn2 = new mysqli($servername, $username, $password, $dbname);
	if ($conn2->connect_error) {
		die("Connection failed: " . $conn2->connect_error);
	}

	$sql2 = "CREATE TABLE IF NOT EXISTS `$tableNAME` $table_structure";
	if ($conn2->query($sql2) === TRUE) {
        if($insert_values != false){
            $conn3 = new mysqli($servername, $username, $password, $dbname);
            if ($conn3->connect_error) {
                die("Connection failed: " . $conn3->connect_error);
            }
            $sql3 = "SELECT * FROM `$tableNAME`";
            $result3 = $conn3->query($sql3);
            if($result3->num_rows == 0) {
                $sql4 = "INSERT INTO `$tableNAME` $insert_values";
                if ($conn3->query($sql4) === TRUE) {
                } else {
                    echo "Error inserting: " . $conn3->error;
                }
            }
            if($conn3->error) {
                echo "Error selecting: " . $conn3->error;
            }
            $conn3->close();
        }
	} else {
		echo "Error creating table: " . $conn2->error;
	}

	$conn->close();
	$conn2->close();

}

checkDatabase_Tables("hospital", "users", "(
    `id` INT NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `depart_name` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`))
  ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;", "(`id`, `username`, `password`, `depart_name`) VALUES 
(111, 'mexam', '11111', 'male exam'),
(222, 'fexam', '22222', 'female exam'),
(333, 'mobserv', '33333', 'male observ'),
(444, 'fobserv', '44444', 'female observ'),
(555, 'trauma', '55555', 'trauma'),
(666, 'orthopedic', '66666', 'orthopedic'),
(777, 'children', '77777', 'children'),
(888, 'security', '88888', 'security')");

checkDatabase_Tables("hospital", "tickets", "(
    `id` INT NOT NULL AUTO_INCREMENT,
    `num` INT NOT NULL,
    `ticket_depart` VARCHAR(45) NOT NULL,
    `ticket_status` VARCHAR(45) NOT NULL,
    `complete` TINYINT NOT NULL DEFAULT 0,
    `ticket_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `ticket_entered` TIMESTAMP NULL,
    `ticket_finished` TIMESTAMP NULL,
    PRIMARY KEY (`id`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;");

  function check_login($log_id){

	$error = "";

        $login_id = $log_id;

        $servername = "localhost";
        $username = "root";
        $password = "";
        $port = 0;
        $dbname = "hospital";
        $tname = "users";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql3 = "SELECT * FROM `$tname` WHERE `id` = '$login_id'";
        $result3 = $conn->query($sql3);
        $error = "username or password is incorrect !";
        $rows = array();
        if($result3->num_rows > 0) {
            $error = "";
            
            while($row = $result3->fetch_assoc()) {

                array_push($rows, $row);

            }

        }
        if($conn->error) {
            $error = "Error selecting: " . $conn->error;
        }

        $result = array(
            "status" => "success",
            "error" => "",
            "result" => array("depart" => $rows[0]["depart_name"])
        );

        if($error != ""){
            $result = array(
                "status" => "failed",
                "error" => $error
            );
        }

		return $result;

  }

  
  if(!isset($_COOKIE["login_id"])){
	setcookie("login_id", "false", time() + (60*60*24*30*12*10), "/");
  }

$route = new Router();

$route->rouute('', function(){

    require __DIR__ . '/main page.php';

});

$route->rouute('/login', function(){

    require __DIR__ . '/login page.php';

});

$route->rouute('/security_dashboard', function(){

	$http = "http";
	if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") { 
		$http = "https";
	}
	if(isset($_COOKIE["login_id"])){
		if($_COOKIE["login_id"] !== "false"){
			$ch_log = check_login($_COOKIE["login_id"]);
			if(isset($ch_log["result"]["depart"])){
				if($ch_log["result"]["depart"] == "security"){
					require __DIR__ . '/security dashboard.php';
				} else {
					header("Location: $http://".$_SERVER["HTTP_HOST"]."/login");
				}
			} else {
				header("Location: $http://".$_SERVER["HTTP_HOST"]."/login");
			}
		} else {
			header("Location: $http://".$_SERVER["HTTP_HOST"]."/login");
		}
	} else {
		header("Location: $http://".$_SERVER["HTTP_HOST"]."/login");
	}

});

$route->rouute('/doctor_dashboard', function(){

	$http = "http";
	if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") { 
		$http = "https";
	}
	if(isset($_COOKIE["login_id"])){
		if($_COOKIE["login_id"] !== "false"){
			$ch_log = check_login($_COOKIE["login_id"]);
			if(isset($ch_log["result"]["depart"])){
				if($ch_log["result"]["depart"] !== "security"){
					require __DIR__ . '/doctor dashboard.php';
				} else {
					header("Location: $http://".$_SERVER["HTTP_HOST"]."/login");
				}
			} else {
				header("Location: $http://".$_SERVER["HTTP_HOST"]."/login");
			}
		} else {
			header("Location: $http://".$_SERVER["HTTP_HOST"]."/login");
		}
	} else {
		header("Location: $http://".$_SERVER["HTTP_HOST"]."/login");
	}

});

function get($key, $default=NULL) {

    return array_key_exists($key, $_GET) ? $_GET[$key] : $default;

}

$route->dispatch($_SERVER['REQUEST_URI']); 