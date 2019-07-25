<?php
$host = "https://apiv1.decoin.io/";
$path = "api/v1/userDataStream?privatekey=E49A6B4A55B367D71DCAC53891A9294DE7D8CB1464AA94605B2BAA952ABC46A2";
$params = array();
$headers = array('KEY-X'=> '12345');
//$DateTime =  date_format(new DateTime(), 'Y-m-d');
$Time  =  time();
$ExpTime =    time() + 50000;
// $token = "ThisIsSomeLongToken";
$url = $host.$path;
$key = '12345';
$secret = '12345';
$method = "DELETE";
$bodytohash =  array("listenKey"=>"E49A6B4A55B367D71DCAC53891A9294DE7D8CB1464AA94605B2BAA952ABC46A2");
$body = json_encode((array)$bodytohash);
$string = $key.$url.$method.$body.$Time.$ExpTime;
//generate signature
$sig = hash_hmac('sha256', $string, $secret);

$ch = curl_init();

// endpoint url
curl_setopt($ch, CURLOPT_URL, $host . $path);

// set request as regular post
//curl_setopt($ch, CURLOPT_DELETE, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");

// set data to be send
 curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));

// set header
 curl_setopt($ch, CURLOPT_HTTPHEADER, array('KEY-X:'.$key,'SIG-X:'.$sig,'TIME-X:'.$Time,'EXP-X:'.$ExpTime));

// return transfer as string
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
 $response;
curl_close($ch)
?>
