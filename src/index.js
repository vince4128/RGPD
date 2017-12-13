/* Data */

//fichiers de langues
require("./app/lang/fr.json");

/* img */
require("../assets/img/screen1.jpg");
require("../assets/img/screen2.jpg");

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
require("./app/template/didacticiel/didacticiel.html");
require("./app/template/video/video.html");
require("./app/template/editablefield/editable_field.html");
require("./app/template/langdropdown/langdropdown.html");
require("./app/template/orderlist/orderlist.html");
require("./app/template/orderlist/orderitem.html");
require("./app/template/popup/reprisePopup.html");

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

/**/ 

/*var canvas = document.querySelector("#canvas");
console.log("Canvas " + canvas)
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
var ctx = canvas.getContext("2d");

var TAU = 2 * Math.PI;

var times = [];
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  draw();
  requestAnimationFrame(loop);
}

function Ball (startX, startY, startVelX, startVelY) {
  this.x = startX || Math.random() * canvas.width;
  this.y = startY || Math.random() * canvas.height;
  this.vel = {
    x: startVelX || Math.random() * 2 - 1,
    y: startVelY || Math.random() * 2 - 1
  };
  this.update = function(canvas) {
    if (this.x > canvas.width + 50 || this.x < -50) {
      this.vel.x = -this.vel.x;
    }
    if (this.y > canvas.height + 50 || this.y < -50) {
      this.vel.y = -this.vel.y;
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
  };
  this.draw = function(ctx, can) {
    ctx.beginPath();
    var distM = distMouse(this);
    if (distM > 200) {
      ctx.fillStyle = "#8f9aa3";
      ctx.globalAlpha = .2;
    } else {
      ctx.fillStyle = '#e74c3c';
      ctx.globalAlpha = 1 - distM / 240;
    }
    ctx.arc((0.5 + this.x) | 0, (0.5 + this.y) | 0, 3, 0, TAU, false);
    ctx.fill();
  }
}

var balls = [];
for (var i = 0; i < canvas.width * canvas.height / (65*65); i++) {
  balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height));
}

var lastTime = Date.now();
function update() {
  var diff = Date.now() - lastTime;
  for (var frame = 0; frame * 16.6667 < diff; frame++) {
    for (var index = 0; index < balls.length; index++) {
      balls[index].update(canvas);
    }
  }
  lastTime = Date.now();
}
var mouseX = -1e9, mouseY = -1e9;
document.addEventListener('mousemove', function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function distMouse(ball) {
  return Math.hypot(ball.x - mouseX, ball.y - mouseY);
}

function draw() {
  for (var index = 0; index < balls.length; index++) {
    var ball = balls[index];
    ctx.beginPath();
    for (var index2 = balls.length - 1; index2 > index; index2 += -1) {
      var ball2 = balls[index2];
	var dist = Math.hypot(ball.x - ball2.x, ball.y - ball2.y);
        if (dist < 100) {
          var distM = distMouse(ball2);
          if (distM > 150) {
            ctx.strokeStyle = "#8f9aa3";
          	ctx.globalAlpha = .2;
          } else {
            ctx.globalAlpha = 0;
          }
          ctx.moveTo((0.5 + ball.x) | 0, (0.5 + ball.y) | 0);
          ctx.lineTo((0.5 + ball2.x) | 0, (0.5 + ball2.y) | 0);
        }
}
    ctx.stroke();
    ball.draw(ctx, canvas);
  }
}

// Start
loop();*/
