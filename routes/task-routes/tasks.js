const express = require('express');
const router  = express.Router();
const Task = require('../../models/task.model.js');

// CREATE task
router.post('/create', (req, res) => {
  console.log({body: req.body});

  Task.create(req.body)
    .then(createdTask => {
      console.log({createdTask});
      res.status(200).json(createdTask);
    })
    .catch(err => {
      res.status(400).json({ message: 'Error while creating task' });
    });
});

// READ tasks
router.get('/all-tasks', (req, res, next) => {

  Task.find()
    .then(tasksFromDB => {
      console.log({tasksFromDB});
      res.status(200).json(tasksFromDB);
    })
    .catch(err => {
      res.status(500).json({ message: "Error finding all tasks"});
    });

});

// UPDATE task
router.put('/update', (req, res) => {

  console.log({body: req.body})

  Task.findByIdAndUpdate(req.body.taskId, req.body, { new: true })
    .then(updatedTask => {
      console.log({updatedTask})
      res.status(200).json(updatedTask);
    })
    .catch(err => {
      res.status(400).json({ message: "Error while updating task" });
    });

});

// DELETE task
router.delete('/delete', (req, res) => {

  Task.findByIdAndDelete(req.body.taskId)
    .then(() => {
      res.status(200).json({ message: "Delete successfully" });
    })
    .catch(err => {
      res.status(400).json({ message: "Error while trying to delete task" });
    });

})


module.exports = router;