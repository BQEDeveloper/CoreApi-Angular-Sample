# Angular Sample App

 A sample app demonstrating OAuth 2.0 and other features using Core API. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

## Getting Started
  1. Clone the Core Angular Sample project on your local environment.
  2. Go to Config.json and insert the  client_id and redirect_uri of your app. Please note the redirect_uri should point to the index.html        file of the project. As an example, if you are running Angular app on your localhost with port 4200, the redirect_uri will look like       http://localhost:4200. Note: The redirect_uri of your app should exactly match with the redirect_uri in your config file.
 ### Example:

  | Registered Redirect URI| Redirect URI Parameter Passed To Authorize| Valid |
  |------------------------|--------------------------------------------|--    |
  |http://yourcallback.com/|http://yourcallback.com                     |No    |
  |http://yourcallback.com/|http://yourcallback.com/                    |Yes   |
  
  
  3. Run npm install and then npm start to run the app

### What is supported?
  1. Authorization 
  2. Authentication
  3. Activity - Retrieve, Create, Update and Delete
  
### Querying
We allow the following simple filters on different endpoints:

  * fields - To specify only those model properties which you want in the response body
  * where -  To specify only those records that match the query expression
  * orderBy - To specify by which field you want to order the item list
  * page -  To specify the page number and number of records on each page

Core API allows operators to manipulate individual data items and return a result set. To know more go to [Core Operators](https://api-explorer.bqecore.com/docs/filtering#filter-operators)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Framework and Version
####	Angular
   * Angular CLI: 7.3.7
   * Node: 10.15.3
   * Angular: 7.2.11
   
   |Package| Version|
  |------------------------|--------------------------------------------|
  |@angular-devkit/architect        |0.13.7                     |
  |@angular-devkit/build-angular    |0.13.7                     |
  |@angular-devkit/build-optimizer  |0.13.7                     |
  |@angular-devkit/build-webpack    |0.13.7                     |
  |@angular-devkit/core             |7.3.7                      |
  |@angular-devkit/schematics       |7.3.7                      |
  |@angular/cli                     |7.3.7                      |
  |@ngtools/webpack                 |7.3.7                      |
  |@schematics/angular              |7.3.7                      |
  |@schematics/update               |0.13.7                     |
  |rxjs                             |6.3.3                      |
  |typescript                       |3.2.4                      |
  |webpack                          |4.29.0                     |
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
