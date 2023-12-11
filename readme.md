# Certificate Management System

## Features

- can be generate software certification file by adding your details
- can be delete certification records and files from server confirming your downloaded software certification id. You can find the generated random 12 digit number as license identification in the downloaded file
- Can be view all generated certifications from home page

## Tech

This software uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- React.js - Used for frontend application.

## Installation


Install the dependencies and devDependencies and start the server for backend application. Following command will start server with port 8080.

```sh
cd qt-certificate-system/backend
npm i
npm run dev
```

For serve frontend website follow below commands

```sh
cd qt-certificate-system/frontend
npm i
npm start
```

You can find swagger generated API documentation from below url 

```sh
http://localhost:8080/api-docs
```

You can run tests from below command inside backend folder

```sh
cd qt-certificate-system/backend
npm run test
```