
var circX, circY; //where the circle will be drawn for the analog stick
var baseX, baseY; //where the base of the analog stick will be drawn
var touchable = 'createTouch' in document;
var joystickTouch;
var dPadTouching = false;
var halfX = (window.innerWidth/2);
var rad = 40;
var updateTime = Date.now();

var circleColor = "rgba(255, 0, 0, 1)";
var tap = false;
var doubleTap = false;
var swipe = false;

var dPadObj;
var side;
var touchObj;

// picks which controller the to load
function pickControllerOptions(tapFunction, doubleTapFunction, swipeRFunction, swipeLFunction, swipeUFunction, swipeDFunction, startTouch, moveTouch, endTouch) {
  forceScreenOrientation();
  return myGameController(tapFunction, doubleTapFunction, swipeRFunction, swipeLFunction, swipeUFunction, swipeDFunction, startTouch, moveTouch, endTouch);
}

  // Default is to return the game controller
  return myGameController(tapFunction, doubleTapFunction, swipeRFunction, swipeLFunction, swipeUFunction, swipeDFunction, startTouch, moveTouch, endTouch);
}

// spacially customizable controller
function myGameController(tapFunction, doubleTapFunction, swipeRFunction, swipeLFunction, swipeUFunction, swipeDFunction, startTouch, moveTouch, endTouch){
    this.getAnDirection = getAnDirection;
    this.getDigDirection = getDigDirection;

    var dPadCanvas;
    var touchCanvas = prompt("Would like the action pad on the left or right?");
    touchCanvas = touchCanvas.toLowerCase();
    while(touchCanvas != "left" && touchCanvas != "right") {
      touchCanvas = prompt("Invalid entry. Would like the action pad on the left or right?");
      touchCanvas = touchCanvas.toLowerCase();
    }

    switch(touchCanvas) {
      case "left":
      dPadCanvas = "right";
      break;
      case "right":
      dPadCanvas = "left";
      break;
    }

    switch(touchCanvas) {
      case "left":
      side = "right";
      touchObj = touchObject(touchCanvas, tapFunction, doubleTapFunction, swipeRFunction, swipeLFunction, swipeUFunction, swipeDFunction);
      dPadObj = dPadObject(dPadCanvas, startTouch, moveTouch, endTouch);
      break;
      case "right":
      side = "left";
      dPadObj = dPadObject(dPadCanvas, startTouch, moveTouch, endTouch);
      touchObj = touchObject(touchCanvas, tapFunction, doubleTapFunction, swipeRFunction, swipeLFunction, swipeUFunction, swipeDFunction);
      break;
    }

    setInterval(drawTouchAction, 1000/35);
    setInterval(drawDPad, 1000/35); //calls draw function 1000/35 times per second continuously

    window.onorientationchange = resetCanvas;
    window.onresize = resetCanvas;

}//myjoystick

//  fully customizable controller
function myDevController(controllerOptionsObj) {
  if(controlelrOptionsObj.number) {

  }
}

// gets canvas requirements from controllerFormOptions form
function retrieveControllerOptions() {
  var numCanvases = document.getElementsByName("numCanvases")[0].value;
  var mainFunction;
  var mainCanvasColor;
  var leftFunction;
  var leftColor;
  var rightFunction;
  var rightColor;
  switch(numCanvases) {
    case "1":
    var joystick = document.getElementById("joystickFunction");
    if(joystick.checked) {
      mainFunction = "joystick";
    } else {
      mainFunction = "actionpad";
    }
    break;
    case "2":
    var leftjoystick = document.getElementById("joystick");
    var leftaction = document.getElementById("aPad");
    var rightstick = document.getElementById("stick");
    var rightaction = document.getElementById("action");
    if(leftjoystick.checked) {
      leftFunction = "joystick";
    }
    if(leftaction.checked) {
      leftFunction = "actionpad";
    }
    if(rightstick.checked) {
      rightFunction = "joystick";
    }
    if(rightaction.checked) {
      rightFunction = "actionpad";
    }
    break;
  }
  var optionsObj = {
    number: numCanvases,
    main: mainFunction,
    mainColor: mainCanvasColor,
    LeftCanvas: leftFunction,
    LeftColor: leftColor,
    RightCanvas: rightFunction,
    RightColor: rightColor
  };
  myDevController(optionsObj);
}

// kinda forces orientation, forces alert that closes when orientation is in landscape mode
function forceScreenOrientation() {
  // in portrait mode
  while(window.matchMedia("(orientation: portrait)").matches) {
    alert("Please change device to landscape mode");
    if(!!window.chrome || !!window.chrome.webstore) {  // if chrome
      alert("Reload it in landscape mode for proper functionality, or use another browser."); // need to fix reset method to remove this alert
      break;
    } else {
      alert();
    }
  }
}

function resetCanvas (e) {
  // resize the canvas - but remember - this clears the canvas too.
  var canvases = document.getElementsByName('canvas')
  for( var i = 0; i < canvases.length; i++ ) {
      canvases.width = window.innerWidth;
      canvases.height = window.innerHeight*2;
  }
  //make sure we scroll to the top left.
  window.scrollTo(0,0);
}

