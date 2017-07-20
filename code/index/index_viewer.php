<?php
//include('../engine/session.php');
echo "<br>Executing index_viewer.php";
//session_start();




//$MaxUserGroup=GetMaxUG(ReadUserGroup($_SESSION['UserID']));
//echo "<br>Session ID=".$_SESSION['UserID'];
//echo "<br>UserGroup array=";print_r (ReadUserGroup($_SESSION['UserID']));
//echo "<br>Max usergroup=".$MaxUserGroup;

?> 
	<html ng-app="fetch">
	<!--<head> -->

		
		<title>Indice</title> 
		<meta charset="utf-8"> 
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.24/angular.min.js"></script>
		<script type="text/javascript" src="login_app.js"></script>

		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> 
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min.js"></script>
			
	<!-- </head> -->
	  
	  
	<style>
	div.container {
		width: 100%;
		border: 1px solid gray;
	}

	<!--
	footer {
		padding: 1em;
		color: white;
		background-color:  #1e8449  ;
		clear: left;
		text-align: center;
	}
	-->

	<!--
	header {

		padding: 1em;
		color: white;
		background-color:   #2e86c1 ;
		clear: left;
		text-align: center;

	}
	-->

	nav {
		float: left;
		max-width: 160px;
		margin: 0;
		padding: 1em;
	}

	nav ul {
		list-style-type: none;
		padding: 0;
	}
				
	nav ul a {
		text-decoration: none;
	}

	article {
		margin-left: 170px;
		border-left: 1px solid gray;
		padding: 1em;
		overflow: hidden;
	}

	#menu_bar{

		#padding: 1em;
		color: white;
		background-color:   #707b7c  ;
		clear: left;
		text-align: right;
		
	}

	#top_bar{

		/*#padding: 1em;*/
		color: white;
		background-color:   #707b7c  ;
		clear: left;
		text-align: right;
		
	}

	#header_area{

		padding: 1em;
		color: white;
		background-color:   #2e86c1 ;
		clear: left;
		text-align: center;
		
	}


	#footer_bar {

		padding: 1em;
		color: white;
		background-color:  #1e8449  ;
		clear: left;
		text-align: center;
	}

	#form_div{
	  
		width: 200px;
		align: center;
		margin: 0 auto;
	}

	.modal-popup{
		margin: 20px;
	}
	</style>




<?php

