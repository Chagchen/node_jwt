const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();


app.get('/api', (req, res) =>{
  res.json({
    message: "Hey There! Welcome to this API service!"
  });
});

//post message
app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "POST created...",
        authData
      });
    }
  });
});

//login array for a user 
app.post('/api/login', (req, res) => {
  const user ={
    id: 1,
    username: "Bruce",
    email: "bruce@gmail.com"
  };

//secret has key pair for sign in
  jwt.sign({user: user}, 'secretkey', (err, token) => {
      res.json({
        token
      });
    });
 });
//add function to verify the token
function verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined'){
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403) //forbiddne status
  }
};

app.listen(3000, (req, res ) => {
  console.log('Server is started at port 3000')
});
