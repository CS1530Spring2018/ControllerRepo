
var cont = new myjoystick(tapFunction, doubleTapFunction, swipeRFunction, swipeLFunction, swipeUFunction, swipeDFunction,
        touchStart, touchStart, touchStart);
//init pubnub
var pubnub = PUBNUB.init({
   subscribe_key: 'sub-c-9609aa90-f010-11e6-9032-0619f8945a4f',
  publish_key: 'pub-c-62822c7d-339b-4abc-9e87-fb6671883787'
 });
 //subscribe to pubnub
 pubnub.subscribe({
     channel: "con", // The proper channel.
     message: function(){} // we don't really care about any of the messages.
 });

function tapFunction(){
    //alert("Doing something for a tap");
    pubnub.publish({
           channel: "con", // The proper channel.
           message: { "log" : "tapFunction"
           }
    });
}//tapFunction

function doubleTapFunction(){
  pubnub.publish({
         channel: "con", // The proper channel.
         message: { "log" : "doubleTapFunction"
         }
  });
}//doubleTapFunction

function swipeRFunction(){
  pubnub.publish({
         channel: "con", // The proper channel.
         message: { "log" : "swipeRFunction"
         }
  });
}//swipeRFunction

function swipeLFunction(){
  pubnub.publish({
         channel: "con", // The proper channel.
         message: { "log" : "swipeLFunction"
         }
  });
}//swipeLFunction

function swipeDFunction(){
  pubnub.publish({
         channel: "con", // The proper channel.
         message: { "log" : "swipeDFunction"
         }
  });
}//swipeDFunction

function swipeUFunction(){
  pubnub.publish({
         channel: "con", // The proper channel.
         message: { "log" : "swipeUFunction"
         }
  });
}//swipeUFunction

function touchStart(){

    var sendAnal = getAnDirection();

    pubnub.publish({
        channel: "con",
        message: {"log": sendAnal},
    });
}//touchStart
