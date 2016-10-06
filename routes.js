var user=require('./models/userAPI');

module.exports={
configure:function(app){
app.post('/getUserDetails/',function(req,res){
user.getUser(req.body,res);
});

app.get('/getAllUserDetails/',function(req,res){
user.getAllUsers(res);
});

app.post('/createUser/',function(req,res){
user.createUser(req.body,res);
});

app.get('/getQuestions/',function(req,res){
user.getQuestions(res);
});
}

};
