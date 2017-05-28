
	<html ng-app="fetch">
	<!--<head> -->

		
		<title>Adjuntos</title> 
		<meta charset="utf-8"> 
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.24/angular.min.js"></script>
		<script type="text/javascript" src="upload_files_app.js"></script>

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
                            <a href="#">Bienvenido, UserID_Tag </a>
                            <button ng-click="Logout()">Salir</button>                        
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
                                                
                                                    
                                                    <li class="active"><a data-toggle="tab" href="#main">Subir</a></li>
                                                    <li><a data-toggle="tab" href="#show">Mostrar</a></li>
                                                    <li><a data-toggle="tab" href="#show2">Borrar</a></li>
                                                    <li><a data-toggle="tab" href="#misc">Misc</a></li>
                                                       
   
                                                        
                                  </ul>



                                  <div class="tab-content">
                                      
                                        <!-- Login tab -->
                                        <div id="main" class="tab-pane fade in active">

                                            <h3>Subir archivos</h3>

                                        <?php 
                                        
                                        
                                            $Action_Param = "NONE";
                                            $ID_Param = "NONE";
                                            $TargetPHPScript = "NONE";
                                        
                                            if (isset($_GET['Action'])) {
                                                    $Action_Param=$_GET['Action'];
                                                    //echo "<br>Action Param=".$Action_Param;
                                            }	

                                            if (isset($_GET['ID'])) {
                                                    $ID_Param=$_GET['ID'];
                                                    //echo ",ID Param=".$ID_Param;
                                            }	
                                            
                                            if (strcmp($Action_Param,"NONE")!=0 && strcmp($ID_Param,"NONE")!=0){
                                                
                                                $TargetPHPScript="../engine/upload_file.php?Action=$Action_Param&ID=$ID_Param";
                                                
                                                echo '   
                                                <form action="'.$TargetPHPScript.'" method="post" enctype="multipart/form-data">
                                                    Seleccione archivo para subir:
                                                    <input type="file" name="fileToUpload" id="fileToUpload">
                                                    <input type="submit" value="Subir" name="submit">
                                                </form>

                                                </div>';
                                                
                                            }else{
                                                
                                                echo '
                                                <h3>Estimado usuario</h3>
                                                <p style="color:red">Usted no cuenta con autorizacion para ver esta pagina</p>
                                                <a href="../index/index.php">Click en este enlace para retornar a Indice</a>';

                                            }
            
                                        ?> 
                                        <!-- </div>  -->   
                                            
                                    
                                        <div id="show" class="tab-pane fade">
                                            <h3>Archivos subidos</h3>
                                            
                                            <?php
                                            
                                                include_once ('../engine/FileManagement.php');
                                            
                                                $Action_Param = "NONE";
                                                $ID_Param = "NONE";

                                                if (isset($_GET['Action'])) {
                                                        $Action_Param=$_GET['Action'];
                                                        //echo "<br>Action Param=".$Action_Param;
                                                }	

                                                if (isset($_GET['ID'])) {
                                                        $ID_Param=$_GET['ID'];
                                                        //echo ",ID Param=".$ID_Param;
                                                }	

                                                if (strcmp($Action_Param,"NONE")!=0 && strcmp($ID_Param,"NONE")!=0){
                                                    
                                                    $target_folder = $userfiles_basefolder.$ID_Param;
                                                    //echo "<br>target_folder=$target_folder";
                                                    //echo "<br>";
                                                    
                                                    if (is_dir($target_folder)){
                                                        //folder exists
                                                        foldersize($target_folder,true,true);//reading files size                                                      
                                                        
                                                    }else{
                                                        echo "<br><p style='color:red'>ERROR:Folder de usuario no encontrado=$target_folder<p>";
                                                        echo '<br><a href="../index/index.php">Click en este enlace para retornar a Indice</a>';
                                                    }
                                                    
                                                            
                                                }else{

                                                    echo '
                                                    <h3>Estimado usuario</h3>
                                                    <p style="color:red">Usted no cuenta con autorizacion para ver esta pagina</p>
                                                    <a href="../index/index.php">Click en este enlace para retornar a Indice</a>';

                                                }                                                
                                            
                                            
                                            ?>
                                            
                                        </div><!-- end of patient tab -->
                                        
                                        <div id="show2" class="tab-pane fade">
                                            <h3>Borrar archivos</h3>
                                            
                                            <?php
                                            
                                                include_once ('../engine/FileManagement.php');
                                            
                                                $Action_Param = "NONE";
                                                $ID_Param = "NONE";

                                                if (isset($_GET['Action'])) {
                                                        $Action_Param=$_GET['Action'];
                                                        //echo "<br>Action Param=".$Action_Param;
                                                }	

                                                if (isset($_GET['ID'])) {
                                                        $ID_Param=$_GET['ID'];
                                                        //echo ",ID Param=".$ID_Param;
                                                }	

                                                if (strcmp($Action_Param,"NONE")!=0 && strcmp($ID_Param,"NONE")!=0){
                                                    
                                                    $target_folder = $userfiles_basefolder.$ID_Param;
                                                    //echo "<br>target_folder=$target_folder";
                                                    //echo "<br>";
                                                    
                                                    if (is_dir($target_folder)){
                                                        //folder exists
                                                        foldersize($target_folder,true,false,true);//reading files size                                                      
                                                        
                                                    }else{
                                                        echo "<br><p style='color:red'>ERROR:Folder de usuario no encontrado=$target_folder<p>";
                                                        echo '<br><a href="../index/index.php">Click en este enlace para retornar a Indice</a>';
                                                    }
                                                    
                                                            
                                                }else{


                                                    echo '
                                                    <h3>Estimado usuario</h3>
                                                    <p style="color:red">Usted no cuenta con autorizacion para ver esta pagina</p>
                                                    <a href="../index/index.php">Click en este enlace para retornar a Indice</a>';

                                                }                                                
                                            
                                            
                                            ?>
                                            
                                        </div><!-- end of patient tab -->                                        
                                        
                                        <!-- start of misc tab -->
                                        <div id="misc" class="tab-pane fade">
                                        
                                            <h3>Tamano en disco de los archivos</h3>
                                            
                                            <?php
                                            
                                                include_once ('../engine/FileManagement.php');
                                                $disk_used = format_size(foldersize($userfiles_basefolder,false,false,false));
                                                
                                                echo "<br>Tamano total =<b>$disk_used MB</b>. Esto representa el tamano de TODOS los archivos de TODOS los usuarios.";
                                                    
                                                echo "<br><br><b>Lista de folders:</b>";
                                                echo foldersize($userfiles_basefolder,false,false,false,true);
                                            
                                            ?>                                            
                                            
                                            
                                            
                                        </div><!-- end of misc tab -->
                                        
                                  </div> <!-- end of tab content -->



                                  </div>  
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

	</html>

