<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$orders = [];
$sql = "SELECT id, name, address, phone FROM orders";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $orders[$i]['id']    = $row['id'];
    $orders[$i]['name'] = $row['name'];
    $orders[$i]['address'] = $row['address'];
    $orders[$i]['phone'] = $row['phone'];
    $i++;
  }

  echo json_encode($orders);
}
else
{
  http_response_code(404);
}