<?php

    header('Content-type: application/json; charset=utf-8');

    $post = json_decode(file_get_contents('php://input'), true);

    if(isset($post["create"])){

        $error = "";

        $tdepart = $post["depart"];
        $tstatus = $post["status"];

        $servername = "localhost";
        $username = "root";
        $password = "";
        $port = "3307";
        $dbname = "hospital";
        $tname = "tickets";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql3 = "SELECT * FROM `$tname` WHERE `ticket_depart` = '$tdepart' ORDER BY `ticket_created` DESC";
        $result3 = $conn->query($sql3);
        $ticket_num = 1;
        if($result3->num_rows > 0) {
            foreach($result3 as $row) {
                $last_num = (int)$row["num"];
                $ticket_num = $last_num >= 100 ? 1 : $last_num + 1;
                break;
            }
        }
        $sql4 = "SELECT * FROM `$tname` WHERE `ticket_depart` = '$tdepart' AND `ticket_finished` IS NULL";
        $result4 = $conn->query($sql4);
        $waiteres_length = $result4->num_rows;
        if($conn->error) {
            $error = "Error selecting: " . $conn->error;
        }
        $sql4 = "INSERT INTO `$tname` (num, ticket_depart, ticket_status, complete) VALUES ($ticket_num, '$tdepart', '$tstatus', 0)";
        if ($conn->query($sql4) === TRUE) {
        } else {
            $error = "Error inserting: " . $conn->error;
        }
        $conn->close();

        $result = array(
            "status" => "success",
            "error" => "",
            "result" => array("num" => $ticket_num, "waiting_num" => $waiteres_length)
        );

        if($error != ""){
            $result = array(
                "status" => "failed",
                "error" => $error
            );
        }

        echo json_encode($result);
        
    } else if(isset($post["select"])){

        $error = "";

        $servername = "localhost";
        $username = "root";
        $password = "";
        $port = "3307";
        $dbname = "hospital";
        $tname = "tickets";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql3 = "SELECT * FROM `$tname` ORDER BY `ticket_status` ASC, `ticket_created` ASC";
        $result3 = $conn->query($sql3);
        $ticket_num = 1;
        if($conn->error) {
            $error = "Error selecting: " . $conn->error;
        }

        $conn->close();

        $rows = array();

        while($row = $result3->fetch_assoc()) {

            array_push($rows, $row);

        }

        $result = array(
            "status" => "success",
            "error" => "",
            "result" => $rows
        );

        if($error != ""){
            $result = array(
                "status" => "failed",
                "error" => $error
            );
        }

        echo json_encode($result);

    } else if(isset($post["update"])){

        $error = "";

        $tid = (int)$post["id"];
        $tnum = (int)$post["num"];
        $tcom = (int)$post["complete"];
        if(!isset($post["ticket_created"])) $tcre = 'ticket_created';
        if(!isset($post["ticket_entered"])) $tent = 'ticket_entered';
        if(!isset($post["ticket_finished"])) $tfin = 'ticket_finished';
        if(isset($post["ticket_created"])) $tcre = $post["ticket_created"] == '' ? 'NULL' : "'".$post["ticket_created"]."'";
        if(isset($post["ticket_entered"])) $tent = $post["ticket_entered"] == '' ? 'NULL' : "'".$post["ticket_entered"]."'";
        if(isset($post["ticket_finished"])) $tfin = $post["ticket_finished"] == '' ? 'NULL' : "'".$post["ticket_finished"]."'";

        $servername = "localhost";
        $username = "root";
        $password = "";
        $port = "3307";
        $dbname = "hospital";
        $tname = "tickets";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql4 = "UPDATE `$tname` SET complete=$tcom, ticket_created=$tcre, ticket_entered=$tent, ticket_finished=$tfin WHERE id=$tid AND num=$tnum";
        if ($conn->query($sql4) === TRUE) {
        } else {
            $error = "Error updating: " . $conn->error;
        }
        $conn->close();

        $result = array(
            "status" => "success",
            "error" => ""
        );

        if($error != ""){
            $result = array(
                "status" => "failed",
                "error" => $error
            );
        }

        echo json_encode($result);
        
    } else if(isset($post["delete"])){

        $error = "";

        $tid = (int)$post["id"];
        $tnum = (int)$post["num"];

        $servername = "localhost";
        $username = "root";
        $password = "";
        $port = "3307";
        $dbname = "hospital";
        $tname = "tickets";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql4 = "DELETE FROM `$tname` WHERE id=$tid AND num=$tnum";
        if ($conn->query($sql4) === TRUE) {
        } else {
            $error = "Error deleting: " . $conn->error;
        }
        $conn->close();

        $result = array(
            "status" => "success",
            "error" => ""
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