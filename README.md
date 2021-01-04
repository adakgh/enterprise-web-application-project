<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#configuration">Configuration</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#system-documentation">System Documentation</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#maintainers-contact">Maintainers & Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
![alt text](https://cdn.shopify.com/s/files/1/0021/1966/3675/files/Van-streek-logo-liggend-zwart_482x.png "Logo Title Text 1")  
    
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

    ![alt text](https://i.imgur.com/HVUGGEd.png "Logo Title Text 1")
  

### Configuration

Both for the frontend and the backend application we can configure the port they run on.  
To change the port of the front-end you should not type the _ng serve_ command but:  
   ```JS
   ng serve --port [desiredPort]
   ```
To change the port of the backend application you should add a property to the file **_application.properties_**  (under backend/src/main/resources/):

![alt text](https://i.imgur.com/YO2C7F3.png "Backend port option")
<!-- USAGE EXAMPLES -->
## Usage

*Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.
_For more examples, please refer to the [Documentation](https://example.com)_*
TODO

### Accessing Application
Component         | URL                                      | Credentials
---               | ---                                      | ---
Frontend          |  http://localhost:4040 <br/> https://vanstreek2-fe-app-staging.herokuapp.com/ | email: myUsername@gmail.com <br/> password: myPassword1! 
**Live Demo:** |  https://vanstreek2-fe-app-staging.herokuapp.com/   | 


<!-- USAGE EXAMPLES -->
## Classes
**In your README.md file, you should specify individual classes built per team member.**
TODO

### Omer:    

  ```
  Angular (frontend):  

  supplier.info.service.ts  - unsaved-changes-guard.service.ts  - supplier.ts - supplier-info.component.ts -  
  supplier-info-edit.component.ts - supplier.list.component.ts  - supplier-item.component.ts - default_image.ts 

  Spring (backend):  

  SupplierController.java  - SupplierService.java  - SupplierImage.java - SupplierEntity.java - ImageEntity.java 
  ImageRepository.java  - SupplierRepository.java 

  ``` 

  ### Ghizlane:    

  ```
  Angular (frontend):  

  contact.component.ts - login.component.ts - requestproduct.component.ts - verify-user.component.ts - contact.service.ts - 
  inquiry.service.ts - inquiry.service.ts - register.service.ts - verify-user.service.ts

  Spring (backend):  
  
  ContactController.java - InquiryController.java - UserController.java - ContactMail.java - ContactService.java - 
  UserService.java

  ``` 

  ### Tycho:    

  ```
  Angular (frontend):  

  add-product.component.ts - myproducts.component.ts - myproducts-edit.component.ts -  product.service.ts - add-products.service.ts -  
  myprodcuts.service.ts 

  Spring (backend):  
  
  ProductController.java - ProductService.java

  ``` 
  ### Roberto:    

  ```
  Angular (frontend):  

  <class>.ts  - <class>.ts  - 

  Spring (backend):  
  
  <class>.java  - <class>.java  - 

  ``` 
  ### Mikal:    

  ```
  Angular (frontend):  

  product.component.ts - product-detail.component.ts - my-products.service.ts - product.service.ts - location.service.ts

  Spring (backend):  
  
  BaseSpecification.java - ProdutSpecification.java - ProductController.java - ProductService.java

  ```

<!-- CONTRIBUTING -->
## System Documentation

If you want a in dept look at this system/project take a look at the **System Documentation**  
https://drive.google.com/file/d/1Lm-riTbjEXors63FON0X-mdYC76r3lgS/view?usp=sharing

<!-- LICENSE -->
## License
Distributed under the MIT License.

<!-- CONTACT -->
## Maintainers & Contact 

Name | Student Number | Email | Phone Number |  
--- | --- | --- | --- | 
Omer Citik | 500833046 | omer.citik@hva.nl | 0685298845 |
Mikal van Eijk | 500828984 | mikal.van.eijk@hva.nl | 0631251505 |
Ghizlane el Adak | 500828922 | ghizlane.el.adak@hva.nl | 0684919415 |
Tycho Stam | 500826360 | tycho.stam@hva.nl | 0615687192 |
Roberto Indemans | 500676036 | roberto.indemans@hva.nl | 0642232349 |

Project Link: https://gitlab.fdmci.hva.nl/se-ewa-2020-2021/vanstreek-2
