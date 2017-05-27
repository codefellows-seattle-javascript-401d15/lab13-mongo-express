#About
Small Node.js App for Codefellows Coding Bootcamp.

Keep *Even Better* track of your DeathNotes and their Death Gods using MONGOdb!

##Installation:
1. clone this repository and ``cd`` into it
2. run ``npm i``

## To Use:
1. Start the server using ``npm start`` in one terminal
2. In another, you'll need to spin up the mongo database server
  ⋅⋅⋅ * Ensure there is a directory named 'db' in your cloned repository
  ⋅⋅⋅ * In your terminal, enter ``mongod --dbpath ./db``
  ⋅⋅⋅ ⋅⋅⋅ Should you come into the 'address in use' error, ``sudo killall mongod`` should do it.
3. 2. In yet another terminal, use [HTTPie][https://httpie.org/] to perform the following CRUD operations:

* POST: ``http POST localhost:3000/api/note  owner='Light Yagami' shinigami='Ryuuk' deathCount='Over 90000'``
  ⋅⋅⋅ When making a POST request, you should get the created DeathNote object as a response where you will find an id has been created for it
  ⋅⋅⋅ Note that the properties "owner", "shinigami" and "deathCount" are required to successfully Post a Note.
* GET: ``http GET localhost:3000/api/note/id ``
  ⋅⋅⋅ Again you will get the entire body of the object you've requested
  ⋅⋅⋅ making the same GET request without an ID will return an array of all currently existing DeathNotes
* PUT: ``http PUT localhost:3000/api/note/id owner='Misa'``
* DELETE: ``http DELETE localhost:3000/api/note/id``
