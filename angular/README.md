## Angular

  - [Prerequisites:](#prerequisites)
  - [Loose Agenda:](#loose-agenda)
  - [Step by Step](#step-by-step)
    - [Create a New Angular Application](#create-a-new-angular-application)
    - [Directory Structure](#directory-structure)
    - [Find the Entry Point](#find-the-entry-point)
    - [Implement a Common Page Layout](#implement-a-common-page-layout)
    - [Add Bootstrap](#add-bootstrap)
  - [Additional Resources](#additional-resources)

### Prerequisites:

- [Node.js](https://nodejs.org/en/download/)
  - LTS is fine
  - Comes with npm

- [Visual Studio Code](https://code.visualstudio.com/)

### Loose Agenda:

- Create a new Angular application
- Manage dependencies of an Angular application
- Learn how to develop the application

### Step by Step


#### Create a New Angular Application

In a terminal instance, run ```npm install -g @angular/cli```

Create a new directory for this exercise and navigate to it in your terminal instance.

In the terminal instance run ```ng new non-zero-app --directory .```

If prompted with ```Do you want to enforce stricter type checking and stricter bundle budgets in the workspace?``` enter N

If prompted with ```Would you like to add Angular routing?``` enter Y

If prompted with ```Which stylesheet format would you like to use?``` select CSS

Once this process finishes run ```npm install``` to restore dependencies then ```ng build``` to compile/transpile your code. 

Run ```ng serve``` then open a browser to http://localhost:4200/

#### Directory Structure

Note the directory structure of your new application.

- The root directory contains a variety of configuration files
- src contains the source code
- node_modules contains external dependencies
- e2e contains end-to-end Protractor tests
- dist contains the compiled application code 

#### Find the Entry Point

Open app.component.ts
- styleUrls declares a stylesheet to apply to this component
- templateUrl declares a html layout to apply to this component 
- selector declares a keyword for rendering this component in another component

Open index.html

Adjust index.html to
```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NonZeroApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

Adjust app.component.html to
```
<div>Example!</div>
<router-outlet></router-outlet>
```

Run ```ng serve``` then open a browser to http://localhost:4200/ to view the current state of the web app. In the terminal instance press Ctrl+C to stop serving the application.


#### Implement a Common Page Layout

Generate a new Header component by running
```
ng generate component header
```

Note that app.module.ts is included in the list of modified files. Navigate to the code for header.component in ./src/app/header.

Adjust header.component.html to
```
<nav class="navbar navbar-dark bg-dark" role="navigation">
    <a class="navbar-brand">{{title}}</a>
</nav>
```

Open header.component.ts and note the ```selector``` for the component is ```app-header```. 

Edit the typescript by adding a title variable at the top of the class as such:
```
export class HeaderComponent implements OnInit {
  title: string = "Non-Zero Days";
```

Adjust app.component.html to
```
<app-header></app-header>
<router-outlet></router-outlet>
```

Once again run ```ng serve``` then open a browser to http://localhost:4200/ to view the contents. In the terminal instance press Ctrl+C to stop serving the application.

Note the shiny new header.

#### Add Bootstrap

Run ```npm install bootstrap``` to add the bootstrap dependency. Run ```npm install``` to fetch and install all node dependencies.

Open angular.json in the root directory and scroll to the first styles node. This should be around lines 26-30. Adjust the styles node to:

```
            "styles": [
              "../node_modules/bootstrap/dist/css/bootstrap.css",
              "src/styles.css"
            ],
```

Once again run ```ng serve``` then open a browser to http://localhost:4200/ to view the contents. In the terminal instance press Ctrl+C to stop serving the application.

### Additional Resources
- [Angular Documentation](https://angular.io/docs)

Congratulations on a non-zero day!
