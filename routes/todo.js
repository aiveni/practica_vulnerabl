const router = require('express').Router();

const Todo = require('../models/Todo');
const User = require('../models/user');

router.post('/login', (req, res) => {
   //comprobacion de login
   console.log("holaaa")
   User.findOne({ username: req.body.username })
    .then(user => {
         if(user){
              if(user.password === req.body.password){
                req.session.userid = req.body.username
                res.redirect('/protected');
              }else{
                res.redirect('/');
              }
         }else{
              res.redirect('/');
         }
    })
    .catch(err => console.log(err));

});

router.post('/register', (req, res) => {
    //registrar usuario
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save()
    .then( () => {
        console.log('guardado');
        res.redirect('/');
    })
    .catch(err => console.log(err));
    
 });
 


//add tarea
router.post('/add/todo', (req, res) => {
    const { todo } = req.body;
    const newTodo = new Todo({todo});
    newTodo.save()
    .then( () => {
        console.log('guardado');
        res.redirect('/protected');
    })
    .catch(err => console.log(err));
})


.get('/delete/todo/:_id', (req, res) => {
    const { _id } = req.params;
    Todo.deleteOne({_id})
    .then( () => {
        console.log('guardado');
        res.redirect('/protected');
    })
    .catch(err => console.log(err));
});

module.exports = router;