echo
'	<!-- <body ng-controller="dbCtrl"> -->
	<body >

              
                <!-- TOP BAR --------------------->
                <div id="top_bar" class="container">

                        <ul>
                                <a href="#">BICOYED Costa Rica</a>
                                <a href="#">Contacto +506 2253 5555, agomez@bicoyed.com</a>
                        </ul>
                </div>
                <!-- END OF TOP BAR--------------->

                <!-- HEADER AREA --------------------->
                <div id="header_area" class="container">	
                        <header>
                           <h1>HR System</h1>
                        </header>
                </div>
                <!-- END OF HEADER AREA  -------------->

                <!-- MENU BAR  --------------------->
                <div id="menu_bar" class="container">


                        <ul >
                            <a href="#">Welcome, UserID_Tag </a>
                            <button ng-click="Logout()">Logout</button>                        
                        </ul>

                </div>
                <!-- END OF MENU BAR  ------------- -->

                <!-- MAIN AREA ------------------- -->
                <div class="container">


                        <!-- SIDENAV MENU ------ -->
                        <nav id="sidenav">


                                <ul>
                                        <li><a href="#">Menu</a></li>
                                        <li><a href="#">Acceso</a></li>
                                </ul>
                        </nav>
                        <!-- END OF SIDENAV MENU -->

                        <!-- -------------1. CONTENT SECTION -->
                        <article>

                                <!-- <div class="container"> -->

                                <div class="panel panel-default">
                                        <div class="panel-body" id="content_panel">
                                  <ul class="nav nav-tabs">
                                        <li class="active"><a data-toggle="tab" href="#main">Menu</a></li>
                                        <li><a data-toggle="tab" href="#user">Usuario</a></li>
                                  </ul>



                                  <div class="tab-content">
                                      
                                        <!-- Login tab -->
                                        <div id="main" class="tab-pane fade in active">

                                            <h3>Acciones</h3>

                                            <form>';

                                            
                                            echo '
                                            <form>

                                                <table border="1px" >
                                                        <tr>
                                                                        <th align="center"><img border="0" alt="Usuarios" src="../common/images/users_2.png" width="100" height="100"><br>Usuarios</th>
                                                                        <td align="center">
                                                                            <br><a href="../cpanel/su.php">Buscar</a>
                                                                            <br><a href="../cpanel/cu.php">Crear</a>
                                                                            <br><a href="../cpanel/ffdu.php?Action=ListFFDUser&ID=-10">Marcados para borrar</a>
                                                                        </td>
                                                        </tr>';
                                                        
                                                        echo '<tr>
                                                                        <th><img border="0" alt="Pacientes" src="../common/images/patient_2.png" width="100" height="100"><br>Pacientes</th>
                                                                        <td align="center">';
                                                        
                                                        //printing links to patient search for every company
                                                        foreach($MyCompanies as $key=>$val){
                                                            //echo "<br>$key,$val";
                                                            echo "<br><a href=../profiles/spc.php?ID=".$val.">Buscar en $val</a>";
                                                        }                                                                                    

                                                        
                                                        echo '                        
                                                                        </td>
                                                        </tr>';
                                                        

                                                        echo '    
                                                        <tr>
                                                                        <th><img border="0" alt="Empresas" src="../common/images/cityscape_2.png" width="100" height="100"><br>Empresas</th>
                                                                        <td align="center">
                                                                            <br><a href="../profiles/sp.php">Buscar</a>
                                                                            <br><a href="../profiles/cp.php">Crear</a>
                                                                            <br><a href="../profiles/ed.php">Departamentos</a>
                                                                            <br><a href="../profiles/ffd.php">Marcados para borrar</a>
                                                                        </td>
                                                        </tr>';
                                                        
                                            
                                                        echo '<tr>';
                                            
                                                        echo '                <th><img border="0" alt="Mis empresas" src="../common/images/cityscape_2.png" width="100" height="100"><br>Mis empresas</th>';
                                                        echo '                <td align="center">';
                                                        
                                                        foreach($MyCompanies as $key=>$val){
                                                            //echo "<br>$key,$val";
                                                            echo "<br><a href=../profiles/wpc.php?Action=WatchCompany&ID=".$val.">$val</a>";
                                                        }                    

                                                        echo '                </td>';
                                                        echo '</tr> '; 
                                                                
                                                                
                                                                
                                        echo '                
                                                </table>
                                                
                                                
                                            </form>                                          
                                                
                                        </div><!-- End of Login tab -->	';		

                                                        
                                                        
                                        echo '                
                                                        
                                        <div id="user" class="tab-pane fade">
                                          <h3>Mi perfil de usuario</h3>

                                                <table border="1px">


                                                        <tr>
                                                                <th>Dato</th>
                                                                <th>Valor actual</th>
                                                                <th>Valor nuevo</th>
                                                                <!--<th>Validación</th>	-->	
                                                        </tr>
                                                        <tr>
                                                                <th>Cedula</th>
                                                                <td ng-repeat="patients in data">{{patients.PatientID}}</td>
                                                                <!--<td>validation={{PatientForm.PatientID_Field.$valid}}</td>-->
                                                        </tr>
                                                        <tr>
                                                                <th>Nombre</th>
                                                                <td ng-repeat="patients in data">{{patients.Forename}}</td>
                                                                <!--<td>validation={{PatientForm.Forename_Field.$valid}}</td>-->
                                                        </tr>
                                                        <tr>
                                                                <th>Primer Apellido</th>
                                                                <td ng-repeat="patients in data">{{patients.FirstSurname}}</td>
                                                                <!--<td>validation={{PatientForm.FirstSurname_Field.$valid}}</td>-->
                                                        </tr>
                                                        <tr>
                                                                <th>Segundo Apellido</th>
                                                                <td ng-repeat="patients in data">{{patients.SecondSurname}}</td>
                                                                <!--<td>validation={{PatientForm.SecondSurname_Field.$valid}}</td>-->
                                                        </tr>
                                                        <tr>
                                                                <th>Email</th>
                                                                <td ng-repeat="patients in data">{{patients.Email}}</td>
                                                                <!--<td>validation={{PatientForm.PatientEmail_Field.$valid}}</td>-->
                                                        </tr>
                                                        <tr>
                                                                <th>Telefono</th>
                                                                <td ng-repeat="patients in data">{{patients.Phone}}</td>
                                                                <!--<td>validation={{PatientForm.PatientPhone_Field.$valid}}</td>-->
                                                        </tr>
                                                        <tr>
                                                                <th>Fecha Nacimiento(dd-mm-aaaa)</th>
                                                                <td ng-repeat="patients in data">{{patients.BirthDate}}</td>
                                                                <!--<td>validation={{PatientForm.BirthDate_Field.$valid}}</td>-->
                                                        </tr>
                                                        <tr>
                                                                <th>Fecha entrada al programa</th>
                                                                <td ng-repeat="patients in data">{{patients.JoinDate}}</td>
                                                        </tr>
                                                        <tr>
                                                                <th>Genero</th>
                                                                <td ng-repeat="patients in data">{{patients.Gender}}</td>
                                                                <td>
                                                                        <select name="GenderSelect" class="form-control"  ng-model="GenderSelect_Input_Model" required>
                                                                                <option></option>
                                                                                <option>Masculino</option>
                                                                                <option>Femenino</option>
                                                                        </select>
                                                                </td>	
                                                                <!--<td>validation={{PatientForm.GenderSelect.$valid}}</td>-->

                                                        </tr>
                                                        <tr>
                                                                <th>Direccion</th>
                                                                <td ng-repeat="patients in data">{{patients.Address}}</td>
                                                                <!--<td>validation={{PatientForm.PatientAddress_Field.$valid}}</td>-->
                                                        </tr>
                                                        <tr>
                                                                <th>ID Empresa</th>
                                                                <td ng-repeat="patients in data">{{patients.CompanyID}}</td>
                                                                <td>
                                                                        <select name="CompanyIDSelect" class="form-control"  ng-model="CompanySelect_Input_Model"  required>
                                                                                <option></option>
                                                                                <option>Company1</option>
                                                                                <option>Company2</option>
                                                                        </select>
                                                                </td>	
                                                                <!--<td>validation={{PatientForm.CompanyIDSelect.$valid}}</td>-->	</tr>
                                                        <tr>
                                                                <th>Departamento</th>
                                                                <td ng-repeat="patients in data">{{patients.Department}}</td>
                                                                <td>
                                                                        <select name="DepartmentSelect" class="form-control"  ng-model="DepartmentSelect_Input_Model" required>
                                                                                <option></option>
                                                                                <option>Department1</option>
                                                                                <option>Department2</option>
                                                                        </select>
                                                                </td>	
                                                                <!--<td>validation={{PatientForm.DepartmentSelect.$valid}}</td>-->		
                                                        </tr>
                                                        <tr>
                                                                <th>Sede</th>
                                                                <td ng-repeat="patients in data">{{patients.Site}}</td>
                                                                <td>
                                                                        <select name="SiteSelect" class="form-control"  ng-model="SiteSelect_Input_Model" required>
                                                                                <option></option>
                                                                                <option>Site1</option>
                                                                                <option>Site2</option>
                                                                        </select>
                                                                </td>	
                                                                <!--<td>validation={{PatientForm.SiteSelect.$valid}}</td>-->	
                                                        </tr>

                                                </table>


                                        </div><!-- end of user profile -->
                                        
                                        <div id="patient" class="tab-pane fade">
                                            <h3>Mi expediente</h3>
                                            
                                        </div><!-- end of patient tab -->

                                  </div> <!-- end of tab content -->




                                </div>

                                </div>
                                <!-- </div> -->

                        </article>
                        <!-- -------------END OF CONTENT SECTION -->





                </div>
                <!-- END OF MAIN AREA --------------------->

                        <div id="footer_bar" class="container">	
                                <footer>2016 - Athelog Data Services</footer>
                        </div>


            
            </body>';
?>
        
	</html>

