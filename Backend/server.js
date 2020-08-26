const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const PORT = 4000; 

let Project = require('./model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/project', { useNewUrlParser: true })
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
})

router.route('/').get((req, res) => {
  Project.find((err, proj) => {
    if(err) {
      console.log(err);
    } else {
      res.json(proj);
    }
  })
})

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Project.findById(id, (err, proj) => {
    res.json(proj);
  })
})

router.route('/:id').delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json('delete succ.')
      })
      .catch(err => {res.status(400).send(err)})
})

router.route('/add').post((req, res) => {
  let proj = new Project(req.body);
  proj.save()
      .then(proj => {
        res.status(200).json({'proj': 'project added successfully'})
      })
      .catch(err => {
        res.status(400).send('adding new todo failed')
      })
})

router.route('/update/:id').post((req, res) => {
  Project.findById(req.params.id, (err, proj) => {
    if(!proj) {
      res.status(404).send('data is not found');
    } else {
      proj.name = req.body.name;
      proj.selling = req.body.selling;
      proj.customer = req.body.customer;
      proj.totalCost = req.body.totalCost;
      proj.checkbox = req.body.checkbox;
      proj.rowsTM = req.body.rowsTM;
      proj.rowsOC = req.body.rowsOC;

      proj.save().then(proj => {
        res.json('Todo Update');
      })
      .catch(err => {
        res.status(400).send('Update not possible');
      })
    }
  })
})

app.use('/project', router);

app.listen(PORT, () => {
  console.log('Server is running on PORT:4000')
})