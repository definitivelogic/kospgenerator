/*
 * Code Generator - View Model for KOSPGenerator and logic for generating KO View Model code based on SharePoint Content Type
 * Version 0.1.0
 * Author: John Kerski (Definitive Logic)
 * @requires jQuery v1.5 or greater and Knockout
 * Licensed under the MIT LIcense
 * http://www.opensource.org/licenses/mit-license.php
*/
/*
*  @description - View Model for KOSPGenerator and logic for generating KO View Model code based on SharePoint Content Type
*  @name Generator
*  @author John Kerski (Definitive Logic)
*/
		
		//Global error handler
		var gOldOnError = window.onerror;
		// Override previous handler.
		window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
		  
		  //Log error to Output for Testing
		  $('#consoleOutput').text('Woops... got the following error:');
		  $('#consoleOutput').append('<p> Error Message: ' + errorMsg + '</p>');
		  $('#consoleOutput').append('<p> URL: ' + url + '</p>');
		  $('#consoleOutput').append('<p> Line Number: ' + lineNumber + '</p>');		  
		  
		}
		
		/*
		* @namespace Generator
		*/
		window.Generator = {};
		
		//Constants
		/** @constant {text} */
		Generator.SP_SINGLE_LINE = "Text";
		/** @constant {text} */
		Generator.SP_MULTI_LINE = "Note";
		/** @constant {text} */
		Generator.SP_SINGLE_CHOICE = "Choice";
		/** @constant {text} */
		Generator.SP_MULTI_CHOICE = "MultiChoice";
		/** @constant {text} */
		Generator.SP_NUMBER = "Number";
		/** @constant {text} */
		Generator.SP_CURRENCY = "Currency";
		/** @constant {text} */
		Generator.SP_DATETIME = "DateTime";
		/** @constant {text} */
		Generator.SP_SINGLE_LOOKUP = "Lookup";
		/** @constant {text} */
		Generator.SP_MULTI_LOOKUP = "LookupMulti";
		/** @constant {text} */
		Generator.SP_YESNO = "Boolean";
		/** @constant {text} */
		Generator.SP_SINGLE_USER = "User";
		/** @constant {text} */
		Generator.SP_MULTI_USER = "UserMulti";
		
		/** @function camelCase
		 * Return camelCase format based on text parameter  		
		 */
		Generator.camelCase = function(text)
		{
			var tempText = null;
			
			if(text != null)
			{
				tempText = text.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
				    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
				  }).replace(/\s+/g, '');
				  
				//Handles secondary lookups
				tempText = tempText.replace(':','_');
				
				//Remove special characters
				tempText = tempText.replace(/[`~!@#$%^&*()_|+\-=÷¿?;'",.<>\{\}\[\]\\\/]/g, '');

  			}
			
			
			
			return tempText;
		}
		
		/** @function camelCase
		 * Return camelCase  		
		 */		
		Generator.generateProperty = function(observableName,name,value)
		{
			return 'self.' + observableName + '.' + name + ' = "' + value + '";\n';
		}
		
		/** @function getCode
		 * Return Generators view model code based on url, list, and fields		
		 */				
		Generator.getCode = function(url, list,fields)
		{
			//Default temp code for the view model to be generated
			var tempCode = [
				"/** Default View Model Name\n",
				"*/",
				"var viewModel = function(){\n",
				"/** @member {Object} */\n",
				"var self = this;\n",
				"//Context",
				"/** @member {text} */\n",
				"self._WebURL = '" + url + "';\n",
				"/** @member {text} */\n",
				"self._ListName = '" + list + "';\n",
				"//Constants\n",
				"/** @constant {text} */\n",
				"self.SP_SINGLE_LINE = 'Text';\n",
				"/** @constant {text} */\n",
				"self.SP_MULTI_LINE = 'Note';\n",
				"/** @constant {text} */\n",
				"self.SP_SINGLE_CHOICE = 'Choice';\n",
				"/** @constant {text} */\n",
				"self.SP_MULTI_CHOICE = 'MultiChoice'\n",
				"/** @constant {text} */\n",
				"self.SP_NUMBER = 'Number';\n",
				"/** @constant {text} */\n",
				"self.SP_CURRENCY = 'Currency';\n",
				"/** @constant {text} */\n",
				"self.SP_DATETIME = 'DateTime';\n",
				"/** @constant {text} */\n",
				"self.SP_SINGLE_LOOKUP = 'Lookup';\n",
				"/** @constant {text} */\n",
				"self.SP_MULTI_LOOKUP = 'LookupMulti';\n",
				"/** @constant {text} */\n",
				"self.SP_YESNO = 'Boolean';\n",
				"/** @constant {text} */\n",
				"self.SP_SINGLE_USER = 'User';\n",
				"/** @constant {text} */\n",
				"self.SP_MULTI_USER = 'UserMulti';\n",
				"//Default properties for any SharePoint list item\n",
				"/** @member {number} */\n",
				"self.id = ko.observable(0);\n",
				"/** @property {text}  SharePoint Type for id*/\n",
				"self.id.sPType = 'Number';\n",								
				"/** @property {text}  Static (Internal) Name for id*/\n",				
				"self.id.staticName = 'ID';\n",				
				"/** @member {Date} */\n",
				"self.created = ko.observable();\n",
				"/** @property {text}  SharePoint Type for created*/\n",				
				"self.created.sPType = 'DateTime';\n",	
				"/** @property {text}  Static (Internal) Name for created*/\n",															
				"self.created.staticName = 'Created';\n",								
				"/** @member {Date} */\n",				
				"self.createdBy = ko.observable();\n",
				"/** @property {text}  SharePoint Type for createdBy*/\n",																			
				"self.createdBy.sPType = 'User';\n",									
				"/** @property {text}  Static (Internal) Name for createdBy*/\n",																														
				"self.createdBy.staticName = 'Author';\n",												
				"/** @member {Date} */\n",				
				"self.modified = ko.observable();\n",
				"/** @property {text}  SharePoint Type for modified*/\n",																			
				"self.modified.sPType = 'DateTime';\n",																
				"/** @property {text}  Static (Internal) Name for modified*/\n",																			
				"self.modified.staticName = 'Modified';\n",								
				"/** @member {Date} */\n",				
				"self.modifiedBy = ko.observable();\n",
				"/** @property {text}  SharePoint Type for modifiedBy*/\n",					
				"self.modifiedBy.sPType = 'User';\n",				
				"/** @property {text}  Static (Internal) Name for modifiedBy*/\n",																									
				"self.modifiedBy.staticName = 'Editor';\n",								
			];
			//Iterate through each field	
			for(var i = 0; i < fields.length; i++)
			{
				//Convert display name to camel case
				var tempObservableName = Generator.camelCase(fields[i].displayName);
				
				//For use if field added, add property
				var addProperties = true;
			
				//Generate code based on content type
				if(fields[i].type == Generator.SP_SINGLE_LINE)
				{
					//Build Comments
					tempCode.push("/** @member {text} */\n");

					//Build Code
					var tempText = "self." + tempObservableName + " = ko.observable('');\n";
					//Add Code
					tempCode.push(tempText);					
				}//End Single Line of Text
				else if(fields[i].type == Generator.SP_MULTI_LINE)
				{
					//Build Comment
					tempCode.push("/** @member {text} */\n");
				
					//Build Code
					var tempText = "self." + tempObservableName + " = ko.observable('');\n";
					
					//Add to code
					tempCode.push(tempText);					
				}//End Multiline
				else if(fields[i].type == Generator.SP_SINGLE_CHOICE || fields[i].type == Generator.SP_MULTI_CHOICE)
				{	
					
					if(fields[i].type == Generator.SP_MULTI_CHOICE)
					{
						//Build Comment
						tempCode.push("/** @member {array} Selected Choice */\n");
					
						//Add to code
						tempCode.push("self." + tempObservableName + " = ko.observableArray();\n");
					
					}
					else //single choice
					{
						//Build Comment
						tempCode.push("/** @member {text} Selected Choice */\n");
					
						//Add to code
						tempCode.push("self." + tempObservableName + " = ko.observable();\n");
					
					}
					
					//Possible Choices
				
					//Build Comment
					tempCode.push("/** @member {Array} Possible Choices */\n");
					
					//Build Code
					var tempText = "self." + tempObservableName + "_Choices = ko.observableArray([\n";
					
					for(var j = 0; j < fields[i].properties.choices.length; j++)
					{
						tempText = tempText + '\t{choice:"' + fields[i].properties.choices[j].choice + '"}';
						
						if(j != (fields[i].properties.choices.length -1))
						{
							//Add comma
							tempText = tempText + ",\n";
						}
						else//Just add new line
						{
							tempText = tempText + "\n";
						}
					};//end for loop
					
					//Close array
					var tempText = tempText + "]);\n";
					
					//Add to code
					tempCode.push(tempText);
				}//end Choice and MultiChoice
				else if(fields[i].type == Generator.SP_NUMBER)
				{
					//Build Comments
					tempCode.push("/** @member {number} */\n");

					//Build Code
					var tempText = "self." + tempObservableName + " = ko.observable('');\n";
					
					//Add to code
					tempCode.push(tempText);
					
					//Check for Percentage
					if(fields[i].properties.percentage == "TRUE")
					{
						//Add computed for display this value properly.
						var tempComputed = "self." + tempObservableName + "_Display = ko.computed(function(){\n"
						tempComputed = tempComputed + '\t if(self.' + tempObservableName + "() == null){return null;}\n";
						tempComputed = tempComputed + '\t else{return self.' + tempObservableName + '()*100 + "%";}\n';
						tempComputed = tempComputed + "\t});";
						
						//Add to code
						tempCode.push(tempComputed);
					}
				}//end Number
				else if(fields[i].type == Generator.SP_CURRENCY)
				{
					//Build Comments
					tempCode.push("/** @member {text} */\n");

					//Build Code
					var tempText = "self." + tempObservableName + " = ko.observable('');\n";
					
					//Add to code
					tempCode.push(tempText);					
					
				}//end Currency
				else if(fields[i].type == Generator.SP_DATETIME)
				{
					//Build Comments
					tempCode.push("/** @member {Date} */\n");

					//Build Code
					var tempText = "self." + tempObservableName + " = ko.observable('');\n";
					
					//Add to code
					tempCode.push(tempText);	
				}//end DateTime
				else if(fields[i].type == Generator.SP_SINGLE_LOOKUP || fields[i].type == Generator.SP_SINGLE_USER)
				{
					//Build Comments
					tempCode.push("/** @member {object} */\n");

					//Build Code
					//Lookup will have an object property for id and value
					var tempText = "self." + tempObservableName + " = ko.observable('');\n";
					
					//Add to code
					tempCode.push(tempText);	
				}//end lookup and user
				else if(fields[i].type == Generator.SP_MULTI_LOOKUP || fields[i].type == Generator.SP_MULTI_USER)
				{
					//Build Comments
					tempCode.push("/** @member {Array} */\n");

					//Build Code
					//Lookup will have an array of object with properties id and value
					var tempText = "self." + tempObservableName + " = ko.observableArray();\n";
					
					//Add to code
					tempCode.push(tempText);	
				}//end Multiple lookup and Multiple User
				else if(fields[i].type == Generator.SP_YESNO)
				{
					//Build Comments
					tempCode.push("/** @member {boolean} */\n");

					//Build Code
					var tempText = "self." + tempObservableName + " = ko.observable();\n";
					
					//Add to code
					tempCode.push(tempText);				
					
					
					//Build computed function to translate true and false to yes and no
					var tempComputed = "self." + tempObservableName + "_Display = ko.computed(function(){\n"
					tempComputed = tempComputed + '\t if(self.' + tempObservableName + "() == null){return null;}\n";
					tempComputed = tempComputed + '\t else if(self.' + tempObservableName + "() == true){return 'Yes';}\n";
					tempComputed = tempComputed + '\t else if(self.' + tempObservableName + "() == false){return 'No';}\n";										
					tempComputed = tempComputed + "\t});";
					
					//Add to code
					tempCode.push(tempComputed);
				}
				else
				{
					//Do Nothing right now
					addProperties = false;
				}
				
				//Check if we need to add a property
				if(addProperties == true)
				{
					
					//Add Comment
					tempCode.push('/** @property {text}  SharePoint Type for ' + tempObservableName + '*/\n');
					
					//Add SP Property
					var tempText = Generator.generateProperty(tempObservableName,"sPType",fields[i].type);

					//Add Code
					tempCode.push(tempText);
					
					//Add Comment
					tempCode.push('/** @property {text}  Static (Internal) Name for ' + tempObservableName + '*/\n');
					
					//Add Static Name Property
					tempText = Generator.generateProperty(tempObservableName,"staticName",fields[i].staticName);
					
					//Add Code
					tempCode.push(tempText);
				}
				
			}//end for loop

									
			//Close bracket
			tempCode.push("};\n");
			
			//Return joined code;
			return tempCode.join('');
			
			
			
						
			//Test
			//return "(function(){ var self = this; self.run = function(){alert('Hello World Again');};  self.run();})();";
		}//end Generator.getCode
		
		/** @function ViewModel
		 * Knockout view model for KOSPGenerator
		 */		
		Generator.ViewModel = function()
		{
			//Observables
			/** @member {Object} */
			var self = this;
				
			//Sites
			/** @member {Array} */
			self.sites = ko.observableArray();
			/** @member {Object} */
			self.siteSelected = ko.observable();
			
		  //Handle site update
		  /** @function handle update to self.siteSelected */		  
		  self.siteSelected.subscribe(function(newValue){
		  		//Clear dropdowns and code
		  		self.lists([]);
		  		self.contentTypes([]);
		  		self.hasContentType(false);
		  		self.viewModelCode('');
		  		self.testingCode('');
		  		
		  		
		  		//Update List
		  		DAL.getLists(self.siteSelected()).done(function(lists){
		  			self.lists(lists);
		  		});
		  });
			
		
			//Lists
			/** @member {Array} */			
			self.lists = ko.observableArray();
			/** @member {Object} */			
			self.listSelected = ko.observable();
			
		  //Handle list update
		  /** @function handle update to self.listSelected */		  
		  self.listSelected.subscribe(function(newValue){
		  		//Clear ContentTypes and code
		  		self.contentTypes();
		  		self.viewModelCode('');
		  		self.testingCode('');
		  		
		  		if(self.listSelected() != "[Please Select List]")
		  		{
			  		//Update List
			  		DAL.getContentTypesFromList(self.siteSelected(), self.listSelected()).done(function(contentTypes){
			  			self.contentTypes(contentTypes);
			  		});
			  		
		  		}
		  });
			
			
			//Content Types
			/** @member {Array} */			
			self.contentTypes = ko.observableArray();
			/** @member {Object} */
			self.contentTypeSelected = ko.observable();
			/** @member {boolean} */
			self.hasContentType = ko.observable(false);
			/** @function handle updated to self.contentTypeSelected */
			self.contentTypeSelected.subscribe(function(newValue){
			
				//Clear code
		  		self.viewModelCode('');
		  		self.testingCode('');
			
				if(self.contentTypeSelected() != "0")
				{
					self.hasContentType(true);
				}
				else
				{
					self.hasContentType(false);
				}
			});
							
			//Code
			/** @member {Object} */			
			self.viewModelCode = ko.observable('');

			//Test Code
			/** @member {Object} */			
			self.testingCode = ko.observable('');
			
			//CAML Query
			/** @function custom CAML query for testing code */			
			self.camlQuery = ko.computed(function(){return "<Query><Where><Eq><FieldRef Name='ContentTypeId'/><Value Type='Text'>" + self.contentTypeSelected() + "</Value></Eq></Where></Query>";});

			/** @member {text} default data access code for testing */
			self.tempDataAccessCode = 'var testVM = temp;\n'
			+ 'var output = $("#consoleOutput");\n'
			+ '//Clear output\n'
			+ 'output.text("");\n'
			+ 'if(this.data.length == 0)\n'
			+ '{\n'
			+ 'output.text("No data found");\n'
			+ '}\n'			
			+ 'else if(this.data.length > 0)\n'
			+ '{\n'
			+ '	//Iterate through the properties and those with a static name we need to try to load data"\n'
			+ '	for(var vMProperty in testVM)\n'
			+ '	{\n'
			+ '		if(testVM[vMProperty].staticName != null )\n'
			+ '		{\n'
			+ '			//Get properties for the observable"\n'
			+ '			var tempStaticName = testVM[vMProperty].staticName;\n'
			+ '			var tempType = testVM[vMProperty].sPType;\n'
			+ '\n'		
			+ '			if(this.data[0][tempStaticName] != null)\n'
			+ '			{\n'
			+ '			//If these types just assign the value\n'
			+ '			if(tempType == testVM.SP_SINGLE_LINE || tempType == testVM.SP_NUMBER || tempType == testVM.SP_SINGLE_CHOICE || tempType == testVM.SP_CURRENCY || tempType == testVM.SP_MULTI_LINE || tempType == testVM.SP_YESNO)\n'
			+ '			{\n'
			+ '				//Assign value\n'
			+ '				testVM[vMProperty](this.data[0][tempStaticName]);\n'
			+ '			}\n'
			+ '			else if(tempType == testVM.SP_DATETIME)\n'
			+ '			{\n'
			+ '				//Assign Date Value\n'
			+ '				var tempDate = new Date(this.data[0][tempStaticName]);\n'
			+ '				//Assign Value\n'
			+ '				testVM[vMProperty](tempDate);\n'
			+ '			}\n'
			+ '			else if(tempType == testVM.SP_MULTI_CHOICE)\n'
			+ '			{\n'
			+ '				//Build temp value\n'
			+ '				var tempArray = [];\n'
			+ '\n'				
			+ '					for(var i = 0; i < this.data[0][tempStaticName].length; i++)\n'
			+ '					{\n'
			+ '						tempArray.push({"value" : this.data[0][tempStaticName][i]});\n'
			+ '					}\n'
			+ '\n'						
			+ '				//Assign value\n'
			+ '				testVM[vMProperty](tempArray);\n'
			+ '			}\n'							
			+ '			else if(tempType == testVM.SP_SINGLE_LOOKUP)\n'
			+ '			{\n'
			+ '				testVM[vMProperty]({"id": this.data[0][tempStaticName].lookupId, "value": this.data[0][tempStaticName].lookupValue });\n'
			+ '\n'					
			+ '			}\n'
			+ '			else if(tempType == testVM.SP_MULTI_LOOKUP)\n'
			+ '			{\n'
			+ '				//Build temp value\n'
			+ '				var tempArray = [];\n'
			+ '\n'										
			+ '					for(var i = 0; i < this.data[0][tempStaticName].length; i++)\n'
			+ '					{\n'
			+ '						tempArray.push({"id" : this.data[0][tempStaticName][i].lookupId, "value" : this.data[0][tempStaticName][i].lookupValue});\n'
			+ '					}\n'
			+ '				//Assign value\n'
			+ '				testVM[vMProperty](tempArray);\n'
			+ '			}\n'				
			+ '			else if(tempType == testVM.SP_SINGLE_USER)\n'
			+ '			{\n'
			+ '					testVM[vMProperty]({"id": this.data[0][tempStaticName].userId, "value": this.data[0][tempStaticName].userName });\n'
			+ '\n'					
			+ '			}\n'							
			+ '			else if(tempType == testVM.SP_MULTI_USER)\n'
			+ '			{\n'
			+ '				//Build temp value\n'
			+ '				var tempArray = [];\n'
			+ '\n'				
			+ '					for(var i = 0; i < this.data[0][tempStaticName].length; i++)\n'
			+ '					{\n'
			+ '						tempArray.push({"id" : this.data[0][tempStaticName][i].userId, "value" : this.data[0][tempStaticName][i].userName});\n'
			+ '					}\n'
			+ '\n'											
			+ '				//Assign value\n'
			+ '				testVM[vMProperty](tempArray);\n'
			+ '			}\n'							
			+ '\n'																
			+ '			//Output Value\n'
			+ '			output.append("<p>Observable: " + vMProperty + "</p>"); \n'
			+ '			output.append("<p>Type: " + tempType + "</p>");\n'
			+ '			output.append("<p>SharePoint returned: " + JSON.stringify(this.data[0][tempStaticName]) + "</p>");\n'
			+ '			output.append("<p>Observable Value: " + JSON.stringify(testVM[vMProperty]()) + "</p>");\n'
			+ '			output.append("<p>-----------------------</p>");\n'
			+ '\n'				
			+ '			}//end if value is null\n'
			+ '\n'				
			+ '		}//end if static Name exists\n'
			+ '	}//end for loop\n'
			+ '\n'	
			+ '	};//end if\n';

						
			//Build for default testing of view model
			/** @function returns self executing function for testing */			
			self.defaultCodeForTesting = ko.computed(function(){

			
				//Build self executing function
				var testCodeTempPrefix = "(function(){" + self.viewModelCode() + " var temp = new viewModel();" 
			
				var getDataTestFunction = 'temp.getData = function(){ ' + '$().SPServices.SPGetListItemsJson({webURL: temp._WebURL,listName: temp._ListName,' 
				+ 'CAMLQuery: "' 
				+ self.camlQuery()
				+ '",'
				+ 'CAMLRowLimit: 1,changeToken:"",aync:true}).done(function(){' + self.tempDataAccessCode + '})'
				+ '//end done\n' 
				+ '};\n';
			
				var testCodeTempSuffix = " temp.getData();})();";
				
				return testCodeTempPrefix + getDataTestFunction + testCodeTempSuffix;
			});// end self.defautlCodeForTesting
			
			/** @function returns true if self.viewModelCode is filled out. Otherwise returns false  */			
			self.hasCode = ko.computed(function(){
				if(self.viewModelCode() != null && self.viewModelCode() != '')
				{
					return true;
				}
				else
				{
					return false;
				}
			});//end self.hasCode
			
			//Generate Code
			/** @function click event triggers the creation of the view model code and default code for testing */			
			self.generateCode = function()
			{
				DAL.getContentType(self.siteSelected(), self.listSelected(), self.contentTypeSelected()).done(function(fields){
					//Build View Model
					self.viewModelCode(Generator.getCode(self.siteSelected(), self.listSelected(),fields));							  
					//Build testing code
					self.testingCode(self.defaultCodeForTesting());
				});

			};//end self.generateCode
			
			//Test Code
			/** @function click event triggers the testing of self.testingCode contents */			
			self.testCode = function()
			{
				var temp = new Function(self.testingCode());
				temp();
			};//end self.testCode
			
			
			//Initialize
			/** @function Gets the list of site collections to start with */			
			self.init = function()
			{
				//Get Sites
				DAL.getWebCollection().done(function(webs){
					self.sites(webs);
				});
				
			};//end self.init	
		};