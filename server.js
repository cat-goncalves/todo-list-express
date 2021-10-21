const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID //gives a function to create object IDs from string
                                            // When searching on the _id field use ObjectIds, not strings

var db, collection;

const url = "mongodb+srv://<username>:<password>@cluster0.me8ts.mongodb.net/todo-list?retryWrites=true&w=majority";
const dbName = "todo-list";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public')) //non async version because it's static

app.get('/', (req, res) => {
  db.collection('tasks').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {tasks: result})
  })
})

app.post('/tasks', (req, res) => {
  db.collection('tasks').insertOne({task: req.body.task, finished: false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/tasks', (req, res) => {
  console.log()
  db.collection('tasks')
  .findOneAndUpdate({tasks: req.body.task, finished: false}, {
    $set: {
      finished: true
    }
  }, {
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/tasks', (req, res) => {
  db.collection('tasks').findOneAndDelete({tasks: req.body.task}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Task deleted!')
  })
})