function drawDPad() {
  dPadObj.Canvas.context.clearRect(0, 0, dPadObj.Canvas.Canvas.width, dPadObj.Canvas.Canvas.height*2);
  if(dPadTouching) {
    switch(side) {
      case "left":
      drawJoystickLeftSide();
      break;
      case "right":
      drawJoystickRightSide();
      break;
    }
  }
  //dPadObj.Canvas.context.clearRect(0, 0, dPadObj.Canvas.width, dPadObj.Canvas.height*2);
}

function drawTouchAction() {
  touchObj.Canvas.context.beginPath();
  touchObj.Canvas.context.strokeStyle = circleColor;//red base
  touchObj.Canvas.context.lineWidth = "10";
  touchObj.Canvas.context.arc(300, 300, 65, 0, Math.PI*2, true);
}

function drawJoystickLeftSide(){
  var arcRadius = 65;
  var canvasObj = dPadObj.Canvas;
  var digDirection = getDigDirection();
  var digx = digDirection.xdig;
  var digy = digDirection.ydig;

  var anlDirection = getAnDirection();
  var anlx = anlDirection.xdir;
  var anly = anlDirection.ydir;

  canvasObj.context.beginPath();
  canvasObj.context.strokeStyle = "rgba(255, 0, 0, 0.5)";//red base
  canvasObj.context.lineWidth = "10";
  canvasObj.context.arc(baseX*2, baseY*2, arcRadius, 0, Math.PI*2, true);
  canvasObj.context.stroke();

  canvasObj.context.beginPath();
  canvasObj.context.strokeStyle = "rgba(0, 255, 0, 0.5)";//green stick
  canvasObj.context.lineWidth = "10";
  canvasObj.context.arc(circX*2, circY*2, arcRadius, 0, Math.PI*2, true);
  canvasObj.context.stroke();

  canvasObj.context.fillStyle = "rgba(255, 255, 0, 1)";// gold on black
  canvasObj.context.fillText('digx: '+digx, 10, 20);

  canvasObj.context.fillStyle = "rgba(255, 255, 0, 1)";// gold on black
  canvasObj.context.fillText('digy: '+digy, 10, 40);

  canvasObj.context.fillStyle = "rgba(255, 255, 0, 1)";// gold on black
  canvasObj.context.fillText('anlx: '+anlx, 10, 60);

  canvasObj.context.fillStyle = "rgba(255, 255, 0, 1)";// gold on black
  canvasObj.context.fillText('anly: '+anly, 10, 80);
}//drawJoystick

function drawJoystickRightSide(e){
  var arcRadius = 65;
  var canvasObj = dPadObj.Canvas;
  var digDirection = getDigDirection();
  var digx = digDirection.xdig;
  var digy = digDirection.ydig;

  var anlDirection = getAnDirection();
  var anlx = anlDirection.xdir;
  var anly = anlDirection.ydir;

  canvasObj.context.beginPath();
  canvasObj.context.strokeStyle = "rgba(255, 0, 0, 0.5)";//red base
  canvasObj.context.lineWidth = "10";
  canvasObj.context.arc(baseX, baseY*2, arcRadius, 0, Math.PI*2, true);
  canvasObj.context.stroke();

  canvasObj.context.beginPath();
  canvasObj.context.strokeStyle = "rgba(0, 255, 0, 0.5)";//green stick
  canvasObj.context.lineWidth = "10";
  canvasObj.context.arc(circX, circY*2, arcRadius, 0, Math.PI*2, true);
  canvasObj.context.stroke();

  canvasObj.context.fillStyle = "rgba(255, 255, 0, 1)";// gold on black
  canvasObj.context.fillText('digx: '+digx, 10, 20);

  canvasObj.context.fillStyle = "rgba(255, 255, 0, 1)";// gold on black
  canvasObj.context.fillText('digy: '+digy, 10, 40);

  canvasObj.context.fillStyle = "rgba(255, 255, 0, 1)";// gold on black
  canvasObj.context.fillText('anlx: '+anlx, 10, 60);

  canvasObj.context.fillStyle = "rgba(255, 255, 0, 1)";// gold on black
  canvasObj.context.fillText('anly: '+anly, 10, 80);
}//drawJoystick


// Returns an object with xdir and ydir that has the direction between
// -1 and 1 in each position
function getAnDirection(){
  var x = baseX-circX;
  var y = baseY-circY;

  var sin = (y/Math.sqrt((x*x)+(y*y)));
  var cos = -1*(x/Math.sqrt((x*x)+(y*y)));

  var xdir = (Math.abs(x)/rad)*cos;
  var ydir = (Math.abs(y)/rad)*sin;

  if(isNaN(xdir) || !dPadTouching){
    xdir = 0;
  }//if checking if NaN

  if(isNaN(ydir) || !dPadTouching){
    ydir = 0;
  }//if checking if NaN

  var analogDir = {'xdir': xdir, 'ydir': ydir};
  return analogDir;
}//getDirection

