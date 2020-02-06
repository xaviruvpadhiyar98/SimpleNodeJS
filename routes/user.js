//db setup
const db = require("./db");
const bcrypt = require('bcrypt')
const dbName = "users";
const collectionName = "users";

//signup method
exports.signup =  async function(req, res) {
    message = '';
    if(req.method == "POST"){
        var post  = req.body;
        var name= post.user_name;
      //   var pass= post.password;
        var fname= post.first_name;
        var lname= post.last_name;
        var mob= post.mob_no;
        var college= post.college;

      try{
         const salt = await bcrypt.genSalt()
         const hashedPassword = await bcrypt.hash(post.password , salt)
        var doc = {"username":name , "password":hashedPassword,"fname":fname , "lname":lname , "mobile":mob , "collegeName":college}
      }catch{
         message = "Account Creation Failed! Try again after sometime";
         res.render('signup.ejs',{message: message});
      }
        db.initialize(dbName, collectionName, function (dbCollection) {
            dbCollection.insertOne(doc, function (err, result) {
                if (err) throw err;
                console.log(result);
                message = "Succesfully! Your account has been created.";
                res.render('signup.ejs',{message: message});
            });
        });
    }
    else{
   
         res.render('signup.ejs');
    }
 };




 //login method
 exports.login = async function(req, res){
    var message = '';
    if(req.method == "POST"){
      var post  = req.body;
      var user_name= post.user_name;
      var pass= post.password;



      var doc = {"username": user_name}
      db.initialize(dbName, collectionName, function (dbCollection) { // successCallback 
         dbCollection.find(doc).toArray(function (err, result) {
            if (err) throw err;
            if(result[0]){
               const u = result[0]['username']
               const p = result[0]['password']
               if(result[0]['username']){
               if(result[0]['password']){
                     if (user_name == result[0]['username']){
                        try{
                        if (bcrypt.compareSync(pass , p )){
                           var user = user_name
                           res.render('profile.ejs', {user:user_name});
                        }
                     }catch{
                        message = 'Wrong Credentials.';
                        res.render('index.ejs',{message: message});
                     }
                  }
                  }}}
          else{
             message = 'Wrong Credentials.';
             res.render('index.ejs',{message: message});
          }              
       });
      });
   }
    else {
       res.render('index.ejs',{message: message});
    }         
 };

