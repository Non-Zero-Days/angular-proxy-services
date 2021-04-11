## Angular Proxy Services

### Prerequisites:

- [Node.js](https://nodejs.org/en/download/)

- [Visual Studio Code](https://code.visualstudio.com/)

- [.NET 5.0](https://dotnet.microsoft.com/download/dotnet/5.0)

### Loose Agenda:

Make an HTTP call to our .NET application from our Angular application

### Step by Step

#### Clone .NET application

We'll be leveraging [code from the .NET WebAPI video](https://github.com/Non-Zero-Days/dotnet-csharp-webapi) for today's exercise.

Open a terminal session to a playground directory and run the following commands
```
git clone https://github.com/Non-Zero-Days/dotnet-csharp-webapi.git
cd dotnet-csharp-webapi
code .
```

This will clone the WebAPI files locally, open a developer environment to the code, and start the application. 

#### Add CORS policy to .NET application

To simplify the interactions with the .NET application we will open the CORS policy to any origin and we will remove the defaulted behavior of HTTPS redirection. More details on CORS is available in [Additional Resources](#additional-resources). Note that this is not a claim of best practices, but more to separate concerns for our learning objectives.

In Visual Studio Code, navigate to ```Startup.cs```.

In the using declarations at the top of the file add ```using Microsoft.Net.Http.Headers;```

Remove line 50 ```app.UseHttpsRedirection();```

At the top of the ConfigureServices method add
```
services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                    });
            });
```

At the top of the Configure method add
```
app.UseCors();
```

In the terminal instance for the dotnet-csharp-webapi directory, run
```
dotnet run
```

#### Clone and Start Angular application

We'll also be leveraging [code from the Angular video](https://github.com/Non-Zero-Days/angular) for today's exercise.

Open another terminal session to the above playground directory and run the following commands
```
git clone https://github.com/Non-Zero-Days/angular.git
cd angular
npm install
code .
ng serve
```

This will clone the Angular files locally, start the developer environment, and run the application

#### Create a Proxy Service in Angular

Open a terminal instance to the Angular directory and run the following command to generate a service

```
ng generate service proxy
```

In Visual Studio Code, navigate to ```/src/app/app.module.ts```

Add ProxyService to the providers array. Make certain that the ProxyService class is imported in at the top of the file as ```import { ProxyService } from './proxy.service';```

Add HttpClientModule to the imports array. Make certain that the HttpClientModule is imported at the top of the file ```import { HttpClientModule } from '@angular/common/http';```

Your imports array will now look like 
```
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
```

Your providers array will now look like ```providers: [ProxyService],```

Navigate to ```/src/app/proxy.services.ts```

Adjust the constructor function to inject HTTPClient.

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(private http: HttpClient) { }
}

```

Add a new function to the ProxyService as follows:
```
  getMotD(): Observable<string> {
    let url = 'http://localhost:5000/api/NonZero/motd';
    return this.http.get(url, {responseType: 'text'});
  }
```

Make certain that Observable is imported from rxjs at the top of the file like ```import { Observable } from 'rxjs';```


#### Use the Proxy Service

In app.component.ts add a new motd string variable ```motd: string = '';```.  

Now let's add the proxy service to the constructor
```
constructor(private proxyService: ProxyService){}
```

Make certain that the ProxyService is imported at the top of the file ```import { ProxyService } from './proxy.service';```

Inside of the constructor let's call the function we added to ProxyService and subscribe to the results.

```
  constructor(private proxyService: ProxyService){
    this.proxyService.getMotD().subscribe(data => {
      this.motd = data;
    })
  }
```

This allows the Angular application to asynchronously fetch and assign the result of this motd call to our local motd variable.

Now let's show the result of our motd call in our app.component.html

Navigate to ```src/app/app.component.html``` and adjust the code to as follows:
```
<app-header></app-header>
<h1>{{motd}}</h1>
<router-outlet></router-outlet>
```

Review results on [http://localhost:4200](http://localhost:4200)

Note that you can use the PUT endpoint on [the .NET swagger page](http://localhost:5000/swagger) to adjust the MotD response and see the updated message on refresh of the Angular application. 

Congratulations on a non-zero day!

### Additional Resources

- [.NET CORS Documentation](https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-5.0)
- [Angular HttpClient](https://angular.io/api/common/http/HttpClient)