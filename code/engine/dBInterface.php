<?php
include_once "conexionDB.php";
include("getURLparameters.php");

$array_parameters = getquerycomponents_array(getGETarray());
$action = getquery_action(getGETarray());
callActionFunctions($action, $array_parameters);

?>