/* Data */

//fichiers de langues
require("./app/lang/fr.json");

/* img */
require("../assets/img/screen1.jpg");
require("../assets/img/screen2.jpg");
require("../assets/img/vignette_cours1.png");
require("../assets/img/vignette_cours2.png");
require("../assets/img/vignette_cours3.png");
require("../assets/img/vignette_cours4.png");
require("../assets/img/vignette_cours5.png");
require("../assets/img/vignette_cours6.png");
require("../assets/img/vignette_cours7.png");
require("../assets/img/videoposter.jpg");
require("../assets/img/rgpd-lock.svg");
require("../assets/img/rgpd-lock.png");
require("../assets/img/bgmenu.jpg");
require("../assets/img/entreprise.png");
require("../assets/img/register.jpg");
require("../assets/img/blurrbg.jpg");
require("../assets/img/blurrbg2.png");
require("../assets/img/blurrbg3.png");
require("../assets/img/coordonnees.png");
require("../assets/img/woodbg.jpg");

/* video */
require("../assets/video/videotest.mp4");
require("../assets/video/videotest.ogv");
require("../assets/video/videotest.webm");

/*  styles  */
require("./scss/style.scss");

/*  html    */

/* ressources php */
require("./app/edition/save.php");

//view
require("./app/view/layout/layout.html");
require("./app/view/home/home.html");
require("./app/view/home/section.html");
require("./app/view/edition/edition.view.html");
require("./app/view/edition/edition.module.html");
require("./app/view/edition/edition.chapterlist.html");
require("./app/view/edition/edition.pagelist.html");
require("./app/view/edition/popup.html");

//template
require("./app/template/prevandnext/prevandnext.html");
require("./app/template/emitstatus/emitstatus.html");
require("./app/template/text/text.html");
require("./app/template/clicktosee/clicktosee.html");
require("./app/template/qsimple/qsimple.html");
require("./app/template/textimg/textimg.html");
require("./app/template/quiz/introquiz.html");
require("./app/template/quiz/resultquiz.html");
require("./app/template/completionbar/completion_bar.html");
require("./app/template/completionbar/completion_home.html");
require("./app/template/didacticiel/didacticiel.html");
require("./app/template/video/video.html");
require("./app/template/editablefield/editable_field.html");
require("./app/template/langdropdown/langdropdown.html");
require("./app/template/orderlist/orderlist.html");
require("./app/template/orderlist/orderitem.html");
require("./app/template/popup/reprisePopup.html");
require("./app/template/chart/chart.html");

/*  js  */
//Attention à l'ordre d'importation des fichiers

//fix viewport support on safari mobile
require('../node_modules/viewport-units-buggyfill/viewport-units-buggyfill.js').init();

/* Angular */

/* Angular - module */
require("./app/app.module.js");
require("./app/core/core.module.js");
require("../lib/angularjs-scorm-wrapper/angularjs-scorm-wrapper.min.js");
require("./app/component/component.module.js");
require("./app/directive/directive.module.js");
require("./app/layout/layout.module.js");

/* Edition */
require("./app/edition/edition.module.js");
require("./app/edition/edition.route.js");
require("./app/edition/edition.controller.js");
require("./app/edition/module.controller.js");
require("./app/edition/chapterlist.controller.js");
require("./app/edition/pagelist.controller.js");
require("./app/edition/edition.factory.js");

//
require("./app/home/home.module.js");

/* Angular - config */
require("./app/core/config.js");

/* Angular - components */
require("./app/component/completionbar.component.js");
require("./app/component/completionhome.component.js");
require("./app/component/text.component.js");
require("./app/component/textimg.component.js");
require("./app/component/clicktosee.component.js");
require("./app/component/qsimple.component.js");
require("./app/component/introquiz.component.js");
require("./app/component/resultquiz.component.js");
require("./app/component/didacticiel.component.js");
require("./app/component/prevandnext.component.js");
require("./app/component/editableField.component.js");
require("./app/component/langdropdown.component.js");
require("./app/component/orderlist.component.js");
require("./app/component/orderitem.component.js");

/* Angular - directives */
require("./app/directive/emitstatus.directive.js");
require("./app/directive/itemgenerator.directive.js");
require("./app/directive/video.directive.js");
require("./app/directive/asideMenu.directive.js");
require("./app/directive/particles.directive.js");
require("./app/directive/chart.directive.js");

/* Angular - services */
require("./app/service/data.service.js");
require("./app/service/scorm.service.js");
require("./app/service/quiz.service.js");
require("./app/service/locale.service.js");

/* Angular - routes */
require('./app/home/home.route.js');

/* Angular - controllers */
require('./app/home/HomeController.js');
require('./app/home/section.controller.js');
require('./app/edition/edition.controller.js');
require('./app/layout/LayoutController.js');

/* Data */
require('./data/data.json');