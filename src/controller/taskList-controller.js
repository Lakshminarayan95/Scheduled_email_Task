const express = require("express");
const route = express.Router();
const taskService = require('../service/taskList-service');
const notify_cron = require('../cron-job/notify_data_via_email');

// To Create Data
route.post('/create_email_data', (req, res) => {
    taskService.create_email_data(req.body).then((result) => {
        res.status(201).json(result);
    }).catch((error) => {
        res.status(error.status || 500).json(error);
    });
})

route.get('/getList', (req, res) => {
    taskService.getList().then((result) => {
        res.status(201).json(result);
    }).catch((error) => {
        res.status(error.status || 500).json(error);
    });
})

route.put('/Reschedule_deliver/:_id', (req, res) => {
    taskService.Reschedule_deliver(req.params, req.body).then((result) => {
        res.status(201).json(result);
    }).catch((error) => {
        res.status(error.status || 500).json(error)
    })
});

// Get Delivered Email Data based on Date
route.get('/getDeliveredData_byDate/:startDate', (req, res) => {
    taskService.getDeliveredData_byDate(req.params).then((result) => {
        res.status(201).json(result);
    }).catch((error) => {
        res.status(error.status || 500).json(error);
    });
});

// Get All Delivered Email Data 
route.get('/getDeliveredData', (req, res) => {
    taskService.getDeliveredData().then((result) => {
        res.status(201).json(result);
    }).catch((error) => {
        res.status(error.status || 500).json(error);
    });
});

// Get Undelivered Email Data based on Date
route.get('/getUndelivered_email_byDate/:startDate', (req, res) => {
    taskService.getUndelivered_email_byDate(req.params).then((result) => {
        res.status(201).json(result);
    }).catch((error) => {
        res.status(error.status || 500).json(error);
    });
});

// Get all Undelivered Email Data 
route.get('/getUndelivered_email', (req, res) => {
    taskService.getUndelivered_email().then((result) => {
        res.status(201).json(result);
    }).catch((error) => {
        res.status(error.status || 500).json(error);
    });
});


module.exports = route;

