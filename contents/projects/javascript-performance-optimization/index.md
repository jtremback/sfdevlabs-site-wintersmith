---
title: JavaScript performance optimization
date: Mon Feb 18 2013 08:40:00 GMT+0100 (CET)
date_formatted: 18 Feb 2013
template: journal-post.jade
category: journal
---

Modern browsers improved a lot in their performance in recent years but nonetheless there a some things to take care of when writing apps or websites in JavaScript. Performance is important or, as Brad Frost says, [performance is design](http://bradfrostweb.com/blog/post/performance-as-design/). Your users will appreciate it a lot when the app is performing fast.

Today, JavaScript is basically running everywhere. It is no longer the little helper language to animate text. It already emerged from it's roots in the browser and [powers web servers](http://nodejs.org/), [mobile apps](http://phonegap.com/), [native desktop apps](http://developer.chrome.com/stable/apps/about_apps.html), [operating systems](http://www.gnome.org/gnome-3/) make use of it and it's even possible to [control hardware](https://github.com/rwldrn/johnny-five) directly. As with great power comes great responsibility, it's really important to write fast and efficient code.

I will explain some basic tips to improve the JavaScript performance. For further information on these topics, check out the links provided in this article.

#### Keep it simple

First of all, determine who your audience is and what devices you have to satisfy. If, for example, you target mobile devices only, there is no need for [jQuery](http://jquery.com/) when there is [Zepto](http://zeptojs.com/. Maybe you don't need any frameworks at all, as modern browsers already support a wide range of the features. Using the native functions is a lot faster than their counterparts in frameworks, as [jsPerf](http://jsperf.com/vanilla-js-ftw-jquery-vs-js) proofs. The difference is neither that big nor hard, as you can see in the following code. To find more translations from jQuery to vanilla JavaScript, check out [this gist](https://gist.github.com/2597326).

```javascript
// jQuery
var divs = $('div')

// Vanilla
var divs = document.querySelectorAll('div')
```

Aside of the script performance it's a good idea to check the file size of a script. Each kilobyte in file size has to be downloaded and that's precious time that the user has to wait before everything is ready. Even when it's already a small file, it should be minimized and gzipped, to decrease the file size further and improve the loading performance.

It's good to stay as native as possible and to use only what's needed. So – *keep it simple*.

#### Improve script loading

Of course, most sites make use of some scripts and often it's the exact same scripts. For example, more than half of the most visited sites use jQuery. So why load and cache the same script on each different site? There's no need to do that. Using a content delivery network (CDN) helps on this. The most used scripts are provided by [Google](https://developers.google.com/speed/libraries/devguide), for many other popular scripts there is [cdnjs.com](http://cdnjs.com/). Just include the libraries from one of these CDN and they take care of the caching, gzipping and minimizing of the scripts.

To not block the loading of a site it's best to include the script files at the end of the body, like this.

```markup
<html>
  <head>
    …
  </head>
  <body>
    …
    <script src='/your/script.js' />
  </body>
</html>
```

This lets the browser first load and render the `DOM`, before the loading of the script files blocks the loading. The user will look at an already rendered site instead of a white screen, while waiting for the site to load. As many scripts depend on a `document.ready` event, the start execution time of these scripts won't be different. For the user this definitely feels faster when loading a site. For more information, Google provides on overview of how to optimize the [page speed](https://developers.google.com/speed/pagespeed/).

#### Keep interactions at a minimum

Most scripts interact with other values or external APIs more than once. To keep the lookup and calculation of values at a minimum, cache the results of calculations or lookups in variables. This prevents the browser of looking up the same thing again and again. Also, interactions with the DOM and other APIs should be as few as possible.

Consider this **bad code** (using jQuery here, as it is popular):

```javascript
$('.myClass').css('height', '100px');
$('.myClass').css('width', '100px');
$('.myClass').css('display', 'block');
```

What will the browser do in this case? It will look for elements with a class `myClass`. It will apply a CSS value and write it to elements. This will also cause an rewrite of the DOM. Then, again, the browser looks for elements with that class, applies some value … you got it already.

One improvement here would be to cache the elements after finding them. Now we got a slightly better performing code:

```javascript
var $elements = $('.myClass');

$elements.css('height', '100px');
$elements.css('width', '100px');
$elements.css('display', 'block');
```

But we won't stop here! If you check the [jQuery API](http://api.jquery.com/css/), you'll find out that the `css` function accepts objects, too. So the optimal way to write that code would be like the following:

```javascript
var $elements = $('.myClass');

$elements.css({
  'height': '100px',
  'width': '100px',
  'display': 'block'
});
```

There is just one, instead of three, searches for the elements left. Also the writing causes only one, instead of three interactions with the DOM.

#### Delegate events

When using events, a common and intuitive way is to assign the event to the elements that shall trigger the event. Let's assume we have a list container in our html with a lot of list items. So the event listener definition looks similar to this:

```javascript
$('ul li').on('click', doSomething);
```

But sometimes it's wiser to assign an event to a parent container and then filter out what got clicked. jQuery makes it pretty easy to delegate events:

```javascript
$('ul').on('click', 'li', doSomething);
```

So now there is only one event waiting to be triggered instead of many. But you have to pay attention here! What is the best performing JavaScript code depends on the HTML structure. Delegation works good, if you replace many events with fewer. But take care to not delegate all events to the body.

What happens when you delegate events is that every time you trigger such an event, the browser has to check first if the event is triggered, so it has to bubble up the DOM until it finds the event. Then it has to check for the element to trigger the event on. So basically it's a trade-off between the number of events assigned and the hierarchy to bubble up and down.

One advantage of the event delegation definitely is that you can add and remove DOM elements in the event container and don't have to assign a new event each time. The event delegation can be powerful but also make it worse when not used carefully.

#### Use the smallest possible scope

The use of the scope may not have impact on small scripts, but especially in large and complex applications it is wise to utilize it. To use the scoping in JavaScript as best as possible, it's important to understand it first. If you define a variable in your script, it's available to everything that is defined beneath of it. In the following example the variable `name` is available in the function `sayHello`:

```javascript
var name = 'Cookie Monster';

function sayHello() {
  alert('Hello ' + name + '!');
}

sayHello(); // Prints out 'Hello Cookie Monster!'
```

But a when the variable `name` is defined in a different function, it's not available in the function `sayHello`, as this is defined next to the function `start`, not beneath of it:

```javascript
function start() {
  var name = 'Cookie Monster';
}

function sayHello() {
  alert('Hello ' + name + '!');
}

sayHello(); // Prints out 'Hello !'
```

To check your understanding of the JavaScript scope, there is a nice [test](http://madebyknight.com/javascript-scope/) to do so. If you need more information on that topic, read more on [smashingmagazine](http://coding.smashingmagazine.com/2009/08/01/what-you-need-to-know-about-javascript-scope/).

With that knowledge, you should use variables in the smallest possible scope. This not only helps structuring the code, but also won't mess the global window object. The browser is optimized to clean up an executed function and release the memory. If everything would be in the global object, the browser will keep all the created variables in space as they may be needed later on. Let's help the browser to clean up.

#### Test the performance

When your app or site is running and everything works, you should take some time to test the performance. The [Webkit Inspector](http://trac.webkit.org/wiki/WebInspector) provides a Profiler. With this tool you can analyze each function that gets called and see where the bottlenecks are in your code. A detailed guide on how to use the [Profiler](http://coding.smashingmagazine.com/2012/06/12/javascript-profiling-chrome-developer-tools/) can be found over at the [smashingmagazine](http://smashingmagazine.com/).

When you found some bottlenecks that you want to improve, there is [jsPerf](http://jsperf.com/) to compare different implementations of the same problem. That's an easy way to find the fastest running implementation.

But also keep in mind that the most important thing is that your code works without errors. Make it fast, but [don't get stuck in micro optimization](http://www.codinghorror.com/blog/2009/01/the-sad-tragedy-of-micro-optimization-theater.html)!

#### Conclusion

Performance is an important part of an application or website. Users aren't that patient to wait for your app to load. When it's taking too long, they'll quit and maybe never be back. Nowadays you get a lot of tools at hand that make writing and analyzing the JavaScript performance easy – just use them! Your users will appreciate it.