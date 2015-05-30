#Knockout View Model Generator For SharePoint

Building Knockout View Models for SharePoint can be a time consuming process.  Many View Models are based on SharePoint lists and often developers have to create observables based off of the columns in those lists. This tool saves on development time by building boilerplate Knockout View Model code based on the SharePoint list you select.  It also standardizes the code generated to handle different types of SharePoint columns (choice, single line of text, lookup, etc.).

This open source tool is made possible with the help of the following open source libraries:

* [SPServices] (https://github.com/sympmarc/SPServices)
* [Knockout.js](http://knockoutjs.com/)
* [Bootstrap](http://getbootstrap.com)
* [Initializr](http://www.initializr.com)

This application was initially developed by SharePoint developers at Definitive Logic.  For more information about the company please visit DefinitiveLogic.com or contact us directly.

##General Information

###Naming Conventions for Generated Code

The display name for each column is represented by either an observable or observable array and the name of this observable will be a camelCase version of the display name.

Additional Properties for Observables

Each observable or observable array created for a column is given the following additional properties:

1. .sPType: This is Microsoft's identifier for the type of column.  This can be either "Text", "Note", "Choice", "MultiChoice", "DateTime", "Boolean", "Number", "Currency", "Lookup", "LookupMulti", "User", or"UserMulti".
2. .staticName:  This is the internal or static name of the column.  This may be different from the display name.  The static name can assist with querying SharePoint or consuming data returned from SharePoint.
SharePoint Types Supported

|Type  | 				Observable Information Notes | Example View Syntax|
|------------- | ------------- | -------------|
|Single line of text	|Column value saved as an observable.	|&lt;p data-bind="text: myText()"&gt;&lt;/p&gt;|
|Multiple lines of text	|Column value saved as an observable. No encoding of the data occurs.|	&lt;textarea data-bind="text: myMultiText()"&gt;&lt;/textarea&gt;|
|Choice	|Column value saved as an observable. Possible values for column are provided with an observable array.  The name of the computed function is the camelCase of the Display Name appended with "_Choices".  For example if the display name was "My Choices" then the computed function would be myChoices_Choices with the following values:[{choice:"Enter Choice #1"},{choice:"Enter Choice #2"},{choice:"Enter Choice #3"}]|&lt;select data-bind="options: myChoice_Choices, optionsText: 'choice', optionsValue: 'choice', value: myChoice"&gt;&lt;/select&gt;|
|Choice (Multiple)|Column value saved in an observable array. Possible values for column are provided with an observable array.  The name of the computed function is the camelCase of the Display Name appended with "_Choices".  For example if the display name was "My Choices" then the computed function would be myChoices_Choices with the following values:[{choice:"Enter Choice #1"},{choice:"Enter Choice #2"},{choice:"Enter Choice #3"}]|&lt;select data-bind="options: myChoice_Choices, optionsText: 'choice', optionsValue: 'choice', value: myChoice"&gt;&lt;/select&gt;|
|Number|Column value saved as an observable. If the column is represented as a percentage a computed function is also available with the appended _Display to the Display Name of the column. For example if the display name of the Number is "My Num" the computed function would be myNum_Display.|&lt;p data-bind="text: myNum()"&gt;&lt;/p&gt; or &lt;p data-bind="text: myNum_Display()"&gt;&lt;/p&gt;|
|Currency	|Column value saved as an observable.|&lt;p data-bind="text: myMoney()"&gt;&lt;/p&gt;|
|Date and Time|Column value saved as a DateTime object in an observable.| &lt;p data-bind="text: myDateTime()"&gt;&lt;/p&gt;|
|Lookup|Column value saved as an object within an observable.  The object has an id property and a value property.  For example: {id: 1, value: "Title"}| &lt;p data-bind="text: myLookup().id"&gt;&lt;/p&gt; &lt;p data-bind="text: myLookup().value"&gt;&lt;/p&gt;|
|Lookup (Multiple)|Column values are stored in an observable array. The object has an id property and a value property.  For example: {id: 1, value: "Title"}.| &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;th&gt;ID&lt;/th&gt;&lt;th&gt;Value&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tbody data-bind="foreach: myLookups"&gt;&lt;tr&gt;&lt;td data-bind="text: id"&gt;&lt;/td&gt;&lt;td data-bind="text: value"&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;|
|Yes/No	|Column value saved as a true or false.|There is a computed function to help display the data as Yes or No.  For example if the Yes/No column was named "Is True?" then the computed function would be isTrue_Display.|&lt;p data-bind="text: myYesNo_Display()"&gt;&lt;/p&gt;|
|Person or Group|Column value saved as an object within an observable.  The object has an id property and a value property.  For example: {id: 1, value: "John Doe"}|&lt;p data-bind="text: myUserGroup().id"&gt;&lt;/p&gt; &lt;p data-bind="text: myUserGroup().value"&gt;&lt;/p&gt;|
|Person or Group (Multiple)	|Column values are stored in an observable array. The object has an id property and a value property.  For example: {id: 1, value: "Title"}.|&lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;th&gt;ID&lt;/th&gt;&lt;th&gt;Value&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tbody data-bind="foreach: myUserGroups"&gt;&lt;tr&gt;&lt;td data-bind="text: id"&gt;&lt;/td&gt;&lt;td data-bind="text: value"&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;|