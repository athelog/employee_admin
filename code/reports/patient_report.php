
	<html ng-app="fetch">
	<!--<head> -->

		
		<title>Generar reportes</title> 
		<meta charset="utf-8"> 
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.24/angular.min.js"></script>
		<script type="text/javascript" src="reports_app.js"></script>

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





	<!-- <body ng-controller="dbCtrl"> -->
	<body >

            <div id="PatientController" ng-controller="dbCtrl" ng-init="Init('Patient')" >
                
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
                                <a href="#">Bienvenido, Usuario</a>
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
                                        <li class="active"><a data-toggle="tab" href="#home">Perfil</a></li>
                                        <li><a data-toggle="tab" href="#menu1">Reporte</a></li>
                                        <li><a data-toggle="tab" href="#menu2">Ayuda</a></li>
                                  </ul>



                                  <div class="tab-content">
                                        <div id="home" class="tab-pane fade in active">
                                          <h3>Perfil del paciente</h3>

                                                        <!--------- Search results ------->
                                                        <div>
                                                            <form name="PatientForm">

                                                                    <table border="1px">
                                                                    <!--FIXME:delete all ng-repeat and correct "valor actual"-->	

                                                                            <tr>
                                                                                    <th>Dato</th>
                                                                                    <th>Valor actual</th>

                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Cedula</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.PatientID}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Nombre</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.Forename}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Primer Apellido</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.FirstSurname}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Segundo Apellido</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.SecondSurname}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Email</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.Email}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Telefono</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.Phone}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Fecha Nacimiento(dd-mm-aaaa)</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.BirthDate}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Fecha entrada al programa</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.JoinDate}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Genero</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.Gender}}</td>

                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Direccion</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.Address}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>ID Empresa</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.CompanyID}}</td>
                                                                            <tr>
                                                                                    <th>Departamento</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.Department}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Sede</th>
                                                                                    <td ng-repeat="patients in PatientData">{{patients.Site}}</td>
                                                                            </tr>

                                                                    </table>	

                                                                    <br>  
                                                                    
                                                                    DEBUG TABLE
                                                                    <br><br>
                                                                    <table border="1px">
                                                                    <!--FIXME:delete all ng-repeat and correct "valor actual"-->	

                                                                            <tr>
                                                                                    <th>cedula</th>
                                                                                    <th>Test</th>
                                                                                    <th>Value</th>
                                                                                    <th>ModData</th>
                                                                                    <th>Modifier</th>
                                                                                    <th>FFD</th>s

                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Cedula</th>
                                                                                    <td ng-repeat="patients in ReportData">{{patients.PatientID}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Test</th>
                                                                                    <td ng-repeat="patients in ReportData">{{patients.Test}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Value</th>
                                                                                    <td ng-repeat="patients in ReportData">{{patients.Value}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>ModData</th>
                                                                                    <td ng-repeat="patients in ReportData">{{patients.ModDate}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Modifier</th>
                                                                                    <td ng-repeat="patients in ReportData">{{patients.Modifier}}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>FFD</th>
                                                                                    <td ng-repeat="patients in ReportData">{{patients.FFD}}</td>
                                                                            </tr>

                                                                    </table>	
                                                                    
                                                                    <br><br>
                                                                             <table class="table table-hover">
                                                                                    <thead>
                                                                                            <tr>
                                                                                                    <th>Cedula</th>
                                                                                                    <th>Test</th>
                                                                                                    <th>Value</th>
                                                                                                    <th>Modifier</th>
                                                                                                    <th>ModDate</th>
                                                                                            </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                            <tr ng-repeat="Test in ReportData | filter:searchFilter">
                                                                                                    <td>{{Test.PatientID}}</td>
                                                                                                    <td>{{Test.Test}}</td>
                                                                                                    <td>{{Test.Value}}</td>
                                                                                                    <td>{{Test.ModifierID}}</td>
                                                                                                    <td>{{Test.ModDate}}</td>
	

                                                                                            </tr>
                                                                                    </tbody>
                                                                            </table>
                                                                    
                                                                    <br><br>

    

                                                            </form>	     	
                                                        </div><!--------- End of Search results ------->				


                                        </div><!-- End of patient tab -->			

                                        <div id="menu1" class="tab-pane fade">
                                                <h3>Generar reporte de paciente</h3>

			

                                                                <form name="ReportForm">
                                                                    
                                                                    <table border="1px">
                                                                    <!--FIXME:delete all ng-repeat and correct "valor actual"-->	

                                                                            <tr>
                                                                                    <th>Dato</th>
                                                                                    <th>Valor actual</th>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Fecha Inicial(dd-mm-aaaa)</th>
                                                                                    <td><input name="StartDate_Field" type="date"  runat="server" ng-init="inputVal=''" ng-model="StartDate_Input_Model" required></td>
                                                                            </tr>
                                                                            <tr>
                                                                                    <th>Fecha Final(dd-mm-aaaa)</th>
                                                                                    <td><input name="EndDate_Field" type="date"  runat="server" ng-init="inputVal=''" ng-model="EndDate_Input_Model" required></td>
                                                                                    
                                                                            </tr>                                                                            
                                                                       
                                                                            
                                                                    </table>
                                                                            
                                                                    <br><button ng-click="GeneratePatientReport()">Generar</button>        
                                    
                                                                        <!-- Search Filters -->
                                                                        <div>

                                                                            

                                                                        </div>
                                                                        <!-- end of Search filters -->

                                                                        <br>

                                                                        <!--------- Search results ------->
                                                                            <input type="text" ng-model="searchFilter" class="form-control">
                                                                            <table class="table table-hover">
                                                                                    <thead>
                                                                                            <tr>
                                                                                                    <th>Cedula</th>
                                                                                                    <th>Test</th>
                                                                                                    <th>Valor</th>
                                                                                                    <th>ModifierID</th>
                                                                                                    <th>LastMod</th>
                                                                                            </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                            <tr ng-repeat="Test in ReportDataOrg | filter:searchFilter">
                                                                                                    <td>{{Test.PatientID}}</td>
                                                                                                    <td>{{Test.Test}}</td>
                                                                                                    <td>{{Test.Value}}</td>
                                                                                                    <td>{{Test.ModifierID}}</td>
                                                                                                    <td>{{Test.LastMod}}</td>
	

                                                                                            </tr>
                                                                                    </tbody>
                                                                            </table>
                                                                            
                                                                            <table border="1px">
                                                                            <!--FIXME:delete all ng-repeat and correct "valor actual"-->	

                                                                                    <tr>
                                                                                            <th>Dato</th>
                                                                                            <th>Valor actual</th>
                                                                                    </tr>
                                                                                    <tr>
                                                                                            <th>Cedula</th>
                                                                                            <td ng-repeat="patients in ReportDataOrg">{{patients.PatientID}}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                            <th>Nombre</th>
                                                                                            <td ng-repeat="patients in ReportDataOrg">{{patients.Test}}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                            <th>Mail</th>
                                                                                            <td ng-repeat="patients in ReportDataOrg">{{patients.Value}}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                            <th>Mail</th>
                                                                                            <td ng-repeat="patients in ReportDataOrg">{{patients.ModifierID}}</td>
                                                                                    </tr>                                                                                     
                                                                            </table>                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                        <!-- ------- End of Search results -->

                                                                </form>


                                        </div> <!--End of Company Search tab-->


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


            </div><!--END OF PATIENT CONTROLLER-->
            
            </body>

	</html>

