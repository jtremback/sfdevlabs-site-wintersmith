---
title: HTML5 input types explained
date: Sat May 25 2013 17:40:00 GMT+0200 (CET)
date_formatted: 25 May 2013
template: journal-post.jade
category: journal
---

With the buzzword HTML5 came a lot of new stuff to the browsers. One of the things I like a lot are the newly introduced input types.

In this article I will show what new types are available to use, talk about browser compability and highlight the benefits of using them. I'll show off how each type behaves in a modern browser, on touch and on keyboard based devices.

To see how the new input types behave out there in the wild, play around with them on my [small test page](/html5-input-types-showcase/).

### Available types

Here is a list showing all the new types that are now available:

```markup
<input type="search">
<input type="email">
<input type="url">
<input type="tel">
<input type="range">
<input type="number">
<input type="date">
<input type="month">
<input type="week">
<input type="time">
<input type="color">
```

I'll take a look on each one of these later. First let's check where they are available to use.

### Browser compability

Every browser out there understands the input type *text*. And that is exactly what the fallback is: a simple input as you used until now.

To find out which browsers supports the new types, check out [caniuse](http://caniuse.com/#search=input%20type). As you can see, these types are still a working draft and support isn't the best at the moment. Most of the new magic is working in Chrome only. So why should I still use these new input types over an simple *text* input with some JavaScript?

### Benefits

When you use a modern browser, these new types will do some nice things out of the box. There is no need for a single line of JavaScript.

Most people already know that the **input transforms visually** to help pick and enter exactly the desired information. Also it will **validate** the value of the input on the client side. This, of course, has no effect on the server side validation which should be implemented in any case. [Read more on client vs. server side validation](http://stackoverflow.com/a/162579/954440).

What is less known, and often not recognized, is that the input types can change the keyboard on touch devices, providing us with a **optimized keyboard layout**. These changes to the keyboard sometimes are subtle but make it a lot easier to enter data on touch keyoards.

As a reference, the *default keyboard* on a stock Android 4.2 looks something like this:
![](keyboard-text.png)

### Input types in detail

In the following I provide a detailed look on each input type. I've build a [small test page](/html5-input-types-showcase/), so you can check out the behavior on your own.

For the tests I used Chrome 27 on mobile (Android 4.2) and on desktop (Ubuntu 13.04). If you find some different behavior, leave a comment below!

#### type="search"

Adding type *search* to an input has only stylistic affect but will not add a validation. On touch devices the standard keyboard is triggered, but the *Go* button changes to a magnifier glass:
![](keyboard-search.png)

#### type="email"

The *email* type shows a standard input field but expects a valid email and will tell you if that's not the case. On touch devices the keyboard changes slightly, providing the @ directly as you can see in the image:
![](keyboard-email.png)

#### type="url"

Renders also a standard input field that only accepts absolute urls. A validation error is thrown when this is not the case.

#### type="tel"

This one also shows a standard input field. As the format of phone numbers around the world differs a lot, it does not provide validation. But you are free to add a pattern attribute with your desired regex.

The input type *tel* has a great effect on the layout on touch devices, though:
![](keyboard-tel.png)

So even if you do not need validation on phone numbers, it is wise to use this type to make input easier and less error prone for your users.

#### type="range"

Transforms the input to a slider. There is no need for validation as this one will submit only pre defined values.
![](input-range.png)

#### type="number"

Renders a input element that has to small up and down buttons on the right. These make it easy to increase and decrease the value of the input. Accepts all kind of input but will delete non valid content on change or submit.

On touch devices the keyboard is optimized to just enter numbers and nothing else:
![](keyboard-number.png)

#### type="date"

The input changes a lot: It displays a placeholder in the format of the date, two buttons to increase or decrease the current selected date piece and offers a calendar dropdown to select a date. There are only numbers allowed so it is not possible to enter some other data. When some data got entered it is possible to reset the input value via an *x* that is shown.
![](input-date.png)

It is nice to note that the texts and the formatting in the date related input types depends on your browsers localization.

On a touch device the input element looks like a select box. When clicked, it opens up an overlay to choose the date.
![](keyboard-date.png)

#### type="month"

Similar to the *date* type, it displays a placeholder for the month and the year. It also provides the increase and decrease buttons and a calendar dropdown where you can select a complete month.
![](input-month.png)

Same as the *date* input type, the *month* input type renders a select-like element on touch devices which opens an overlay to choose the month.
![](input-mobile-month.png)

#### type="week"

This variation of the *date* type is similar to the ones above. It shows a placeholder for the week and the year. The increase and decrease buttons exist, too. Also there is a calendar dropdown to select a week.
![](input-week.png)

This type is not supported on touch devices yet.

#### type="time"

The type *time* shows a simple input element with a placeholder for the hours and minutes. Also the increase and decrease buttons for number values are shown. Accepts only numbers, just like the other date and time related input types.
![](input-time.png)

Rendering on touch devices is a bit different, too: It looks like a select box but on click it opens an overlay to choose the time.
![](keyboard-time.png)

#### type="color"

Shows a small rectangle with a color. When you click the rectangle, a color picker opens where you can choose some nice color. The submitted value will be a hex color value in small letters.
![](input-color.png)

The type *color* is not supported on touch devices yet.

### Tl;Dr

The new input types are not supported everywhere but they provide some nice advantages like the validation, the optimized touch keyboard layouts and the custom rendering of the elements. With a polyfill it is easy and also future proof to **use them now**.

---------------------------------------

**Update 27 May 2013:** Added note to not neglect server side validation.