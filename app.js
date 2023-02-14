const express =require("express");
const app =express();
const request =require("request");
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
// app.use('/css'express.static(__dirname+"node_modules/bootstrap/dist"));
//
// // app.use('/css', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(__dirname+'node_modules/bootstrap/dist/js'));
// app.use('/js', express.static(__dirname+ 'node_modules/jquery/dist'));
app.use(express.static("public"));
app.get("/",function (req,res) {
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function (req,res) {
  const fname=req.body.fname;
  const sname = req.body.sname;
  const email=req.body.email;
  // console.log(fname+" "+sname+" "+email);
  // console.log(req.body);
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:sname,
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us18.api.mailchimp.com/3.0/lists/1367c43d8f";
  const options={
    method:"post",
    auth:"chandu:19abdc9475fd263cdde1b61faa2ade51d-us18",
  }
  const request=https.request(url,options,function(response){
  const statuscode =  response.statusCode;
    console.log(response.statusCode);
    if(statuscode===200){
      res.sendFile(__dirname+"/success.html");
    }
    if(statuscode!=200){
      res.sendFile(__dirname+"/failure.html");
    }
 response.on("data",function(data){
   console.log(JSON.parse(data));
 })
  })
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(3000,function(){
  console.log("server is listening on port 3000");
});
// api key: 9abdc9475fd263cdde1b61faa2ade51d-us18
// list id:1367c43d8f
