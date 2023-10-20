const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{
  'username': 'jason',
  'password': '0000'
}];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
  let login_credential = users.filter((user) => user.username === username);
  if (Object.values(login_credential)[0].password === password) {
    return true;
  }
  else {
    console.log(Object.values(login_credential)[0].password);
    console.log(typeof (password));
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  if (users.some((user) => user.username === username)) {
    if (authenticatedUser(username, password)) {
      let accessToken = jwt.sign({
        data: username
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken
    }
      return res.status(300).json({ message: "user " + username + "is logged in" });
    } else {
      return res.status(300).json({ message: "password Incorrect" });
    }
  }
  else {
    return res.status(300).json({ message: "user not exist" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here'
  const login_user = req.user;
  let selected_book = Object.values(books).filter((book) => book.isbn === req.params.isbn);
  console.log(selected_book[0].reviews = req.query.review);
  return res.status(300).json({ message: "review " + req.query.review + " has been added to book " + selected_book[0].title });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here'
  const login_user = req.user;
  let selected_book = Object.values(books).filter((book) => book.isbn === req.params.isbn);
  console.log(selected_book[0].reviews = {});
  return res.status(300).json({ message: "review has been deleted from book " + selected_book[0].title });
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
