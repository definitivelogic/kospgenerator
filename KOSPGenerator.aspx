<!-- TODO handle view fields, bad queries, test other list, more comments-->
<!doctype html>
<!--[if lt IE 7]>      
<html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="">
   <![endif]-->
   <!--[if IE 7]>         
   <html class="no-js lt-ie9 lt-ie8" lang="">
      <![endif]-->
      <!--[if IE 8]>         
      <html class="no-js lt-ie9" lang="">
         <![endif]-->
         <!--[if gt IE 8]><!--> 
         <html class="no-js" lang="">
            <!--<![endif]-->
            <head>
<meta name="WebPartPageExpansion" content="full" />
<meta name="WebPartPageExpansion" content="full" />
<meta name="WebPartPageExpansion" content="full" />
               <meta name="WebPartPageExpansion" content="full" />
               <meta charset="utf-8">
               <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
               <title></title>
               <meta name="description" content="">
               <meta name="viewport" content="width=device-width, initial-scale=1">
               <link rel="apple-touch-icon" href="apple-touch-icon.png">
               <link rel="stylesheet" href="css/bootstrap.min.css">
               <style>
                  body {
                  padding-top: 50px;
                  padding-bottom: 20px;
                  }
               </style>
               <link rel="stylesheet" href="css/bootstrap-theme.min.css">
               <link rel="stylesheet" href="css/main.css">
               <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
               <script src="js/libs/bootstrap.min.js"></script>
               <script src="js/libs/modernizr-2.8.3-respond-1.4.2.min.js"></script>
               <script src="js/libs/knockout-min.js"></script>
               <script src="js/libs/jquery.SPServices-2014.02.min.js"></script>
               <script src="js/libs/DAL.js"></script>	
               <script src="js/libs/CodeGenerator.js"></script>        
               <script>
                  "use strict";
                  
                  function Start()
                  {
                  	$(document).ready(function(){
                  		
                  		var temp = new Generator.ViewModel();
                  	
                  		temp.init();
                  		ko.applyBindings(temp,document.getElementById('main'));				
                  	});
                  }
               </script>
            </head>
            <body onload="Start()">
               <!--[if lt IE 8]>
               <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
               <![endif]-->
               <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                  <div class="container">
                     <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">KO View Model Generator For SharePoint</a>
                     </div>
                     <div id="navbar" class="navbar-collapse collapse">
                     </div>
                     <!--/.navbar-collapse -->
                  </div>
               </nav>
               <div class="container">
                  <!-- Example row of columns -->
                  <div class="row">
                     <div class="col-md-9">
                        <p>This tool was developed to generate boilerplate Knockout View Model code based on a SharePoint list or document.
                           Use the Select Settings section to identify the list and content type, then you'll have the option to generate view model code and then test it.
                        </p>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-md-2">
                        <h2>1) Select Settings</h2>
                        <div class="form-group">
                           <label>Please First Select A Site:</label>
                           <select data-bind="options: sites, optionsText: 'title', optionsValue: 'url', value: siteSelected" class="form-control"></select>
                        </div>
                        <div class="form-group">
                           <label>Next Select A List:</label>
                           <select data-bind="options: lists, optionsText: 'title', optionsValue: 'title', value: listSelected" class="form-control"></select>
                        </div>
                        <div class="form-group">
                           <label>Next Content Types</label>
                           <select data-bind="options: contentTypes, optionsText: 'name', optionsValue: 'id', value: contentTypeSelected" class="form-control"></select>
                        </div>
                        <div class="form-group">
                           <button class="btn" data-bind="click: generateCode, visible: hasContentType, enable: hasContentType">Now Click This Button</button>
                        </div>
                     </div>
                     <!--End Column-->
                     <div class="col-md-5">
                        <h2>2) View Generated View Model</h2>
						<div class="form-group">
                           <textarea data-bind="text: viewModelCode" rows="15" class="form-control"></textarea>						
						</div>                        
                     </div>
                     <!--End column-->
                     <div class="col-md-5">
                     	<h2>3) Test the Code if you want</h2>
                        <div class="form-group">
                        	<label>Default code will appear when view model is generated. Default code queries for first item of the content type selected, saves the values to the view model, and then displays the output.</label>
                        	<textarea rows="10" data-bind="value: testingCode" class="form-control"></textarea>
                        </div>    
                        <div class="form-group">
                           <button class="btn" data-bind="click: testCode,visible: hasCode, enable: hasCode">Click This Button To Run A Test</button>			
                        </div>                                                                
                     </div>
                  </div>
                  <!--End Row-->
                  <hr/>
                  <div class="row">
                  	<div class="col-md-12">
                  		<h2>4) Output from Testing</h2>
                  		<div class="form-group" id="consoleOutput" style="height:250px;border:1px solid black; overflow:scroll">
                  		</div><!--End Form Group-->
                  	</div>
                  </div>
                  <footer>
                     <p></p>
                  </footer>
               </div>
               <!-- /container -->        
            </body>
         </html>