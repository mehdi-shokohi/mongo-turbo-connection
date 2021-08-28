### Mongo Turbo Connection Pool
###### Round Robin Connection Pool for Load Balancing Mongo Connection 

***How Does It Work***

Connection Pool In This Package Operates In Two Level .
L1 Pool is Handled By Native Driver MongoDb  ‌, Besides That L2 Pool is Array Of Connections ,which  are  available on round robin basis. 


##### How to use
***-app.js***
```js
let client = require("mongo-turbo-connection")
let mongo =new client("MongoURI","DBNAME","IP/Mongo_Server","User","Password",Mongo_PORT,L1POOL,L2POOL);

(async ()=>{
  try {
    for(let i= 0 ;i<10;i++) {
      let db = await mongo.getConnection();
      const result = await db.collection("user").findOne({_id: mongo.objectID('5ef9a136fb25d11a39ba3f93')});
      console.log(result)
    }
  }catch (e) {
    console.log(e)
  }
})()

```
***Run Code***
```bash script
# npm i mongo-turbo-connection
# node app.js
```

***NPM Address***

https://www.npmjs.com/package/mongo-turbo-connection