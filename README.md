<a name="readme-top"></a>

<br />
<div align="center">

  <h3 align="center">Social Website</h3>

  <p align="center">
    A light sample of a social website backend!
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li>
          <a href="#built-with">Built With</a>
          <ul>
            <li><a href="#technologies">Technologies</a></li>
            <li><a href="#libraries">Libraries</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#using-docker">1.Using Docker (easy way :D)</a></li>
        <li><a href="#normal-way">2.Normal Way (hard way :S)</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This demo showcases the backend of a social website like facebook, offering the following features:

* Users can register in the system using their own personal information.
* Users can login in to the system.
* Users can search other users by advanced search which will accept combinations of first name, last name and age.
* Users can add other users as friends, view requests list, accept or decline them.

Technical aspect of the project : 

* The Server follows the monolithic architecture including two main entities (user & friendship)
* Each service contains three main layer, controller, service, repository
  * Controller Layer: This layer is responsible for handling client requests and providing responses.
  * Service Layer: The service layer contains the business logic of the application. It encapsulates the application's core functionality and is responsible for implementing use cases or application-specific operations. 
  * Repository Layer: This layer is responsible for data access and persistence. It abstracts away the details of database interaction and provides a higher-level interface for accessing and manipulating data.
* PostgreSQL is chosen as the database to handle structured data such as user profiles, friend requests, and user authentication details.
* User authentication is handled by following token based authentication protocol (using passport-jwt)
* User inputs are validated by class-validator.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

#### Main Technologies
* Node.Js
* Postgres
* Docker

#### Libraries
* Nest.Js
* Prisma
* Class Validator
* Passport-jwt

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

1. Clone the repo
   ```sh
   git clone https://github.com/hojat-a/file-sharing-demo.git
   ```
2. Create a `.env` file, copy `.env.example` contents and set your configs.
  
Then, there are two method you can start the project:

### Using Docker

#### Prerequisites

* Docker Engine
* Docker-compose (optional)

#### Running the app

  In your project repository
   1. build an image
      ```sh
      docker build
      ```
  2. run the image
     ```sh
     docker run --detach 'image_name'
     ```
Or 
  only run docker-compose command
  ```sh
  docker-compose up
  ```

### Normal Way

#### Prerequisites

* npm
* postgres

#### Installation

1. Install NPM packages
   ```sh
   npm install
   ```
2. Read Prisma schema and updates the generated Prisma Client library inside `node_modules/@prisma/client` 
    ```sh
    npx prisma generate
    ```
3. Running the app
    ```sh
    npm run start
    ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

