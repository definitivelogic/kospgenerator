#Knockout View Model Generator For SharePoint

Building Knockout View Models for SharePoint can be a time consuming process.  Many View Models are based on SharePoint lists and often developers have to create observables based off of the columns in those lists. This tool saves on development time by building boilerplate Knockout View Model code based on the SharePoint list you select.  It also standardizes the code generated to handle different types of SharePoint columns (choice, single line of text, lookup, etc.).

This open source tool is made possible with the help of the following open source libraries:

	1. SPServices
	2. Knockout.js
	3. Bootstrap
	4. Initializr

This application was initially developed by SharePoint developers at Definitive Logic.  For more information about the company please visit DefinitiveLogic.com or contact us directly.

##General Information

###Naming Conventions for Generated Code

The display name for each column is represented by either an observable or observable array and the name of this observable will be a camelCase version of the display name.

Additional Properties for Observables

Each observable or observable array created for a column is given the following additional properties:

1. .sPType: This is Microsoft's identifier for the type of column.  This can be either "Text", "Note", "Choice", "MultiChoice", "DateTime", "Boolean", "Number", "Currency", "Lookup", "LookupMulti", "User", or"UserMulti".
2. .staticName:  This is the internal or static name of the column.  This may be different from the display name.  The static name can assist with querying SharePoint or consuming data returned from SharePoint.
SharePoint Types Supported

|Type	|Observable Information	Notes	|Example View Syntax|
|Single line of text	|Column value saved as an observable.	|<p data-bind="text: myText()"></p>|
|Multiple lines of text	|Column value saved as an observable. No encoding of the data occurs.|	<textarea data-bind="text: myMultiText()"></textarea>|
|Choice	|Column value saved as an observable. Possible values for column are provided with an observable array.  The name of the computed function is the camelCase of the Display Name appended with "_Choices".  For example if the display name was "My Choices" then the computed function would be myChoices_Choices with the following values:

[{choice:"Enter Choice #1"},
{choice:"Enter Choice #2"},
{choice:"Enter Choice #3"}]
|
|<select data-bind="options: myChoice_Choices, optionsText: 'choice', optionsValue: 'choice', value: myChoice"></select>
|Choice (Multiple)|Column value saved in an observable array.|Possible values for column are provided with an observable array.  The name of the computed function is the camelCase of the Display Name appended with "_Choices".  For example if the display name was "My Choices" then the computed function would be myChoices_Choices with the following values:

[{choice:"Enter Choice #1"},
{choice:"Enter Choice #2"},
{choice:"Enter Choice #3"}]
|
|<select data-bind="options: myChoice_Choices, optionsText: 'choice', optionsValue: 'choice', value: myChoice"></select>|
|Number|Column value saved as an observable. If the column is represented as a percentage a computed function is also available with the appended _Display to the Display Name of the column.
For example if the display name of the Number is "My Num" the computed function would be myNum_Display.|
<p data-bind="text: myNum()"></p>

or

<p data-bind="text: myNum_Display()"></p>|
|Currency	|Column value saved as an observable.|<p data-bind="text: myMoney()"></p>|
|Date and Time|Column value saved as a DateTime object in an observable.| <p data-bind="text: myDateTime()"></p>|
|Lookup|Column value saved as an object within an observable.  The object has an id property and a value property.  For example: {id: 1, value: "Title"}|
<p data-bind="text: myLookup().id"></p>

<p data-bind="text: myLookup().value"></p>

|Lookup (Multiple)|Column values are stored in an observable array. The object has an id property and a value property.  For example: {id: 1, value: "Title"}.|

 	 
<table>
    <thead>
        <tr><th>ID</th>
<th>Value</th></tr>
    </thead>
    <tbody data-bind="foreach: myLookups">
        <tr>
            <td data-bind="text: id"></td>
            <td data-bind="text: value"></td>
        </tr>
    </tbody>
</table>|
|Yes/No	|
|Column value saved as a true or false.|

There is a computed function to help display the data as Yes or No.  For example if the Yes/No column was named "Is True?" then the computed function would be isTrue_Display.|

 	 
<p data-bind="text: myYesNo_Display()"></p>
|
|Person or Group|	 Column value saved as an object within an observable.  The object has an id property and a value property.  For example: {id: 1, value: "John Doe"}|	 	 
<p data-bind="text: myUserGroup().id"></p>

<p data-bind="text: myUserGroup().value"></p>
|
|Person or Group (Multiple)	|Column values are stored in an observable array. The object has an id property and a value property.  For example: {id: 1, value: "Title"}.|	 	 
<table>
    <thead>
        <tr><th>ID</th>
<th>Value</th></tr>
    </thead>
    <tbody data-bind="foreach: myUserGroups">
        <tr>
            <td data-bind="text: id"></td>
            <td data-bind="text: value"></td>
        </tr>
    </tbody>
</table>
|