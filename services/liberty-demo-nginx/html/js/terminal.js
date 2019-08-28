/**********************************************************
 *********************** TERMINAL **************************
 ***********************************************************/
var bgMusic = $('#audio-bg')[0],
  playing = true;

bgMusic.addEventListener('ended', function() {
  this.currentTime = 0;
  if (playing) {
    this.play();
  }
}, false);

bgMusic.play();

var bind = Function.prototype.bind,
  $append = bind.call(Element.prototype.appendChild, document.querySelector(
    "output")),
  $new = bind.call(Document.prototype.createElement, document),
  $text = bind.call(Document.prototype.createTextNode, document),
  $rnd = function() {
    return 0;
  },
  $promise = function(thenFn) {
    var args, promise, wait, slice = Array.prototype.slice,
      isResolved = false;
    var promise = {
      wait: function(ms) {
        wait = ms;
        return promise;
      },
      then: function() {
        args = slice.call(arguments);
        return promise = $promise(thenFn);
      },
      resolve: function() {
        isResolved = true;
        if (args) {
          var next = Function.prototype.bind.apply(thenFn, [undefined].concat(
            args).concat([promise]));
          wait ? setTimeout(next, wait) : next();
          if (jQuery.inArray("#", args) != -1) {
            bgMusic.pause();
            setTimeout("pageRedirect()", 1000);
          }
        }
      }
    };
    return promise;
  };

var process = function(target, chars, promise) {
  var first = chars[0],
    rest = chars.slice(1);
  if (!first) {
    promise.resolve();
    return;
  }
  target.appendChild(first);
  setTimeout(process.bind(undefined, target, rest, promise), $rnd());
}

var type = function(text, promise) {
  var chars = text.split("").map($text);
  promise = promise || $promise(type);
  $append($new("br"));
  process($append($new("q")), chars, promise);
  return promise;
};
printToTerminal();

function printToTerminal() {
  type("Initiating systems...")
    .then("Connecting to Target and Spaceship systems... ")
    .then("Engaging all Targets... OK")
    .wait(500)
    .then("Starting the Spaceship... OK")
    .wait(500)
    .then("Laser Energy output... 98.9%")
    .wait(500)
    .then("All systems are green")
    .wait(1000)
    .then("#");
}

/*
Desc: Redirect Page
*/
function pageRedirect() {
  window.location.replace("game.html");
}
