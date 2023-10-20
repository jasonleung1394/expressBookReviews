const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  if (users.some((user) => user.username === req.query.username)) {
    // res.send(users)
    return res.status(300).json({ message: "User Exist" });
  } else {
    users.push({ 'username': req.query.username, 'password': req.query.password })
    res.send(users)
    res.send('the user ' + req.query.username + " " + "has been added")
  }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve, reject) => {
    // res.send(JSON.stringify(books))
    setTimeout(() => {
      if (books) {
        resolve(books);
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  })
  myPromise
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error: ' + error.message });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {

  let myPromise = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    let filteredBy_ISBN = Object.values(books).filter((book) => book.isbn === isbn);
    if (filteredBy_ISBN) {
      resolve(filteredBy_ISBN)
    } else {
      reject(new Error('Failed to fetch data'));
    }
  })
  myPromise
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error: ' + error.message });
    });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve, reject) => {
    const author = req.params.author;
    let filteredBy_Author = Object.values(books).filter((book) => book.author === author);
    if (filteredBy_Author) {
      resolve(filteredBy_Author)
    } else {
      reject(new Error('Failed to fetch data'));
    }
  })
  myPromise
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error: ' + error.message });
    });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    const title = req.params.title;
    let filteredBy_Title = Object.values(books).filter((book) => book.title === title);
    if (filteredBy_Title) {
      resolve(filteredBy_Title)
    } else {
      reject(new Error('Failed to fetch data'));
    }
  })
  myPromise
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error: ' + error.message });
    });

});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let filteredBy_ISBN = Object.values(books).filter((book) => book.isbn === isbn);
  res.send(filteredBy_ISBN.map((book) => book.reviews));
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
