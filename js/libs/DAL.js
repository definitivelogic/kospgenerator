/*
 * Code Generator - Data Access Layer for SharePoint
 * Version 0.1.0
 * Author: John Kerski (Definitive Logic)
 * @requires jQuery v1.5 or greater and SPServices
 * Licensed under the MIT LIcense
 * http://www.opensource.org/licenses/mit-license.php
*/
/*
*  @description - Data Access Layer for SharePoint
*  @name DAL
*  @author John Kerski (Definitive Logic)
*/

		/* @namespace DAL*/
		window.DAL = {};

		
		/** @function getLists
		 * Get List of lists from url provided		
		 */		
		DAL.getLists = function(url)
		{			
			var _jquery = $;
		
			return _jquery.Deferred(function(dfd){
				_jquery().SPServices({
				    webURL: url,
				    operation: "GetListCollection",
				    async: true, 	   
				    completefunc: function (xData, Status) {
				      if(Status == "success")
				      {	
				      		//Done function will return this
							var lists = [];
							
							lists.push({title:"[Please Select List]"});
						
							$(xData.responseXML).find("Lists > List").each(function(){
								var $node = _jquery(this);
								
								var tempTitle = $node.attr("Title");
								
								var temp = {
									title : tempTitle
								}
								
								lists.push(temp);
							});
							
							
							dfd.resolve(lists);
			      	  }
	   		      	  else
			      	 {
						dfd.reject(Status);
			      	 } 			      	
			      }
			  });//End SPService Function
			}).promise();//End Deferred function
			
		};//end DAL.getLists	

		/** @function getContentTypesFromList
		 * Get Content Types From Lis		
		 */				
		DAL.getContentTypesFromList = function(url, list)
		{			
			var _jquery = $;
		
			return _jquery.Deferred(function(dfd){
				_jquery().SPServices({
 					webURL: url,
		  		    operation: "GetListContentTypes",
			        listName: list,
				    completefunc: function (xData, Status) {
				      if(Status == "success")
				      {	
				      		//Done function will return this
							var contentTypes = [];
						
							contentTypes.push({name:"[Please Select Content Type]", id:"0"});						
						
							_jquery(xData.responseXML).find("ContentType").each(function(){
								var $node = _jquery(this);
								
								var tempName = $node.attr("Name");
								var tempID = $node.attr("ID");
								
								var temp = {
									name : tempName,
									id : tempID
								}
								
								if(tempName != "Folder") //Don't add folders
								{
									contentTypes.push(temp);
								}
							});
							
							dfd.resolve(contentTypes);
			      	  }
	   		      	  else
			      	 {
						dfd.reject(Status);
			      	 } 			      	
			      }
			  });//End SPService Function
			}).promise();//End Deferred function
			
		}//end DAL.getContentTypesFromList

		/** @function getAllSubWebCollection
		 * Return Get Sub Sites	and includes current site
		 */				
		DAL.getWebCollection = function()
		{			
			var _jquery = $;
		
			return _jquery.Deferred(function(dfd){
				_jquery().SPServices({
				    operation: "GetWebCollection",
				    async: false, 	   
				    completefunc: function (xData, Status) {
				      if(Status == "success")
				      {	
				      		//Done function will return this
							var webs = [];
							
							//Load current site
							webs.push({title: "Current Site", url : _jquery().SPServices.SPGetCurrentSite()});
						
							_jquery(xData.responseXML).find("Webs > Web").each(function(){
								var $node = _jquery(this);
								
								var tempTitle = $node.attr("Title");
								var tempURL = $node.attr("Url");
								
								var temp = {
									title : tempTitle,
									url : tempURL
								}
								
								webs.push(temp);
							});
							
							dfd.resolve(webs);
			      	  }
	   		      	  else
			      	 {
						dfd.reject(Status);
			      	 } 			      	
			      }
			  });//End SPService Function
			}).promise();//End Deferred function
		};//end DAL.getWebCollection

				
		/** @function getContentType
		 * Get Content Type Information based on parameters provided
		 */						
		DAL.getContentType = function(url, list, contentTypeID)
		{
		
			var _jquery = $;
		
			return _jquery.Deferred(function(dfd){
				_jquery().SPServices({
					webURL: url,
				    operation: "GetListContentType",
				    listName: list,
				    contentTypeId: contentTypeID,
				    async: true, 	   
				    completefunc: function (xData, Status) {
				      if(Status == "success")
				      {	
				      		//Done function will return this
							var fields = [];
						
							_jquery(xData.responseXML).find("Fields > Field").each(function(){
								var $node = _jquery(this);
							
								//Build Properties
								var tempProperties = {};								
	
								//Pull also possible relevant values for use later
								var tempStaticName = $node.attr("StaticName");
								var tempType = $node.attr("Type");
								var tempDisplayName = $node.attr("DisplayName");
								var tempRequired = $node.attr("Required");
								
								//Build array of properties specific to the data type																							
								var tempProperties = [];		
																
								//Add properties now based on type
								if(tempType == "Note")
								{			
									var tempRichText = $node.attr("RichText");
									var tempRichTextMode = $node.attr("RichTextMode"); //FullHtml or Compatible
									var tempAppendOnly = $node.attr("AppendOnly");
									
									tempProperties.richText = tempRichText;																							
									tempProperties.richTextMode = tempRichTextMode;																							
									tempProperties.appendOnly = tempAppendOnly;																								
								}	
								else if(tempType == "Choice" || tempType == "MultiChoice")
								{	
									var tempChoices = [];
										
									//Get Choices	
									$node.find("CHOICES > CHOICE").each(function(){
										var $choice = _jquery(this);
										//Add choice
										tempChoices.push( {"choice":$choice.text()} );											
									});
											
									var tempFillInChoice = $node.attr("FillInChoice");
							
									tempProperties.choices = tempChoices;
									tempProperties.fillInChoice = tempFillInChoice;
	
								}
								else if(tempType == "Number")
								{
									var tempMin = $node.attr("Min");
									var tempMax = $node.attr("Max");
									var tempPercentage = $node.attr("Percentage");
									var tempDecimals = $node.attr("Decimals");	
									
									tempProperties.min = tempMin;
									tempProperties.max = tempMax;
									tempProperties.percentage = tempPercentage;
									tempProperties.decimals = tempDecimals;	
									
								}
								else if(tempType == "Currency")
								{
									var tempLCID = $node.attr("LCID");	
									tempProperties.lCID = tempLCID;									
								}
								else if(tempType == "DateTime")
								{
									var tempFormat = $node.attr("Format"); //DateOnly or DateTime								
									
									tempProperties.format = tempFormat;
								}
								else if(tempType == "Lookup" || tempType == "LookupMulti")
								{
									var tempList = $node.attr("List");
									var tempShowField = $node.attr("ShowField");									
									
									tempProperties.list = tempList;									
									tempProperties.showField = tempShowField;																											
								}
								else if(tempType == "Boolean")
								{
									//Do nothing right now
								}
								else if(tempType == "User" || tempType == "UserMulti")
								{
									var tempUserSelectionMode = $node.attr("UserSelectionMode");
									
									tempProperties.userSelectionMode = tempUserSelectionMode;
								}
								 	
								
								var temp = {
									staticName : tempStaticName,
									type : tempType,
									displayName : tempDisplayName,
									required : tempRequired,
									properties : tempProperties
								}
								
								fields.push(temp);
							});
							
							dfd.resolve(fields);
			      	  }
	   		      	  else
			      	 {
						dfd.reject(Status);
			      	 } 			      	
			      }
			  });//End SPService Function
			}).promise();//End Deferred function
			};// end DAL.getContentType		
	
			/** @function hasSPError
			 * Checks for error code
			 */				
			DAL.hasSPError = function(xData){
				
				var results = JSON.stringify(xData);
				
				//Check if error code is not 0
				var index = results.indexOf('<ErrorCode>0x00000000</ErrorCode>');
			
				if(index == -1)
				{
					return true;
				}
				else
				{
					return false;
				}
			
			};//end DAL.hasSPError	