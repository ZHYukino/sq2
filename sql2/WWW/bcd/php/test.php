<?php

$resseedtime = time();
$res["seedtime"] = date("H:i:s",  $resseedtime);
$res = strtotime($res["seedtime"]);
print_r( $res);
