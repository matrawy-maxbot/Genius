<?php

    header('Content-type: application/json; charset=utf-8');

    $post = json_decode(file_get_contents('php://input'), true);

    if(isset($post["login"])){

        $error = "";

        $login_user = $post["username"];
        $login_pass = $post["password"];

        $servername = "localhost";
        $username = "root";
        $password = "";
        $port = "3307";
        $dbname = "hospital";
        $tname = "users";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql3 = "SELECT * FROM `$tname` WHERE `username` = '$login_user' AND `password` = '$login_pass'";
        $result3 = $conn->query($sql3);
        $error = "username or password is incorrect !";
        $rows = array();
        if($result3->num_rows > 0) {
            $error = "";
            
            while($row = $result3->fetch_assoc()) {

                array_push($rows, $row);

            }

            setcookie("login_id", $rows[0]["id"], time() + (86400 * 30), "/");

        }
        if($conn->error) {
            $error = "Error selecting: " . $conn->error;
        }

        $result = array(
            "status" => "success",
            "error" => "",
            "result" => array("id" => $rows[0]["id"], "depart" => $rows[0]["depart_name"])
        );

        if($error != ""){
            $result = array(
                "status" => "failed",
                "error" => $error
            );
        }

        echo json_encode($result);
        
    } else if(isset($post["check"])){

        $error = "";

        $login_id = $post["id"];

        $servername = "localhost";
        $username = "root";
        $password = "";
        $port = "3307";
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

        echo json_encode($result);

    }

?>