<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "elazar_shop";
$conn = new mysqli($servername, $username, $password, $db);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully<br>";

$sql = 'SELECT * FROM users LEFT JOIN orders ON users.id = orders.userid';
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $sarray = array();
    $grouped = array();
    while($row = $result->fetch_assoc()) {
        array_push($sarray, $row);
        
    }
    foreach ($sarray as $element) {
        $grouped[$element['id']][] = $element;
    }
   
    $obj = (object) $grouped;

    
    foreach($obj as $key => $value) {
    
        echo 
        '<div style="background-color:grey">ID: ' . $key .
         '</div>
         <div style="background-color: blue">Name: ' . $value[0]["fname"] . 
         "<br> last name: " . $value[0]["lname"] . 
         "</div>";
    
    }

} else {
    echo json_encode($conn) . "Error : " . $conn->error;
}
// $sections = array(
//     array("section_id1", "article title", ""),
//     array(1, "Andy", "C#"),
//     array(2, "Josh", "C#"),
//     array(2, "Josh", "ASP"),
//     array(1, "Andy", "SQL"),
//     array(3, "Steve", "SQL"),
// );

// $result = array();
// foreach ($sections as $element) {
//     $result[$element[0]][] = $element;
// }
// $obj = (object) $result;
// echo "<div>";
// foreach($obj as $key => $value) {
// // foreach ($groupSections as $oneSection) {

//     echo "ID:" . $key . "</div>";

// }
// }
?>