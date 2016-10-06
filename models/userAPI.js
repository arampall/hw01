var connection=require('../connection');

function User(){
this.getUser=function(userObj,res){
connection.acquire(function(err,con){
con.query('select username,password from patient where username=?',[userObj.username],function(err,result){
con.release();
if(err){
res.send("fail");
}else{
res.send("success");
}
});
});
};

this.createUser=function(userObj,res){
connection.acquire(function(err,con){
var sql=con.query('insert into patient set ?',[userObj],function(err,result){
con.release();
if(err){
res.send(sql.sql);
//res.send("failed");
}
else{
res.send(sql.sql);
//res.send({status:0,message:'User created successfully'});
}
});
});
};

this.getAllUsers=function(res){
connection.acquire(function(err,con){
con.query('select * from patient',function(err,result){
if(err){
res.send("An error occured");
}else{
res.send(result);
}
});
});
};

this.getQuestions=function(res){
connection.acquire(function(err,con){
con.query('SELECT result.id,result.section,result.question,result.optionsize,adoptions.adoptions FROM adoptions RIGHT OUTER JOIN (SELECT question.id,question.section,question.question,options.optionsize FROM question INNER JOIN options ON question.optionid=options.optionid) AS result ON adoptions.id=result.id ORDER BY result.id ASC',function(err,result){
if(err){
res.send("Error retrieving questions");
}else{
var response={};
response["result"]=result;
res.send(response);
}
});
});
};
}
module.exports=new User();
