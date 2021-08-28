var MongoClient = require('mongodb').MongoClient
let ObjectID = require('mongodb').ObjectID
class MongoConnection
{
  static mongo_client = []
  static ind = 0
  constructor (uri ,db, host, user, password, port, L1_Pool = 10 ,L2_Pool=10) {
    this.db=db
    this.l1pool = L1_Pool
    this.l2pool = L2_Pool
    this.url =uri!=null?uri : `mongodb://${user}:${password}@${host}:${port}`;

  }

  index(){
  if(MongoConnection.ind===this.l2pool) MongoConnection.ind=0
  return MongoConnection.ind++

}
  newConnection () {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, {
        useUnifiedTopology: true, poolSize: this.l1pool
      }, function (err, client) {
        if (err) {
          reject(err)
        } else {
          resolve(client)
        }
      })
    })
  }

 async  getConnection(){
    try {
      // console.log("Length Of Ext. Connection Pool : "+MongoConnection.mongo_client.length)

      if (MongoConnection.mongo_client.length < this.l2pool) {
        let cli = await this.newConnection()
        MongoConnection.mongo_client.push(cli)

      }
      let ind = this.index()
      // console.log("index oF Mongo Connection Gate: "+ind)
      let client = MongoConnection.mongo_client[ind];
      if (client.isConnected())
      return client.db(this.db)
      else {
        delete MongoConnection.mongo_client[ind]
        return this.getConnection()
      }
    }catch (e) {
      console.log(e)
    }
  }

  objectID(id){
    return new ObjectID(id)
  }


}


module.exports = MongoConnection