// Returns an object with xdir and ydir that has either -1, 1, or 0 for
// each value
function getDigDirection(){
  var x = baseX-circX;
  var y = baseY-circY;

  var sin = (y/Math.sqrt((x*x)+(y*y)));
  var cos = -1*(x/Math.sqrt((x*x)+(y*y)));

  var xdir = (Math.abs(x)/rad)*cos;
  var ydir = (Math.abs(y)/rad)*sin;

  var xdig = 0;
  var ydig = 0;

  if((xdir < 0.5 && xdir > (-0.5)) || isNaN(xdir) || !dPadTouching){
    xdig = 0;
  } else if(xdir <= 0.5 && dPadTouching){
    xdig = -1;
  } else {
    xdig = 1;
  }//xdig if else

  if(ydir>=0.2&&dPadTouching){
    ydig = 1;
  } else if(ydir <= (-0.2) && dPadTouching){
    ydig = -1;
  } else {
    ydig = 0;
  }//if else for ydig

  var digital = {'xdig': xdig, 'ydig': ydig};

  return digital;
}//getDigDirection

function dPadObject(SelectedCanvas, startTouch, moveTouch, endTouch) {
  var canvasObj;

  switch(SelectedCanvas) {
    case "left":
    canvasObj = setupCanvasL();
    break;
    case "right":
    canvasObj = setupCanvasR();
    break;
  }

  canvasObj.Canvas.addEventListener( 'touchstart', function(e){
    joystickTouch = e.targetTouches[0];
    baseX = joystickTouch.clientX;
    baseY = joystickTouch.clientY;
    circX = baseX;
    circY = baseY;
    dPadTouching = true;
      console.log("BaseX:" +baseX);
    startTouch();
  }, false );

  canvasObj.Canvas.addEventListener( 'touchmove', function(e){
    e.preventDefault();
    touch = e.targetTouches[0];
    touchX = touch.clientX;
    touchY = touch.clientY;
    var dist = Math.sqrt(Math.pow(baseY-touchY, 2) + Math.pow(baseX-touchX, 2));
    if (dPadTouching) {
      if (dist < rad || dist < -rad) { // in the circle
        circY=touchY;
        circX=touchX;
      } else { // outside the circle
        // SOHCAHTOA TIME BITCHES
        var angle = Math.atan((touchY-baseY)/(touchX-baseX));
        var opposite = rad * Math.sin(angle);
        var adjacent = rad * Math.cos(angle);

        if (touchX > baseX) {
          circX=baseX+adjacent;
          circY=baseY+opposite;
        } else {
          circX=baseX-adjacent;
          circY=baseY-opposite;
        }
      }
    }
    moveTouch();
  }, false );

  canvasObj.Canvas.addEventListener( 'touchend', function(e){
    dPadTouching = false;
    endTouch();
  }, false );

  var obj = {
    Canvas : canvasObj,
    Action: "dPadAction"
  };

  return obj;
}

function touchObject(SelectedCanvas, tapFunction, doubleTapFunction, swipeRFunction, swipeLFunction, swipeUFunction, swipeDFunction) {
  var canvasObj;
  var hammer;

  switch(SelectedCanvas) {
    case "left":
    canvasObj = setupCanvasL(false);
    break;
    case "right":
    canvasObj = setupCanvasR();
    break;
  }

  hammer = new Hammer(canvasObj.Canvas);

  hammer.on('tap', tapFunction);
  hammer.on('doubletap', doubleTapFunction);

  hammer.get('swipe').set({direction: Hammer.DIRECTION_ALL});
  hammer.on('swiperight', swipeRFunction);
  hammer.on('swipeleft', swipeLFunction);
  hammer.on('swipeup', swipeUFunction);
  hammer.on('swipedown', swipeDFunction);

  var obj = {
    Canvas : canvasObj,
    Hammer: hammer,
    Action: "touchAction"
  };

  return obj;
}

function setupCanvasL(){
  var canvasL = document.createElement( 'canvas' );
  var c = canvasL.getContext( '2d' );
  var containerL = document.createElement( 'div' );
  containerL.className = "containerL";

  canvasL.width = window.innerWidth;
  canvasL.height = window.innerHeight*2;
  document.body.appendChild( containerL );
  containerL.appendChild(canvasL);

  c.strokeStyle = "#ffffff";
  c.lineWidth = 2;
  var obj = {
    Canvas: canvasL,
    context: c
  };
  return obj;
}//setupCanvas by writing all the html on page load

function setupCanvasR(){
  var canvasR = document.createElement( 'canvas' );
  var r = canvasR.getContext( '2d' );
  var containerR = document.createElement( 'div' );
  containerR.className = "containerR";

  canvasR.width = window.innerWidth;
  canvasR.height = window.innerHeight*2;
  document.body.appendChild(containerR);
  containerR.appendChild(canvasR);

  r.strokeStyle = "#ffffff";
  r.lineWidth = 2;
  var obj = {
    Canvas: canvasR,
    context: r
  };
  return obj;
}//setupCanvas by writing all the html on page load
