![cf](https://i.imgur.com/7v5ASc8.png) mongo-express-pokémon-API
======

# What is This Thing Which Does the Thing?
This is a single resource API which primarily utilizes express and mongoDB (driven by mongoose). The functionality is limited to basic RESTful CRUD operations and persists data through mongoDB. The model used is Pokémon themed to keep this lab fun for myself, but feel free to change the model whatever is relevant to you.

# How to Get Started
* fork this repository and clone a local copy of this repository to your machine:
 * `git clone < paste repo URL here >`
* `cd` into `lab-cameron` and type `npm init` to download the necessary node modules

## Server Endpoints
### `/api/pokemon`
* `POST` request
 * pass data as stringified json in the body of a post request to create a resource
  * type `http POST :3000/api/pokemon name=<name> type=<type>` into your terminal
* `GET` request
 * a get request with no id specified will return all pokemon in the `pokemons` schema   

### `/api/model-name/:id`
* `GET` request
 * pass the id of a resource though the url endpoint to `req.params` to fetch a model   
* `PUT` request
 * pass data as stringified json in the body of a put request to update a resource
* `DELETE` request
 * pass the id of a resource though the url endpoint to `req.params` to delete a model   

## Tests
* your tests should start your server when they begin and stop your server when they finish
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure your `/api/model-name` endpoint responds as described for each condition below:
 * `GET` - test 200, response body like `{<data>}` for a request made with a valid id
 * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
 * `PUT` - test 200, response body like  `{<data>}` for a post request with a valid body
 * `PUT` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
 * `PUT` - test 404, responds with 'not found' for valid request made with an id that was not found
 * `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
 * `POST` - test 200, response body like  `{<data>}` for a post request with a valid body
 * `DELETE` - test 204, with no body, for a request with a valid id
 * `DELETE` - test 404, responds with 'not found' for valid request made with an id that was not found
