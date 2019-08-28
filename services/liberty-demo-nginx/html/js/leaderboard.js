/*var leaders = [{
  name: "Libby",
  points: "124321"
}, {
  name: "Rosie",
  points: "28415"
}, {
  name: "Maven",
  points: "14231"
}, {
  name: "Marvin",
  points: "2321"
}, {
  name: "Martian",
  points: "1134"
}];*/
var x;
var finalScore = document.getElementById('finalScore');
var endMusic = $('#audio-end')[0];
var isRankedGame = false;

history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
/*
for (x in leaders) {
  document.getElementById('board').innerHTML +=
    '<li class="rank">' +
    '<h2 class="name">' + leaders[x].name +
    '</h2>' +
    '<small class="pts">' + leaders[x].points +
    '</small></li>';
  console.log(leaders[x]);
}*/


// Run on the page load
$("#board").hide();
$(endGame());

function endGame() {
  $.get("http://localhost:9081/liberty-demo-game/gameapp/game/score", function(data) {
    showGameStats(data);
  });
  endMusic.play();
}

function showGameStats(data) {
  console.log("GET DATA: " + JSON.stringify(data));
  //var score = JSON.parse(data);
  console.log("GET score: " + data.score);
  console.log("GET leaderboard: " + data.leaderboard);
  finalScore.textContent = data.score;
  var leaders = data.leaderboard;
  var count = 0;
  for (x in leaders) {
    count++;
    var gamestat = leaders[x];
    document.getElementById('board').innerHTML +=
    '<li class="rank">' +
    '<h2 class="name">' + gamestat.pid +
    '</h2>' +
    '<small class="pts">' + gamestat.score +
    '</small></li>';    
  }
  if (count > 0){
    console.log(leaders);
    isRankedGame = true;
    $("#board").show();
  }
}

$("#startOverBtn").click(function() {
  pageRedirect(isRankedGame);
});

function pageRedirect(isRankedGame) {
  if (isRankedGame)
    window.location.replace("newgame.html");
  else 
    window.location.replace("newpractice.html");
}
