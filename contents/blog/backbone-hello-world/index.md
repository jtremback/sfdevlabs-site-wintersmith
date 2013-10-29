---
title: Backbone.js Hello World with auth
date: Sun Nov 25 2012 22:20:00 GMT+0100 (CET)
date_formatted: 25 Nov 2012
template: blog-post.jade
category: journal
---

Single page web apps rule, but adding user logins (aka authentication) to them can be a bit frustrating for new app developers.  To give a little guidance we have constructed a bulletin board app to demonstrate how to make user logins a part of your Backbone.js applications. You can find the github repository [here](https://github.com/jeffj/backbone-bulletin-board/).

[![image](http://media.tumblr.com/f79d6bb2600ea351dc40b4c5acab3e68/tumblr_inline_mnxjfwjqq31qz4rgp.png)](http://sfdevlabs.com:3000/)

See the 
[demo](http://sfdevlabs.com:3000/)
 here.

**We will hit the high points below.**

1) Adding Passport.js to the [Express.js web server](http://expressjs.com/) is a breeze.  Passport gives you session management and handles the user table in our Mongo database.  Github and Twitter login are added for free too.  

The functions for adding in passport.js are listed below. We have our authenticate functions in [config/passport](https://github.com/jeffj/backbone-bulletin-board/blob/master/config/passport.js)  (advanced developers) for our different login types.

[Passport extends](http://passportjs.org/guide/configure/) each express request with a user object. The _req.user _contains usernames, id, and further user info.

[![image](http://media.tumblr.com/e884a9505c0d0af7bcaef56523e4c6d6/tumblr_inline_mnvt1mOt6i1qz4rgp.png)](https://github.com/jeffj/backbone-bulletin-board/blob/master/app.js "app.js")_app.js : A couple of functions to add passport to your express app._

2)  In our CRUD utilities we use our auth instance object (which we import from config/middlewares/authorization.js ) to check if a logged in user has permission to edit and delete endpoints for specific posts (_auth.post.hasAuthorization_).  This uses the [express middleware paradigm](http://expressjs.com/api.html#app.VERB). We can  also make sure a user is logged in to make a new post (_auth.requiresLogin_).

[![image](http://media.tumblr.com/10f23b97d4979a1a029ff7fc73bd4f4a/tumblr_inline_mnvthys9kd1qz4rgp.png)](https://github.com/jeffj/backbone-bulletin-board/blob/master/utils/crudUtils.js)
Notice the auth methods we use in routes for our CRUD utilities.

Our authentication helper methods are found in our auth obj.  These methods come from our [_authorization.js helper methods_](https://github.com/jeffj/backbone-bulletin-board/blob/master/config/middlewares/authorization.js) (seen below).  They are simple logical checks for post ownership and logged in state.

[![image](http://media.tumblr.com/183798e671901908c61c8840ac420124/tumblr_inline_mnvtunqiIi1qz4rgp.png)](https://github.com/jeffj/backbone-bulletin-board/blob/master/config/middlewares/authorization.js)

_config/middleware/authorization.js :  Our basic logic compares the user ID with post’s author to verify edit/delete permission. _

3) Our getListController function in the crudUtils.js [queries](http://mongoosejs.com/docs/api.html#model_Model.find) our mongo database (with the [mongoose](http://mongoosejs.com/) ORM) and sends the most recent posts to the backbone client. It needs to iterate over each post to see if it is made by the logged in user. This will populate a “myPost” boolean which will be used by backbone and our template to verify if a user can edit or delete a post.

[![image](http://media.tumblr.com/f615758c3b1fb2539f292b4f97da2357/tumblr_inline_mnvu5tcdey1qz4rgp.png)](https://github.com/jeffj/backbone-bulletin-board/blob/master/utils/crudUtils.js)_utils/crudUtils.js: The function parseResults goes through the posts and identifies if the current user is the author. Then myPost is added to the JSON result._

4) Finally [Backbone Sync](http://backbonejs.org/#Sync) fetches the data from our [CRUD utility](https://github.com/jeffj/backbone-bulletin-board/blob/master/utils/crudUtils.js "CRUD") (see the JSON [here](http://sfdevlabs.com:3000/post)).

[![image](http://media.tumblr.com/56227cc0dfb41f8b5daa197f181078ac/tumblr_inline_mnvvmk1VXi1qz4rgp.png)](http://sfdevlabs.com:3000/)

The [Backbone.js template](http://backbonejs.org/#View-render) uses the myPost boolean to display the correct UX controls depending on the post’s owner.

![image](http://media.tumblr.com/91c3dede45c2e37bf09f75656ef3e23f/tumblr_inline_mnvx5mnzDy1qz4rgp.png)

Hopefully this demo lets you wrap your head around building a single page webapp with user logins. Check out the [demo](http://sfdevlabs.com:3000/) and fork the [repository](https://github.com/jeffj/backbone-bulletin-board) on [Github](http://Github.com). 

Created by me [@jeffj](http://twitter.com/jeffj) at [@sfdevlabs](https://twitter.com/sfdevlabs "@sfdevlabs")