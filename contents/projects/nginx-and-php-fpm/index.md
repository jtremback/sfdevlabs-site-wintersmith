---
title: Nginx and php-fpm
date: Mon Jul 09 2012 19:52:00 GMT+0100 (CET)
date_formatted: 09 Jul 2012
template: journal-post.jade
category: journal
---

Since there is php-fpm in Nginx it's save to run PHP applications without an Apache webserver just using Nginx. I'll explain how to set up php-fpm to run your php app. My system runs on Ubuntu 12.04 server and Nginx is already installed and running.

First thing to do is to install php-fpm. In my case:

```bash
sudo aptitude install php5-fpm
```

This gives you all the needed packages. Now there are two options to run your php server. The default is running it on a specific port (default for that is port 9000). The second option is to run it as a socket. To change that behaviour to your liking just edit `/etc/php5/fpm/pool.d/www.conf` in the line that starts with `listen = ` to one of the following:

```
listen = 127.0.0.1:9000
listen = /var/run/php5-fpm.sock
```

I'm running on the socket. So after restarting the php-fpm service (`sudo service php5-fpm restart`) you can talk to your php app from Nginx. Just tell Nginx to do so by editing the config! My config in `/etc/nginx/nginx.conf` contains somthing like this:

```
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/nginx/examplecom;
    index index.php index.html index.htm;

    location / {
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }
}
```

Don't forget to restart the nginx service before heading over to example.com! No you should see the desired output of your index.php.

#### What next?

Head over to to [if !1 0](http://www.if-not-true-then-false.com/2011/nginx-and-php-fpm-configuration-and-optimizing-tips-and-tricks/) for some neat tricks to optimize Nginx in general and in case you're using PHP-FPM some details on the configuration.