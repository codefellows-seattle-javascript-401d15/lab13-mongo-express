# Patrick Sheridan
## Lab-11-express-api

### Overview
Creates a single resource database using mongodb. Allows for posting, updating, reading and deleting of new car objects from the server.

### How to use
Make sure you have mongodb installed. While in your cloned directory enter  
```
mongod --dbpath ./db
```
In a second terminal window, fire up nodemon using
```
nodemon server.js
```
in a third terminal window, to post a new car, enter 
```
http POST :3000/api/car name=WRX model=Subaru horsepower=265
```
but replace WRX, Subaru, and 265 to whatever you want your new cars attributes to be

To get a car by id, enter
```
http GET :3000/api/car/0023320c-678c-47f7-9b75-a1a43025e42b
```
where 0023320c-678c-47f7-9b75-a1a43025e42b is the cars Id

To get all cars stored in the cars database, simply enter 
```
http GET :3000/api/car
```

To delete by car Id, enter
```
http DELETE :3000/api/car/0023320c-678c-47f7-9b75-a1a43025e42b
```
To update a car by Id, enter
```
http PUT :3000/api/car/0023320c-678c-47f7-9b75-a1a43025e42b name=Civic model=Type-R horsepower=240
```
