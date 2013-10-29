---
title: Secure your server with Iptables
date: Fri Aug 10 2012 12:30:00 GMT+0100 (CET)
date_formatted: 10 Aug 2012
template: journal-post.jade
category: journal
---

It's never a good idea to let doors open. Neither should there be unnecessary open ports on your server. With Iptables, a firewall shipped with Ubuntu, it's not that hard to secure your server. A very detailed and nice introduction can be found in the [Ubuntu Wiki](https://help.ubuntu.com/community/IptablesHowTo).

#### Example setup

A sample setup might look like the following. First step is to allow already established connections.

```bash
sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
```

Then the ssh and http ports should be accepted.

```bash
sudo iptables -A INPUT -p tcp --dport ssh -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
```

Finally all other traffic shall be blocked.

```bash
sudo iptables -A INPUT -j DROP
```

Note that the order of the iptables list is important. It works from top to bottom and when for example DROP all is the first entry, nothing else is allowed to enter. Also make sure to not block your ssh port! Else you got a problem.

#### Adding new rules

Now we realise, we forgot one port. But that's no problem! We can not only append new rules, we can also specify where to include the rule. Take a look at the already created list.

```bash
sudo iptables --list
```

We decide to add port 12345 as 3rd rule. So let's do that!

```bash
iptables -I INPUT 3 -p tcp --dport 12345 -j ACCEPT
```

Checking back on the list should show the added port.

#### Preserve rules

Preserving the iptables rules after rebooting is pretty easy.

```bash
sudo iptables-save
```

Now you're done! Your server should be (more) secure and your life easier.