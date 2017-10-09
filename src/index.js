/*  styles  */
require("./scss/style.scss");

/*  html    */
require("./app/view/layout/layout.html");
require("./app/view/newmodule/newmodule.html");
require("./app/view/newmodule/section.html");

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
require("./app/service/data.service.js");
require("./app/service/scorm.service.js");

/* Angular - routes */
require('./app/newmodule/newmodule.route.js');

/* Angular - controllers */
require('./app/newmodule/NewmoduleController.js');
require('./app/newmodule/section.controller.js');

/* Data */
require('./data/data.json');