This project brings local suppliers effectively in contact with local customers. Suppliers can place products on the system. Where customers can buy those products. This system also gives the opportunity to have a conversation with each other. The system is build with _angular_ in the frontend and _spring_ in the backend part.

### Technology Stack

 Technologies | 
--- |
Spring Boot |
Spring MVC |
Spring Data JPA  |
JPA |
Hibernate 5.2 |
Spring Security |
Swagger/Swagger2Markup/Spring Rest Docs  |
Lombok  |
AngularJS |
Bootstrap |

<!-- GETTING STARTED -->
## Getting Started

There are some requirments that needs to be done before the installation

### Prerequisites

* Java 8
* Maven 3.3.9+ or Gradle 3.3+

* NodeJS

  NodeJS is required to build the frontend static resources.  
  Download [NodeJS](http://nodejs.org) and install it into your local system. 
 
  After it is installed, open terminal, and using `node -v` command to confirm.
 
  ```
  node -v 
  >v4.2.2
  ```

* Angular
  ```sh
  npm install -g @angular/cli
  ```

### Installation

1. Clone the repo
   ```sh
   git clone git@gitlab.fdmci.hva.nl:se-ewa-2020-2021/vanstreek-2.git
   ```
2. Install NPM packages (in the frontend folder)
   ```sh
   npm install
   ```
3. Run Angular server 
   ```sh
   ng serve
   ```
   Now the frontend application should run on localhost:4200

3. Run Spring backend server 
   ```sh
   -Browse to the DemoAplication java file in the folder backend/src/main/java/com.example.demo/  
   -Run DemoAplication
   ```
   The backend server should start together with the database when running the DemoApplication file on localhost:8080   
  

### Configuration

Both for the frontend and the backend application we can configure the port they run on.  
To change the port of the front-end you should not type the _ng serve_ command but:  
   ```JS
   ng serve --port [desiredPort]
   ```
To change the port of the backend application you should add a property to the file **_application.properties_**  (under backend/src/main/resources/):


<!-- LICENSE -->
## License
Distributed under the MIT License.
