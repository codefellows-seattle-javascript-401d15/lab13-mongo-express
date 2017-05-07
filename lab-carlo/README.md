# Single Resouce Mongo Data Base

#### This program is a server that posts instances of cars to a Mongo Database by make and model. Here is how to use it:

##### Starting up:

* Run server on one terminal window by typing:

/// nodemon server.js ///

* Run MongoDB on another terminal window by typing:

/// mongod --dbpath ./db ///

* Run Mongo shell on another terminal window by typing:

/// mongo ///

* On a 4th terminal window you will use the following commands to make and manipulate car instances

##### Posting a new car instance:

* To post a new car type: 

/// http POST :{PORT}/api/cars make="{car maker name}" model="{name of car model}" ///

##### Updating a car instance:

* To Update a car type: 

/// http PUT {PORT}/api/cars/{car id} make="{updated make of car}" model="{updated model of car}" ///

##### Retrieving a car instance:

* To get a car type: 

/// http POST :{PORT}/api/cars/{id of car instance} ///

##### Retrieving all car instances:

* To get all cars type: 

/// http POST :{PORT}/api/cars ///

##### Deleting a car instance:

* To delete a car type: 

///http DELETE :{PORT}/api/cars/{id of car instance}///

### Checking data in Mongo

##### You can use the mongo shell to check your database with the following commands:

* To see your databases type:

/// show dbs ///

* To switch to your cars database type:

/// use cars-env ///

* To see all the car instances type: 

/// db.cars.find() ///

* To empty the cars database type:

/// db.cars.drop ///
