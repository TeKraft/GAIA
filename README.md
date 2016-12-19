# Gaia
##### Webplatform for analyzing large images and data sets with R

[![N|Solid](https://s29.postimg.org/fpj69v1c7/Ohne_Titel.png)](https://github.com/vgorte/GAIA)

GAIA is a free to use service for analyzing phenomenons using big images and/or data sets using R-Script.

  - Once registered, create projects and manage them
  - input raw R-Script code or upload .r files
  - Share projects and scripts in a collaborative manner
  - This service is and will always be free of charge! :+1:

### Tech

GAIA was developed and works purely on open source software and projects :

* [Bootstrap] - Responsive HTML, CSS and Javascript framework
* [Node.js] - evented I/O for the backend
* [MongoDB] - Easy to use database
* [jQuery] - duh!
* [Atom] - HAckable texteditor


And of course GAIA itself is open source with a [public repository][Git] on GitHub.



> “Software is like sex: it's better when it's free.”
-Linus Torvalds

This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.


### Installation

To run GAIA, you have to download this repository. You also need the node pack manager (npm).
Navigat to the server folder and install the dependencies via npm. Before starting the server make sure that mongoDB is running

```sh
$ mongod --dbpath /.../ #Path where you want to save everything
$ cd /.../GAIA/server/
$ npm install 
$ npm start
```
Server and db should be running now and you should be able to visit the URL given in the server.js file .


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Bootstrap]: <http://getbootstrap.comr>
   [Node.js]: <https://nodejs.org/en/>
   [MongoDB]: <https://www.mongodb.com/de>
   [jQuery]: <http://jquery.com>
   [Atom]:  <https://atom.io>
   [git]: <https://github.com/vgorte/GAIA>
