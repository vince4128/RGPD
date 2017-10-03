/*  styles  */
require("./scss/style.scss");

/*  html    */
require("./app/view/layout/layout.html");

/*  js  */
//Attention à l'ordre d'importation des fichiers

//modules
require("./app/app.module.js");
require("./app/core/core.module.js");
require("../lib/angularjs-scorm-wrapper/angularjs-scorm-wrapper.min.js");