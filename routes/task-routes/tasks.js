const express = require('express');
const { create } = require('../../models/User');
const router  = express.Router();
const Task = require('../../models/task.model.js');

/* GET task page */
router.get('/all-tasks', (req, res, next) => {
  Task
    .find()
    .then(tasksFromDB => {
      console.log({tasksFromDB});
      res.status(200).json(tasksFromDB);
    })
    .catch(err => console.log(err))
});

router.post('/create', (req, res) => {
  console.log({body: req.body});

  Task.create(req.body)
    .then(createdTask => {
      console.log({createdTask});
      res.status(200).json(createdTask);
    })
    .catch(err => res.status(400).json({message: 'Error while creating task'}))
});

router.put('/update', (req, res) => {
  Task.findByIdAndUpdate(req.body.taskId, req.body, { new: true })
    .then(updatedTask => {
      res.status(200).json(updatedTask);
    })
    .catch(err => res.status(400).json({message: "Error while updating task"}))
})

module.exports = router;