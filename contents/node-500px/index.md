---
title: node-500px
template: simple.jade
category: none
---

This plugin is a wrapper for the API of [500px.com](http://500px.com). To get more details on what the API offers, go to [developer.500px.com](http://developer.500px.com/).

<a href="https://github.com/ro-ka/node-500px" target="_blank" class="button">Fork me on Github &raquo;</a>

### Install

The easiest way is to install through npm:
```bash
npm install 500px
```
Of course you can also clone via git or download the .zip or .tar.gz via the links above.

### Getting started

Include the module in your project and initialize it:

```javascript
var API500px = require('500px').API500px,
    api500px = new API500px(consumer_key);
```
Now you are ready to do some calls to the 500px.com API!

### GET photos

To retrieve photos, just do the following:

```javascript
api500px.photos.getPopular({'sort': 'created_at', 'rpp': '100'},  function(error, results) {
    if (error) {
        // Error!
    } else {
        // Do something
    }
});
``` 

Choose on of the funtions to get photos:

* `getById (photo_id, arguments, callback)`
* `getByUsername (username, arguments, callback)`
* `getByUserId (user_id, arguments, callback)`
* `getFavoritesByUsername (username, arguments, callback)`
* `getFavoritesByUserId (user_id, arguments, callback)`
* `getFriendsByUsername (username, arguments, callback)`
* `getFriendsByUserId (user_id, arguments, callback)`
* `getPopular (arguments, callback)`
* `getUpcoming (arguments, callback)`
* `getEditorsChoice (arguments, callback)`
* `getFreshToday (arguments, callback)`
* `getFreshYesterday (arguments, callback)`
* `getFreshWeek (arguments, callback)`
* `searchByTag (tag, arguments, callback)`
* `searchByTerm (term, arguments, callback)`

For more information on the possible arguments, please check the [500px.com photos API](http://developer.500px.com/docs/photos-index)

### GET users

To retrieve users, just do the following:

```javascript
api500px.users.getById(1234,  function(error, results) {
    if (error) {
        // Error!
    } else {
        // Do something
    }
});
``` 

Choose on of the funtions to get users:

* `getById (id, callback)`
* `getByName (username, callback)`
* `getByEmail (email, callback)`
* `getFriendsById (id, arguments, callback)`

For more information on the possible arguments, please check the [500px.com users API](http://developer.500px.com/docs/users-index)

### GET blogs

To retrieve blogs, just do the following:

```javascript
api500px.blogs.getFresh({rpp: 50},  function(error, results) {
    if (error) {
        // Error!
    } else {
        // Do something
    }
});
``` 

Choose on of the funtions to get blogs:

* `getById (id, arguments, callback)`
* `getCommentsById (id, arguments, callback)`
* `getFresh (arguments, callback)`
* `getByUsername (username, arguments, callback)`
* `getByUserId (user_id, arguments, callback)`

For more information on the possible arguments, please check the [500px.com blogs API](http://developer.500px.com/docs/blogs-index)