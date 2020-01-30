//db setup
const db = require("./db");
const dbName = "users";
const collectionName = "users";

//signup method
exports.signup = function(req, res){
    message = '';
    if(req.method == "POST"){
        var post  = req.body;
        var name= post.user_name;
        var pass= post.password;
        var fname= post.first_name;
        var lname= post.last_name;
        var mob= post.mob_no;
        var college= post.college;
        var doc = {"username":name , "password":pass,"fname":fname , "lname":lname , "mobile":mob , "collegeName":college}

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
       res.render('signup');
    }
 };





 //login method
 exports.login = function(req, res){
    var message = '';
    if(req.method == "POST"){
       var post  = req.body;
       var user_name= post.user_name;
       var pass= post.password;
      var doc = {"username": user_name , "password": pass}
      db.initialize(dbName, collectionName, function (dbCollection) { // successCallback 
         dbCollection.find(doc).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            //console.log(result[0]);
            //console.log("Username: " + result[0]['username'] + " " + "Password: " + result[0]['password'] );
            if(result[0]){
               if(result[0]['username']){
               if(result[0]['password']){
                  if (user_name == result[0]['username'] && pass == result[0]['password']){      
                     res.redirect('/home/dashboard');
                  }}}}
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





 //dashboard
 exports.dashboard = function(req, res, next){
   var user = ''
	res.render('profile.ejs', {user:user});		  
};