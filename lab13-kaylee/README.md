## Lab 13: MongoDB with Express

## About This Project

* Build an HTTP server using the Express Node module.
* Create an Object (Dog) constructor used to produce instances of a resource.
* Create a controller to manage GET, POST, PUT and DELETE requests to the server.
* Perform GET, POST, PUT, and DELETE operations on Dog records in Mongo DB.

## Project Dependencies

* npm bluebird
* npm body-parser
* npm chai
* npm chai-http
* npm eslint
* npm express
* npm mongoose
* npm morgan

## Developer Dependencies

* npm mocha

## Making Requests

* Example GET request
  * In terminal (assuming httPie installed): http get :3000/api/dog/someID
  * Expected output:
    {
      "__v": 0,
      "_id": "someID",
      "breed": "requestedBreed",
      "name": "requestedName"
    }
  * Expected status code: 200

* Example POST request
  * In terminal (assuming httPie installed): http post :3000/api/dog name="Joe Joe" breed="bichon frise"
  * Expected output:
    {
      "__v": 0,
      "_id": "someID",
      "breed": "bichon frise",
      "name": "Joe Joe"
    }
  * Expected status code: 200
  * Should populate Mongo DB with new Dog record

* Example PUT request
  * In terminal (assuming httPie installed): http put :3000/api/dog/someID name="newName" breed="newBreed"
  * Expected output:
    {
      "__v": 0,
      "_id": "someID",
      "breed": "newBreed",
      "name": "newName"
    }
  * Expected status code: 200
  * Should update existing Dog record (as specified by ID) in Mongo DB with new name and breed properties

* Example DELETE request
  * In terminal (assuming httPie installed): http delete :3000/api/dog/someID
  * Expected output:
  {
    "__v": 0,
    "_id": "someID",
    "breed": "deletedBreed",
    "name": "deletedName"
  }

  * Expected status code: 200
  * Should delete Dog record (as specified by ID) from Mongo DB

## Biggest Roadblocks

* Integration tests-- figuring out how to refactor tests from previous lab to accommodate for MongoDB's "_id" property (vs. uuid's plain "id" property).
