//######################################################################################
// Author: ricocheting.com
// Version: v2.0
// Date: 2011-03-31
// Description: displays the amount of time until the "dateFuture" entered below.

// NOTE: the month entered must be one less than current month. ie; 0=January, 11=December
// NOTE: the hour is in 24 hour format. 0=12am, 15=3pm etc
// format: dateFuture1 = new Date(year,month-1,day,hour,min,sec)
// example: dateFuture1 = new Date(2003,03,26,14,15,00) = April 26, 2003 - 2:15:00 pm

var dateFuture1 = new Date(Date.UTC(2015, 0, 31, 25, 15, 0));

// dateFuture1 = new Date(0, 0, 0, 24, 00,00);

// TESTING: comment out the line below to print out the "dateFuture" for testing purposes
//document.write(dateFuture +"<br />");

var amountMil = 86400000;

//###################################
//nothing beyond this point
function GetCount(ddate, iid){

  amountMil -= 1000; 
  if(ddate == 'undefined'){
    amount = amountMil;
  }else{
    dateNow = new Date(); //grab current date
  amount = ddate.getTime() - dateNow.getTime(); //calc milliseconds between dates
  delete dateNow;
   //calc milliseconds between dates
  }
  //delete dateNow;

  // if time is already past
  if(amount < 0){
    document.getElementById(iid).innerHTML='<div class="countdown">¡Tiempo finalizado!</div>';
  }
  // else date is still good
  else{
    var days=0;hours=0;mins=0;secs=0;out="";

    amount = Math.floor(amount/1000);//kill the "milliseconds" so just secs

    hours=Math.floor(amount/3600);//hours
    amount=amount%3600;

    mins=Math.floor(amount/60);//minutes
    amount=amount%60;

    secs=Math.floor(amount);//seconds

    out += (hours<=9?'0':'')+hours +":";
    out += (mins<=9?'0':'')+mins +":";
    out += (secs<=9?'0':'')+secs;
    //out = out.substr(0,out.length-2);
    /*Escribir un nuevo div con el style para letra mas grande*/
    document.getElementById(iid).innerHTML= '<h2 class="now-time">Tiempo restante:</h2><div class="countdown2">' + out + '</div>';

    setTimeout(function(){GetCount(ddate, iid)}, 1000);
  }
}

window.onload=function(){
  GetCount(dateFuture1 ,'countbox1');
  //you can add additional countdowns here (just make sure you create dateFuture2 and countbox2 etc for each)
};

// $(document).ready(function() {
//   $('#counter').after('<p><button class="btn btn-lg btn-info" id="start-btn">¡Comenzar!</button></p>');
//   $("#start-btn").on('click', function(event) {
//     event.preventDefault();
//     /* Act on the event */
//     // body...
//     $("#start-btn").attr('disabled', 'disabled');
//     // $("#init").hide();
//     $(this).hide();
//     GetCount( 'undefined' ,'countbox1');
//   });
// });