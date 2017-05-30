![cf](https://i.imgur.com/7v5ASc8.png) lab 13 single resource express/mongo api
======

# Overview
  * Created a HTTP Server using `express`
  * Created a Model that represents Cat data with three properties (name, mood, id)
  * Data is stored in MongoDB
  * Used the `body-parser` express middleware on `POST` and `PUT` routes
  * Used the express `Router` to creates routes for RESTFUL CRUD operations on cat model

# Installation
  * Clone this repo and navigate to the lab-shelly directory
  * Download the dependencies
  * Run nodemon server in terminal
  * Use server endpoints for requests

## Server Endpoints
### `/api/cat`
  * `POST` request
    * Create a resource by specifying the name and mood.
    ```
    HTTP POST :3000/api/cat name="milo" mood="hungry"
    ```
### `/api/cat/:id`
  * `GET` request
    * Get a resource by passing an id in the query string
    ```
    HTTP GET :3000/api/cat/12345
    ```
  * `DELETE` request
    * Delete a resource by passing in an id in the query string. It should return 204 status with no content in the body
    ```
    HTTP DELETE :3000/api/cat/12345
    ```
  * `PUT` request
    * Update a resource by passing in a valid id in the query string and specifying the new name and mood.
    ```
    HTTP PUT :3000/api/cat/12345 name="eva" mood="grumpy"
    ```
### `/api/cat`
* `GET` request
  * Returns all resources
  ```
  HTTP GET :3000/api/cat
  ```
