'use strict';
const express = require('express');

const bookmarkRouter = express.Router();
const bodyParser = express.json();
const BookmarksService = require('./BookmarksService');

bookmarkRouter
  .route('/')
  .get((req, res, next) => {
    const db = req.app.get('db');
    return BookmarksService.getAllBookmarks(db)
      .then(bookmarks => res.json(bookmarks))
      .catch(next);
  });

bookmarkRouter
  .route('/:id')
  .get((req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;
    return BookmarksService.getBookmarkById(db, id)
      .then(bookmarks => res.json(bookmarks))
      .catch(next);
  });

bookmarkRouter
  .route('/')
  .post(bodyParser, (req, res, next) => {
    const db = req.app.get('db');    
    const { title, description, url, rating=1 } = req.body;
    
    if(!title) {
      return res
        .status(400)
        .json({error: {message: 'Title is required'}});
    }

    if(!url) {
      return res
        .status(400)
        .json({error: {message: 'URL is required'}});
    }

    if(!url.includes('http://')) {
      return res
        .status(400)
        .json({error: {message: 'URL must contain http://'}});
    }

    const newBookmark = { 
      title,
      description,
      url,
      rating
    };

    return BookmarksService.postNewBookmark(db, newBookmark)
      .then(bookmark => res.json(bookmark))
      .catch(next);

  });

bookmarkRouter
  .route('/:id')
  .patch(bodyParser, (req, res, next) => {
    const db = req.app.get('db');
    const { id, } = req.params;
    const { title, url, description, rating } = req.body;

    let newData = {};

    if (title) {
      newData.title = title;
    }

    if (url) {
      newData.url = url;
    }

    if (description) {
      newData.description = description;
    }

    if (rating) {
      newData.rating = rating;
    }

    return BookmarksService.updateBookmarkById(db, id, newData)
      .then (data => res.json(data[0]));
  });


bookmarkRouter
  .route('/:id')
  .delete((req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;

    return BookmarksService.deleteBookmarkById(db, id)
      .then(response => res.json(response));

  });

module.exports = bookmarkRouter;