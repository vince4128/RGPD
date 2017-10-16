/* Data */

//fichiers de langues
require("./app/lang/fr.json");

/*  styles  */
require("./scss/style.scss");

/*  html    */

//view
require("./app/view/layout/layout.html");
require("./app/view/home/home.html");
require("./app/view/home/section.html");

//template
require("./app/template/prevandnext/prevandnext.html");
require("./app/template/emitstatus/emitstatus.html");
require("./app/template/text/text.html");
require("./app/template/clicktosee/clicktosee.html");
require("./app/template/qsimple/qsimple.html");
require("./app/template/textimg/textimg.html");
require("./app/template/quiz/introquiz.html");
require("./app/template/quiz/resultquiz.html");

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
require("./app/home/home.module.js");

/* Angular - config */
require("./app/core/config.js");

/* Angular - directives */
require("./app/directive/prevandnext.directive.js");
require("./app/directive/emitstatus.directive.js");
require("./app/directive/itemgenerator.directive.js");
require("./app/directive/text.directive.js");
require("./app/directive/clicktosee.directive.js");
require("./app/directive/qsimple.directive.js");
require("./app/directive/textimg.directive.js");
require("./app/directive/introquiz.directive.js");
require("./app/directive/resultquiz.directive.js");

/* Angular - services */
require("./app/service/data.service.js");
require("./app/service/scorm.service.js");
require("./app/service/quiz.service.js");

/* Angular - routes */
require('./app/home/home.route.js');

/* Angular - controllers */
require('./app/home/HomeController.js');
require('./app/home/section.controller.js');

/* Data */
require('./data/data.json');