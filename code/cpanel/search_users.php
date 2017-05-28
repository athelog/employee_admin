<?php
include('../engine/session.php');
session_start();

echo "<br>Session ID=".$_SESSION['UserID'];
echo "<br>UserGRoup=";print_r (ReadUserGroup($_SESSION['UserID']));
//echo "<br>PHP working";
//echo "<br>Hello";
?>
<!DOCTYPE html>
<html ng-app="fetch">
<!--<head> -->


	
	<title>Perfiles</title> 
	<meta charset="utf-8"> 
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.24/angular.min.js"></script>
	<script type="text/javascript" src="users_app.js"></script>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> 
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
			
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


</style>




<!-- controller for patient search -->
<div ng-controller="dbCtrl" ng-init="Init('User')">
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
	   <h1>Sistema de Gestion</h1>
	</header>
</div>
<!-- END OF HEADER AREA  -------------->

<!-- MENU BAR  --------------------->
<div id="menu_bar" class="container">
	
	<ul >
		<a href="#">Bienvenido,<?php echo $_SESSION['UserID'];?></a>
                <button ng-click="Logout()">Salir</button>
	</ul>

</div>
<!-- END OF MENU BAR  ------------- -->

<!-- MAIN AREA ------------------- -->
<div class="container">

	
	<!-- SIDENAV MENU ------ -->
	<nav id="sidenav">
	
		<ul>
			<li><a href="#">Ayuda</a></li>
			<li><a href="#">Acerca de</a></li>
		</ul>
	</nav>
	<!-- END OF SIDENAV MENU -->

	<!-- -------------1. CONTENT SECTION -->
	<article>
		
		<!-- <div class="container"> -->

		<div class="panel panel-default">
			<div class="panel-body" id="content_panel">
		  <ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#home">Pacientes</a></li>
			<li><a data-toggle="tab" href="#menu2">Ayuda</a></li>
		  </ul>



		  <div class="tab-content">
			<div id="home" class="tab-pane fade in active">
			  <h3>Busqueda por usuario</h3>
		  

		  
					<form>
					
						<table>
						
							<tr>
								<td>Cedula</td><td><input id="UserID_Field" type="number"  runat="server" ng-init="inputVal=''" ng-model="UserID_Input_Model"></td>
							</tr>
							<tr>
								<td>Nombre</td><td><input id="Forename_Field" type="text"  runat="server" ng-init="inputVal=''" ng-model="Forename_Input_Model"></td>														
							</tr>

							<tr>
								<td>Segundo Nombre</td><td><input id="MiddleName_Field" type="text"  runat="server" ng-init="inputVal=''" ng-model="MiddleName_Input_Model"></td>														
							</tr>							
							
							<tr>
								<td>Primer Apellido</td><td><input id="FirstSurname_Field" type="text"  runat="server" ng-init="inputVal=''" ng-model="FirstSurname_Input_Model"></td>														
							</tr>						
						
							<tr>
								<td>Segundo Apellido</td><td><input id="SecondSurname_Field" type="text"  runat="server" ng-init="inputVal=''" ng-model="SecondSurname_Input_Model"></td>														
							</tr>	
							
							<tr>
								<td>Telefono</td><td><input id="UserPhone_Field" type="number"  runat="server" ng-init="inputVal=''" ng-model="UserPhone_Input_Model"></td>														
							</tr>	

							<tr>
								<td>Email</td><td><input id="UserEmail_Field" type="text"  runat="server" ng-init="inputVal=''" ng-model="UserEmail_Input_Model"></td>														
							</tr>	

							<tr>
								<td>Empresa</td>
								<td><select ng-model="CompanyID_Input_Model" ng-options="item as item.CompanyID for item in CompanyList"></select></td>														

							</tr>						
							
							<tr>
								<td>Status</td><td><input id="Status_Field" type="text"  runat="server" ng-init="inputVal=''" ng-model="Status_Input_Model"></td>														
							</tr>

							<tr>
									<td>Privilegios</td>
									<td>
										<select name="UserGroupSelect" class="form-control"  ng-model="UserGroupSelect_Input_Model"  required>
											<option></option>
											<option>NONE</option>
											<option>guest</option>
											<option>viewer</option>
											<option>editor</option>										
											<option>administrator</option>
											<option>technician</option>
                                                                                        <option>developer</option>
										</select>
									</td>
							</tr>			
							<tr>
								<td></td>
								<td>
									<button ng-click="SearchUser()">Buscar</button>
								</td>
							</tr>
							
						</table>
						
						
					</form> 

					<!--------- Search results ------->
					<div>
						<input type="text" ng-model="searchFilter" class="form-control">
						<table class="table table-hover">
							<thead>
								<tr>
									<th>Cedula</th>
									<th>Nombre</th>
									<th>Primer Apellido</th>
									<th>Segundo Apellido</th>
									<th>Email</th>
									<th>Empresa</th>
									<th>Privilegios</th>
									<th>Status</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								<tr ng-repeat="users in data | filter:searchFilter">
									<td>{{users.UserID}}</td>
									<td>{{users.Forename}}</td>
									<td>{{users.FirstSurname}}</td>
									<td>{{users.SecondSurname}}</td>
									<td>{{users.Email}}</td>
									<td>{{users.CompanyID}}</td>
									<td>{{users.UserGroup}}</td>
									<td>{{users.Status}}</td>
									<td>
										<a href="edit_users.html?Action=EditUser&ID={{users.UserID}}">Editar</a>
									</td>		

								</tr>
							</tbody>
						</table>

						
					</div><!--------- End of Search results ------->				
					
				
					
				</div>			
			
			<div id="menu2" class="tab-pane fade">
			  <h3>Tips generales</h3>
			  <p>Introduzca cualquier criterio de busqueda en los campos y luego haga click sobre el boton de Busqueda </p>
			</div>

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

</body>
</div><!-- ------- End of Search patient controller -->

</html>

