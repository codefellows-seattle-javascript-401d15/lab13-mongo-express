### Weapon Maker & Blueprint maker API
This API generates a weapon & blueprint for you. Blueprint is the parent resource and weapon is the child resource. You MUST make a blueprint first, before you make a weapon.

### Directions for use
1. In terminal, run
```
nodemon server.js
```

2. After nodemon is running, use the following commands for POST, GET, DELETE and PUT

3. http POST localhost:3000/api/blueprint name="<name>" type="<type>"   
```
http POST localhost:3000/api/blueprint name="new name" type="new_type"
```

4. http GET localhost:3000/api/blueprint?id=(id)
```
http GET localhost:3000/api/blueprint?id=121231313123123
```

5. http DELETE localhost:3000/api/blueprint?id=(id)
```
http DELETE localhost:3000/api/blueprint?id=121231313123123  
```

6. http PUT localhost:3000/api/blueprint?id=(id) name="<name>" type="<type>"

```
http PUT localhost:3000/api/blueprint?id=121231313123123 name="new name" type="new_type"
```

7. After having Blueprints, you can make weapon children off of one

8. http POST localhost:3000/api/blueprint/(blueprint ID here)/weapon
```
http POST localhost:3000/api/blueprint/123123123123/weapon name="new weapon name"
```
9. Follow the same template for GET, DELETE and PUT

10. To run tests, run npm run test in terminal
```
npm run test

```
