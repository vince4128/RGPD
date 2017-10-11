/* Data */

//fichiers de langues
require("./app/lang/fr.json");

/*  styles  */
require("./scss/style.scss");

/*  html    */
require("./app/view/layout/layout.html");
require("./app/view/newmodule/newmodule.html");
require("./app/view/newmodule/section.html");
require("./app/template/prevandnext/prevandnext.html");
require("./app/template/emitstatus/emitstatus.html");
require("./app/template/text/text.html");

/*  js  */
//Attention à l'ordre d'importation des fichiers

//fix viewport support on safari mobile
require('../node_modules/viewport-units-buggyfill/viewport-units-buggyfill.js').init();

/* Angular */

/* Angular - module */
require("./app/app.module.js");
require("./app/core/core.module.js");
require("../lib/angularjs-scorm-wrapper/angularjs-scorm-wrapper.min.js");
require("./app/directive/directive.module.js");
//
require("./app/newmodule/newmodule.module.js");

/* Angular - config */
require("./app/core/config.js");

/* Angular - directives */
require("./app/directive/prevandnext.directive.js");
require("./app/directive/emitstatus.directive.js");
require("./app/directive/itemgenerator.directive.js");
require("./app/directive/text.directive.js");

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