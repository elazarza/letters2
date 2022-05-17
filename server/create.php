<?php

require 'database.php';
// require './PHPMailer-master/src/Exception.php';
// require './PHPMailer-master/src/PHPMailer.php';
// require './PHPMailer-master/src/SMTP.php';
// require_once('./PHPMailer-master/src/PHPMailer.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './composer/vendor/autoload.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);
  // Validate.
  if (trim($request->name) === '' || trim($request->address) === '') {
    return http_response_code(400);
  }

  // Sanitize.
  $name = mysqli_real_escape_string($con, trim($request->name));
  $address = mysqli_real_escape_string($con, trim($request->address));
  $address2 = mysqli_real_escape_string($con, trim($request->address2));
  $color = mysqli_real_escape_string($con, trim($request->color));
  $dir = mysqli_real_escape_string($con, trim($request->dir));
  $text = mysqli_real_escape_string($con, trim($request->text));
  $zipcode = mysqli_real_escape_string($con, trim($request->zipcode));
  $city = mysqli_real_escape_string($con, trim($request->city));
  $city2 = mysqli_real_escape_string($con, trim($request->city2));
  $phone = mysqli_real_escape_string($con, trim($request->phone));
  $email = mysqli_real_escape_string($con, trim($request->email));
  $oid = mysqli_real_escape_string($con, trim($request->oid));
  $file = mysqli_real_escape_string($con, $request->file);
  //   $base = base64_decode($file);
  // $resource = base64_decode(str_replace(" ", "+", substr($base, strpos($base, ","))));

  file_put_contents('img.dxf', base64_decode($file));
  // Create.
  $sql = "INSERT INTO `orders`(`id`,`name`,`address`,`address2`, `color`, `dir`, `text`, `zipcode`, `city`, `city2`, `oid`, `phone`, `email`, `file`) VALUES (null,'{$name}','{$address}','{$address2}','{$color}','{$dir}','{$text}','{$zipcode}','{$city}','{$city2}','{$oid}','{$phone}','{$email}','{$file}')";

  if (mysqli_query($con, $sql)) {
    http_response_code(201);
    $order = [
      'name' => $name,
      'address' => $address,
      'phone' => $phone,
      'file' => $file,
      'id'    => mysqli_insert_id($con)
    ];
    $response = (object) array('sql' => $order);
    //   $email = new PHPMailer(TRUE);
    //   $email->SetFrom('elazarzadiki@gmail.com', 'elazar'); //Name is optional
    //   $email->Subject   = 'Message Subject';
    //   $email->Body      = 'body';
    //   $email->AddAddress('elazarzadiki@gmail.com');

    //   $file_to_attach = 'PATH_OF_YOUR_FILE_HERE';

    //   $email->AddAttachment($file, 'file.dxf');

    //   if ($email->Send()) {
    //     return 'ok';
    //   } else {
    //     return 'no';
    //   }
    // } else {
    //   http_response_code(422);
    // }
    $mail = new PHPMailer();

    //   try {
    //     /* Set the mail sender. */
    //     $mail->isSMTP();
    // $mail->Host = "smtp.hostinger.com";
    // $mail->SMTPAuth = true;
    // $mail->Username = 'elazarzadiki@leaf-studios.net';
    // $mail->Password = 'arztxycu1';
    //     $mail->SetFrom('elazarzadiki@gmail.com', 'Darth Vader');

    //     /* Add a recipient. */
    //     $mail->AddAddress('elazarzadiki@gmail.com');

    //     /* Set the subject. */
    //     $mail->Subject = 'Force';

    //     /* Set the mail message body. */
    //     $mail->Body = 'There is a great disturbance in the Force.';

    //     /* Finally send the mail. */
    //     $mail->Send();
    //  }
    //  catch (Exception $e)
    //  {
    //     /* PHPMailer exception. */
    //     echo $e->errorMessage();
    //  }
    $mail->Username = "aviad@ez-net.net"; // your GMail user name
    $mail->Password = "Arztxycu1!";
    $mail->AddAddress("elazarzadiki@gmail.com"); // recipients email
    $mail->FromName = "your name"; // readable name
    $mail->SetFrom('aviad@ez-net.net', 'אתר אותיות לבית');
    $mail->Subject = " הזמנה מספר" . $oid;
    $mail->Body    = " <html><head><style>td { text-align: center; \r\n padding: 10px; \r\n border: 1px solid black; } \r\n th { background-color: lightblue; \r\n padding: 10px; \r\n border: 1px solid black; } \r\n table { padding: 10px; \r\nborder: 1px solid black; }</style></head><body><h1>הזמנה מספר " . $oid . "</h1>" . "<table><tr><th>שם </th><th>כתובת</th><th>כתובת שניה</th><th>צבע האותיות</th><th>כיוון השלט</th><th>מלל האותיות</th><th>מיקוד</th><th>עיר</th><th>עיר 2</th><th>מספר הזמנה</th><th>טלפון</th><th>אימייל</th></tr><tr><td>" . $name . "</td><td>" . $address . "</td><td>" . $address2 . "</td><td>" . $color . "</td><td>" . $dir . "</td><td>" . $text . "</td><td>" . $zipcode . "</td><td>" . $city . "</td><td>" . $city2 . "</td><td>" . $oid . "</td><td>" . $phone . "</td><td>" . $email . "</td></tr></table></body>" ;
    $mail->CharSet = 'UTF-8';
    $mail-> isHTML(true);
    $mail->AddAttachment('img.dxf');
    //-----------------------------------------------------------------------

    $mail->Host = "smtp.hostinger.com"; // GMail
    $mail->Port = 587;
    $mail->IsSMTP(); // use SMTP
    $mail->SMTPAuth = true; // turn on SMTP authentication
    $mail->From = "aviad@ez-net.net";
    $mail->SMTPDebug = 0;
    $mail->SMTPSecure = 'tls';
    if (!$mail->Send()) {
      // echo "Mailer Error: " . $mail->ErrorInfo;

    } else {
      // echo "Message has been sent";
      $response->mail = "sent";

      echo json_encode($response);
      // unlink('img.dxf');
      // $response->mail = "sent";
    }
  } else {
    return "df";
  }
}
