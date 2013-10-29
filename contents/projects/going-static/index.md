---
title: Going static
date: Sun Nov 25 2012 22:20:00 GMT+0100 (CET)
date_formatted: 25 Nov 2012
template: journal-post.jade
category: journal
---

Lfasfasfaast week I switched the basis of this site: instead of an [express](http://expressjs.com/) powered site, everything is simple static html pages now.

Why I did that? There are some reasons for that. I don't update that often, as you probably noticed. The blog was hosted on tumblr before and I preferred to host it on my own server. When I wrote something or uploaded a new photo, I always checked that into my git repository. So it's no different now. Also, this site doesn't contain anything dynamic. Perfect to go static!

But it's not like maintaining a lot of html files. That would be too much trouble and work. There's a huge variaty of static site generators. They basicaly do the same as the webserver does – just in advance. So this leaves you with a lot of html files that only have to be copied to a webserver.

I chose a generator called [wintersmith](http://jnordberg.github.com/wintersmith/). It's a node.js program using [jade](http://jade-lang.com/) templating. So I could just reuse the templates I already had. Also the pages are simple [Markdown](http://daringfireball.net/projects/markdown/) files. That makes writing easy and I don't have to care about the formatting while writing.

If you are looking for a static site generator and want to choose the same as I, [nanoc](http://nanoc.stoneship.org/docs/1-introduction/#similar-projects) has a nice overview over various in different languages.

So far, I really like it!