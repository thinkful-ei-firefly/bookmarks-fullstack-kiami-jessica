'use strict';

const BookmarksService = {
  getAllBookmarks (db) {
    return db.from('bookmarks')
      .select('*');
  },

  getBookmarkById (db, id) {
    return db.from('bookmarks')
      .select('*')
      .where('id', id);
  },

  postNewBookmark (db, newBookmark) {
    return db.into('bookmarks')
      .insert(newBookmark)
      .returning('*');
  },

  updateBookmarkById (db, updateId, newInfo) {
    return db.from('bookmarks')
      .where({ id: updateId})
      .update(newInfo)
      .returning('*');
  },

  deleteBookmarkById (db, id) {
    return db.from('bookmarks')
      .where({ id })
      .delete();
  }
};

module.exports = BookmarksService;