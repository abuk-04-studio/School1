const express = require("express");
const course = require('../controllers/courses.controller')


const router = express.Router();

router.get('/all', function(req, res){
    course.list(function(err, courses){
        if(err) {
            res.status(404);
            res.json({
                error: "kurs nie znaleziony"
            });
        } else {
            res.json(courses);
        }
    });
});

router.post('/add', function(req, res){
    console.log(req.body);
    course.add(req.body, function(err, course){
        if(err) {
            res.status(404);
            res.json({
                error: "kurs nie stworzony"
            });
        } else {
            res.json({result:true});
        }
    })
});

router.delete('/:id', function(req, res){
    
    course.delete(req.params.id, function(err, data){
        if(err) {
            res.status(404);
            res.json({
                error: "kurs nie znaleziony"
            });
        } else {
            res.json(data);
        }
    });
    
});



module.exports = router;