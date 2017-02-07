# Gaia
##### Webplatform for analyzing large images and data sets with R

[![N|Solid](https://s29.postimg.org/fpj69v1c7/Ohne_Titel.png)](https://github.com/vgorte/GAIA)

GAIA is a free to use service for analyzing phenomenons using big images and/or data sets using R-Script.

  - Once registered, create projects and manage them
  - Input raw R-Code and execute it
  - Share projects and scripts in a collaborative manner
  - This service is and will always be free of charge! :+1:

### Tech

GAIA was developed and works purely on open source software and projects :

* [Bootstrap] - Responsive HTML, CSS and Javascript framework
* [Node.js] - evented I/O for the backend
* [MongoDB] - Easy to use database
* [jQuery] - duh!
* [Atom] - Hackable texteditor
+ [npm] - Package manager for javascript


And of course GAIA itself is open source with a [public repository][Git] on GitHub.



> “Software is like sex: it's better when it's free.”
-Linus Torvalds



### Installation

To run GAIA you have to clone or download this repository. Feel free to do so, it's free!! 
Make sure that you have [npm][npm] installed.
GAIA works with [mongodb][MongoDB] so be sure to have it installed as well.

#### Important facts!
Before you start, make sure to check the "config.js" in the /app/ - folder. <br />
It's possible to choose between "localhost" and "server" settings.


We recommend 2 terminals.

Lets start mongoDB!

First terminal:
```sh
$ mongod --dbpath /*PATH*/ #*PATH* is where you want to save all the contents
```
You just started mongodb with a path where it dumps all your data.

Now we need to install the packages needed to run GAIA. For that we need [npm][npm]!

Second terminal:
```sh
$ cd /../../GAIA/server/
$ npm install
```
Congratz! You are almost done. All you need to do is to start the server.js via npm and you are good to go!
```sh
$ npm start
```
You can visit <http://localhost:3000> and see the beautiful login screen of GAIA!

**Free Software, Hell Yeah!**




##### Disclaimer

Before you install GAIA be sure to understand that it is possible to execute shell commands via R. 

That could mean bad news for your server since users can mess with it!

GAIA is not responsible for any safety matters and any possible damage :) 


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Bootstrap]: <http://getbootstrap.comr>
   [Node.js]: <https://nodejs.org/en/>
   [MongoDB]: <https://www.mongodb.com/de>
   [jQuery]: <http://jquery.com>
   [Atom]:  <https://atom.io>
   [git]: <https://github.com/vgorte/GAIA>
   [npm]: <https://www.npmjs.com>
