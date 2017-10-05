/*  styles  */
require("./scss/style.scss");

/*  html    */
require("./app/view/layout/layout.html");
require("./app/view/newmodule/newmodule.html");

/*  js  */
//Attention à l'ordre d'importation des fichiers

/* Angular */

/* Angular - module */
require("./app/app.module.js");
require("./app/core/core.module.js");
require("../lib/angularjs-scorm-wrapper/angularjs-scorm-wrapper.min.js");
//
require("./app/newmodule/newmodule.module.js");

/* Angular - directives */

/* Angular - services */
require("./app/service/scorm.service.js");

/* Angular - routes */
require('./app/newmodule/newmodule.route.js');

/* Angular - controllers */
require('./app/newmodule/NewmoduleController.js');


/* Data */