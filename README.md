# Angular Sample App

 A sample app demonstrating OAuth 2.0 and other features using Core API. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

## Getting Started
  1. Clone the Core Angular Sample project on your local environment.
  2. Go to Config.json, insert the  client_id and redirect_uri of you app. Please note the redirect_uri should point to the index.html        file of the project e.g. if you are running Angular app on your localhost with port 4200, the redirectURI might look something like       http://localhost:4200/
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

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
