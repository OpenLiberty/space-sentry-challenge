(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{109:function(e,t,a){},110:function(e,t,a){},111:function(e,t,a){},112:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(21),r=a.n(s),l=(a(81),a(6)),o=a(7),i=a(9),u=a(8),m=a(10),d=a(14),h=a.n(d),g=(a(15),a(27)),E=a(118),b=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"LinkButton"},c.a.createElement("header",{className:"App"},c.a.createElement(g.b,{to:this.props.route},c.a.createElement(E.a,{size:"lg",variant:"primary"},this.props.name))))}}]),t}(n.Component),p=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"Index"},c.a.createElement("header",{className:"App-header"},c.a.createElement("img",{src:h.a,className:"Logo",alt:"logo"}),c.a.createElement("br",null),c.a.createElement(b,{route:"/gameplay",name:"Space Laser Challenge"}),c.a.createElement("br",null),c.a.createElement(b,{route:"/settings",name:"Settings"}),c.a.createElement("br",null),c.a.createElement(b,{route:"/practice",name:"Practice"})))}}]),t}(n.Component),f=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"App"},c.a.createElement(p,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var A=a(23),v=a(34),w=a(4),N=(a(30),a(31),a(32),a(38),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={minutes:"00",seconds:"59",start:!0},a.startCountDown=a.startCountDown.bind(Object(w.a)(a)),a.tick=a.tick.bind(Object(w.a)(a)),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval(function(){return e.tick()},1e3)}},{key:"tick",value:function(){var e=this.state.seconds-1;this.setState({seconds:e}),e<10&&this.setState({seconds:"0"+this.state.seconds}),0===e&&clearInterval(this.timerID)}},{key:"startCountDown",value:function(){this.intervalHandle=setInterval(this.tick,1e3)}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("div",{className:"col-xs-4 col-md-offset-2"},c.a.createElement("div",{id:"timeLeft"},c.a.createElement("div",Object(v.a)({id:"timerBoard",className:"interface"},"className","column"),c.a.createElement("div",{className:"display-container"},c.a.createElement("div",{id:"gameText"}," Time Left "),c.a.createElement("div",{className:"timer-display"},this.state.minutes,":",this.state.seconds))))))}}]),t}(n.Component)),y=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={source:null,scoreVal:document.getElementById("scoreVal"),score:0},a.updateScore=a.updateScore.bind(Object(w.a)(a)),a.startScoreCheck=a.startScoreCheck.bind(Object(w.a)(a)),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.startScoreCheck()}},{key:"startScoreCheck",value:function(){var e=this,t=new EventSource("http://localhost:9081/liberty-demo-game/gameapp/game/gamestream");t.onmessage=function(t){e.updateScore(t)},this.setState({source:t})}},{key:"updateScore",value:function(e){console.log("EVENT DATA: "+e.data);var t=JSON.parse(e.data);this.setState({score:t.score});parseInt(t.score)}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("div",{className:"col-xs-4 col-md-offset-2"},c.a.createElement("div",{id:"scoreBoard"},c.a.createElement("div",Object(v.a)({className:"interface"},"className","column"),c.a.createElement("div",{className:"display-container"},c.a.createElement("div",{id:"gameText"}," Your Score "),c.a.createElement("div",{className:"score"},c.a.createElement("span",{id:"scoreVal"},this.state.score)))))))}}]),t}(n.Component),k=a(114),S=(a(51),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={minutes:"00",seconds:"59",start:!0,timerDisplay:document.querySelector(".timer-display"),scoreVal:document.getElementById("scoreVal"),beamText:document.getElementById("beamText"),countDownTime:1,movePanLeft:!1,movePanRight:!1,moveTiltUp:!1,moveTiltDown:!1,gameStarted:!1,websocket:null,websocket_url:"ws://localhost:9080/WebSocketLocal/shipsocket",redirect:!1,source:null},a.showGameBoard=a.showGameBoard.bind(Object(w.a)(a)),a.sendSocket=a.sendSocket.bind(Object(w.a)(a)),a.init=a.init.bind(Object(w.a)(a)),a.panShip=a.panShip.bind(Object(w.a)(a)),a.tiltShip=a.tiltShip.bind(Object(w.a)(a)),a.fireLaser=a.fireLaser.bind(Object(w.a)(a)),a.startGame=a.startGame.bind(Object(w.a)(a)),a.toggleBeamOff=a.toggleBeamOff.bind(Object(w.a)(a)),a.toggleBeamOn=a.toggleBeamOn.bind(Object(w.a)(a)),a.moveUp=a.moveUp.bind(Object(w.a)(a)),a.moveDown=a.moveDown.bind(Object(w.a)(a)),a.moveLeft=a.moveLeft.bind(Object(w.a)(a)),a.moveRight=a.moveRight.bind(Object(w.a)(a)),a.arrowDown=a.arrowDown.bind(Object(w.a)(a)),a.arrowUp=a.arrowUp.bind(Object(w.a)(a)),a.stopGameSuccess=a.stopGameSuccess.bind(Object(w.a)(a)),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"startGame",value:function(){this.showGameBoard()}},{key:"stopGameSuccess",value:function(){this.sendSocket("stopShip"),this.setState({gameStarted:!1}),this.state.websocket.close()}},{key:"arrowDown",value:function(e){(e.preventDefault(),32===e.which)&&document.querySelector('.fire-key[data-key="'.concat(e.which,'"]')).classList.add("press");if(37===e.which)this.setState({movePanLeft:!0}),document.querySelector('.arrow-key[data-key="'.concat(e.which,'"]')).classList.add("press");else if(39===e.which){this.setState({movePanRight:!0}),document.querySelector('.arrow-key[data-key="'.concat(e.which,'"]')).classList.add("press")}else if(38===e.which){this.setState({moveTiltUp:!0}),document.querySelector('.arrow-key[data-key="'.concat(e.which,'"]')).classList.add("press")}else if(40===e.which){this.setState({moveTiltDown:!0}),document.querySelector('.arrow-key[data-key="'.concat(e.which,'"]')).classList.add("press")}this.panShip(),this.tiltShip()}},{key:"arrowUp",value:function(e){(e.preventDefault(),32===e.which)&&document.querySelector('.fire-key[data-key="'.concat(e.which,'"]')).classList.remove("press");if(37===e.which)document.querySelector('.arrow-key[data-key="'.concat(e.which,'"]')).classList.remove("press");else if(39===e.which){this.setState({movePanRight:!0}),document.querySelector('.arrow-key[data-key="'.concat(e.which,'"]')).classList.remove("press")}else if(38===e.which){this.setState({moveTiltUp:!0}),document.querySelector('.arrow-key[data-key="'.concat(e.which,'"]')).classList.remove("press")}else if(40===e.which){this.setState({moveTiltDown:!0}),document.querySelector('.arrow-key[data-key="'.concat(e.which,'"]')).classList.remove("press")}32===e.which&&this.fireLaser()}},{key:"toggleBeamOn",value:function(){}},{key:"toggleBeamOff",value:function(){}},{key:"tiltShip",value:function(){this.state.moveTiltUp?(console.log("Moving Up..."),this.sendSocket("VU"),this.setState({moveTiltUp:!1})):this.state.moveTiltDown&&(console.log("Moving Down..."),this.sendSocket("VD"),this.setState({moveTiltDown:!1}))}},{key:"panShip",value:function(){this.state.movePanLeft?(console.log("Moving Left..."),this.sendSocket("HL"),this.setState({movePanLeft:!1})):this.state.movePanRight&&(console.log("Moving Right..."),this.sendSocket("HR"),this.setState({movePanRight:!1}))}},{key:"fireLaser",value:function(){console.log("FIRE!"),this.sendSocket("fireLaser")}},{key:"showGameBoard",value:function(){this.setState({gameStarted:!0}),this.init("localhost:9080/WebSocketLocal/shipsocket"),this.sendSocket("Hello Earthlings!")}},{key:"init",value:function(e){console.log("init %o, %s, %s",this.state.websocket,e),null!==this.state.websocket&&(console.log("yerr"),this.state.websocket.close(),this.setState({websocket:null}));var t="ws://"+e;this.setState({websocket_url:t}),console.log(".. init %s",this.state.websocket_url)}},{key:"sendSocket",value:function(e){var t=this;console.log("sendSocket %o, %s",this.state.websocket,this.state.websocket_url);var a=this;if(null===this.state.websocket){var n=new WebSocket(this.state.websocket_url);n.onmessage=function(e){console.log("Message"+e.data)},n.onerror=function(e){console.log("Error: "+e.data)},n.onopen=function(e){console.log("Connection established!"),a.state.gameStarted&&a.sendSocket("starrrrtShip")},n.onclose=function(e){t.setState({websocket:null}),console.log("Connection closed : "+e.code)},a.setState({websocket:n})}else e&&this.state.gameStarted&&(console.log("Sending message : ",e),this.state.websocket.send(e));return console.log(".. sendSocket %o, %s",this.state.websocket,this.state.websocket_url),this.state.websocket}},{key:"moveUp",value:function(){var e=this;this.setState({moveTiltUp:!0},function(){e.tiltShip()})}},{key:"moveDown",value:function(){var e=this;this.setState({moveTiltDown:!0},function(){e.tiltShip()})}},{key:"moveLeft",value:function(){var e=this;this.setState({movePanLeft:!0},function(){e.panShip()})}},{key:"moveRight",value:function(){var e=this;this.setState({movePanRight:!0},function(){e.panShip()})}},{key:"componentDidMount",value:function(){var e=this;window.addEventListener("keyup",this.arrowUp),window.addEventListener("keydown",this.arrowDown),this.startGame(),this.id=setTimeout(function(){return e.setState({redirect:!0})},6e4)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("keyup",this.arrowUp),window.removeEventListener("keydown",this.arrowDown)}},{key:"render",value:function(){var e=this;return this.state.redirect?c.a.createElement(A.a,{to:"/Leaderboard"}):c.a.createElement("div",null,c.a.createElement(k.a,null,c.a.createElement("div",{id:"arrowKeys",className:"col-md-12 col-centered text-center"},c.a.createElement("div",{className:"arrow-key-container"},c.a.createElement("div",{id:"arrowUp",className:"arrow-key up","data-key":"38",onClick:function(t){return e.moveUp()}}),c.a.createElement("br",null),c.a.createElement("div",{id:"arrowLeft",className:"arrow-key left","data-key":"37",onClick:function(t){return e.moveLeft()}}),c.a.createElement("div",{id:"arrowDown",className:"arrow-key down","data-key":"40",onClick:function(t){return e.moveDown()}}),c.a.createElement("div",{id:"arrowRight",className:"arrow-key right","data-key":"39",onClick:function(t){return e.moveRight()}})))),c.a.createElement(k.a,null,c.a.createElement("div",{className:"col-md-11 col-centered text-center"},c.a.createElement("div",{className:"fire-key-container"},c.a.createElement("div",{id:"fireLaser",className:"fire-key fire","data-key":"32",onClick:function(t){return e.fireLaser()}},c.a.createElement("span",{id:"beamText"},"FIRE BEAM"))))),c.a.createElement(k.a,null,c.a.createElement("div",{className:"col-md-11 col-centered text-center"},c.a.createElement(b,{id:"stop_button",className:"secondary",route:"/",name:"Stop Game"}))))}}]),t}(n.Component)),O=a(115),j=a(71),C=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"Game"},c.a.createElement("header",{className:"App-header"},c.a.createElement("img",{src:h.a,className:"Logo",alt:"logo"}),c.a.createElement("div",{className:"container"},c.a.createElement(O.a,{className:"justify-center display-container"},c.a.createElement(k.a,null,c.a.createElement("p",{id:"gameInstText",className:"text-center"},"Press the arrow keys below or use the arrow keys on your keyboard to move the OpenLiberty Spaceship.",c.a.createElement("br",null),"Press the FIRE button below or the space bar on your keyboard to fire the beam!"),c.a.createElement(j.a,null,c.a.createElement(N,null)),c.a.createElement(j.a,{className:"justify-center"},c.a.createElement(y,null)))),c.a.createElement(S,null))))}}]),t}(n.Component),B=(a(86),a(117)),_=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={value:""},a.handleChange=a.handleChange.bind(Object(w.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(w.a)(a)),a.sendUser=a.sendUser.bind(Object(w.a)(a)),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleSubmit",value:function(e){this.sendUser(),e.preventDefault()}},{key:"sendUser",value:function(){if(""===this.state.value)alert("Please enter a valid user name");else{var e=this.state.value;fetch("http://localhost:9081/liberty-demo-game/gameapp/game/"+this.state.value,{method:"POST",body:e}).then(function(e){return e.json()}).then(function(e){return console.log("Result:",JSON.stringify(e))},function(e){return console.log("Error:",JSON.stringify(e))})}}},{key:"render",value:function(){return c.a.createElement("div",{className:"EnterName"},c.a.createElement("header",{className:"App"},c.a.createElement(B.a,{onSubmit:this.handleSubmit},c.a.createElement(B.a.Group,{controlId:"formBasicEmail"},c.a.createElement(B.a.Control,{type:"text",placeholder:"Enter your User Name",value:this.state.value,onChange:this.handleChange}),c.a.createElement(B.a.Text,{className:"text-muted"},this.props.underbar)))))}}]),t}(n.Component),D=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"GamePlay"},c.a.createElement("header",{className:"App-header"},c.a.createElement("img",{src:h.a,className:"Logo",alt:"logo"}),c.a.createElement("br",null),c.a.createElement(_,{underbar:"Look for your name on our Leaderboards!!"}),c.a.createElement(b,{route:"/loading",name:"Start Game"}),c.a.createElement("br",null),c.a.createElement(b,{route:"/",name:"Return to Main Menu"})))}}]),t}(n.Component),M=a(116),Q=function(e){function t(e,a){var n;return Object(l.a)(this,t),(n=Object(i.a)(this,Object(u.a)(t).call(this,e,a))).handleShow=n.handleShow.bind(Object(w.a)(n)),n.handleClose=n.handleClose.bind(Object(w.a)(n)),n.state={show:!0},n}return Object(m.a)(t,e),Object(o.a)(t,[{key:"handleClose",value:function(){this.setState({show:!1})}},{key:"handleShow",value:function(){this.setState({show:!0})}},{key:"render",value:function(){return c.a.createElement("div",{className:"PracticeModal"},c.a.createElement("header",{className:""},c.a.createElement(M.a,{show:this.state.show,onHide:this.handleClose,centered:!0},c.a.createElement(M.a.Header,{closeButton:!0},c.a.createElement(M.a.Title,null,"Practice Mode!")),c.a.createElement(M.a.Body,null,c.a.createElement("p",null,"Practice shooting all the targets in one minute but your rank will not be affected")))))}}]),t}(n.Component),I=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).sendUser=a.sendUser.bind(Object(w.a)(a)),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"sendUser",value:function(){fetch("http://localhost:9081/liberty-demo-game/gameapp/game/user",{method:"POST"}).then(function(e){return e.json()}).then(function(e){return console.log("Result:",JSON.stringify(e))},function(e){return console.log("Error:",JSON.stringify(e))})}},{key:"componentDidMount",value:function(){this.sendUser()}},{key:"render",value:function(){return c.a.createElement("div",{className:"Practice"},c.a.createElement("header",{className:"App-header"},c.a.createElement(Q,null),c.a.createElement("img",{src:h.a,className:"Logo",alt:"logo"}),c.a.createElement("br",null),c.a.createElement(b,{route:"/game",name:"Start Practice"}),c.a.createElement("br",null),c.a.createElement(b,{route:"/",name:"Return to Main Menu"})))}}]),t}(n.Component),L=a(74),T=a.n(L),U=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={redirect:!1},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.id=setTimeout(function(){return e.setState({redirect:!0})},12e3)}},{key:"componentWillUnmount",value:function(){clearTimeout(this.id)}},{key:"render",value:function(){return this.state.redirect?c.a.createElement(A.a,{to:"/game"}):c.a.createElement("div",{className:"Game"},c.a.createElement("header",{className:"App-header"},c.a.createElement("img",{src:h.a,className:"Logo",alt:"logo"}),c.a.createElement(T.a,{url:"http://localhost:8080/terminal-cut.mp4",playing:!0,width:"1500px",height:"500px"})))}}]),t}(n.Component),G=a(75),P=a.n(G),x=(a(109),a(110),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={finalScore:0},a.endGame=a.endGame.bind(Object(w.a)(a)),a.showGameStats=a.showGameStats.bind(Object(w.a)(a)),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"endGame",value:function(){var e=this;fetch("http://localhost:9081/liberty-demo-game/gameapp/game/score").then(function(e){return e.json()}).then(function(t){return e.showGameStats(t)})}},{key:"showGameStats",value:function(e){console.log("GET DATA: "+JSON.stringify(e)),console.log("GET score: "+e.score),this.setState({finalScore:e.score}),console.log("GET leaderboard: "+e.leaderboard);var t=e.leaderboard,a=0;for(var n in t){a++;var c=t[n];document.getElementById("board").innerHTML+='<li class="rank"><h2 class="name">'+c.pid+'</h2><small class="pts">'+c.score+"</small></li>"}a>0&&console.log(t)}},{key:"componentDidMount",value:function(){this.endGame()}},{key:"render",value:function(){return c.a.createElement("div",{className:""},c.a.createElement("header",{className:"App-header"},c.a.createElement(O.a,{className:""},c.a.createElement(k.a,null,c.a.createElement(j.a,{className:"text-center"},c.a.createElement("img",{src:h.a,className:"Logo-small",alt:"OpenLibertyGameLogo"})))),c.a.createElement(O.a,null,c.a.createElement(k.a,null,c.a.createElement("div",{id:"results",className:"col-md-4 p-0"},c.a.createElement("div",{id:"message",className:"m-0"}," Challenge Over! "),c.a.createElement("div",{id:"finalScoreWrapper",className:"m-0"}," Your Score : ",this.state.finalScore),c.a.createElement("div",{id:"board",className:"leaderboard text-center"},c.a.createElement("h2",{className:"title"},c.a.createElement("img",{id:"trophy",src:P.a}),"LEADERBOARD"),c.a.createElement("ol",{id:"board",className:"leaderboard"})),c.a.createElement("div",{className:"text-center"},c.a.createElement("br",null),c.a.createElement(b,{route:"/",name:"Return to Main Menu"})))))))}}]),t}(n.Component)),R=(a(111),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={target_status:"Connecting...",target_ip:null,ship_status:"Connecting...",ship_ip:null},a.getDevicesStatus=a.getDevicesStatus.bind(Object(w.a)(a)),a.showDevicesStatus=a.showDevicesStatus.bind(Object(w.a)(a)),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.getDevicesStatus()}},{key:"getDevicesStatus",value:function(){var e=this;fetch("http://localhost:9083/liberty-demo-admin/adminapp/admin/devices/targets").then(function(e){return e.json()}).then(function(t){return e.showDevicesStatus(t,"targets")},function(e){return console.log(e)}),fetch("http://localhost:9083/liberty-demo-admin/adminapp/admin/devices/ship").then(function(e){return e.json()}).then(function(t){return e.showDevicesStatus(t,"ship")},function(e){return console.log(e)})}},{key:"showDevicesStatus",value:function(e,t){console.log("GET DATA: "+JSON.stringify(e)),"targets"===t?"true"===e.targets_connected?this.setState({target_status:"Connected!",target_ip:e.targets_ip}):this.setState({target_status:"Not Connected"}):"ship"===t&&("true"===e.ship_connected?this.setState({ship_status:"Connected!",ship_ip:e.ship_ip}):this.setState({ship_status:"Not Connected"}))}},{key:"render",value:function(){return c.a.createElement("div",{className:"Game"},c.a.createElement("div",{class:"App-header"},c.a.createElement(k.a,null,c.a.createElement(j.a,{className:"text-center"},c.a.createElement("img",{src:h.a,className:"Logo-small",alt:"OpenLibertyGameLogo"}))),c.a.createElement(k.a,null,c.a.createElement("div",{className:"futurepanel"},c.a.createElement("div",{className:"futurepanel__header"},c.a.createElement("h1",{className:"futurepanel__title"},"Targets Config")),c.a.createElement("div",{className:"futurepanel__body"},c.a.createElement("div",null,c.a.createElement("h4",{className:"heading"},"Targets Array"),c.a.createElement("button",{className:"futurebutton",id:"target_button",disabled:!0},"Connect"),c.a.createElement("div",null," Status: ",c.a.createElement("span",{id:"target_status"},this.state.target_status)," "),c.a.createElement("div",null," IP: ",c.a.createElement("span",{id:"target_ip"},this.state.target_ip)," "),c.a.createElement("div",{className:"futurepanel__divider"})),c.a.createElement("div",null,c.a.createElement("div",{className:"futuregrid"},c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"T1"),c.a.createElement("button",{className:"futurebutton",id:"target_button1"},"Toggle")),c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"T2"),c.a.createElement("button",{className:"futurebutton",id:"target_button2"},"Toggle")),c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"T3"),c.a.createElement("button",{className:"futurebutton",id:"target_button3"},"Toggle")),c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"T4"),c.a.createElement("button",{className:"futurebutton",id:"target_button4"},"Toggle")),c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"T5"),c.a.createElement("button",{className:"futurebutton",id:"target_button5"},"Toggle"))),c.a.createElement("div",{className:"futurepanel__divider"})),c.a.createElement("div",null,c.a.createElement("div",{className:"futuregrid"},c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"All up"),c.a.createElement("button",{className:"futurebutton",id:"allup_button"},"run")),c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"All down"),c.a.createElement("button",{className:"futurebutton",id:"alldown_button"},"run")),c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"Cycle"),c.a.createElement("button",{className:"futurebutton",id:"cycle_button"},"run"))),c.a.createElement("div",{className:"futurepanel__divider"})),c.a.createElement("div",null,c.a.createElement("div",{className:"futuregrid"},c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"Laser value"),c.a.createElement("div",{className:"futureinput futureinput--text"},c.a.createElement("input",{type:"number",name:"litinput",id:"litinput",placeholder:"240"})),c.a.createElement("button",{id:"litupdate_button",className:"futurebutton"},"update")),c.a.createElement("div",{className:"futurepanel__divider"}),c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"Piezo value"),c.a.createElement("div",{className:"futureinput futureinput--text"},c.a.createElement("input",{type:"number",name:"hitinput",id:"hitinput",placeholder:"150"})),c.a.createElement("button",{id:"hitupdate_button",class:"futurebutton"},"update"))),c.a.createElement("div",{className:"futurepanel__divider"})))),c.a.createElement("div",{className:"futurepanel"},c.a.createElement("div",{className:"futurepanel__header"},c.a.createElement("h1",{className:"futurepanel__title"},"Spaceship Config")),c.a.createElement("div",{className:"futurepanel__body"},c.a.createElement("div",null,c.a.createElement("h4",{className:"heading"},"Spaceship"),c.a.createElement("button",{className:"futurebutton",id:"ship_button",disabled:!0},"Connect"),c.a.createElement("div",null," Status: ",c.a.createElement("span",{id:"ship_status"},this.state.ship_status)," "),c.a.createElement("div",null," IP: ",c.a.createElement("span",{id:"ship_ip"},this.state.ship_ip)," "),c.a.createElement("div",{className:"futurepanel__divider"})),c.a.createElement("div",{className:"futuregrid"},c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"Sweep Pan"),c.a.createElement("button",{className:"futurebutton",id:"ship_sweep_pan_btn"},"RUN")),c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"Sweep Tilt"),c.a.createElement("button",{className:"futurebutton",id:"ship_sweep_tilt_btn"},"RUN")),c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"Laser on"),c.a.createElement("button",{className:"futurebutton",id:"ship_firebutton"},"TOGGLE")),c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"Laser Off"),c.a.createElement("button",{className:"futurebutton",id:"ship_firebutton_off"},"Toggle")),c.a.createElement("div",{className:"futuregrid__row"},c.a.createElement("h4",{className:"futuregrid__cell"},"Reset"),c.a.createElement("button",{className:"futurebutton",id:"ship_reset"},"RUN")))))),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-md-11 col-centered text-center"},c.a.createElement(b,{route:"/",name:"Return to Main Menu"})))))}}]),t}(n.Component));r.a.render(c.a.createElement(g.a,null,c.a.createElement("div",null,c.a.createElement(A.b,{exact:!0,path:"/",component:f}),c.a.createElement(A.b,{path:"/gameplay",component:D}),c.a.createElement(A.b,{path:"/practice",component:I}),c.a.createElement(A.b,{path:"/game",component:C}),c.a.createElement(A.b,{path:"/loading",component:U}),c.a.createElement(A.b,{path:"/leaderboard",component:x}),c.a.createElement(A.b,{path:"/settings",component:R}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},14:function(e,t,a){e.exports=a.p+"static/media/logo.201ab4b5.png"},15:function(e,t,a){},30:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){},38:function(e,t,a){},51:function(e,t,a){},75:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKtQTFRFAAAA3sMs7cwM8NQw3sMs7cwM8NQw3sMs7cwM8NQw3sMs58wu7cwM8NQw3sMs7cwM8NQw3sMs7cwM8NQw3sMs7cwM8NQw3sMs7cwM79Ae8NQw3sMs7cwM8NQw3sMs5cou7cwM8NQw3sMs7cwM8NQw3sMs48ct7cwM79Ae8NQw3sMs7cwM8NQw3sMs4cUt7cwM8NQw3sMs7cwM8NQw3sMs48ct7cwM79Ae8NQw1Z1dlwAAADR0Uk5TABAQECAgIDAwMEBAQEBQUFBgYGBwcHCAgICAj4+Pn5+fn6+vr7+/v7+/z8/P39/f3+/v7xdtVt4AAAjRSURBVHja7Z1bQ+I6FIUj0AqeKoIiPczIUJHD4eKpFIbN//9l52UuSpvSJCtNmsl69Ml83cnal7Qw5uXl5eXl5eXl5eXl5eXl5eXl5eXlVUHRKEbo7wlAT7f1r39zxIhOEG1rB3C0C8DJA/BboGbN7AKQ1A5gZBeAp/pd0C4ABnzQLgCssYkANfQMhJ2CGACvBgDENgGYmKgFbAJg4AxkLZsAtE2Ug6k9AN6N1MNzewCsjACI7QEwMQKgbw+AeyMAAnsA9Mw0xewBYKgruLQFwNYQgK+2AEgMARjZAmBiCEBkC4BbQwCYLQBCUwBSSwAYGw7N7QCwMgYgtgNAYgxA3w4AE2MAunYAMGYCEBugBpsAJBmmBpsApDNMDTYBiA1Qg00AkgxTg00A0hMhm00giC7d8LEBwLdxuW46kn3/EeoOhGYA3w+XtH68ksjysuPRFQCHw+7OSLfHHgCHwxdL118bADEC/aN7AA4iuyB1EcBb9fUPjy4COAxqHntaB+ClMoDMTQC7ui+A2Qbg4AEAAKTzOI7j5W9lhgFsV/8sfmg8Ho+na60ANhG8KaQKIPcP3az1AUhb+JxREcA+/x9dvWkD0NcwIVUEUNQPu9MFINPRFFIE8Fz0P+00AVjquC6oCKCwH7ZQBcApBWY6siZFAIX9sKlqMcA52WMdswFFAIVDkXExgIUqgJmO1gGBXbAkAhaq7ZCljosyagCKr0ctVFsisQiAyCSAVxEAY+V+gI5b44Q3AabcD+A91EBD6aQGoPCObIcD4Kb6SEAgE1S1AcK7IC8TFBgOHEV8cGYQABNwwep5EPehzjWMiJUAFL8o8aLqgtyHmmqwAUKXQoxxqsEpYO7fwo+ICV4KXR1UXZD/UCO8DSgBKHxj+EbZBPg2oKEaILgJjNVNgFsPzvFjBIKXQi/KgyH+mlK8DRDcBd9UxyJlFU4AH6US2gR4eeAj5PZTH35hVAVAIpIHXkPugMZwGyB0KQTIA0tO9uKKeGMIwL1ALbwQBBCLVMRzQwB6ArXwWBBAVyQVig0BEEmDBI8AbrN3hL5QoQCgsB/2qDoavxDWc3Q5pADgVSANehEGMBSYDjEzACYCU6GBMABeOdAFX6pSAPBQ8J9cIwqBUm8bgcshwpZCnCNgLXFXeCRwCMRGAAgcAY8SAAKBQ2BkAsC7wBEgdWF8U/0QiEwAWFU/AmR2APexxtjhCEFNYIzbAdw9sMTOyAlqAgvgDuDugRbUBghpAlfIHcDNhfrQGTkhTeAOlQWV7uwZ1AYIaQJTWBZUNh9JoTZAyErgTXkiUmlZXeRwhIAmcK0+EKiU439FlkMEbAd9AfTDq2ztDdIGCNgOWgOTgB/HYFa1OT6rHUDVhvjuSgEAZ10jYDlEuHbQI/gI5B9uG6ANyAJIqu6AjhIAzt4OcDZAMBPoQNrh1Z5sjLMBgiXCY7QHloRAirMBWQDtalmQagDwCoIubDgiCWBfMQsaKAMoToZmMBsgVDdkik6CSkMgg83ICXUG7jQFACcEhqgZOYES4YGuAOCEwBJlA5IAwkq9IEgAcA74ADQjJ0wi3NFjASW5wFeQDRDmDJxqyQHKQiBrYWxADsD5DcmrncYA4OS5I4wNyAF4qFIHdWAACnueKcYGCNIMeFP/bIp4X2AIsQFCnIEDeB+gihVuIDZAiDNwrc8Cy87BCNEUIkAeeKP1BOTv8CViNkCAPHCBuBQlc28uAjSFSL0WvgHcipObFKaAU1AGwPaiBazx6y/cBEP1nggpp0GDOjYAZxN8/qREXBeAT0dA+79aNgBnE8TKhwCpZgGT77VsAMYYC/LpUBaoHgISAD6NRcN9DsDuWhOAonRorloQkmIhsMp/R2jAtGlWfl1iWA+AjyZ4n/+Q0lTf+llrU1oWB7UA+GiC7X0OwPpKIwDWzUo3waYOAB93wOvpHIC+A4Bb9Q+VsmFS2QEPpxyAO6ZZ+TVmXZU9QAoe0NvnADwy7cofhJuWQjJI8jugvT2dA5iyGjQvmRMNtQP4MBNLTucAFnWsv8gK4gtXSoAAftcBk9M5AL0GUEpgKN0VEQUQfjoAPwGoa/2FBPqyrVGSbIb9Wv8vAPWtvyjSf1nBUi+A208G8BHArsNqVJCLgSySOwbFAPy8H3v/e/0/AKyvWa3inwOpTgAP5/H/E0Cd8c8lMJIJAZIIgKfTOYD6189YqyAfaImHAAkHQDs5nQNYGFh/cU7YFQ4BEg2A3vZ0DmDKDCm/1GwkGgIkGABP+/O/fh8wY4ryid+yKxYCJBQAvVU+N/6LGVSrwPZnrY0eAPdhUpAZtZlZFfTCs6UWAO+TfcUXqOtVV+3XeJQ+o7PtMRtk7DtCE2aJAiNvj69CZo+itG4A77fMLg3TOgG8PzD7JIeAXFk+Y4xFszoAvN4yeyX+E3WCALZPIbNcwWiuC8DK/tX/3AvxPMUCeH+d3LKGKYqWGADP941bO79rJAHgmTVXFeYkFwGsWJPVzVQBbNvMbQIXAOxD1nANlQDse4w5ToBcX/8lAuT8+i+cA+T++ssJ0B+w/qJZ6mUALq2/cI52AcA2ZG4pFgPw2mauKcoEAEyYgyreBtSEhidK/awSgOc2c1Wt+DKA7S1zWcEsKwVgbcMXGAXDOQ/A6rnH/gjxALA/RR6AB+ABeAAegAfgAXgAHoCzAIK4VDwAk1I1qUc203FBImlQAOi5IRK6GAAiABIXA0DojlDoYAAIAUgcDACxa3KhewEgBiBxLwAEL0qGzgWAIIDEuQAQvSobuhYAogAS1wJA/vsBjgSAMIDEsQAQf18gdCsAxAEkbgWAxBsjoVMBIAEgcSoAZF6aCl0KABkAiUsBIPXaXOhQAEgBSBwKALk3R0N3AkAOQOJOAEi+Oxw6EwCSABJnAgD2MztNDQBZAIkrASD9AYXQkQBA/uJkIwNA/hsioRsBIA8gcSMAFL4iEzoRAAoAEicCQOVDSqELAaACwJ4QWCro35W8mJeXl5eXl5eXl5eXl5eXl5eXl7D+B8FIHoWCrKOQAAAAAElFTkSuQmCC"},76:function(e,t,a){e.exports=a(112)},81:function(e,t,a){}},[[76,1,2]]]);
//# sourceMappingURL=main.aefbd35f.chunk.js.map