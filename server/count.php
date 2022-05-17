<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);
    // Validate.

    // Sanitiecho json_encode("hi");ze.
    $type = mysqli_real_escape_string($con, trim($request->type));

    if ($type === 'count') {
        $date = mysqli_real_escape_string($con, trim($request->date));
        $sql = "SELECT * FROM `views` WHERE date = '${date}'";
        if ($result = $con->query($sql)) {
            if ($result->num_rows > 0) {
                $row2 = $result->fetch_assoc();
                $num = $row2["number"] + 1;
                $sql2 = "UPDATE `views` SET `number` = '${num}' WHERE date = '${date}'";
                $con->query($sql2);
                $arr = array();
                echo json_encode($num);
            } else {
                $num = 0;
                $sql2 = "INSERT INTO `views`(`id`, `date`, `number`) VALUES (null, '${date}', $num)";
                if ($result = $con->query($sql2)) {
                    echo json_encode("Created new");
                }
            }
        } else {
            echo json_encode($result);
        }
    } else if ($type === 'getcount') {
        $sql = "SELECT * FROM `views`";
        if ($result = $con->query($sql)) {
            if ($result->num_rows > 0) {
                $arr = array();
                while ($row = $result->fetch_assoc()) {
                    array_push($arr, $row);
                }
                echo json_encode($arr);
            } else {
                echo json_encode("0 results");
            }
        }
    }
}
