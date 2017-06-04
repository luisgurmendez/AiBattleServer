var express = require('express');

var router = express.Router();

/* GET home page. */

/*
router.get('/', function(req, res, next) {

  if(req.session.loggedIn){
    console.log(req.session.loggedIn);

    var user = app.users.findOne({_id:req.session.loggedIn.toString()},function(err,doc){
      if(err) return next(err);
      if(!doc){
        res.redirect('/login');
      }else{
        res.render('index', { title: 'Express' });

      }
    })
  }else{
    res.redirect('/login');

  }
});
*/

module.exports = router;
