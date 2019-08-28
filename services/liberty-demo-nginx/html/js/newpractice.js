$("#startBtn").click(function() {
  initializeGame();
});

$("#menuBtn").click(function() {
  pageRedirect();
});

function initializeGame() {
  // To Do
  var user = $("#userName").val();
  console.log(user);
  if (user === "") {
    alert("Please enter a valid player name");
  } else {
    $.ajax({
      type: "POST",
      crossDomain: true,
      url: "http://localhost:9081/liberty-demo-game/gameapp/game/practice/" + user,
      success: success,
      error: fail,
      dataType: "json"
    });
  }
}

function pageRedirect() {
  window.location.replace("index.html");
}

function fail() {
  alert("Device not connected!");
}

function success() {
  console.log("game started!");
  window.location.replace("game.html");
}
