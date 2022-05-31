
var SumRatio = 0;
var sum_score = 0;         // total amount to be paid
var total = 0;         // total amount to be paid
var total_tickets = 0; // total amount of tickets

var t1 = { id: 't1', pocet: 0, hodnota: 1 }; // ticket 1st category
var t2 = { id: 't2', pocet: 0, hodnota: 1 }; // ticket 2nd category
var t3 = { id: 't3', pocet: 0, hodnota: 1 }; // ticket 3rd category
var t4 = { id: 't4', pocet: 0, hodnota: 1 }; // ticket 3rd category
var t5 = { id: 't5', pocet: 0, hodnota: 1 }; // ticket 3rd category
//var t6 = { id: 't6', pocet: 0, hodnota: 1 }; // ticket 3rd category
//var t7 = { id: 't7', pocet: 0, hodnota: 1 }; // ticket 3rd category
//var t8 = { id: 't8', pocet: 0, hodnota: 1 }; // ticket 3rd category
var Cal_Ratio = 5;
var SumPoint = 25;

var DateRegister = "";
var EidGroup = "";


$(document).ready(function() {
  if(sessionStorage.getItem("EmpID_RSOC")==null) { location.href = "index.html"; }
  Connect_DB();

  $('#back').on('click', function() {
    $('li.active').filter('.active').prev('li').find('a[data-toggle="tab"]').tab('show');
    $('li').find('a[data-toggle="tab"]').removeClass('btn-success');
    $('#ok-icon').addClass('hidden');
    total_tickets = 0;
    $('#listed_t1').addClass('hidden').children().not('h4').remove();
    $('#listed_t2').addClass('hidden').children().not('h4').remove();
    $('#listed_t3').addClass('hidden').children().not('h4').remove();
    $('#listed_t4').addClass('hidden').children().not('h4').remove();
    $('#listed_t5').addClass('hidden').children().not('h4').remove();
    //$('#listed_t6').addClass('hidden').children().not('h4').remove();
    //$('#listed_t7').addClass('hidden').children().not('h4').remove();
    //$('#listed_t8').addClass('hidden').children().not('h4').remove();
    render();
  });
  $('#continue').on('click', function() {
    if (total_tickets > 0) {
      $('li.active').filter('.active').next('li').find('a[data-toggle="tab"]').tab('show');
      $('li').find('a[data-toggle="tab"]').addClass('btn-success');
      $('#ok-icon').removeClass('hidden');
      addTicketList(t1);
      addTicketList(t2);
      addTicketList(t3);
      addTicketList(t4);
      addTicketList(t5);
      //addTicketList(t6);
      //addTicketList(t7);
      //addTicketList(t8);
    }
  });
  render();
});


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbRSOCMember = firebase.firestore().collection("RSOC_Member");
  dbRSOCPoll = firebase.firestore().collection("RSOC_Poll");
  CheckSurvey();
  //CheckGroup();
}


var DoneSurvey = 0;
function CheckSurvey() {
  dbRSOCMember.where('EmpID','==',sessionStorage.getItem("EmpID_RSOC"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      gotoShowSurvey();
    });
  });
}


calculate = function(object, action) {
  if (action === 'plus') {
    total += object.hodnota;
    if(object.pocet>=0 && object.pocet<=4) {
      sum_score = sum_score-object.pocet;
      object.pocet++;
      sum_score = sum_score+object.pocet;
      $("#DisplayRatio").html(sum_score);  
    }
  } else if ((action === 'minus') && (object.pocet > 0)) {
    total -= object.hodnota;
    if(object.hodnota>=0 && object.hodnota<=5) {
      sum_score = sum_score-object.pocet;
      object.pocet--;
      sum_score = sum_score+object.pocet;
      $("#DisplayRatio").html(sum_score);  
    }
  }
  render();
}

render = function() {
  //total_tickets = t1.pocet + t2.pocet + t3.pocet + t4.pocet + t5.pocet + t6.pocet + t7.pocet + t8.pocet;
  total_tickets = t1.pocet + t2.pocet + t3.pocet + t4.pocet + t5.pocet;
  SumRatio = (total_tickets/SumPoint)*5;
  $("#DisplayRatio").html("<div class='btn-score'>"+SumRatio.toFixed(2)+"</div>");  

  $('#amount').html(total.toFixed(0));
  $('#t1_pocet').html(t1.pocet); $('#t2_pocet').html(t2.pocet); $('#t3_pocet').html(t3.pocet);
  $('#t4_pocet').html(t4.pocet); $('#t5_pocet').html(t5.pocet); 
  //$('#t6_pocet').html(t6.pocet);
  //$('#t7_pocet').html(t7.pocet); $('#t8_pocet').html(t8.pocet); 

  if(t1.pocet!=0 && t2.pocet!=0 && t3.pocet!=0 && t4.pocet!=0 && t5.pocet!=0) {
    $('#SubmitApp').removeClass('disabledbutton');
  } else {
    var element = document.getElementById("SubmitApp");
    element.classList.add("disabledbutton");
  }

  if(t1.pocet!=0) {
    document.getElementById('Memo1').style.display='block';
  }
  if(t2.pocet!=0) {
    document.getElementById('Memo2').style.display='block';
  }
  if(t3.pocet!=0) {
    document.getElementById('Memo3').style.display='block';
  }
  if(t4.pocet!=0) {
    document.getElementById('Memo4').style.display='block';
  }
  if(t5.pocet!=0) {
    document.getElementById('Memo5').style.display='block';
  }
/*
  if(t6.pocet!=0) {
    document.getElementById('Memo6').style.display='block';
  }
  if(t7.pocet!=0) {
    document.getElementById('Memo7').style.display='block';
  }
  if(t8.pocet!=0) {
    document.getElementById('Memo8').style.display='block';
  }
*/



  $('#total_amount').html(total.toFixed(0));
  $('#t1_amount').html(t1.pocet); $('#t2_amount').html(t2.pocet); $('#t3_amount').html(t3.pocet);
  $('#t4_amount').html(t4.pocet); $('#t5_amount').html(t5.pocet); 
  //$('#t6_amount').html(t6.pocet);
  //$('#t7_amount').html(t7.pocet); $('#t8_amount').html(t8.pocet); 

  if (total_tickets > 0) {
    $('#continue').prop('disabled', false);
  } else {
    $('#continue').prop('disabled', true);
  }
}




function SavePoll() {
  render();
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbRSOCPoll.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    EmpPicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_RSOC"),
    EmpName : sessionStorage.getItem("EmpName_RSOC"),
    EmpBr : sessionStorage.getItem("EmpBR_RSOC"),
    Q1 : parseFloat(t1.pocet),
    Q1_memo : document.getElementById("feedback1").value,
    Q2 : parseFloat(t2.pocet),
    Q2_memo : document.getElementById("feedback2").value,
    Q3 : parseFloat(t3.pocet),
    Q3_memo : document.getElementById("feedback3").value,
    Q4 : parseFloat(t4.pocet),
    Q4_memo : document.getElementById("feedback4").value,
    Q5 : parseFloat(t5.pocet),
    Q5_memo : document.getElementById("feedback5").value,
    Q9_memo : document.getElementById("feedback9").value,
    AdvScore : SumRatio.toFixed(2),
    TimeStamp : TimeStampDate,
    DateSurvey : dateString
  });
  document.getElementById('id01').style.display='block';
}


/*
function CheckGroup() {
  //alert(sessionStorage.getItem("EmpBR_Survey"));
  //dbSurveyGroup.where('EmpGroup','==','RH1')
  dbSurveyGroup.where('EmpGroup','==',sessionStorage.getItem("EmpBR_Survey"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidGroup = doc.id;
      sTotalSurvey = doc.data().TotalSurvey;
      sTotalQ1 = doc.data().TotalQ1;
      sTotalQ2 = doc.data().TotalQ2;
      sTotalQ3 = doc.data().TotalQ3;
      sTotalQ4 = doc.data().TotalQ4;
      sTotalQ5 = doc.data().TotalQ5;
      sTotalQ6 = doc.data().TotalQ6;
      sTotalQ7 = doc.data().TotalQ7;
      sTotalQ8 = doc.data().TotalQ8;
      sTargetSurvey = doc.data().TargetSurvey;
      sSumPoint = doc.data().SumPoint;
    });
  });
}

function SavePoll3333() {
  //parseFloat(t1.pocet)
  alert(parseFloat(t1.pocet)+"==="+document.getElementById("feedback1").value);
}
*/

function GotoHome() {
  location.href = 'home.html';
}


function NewDate() {
  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";
  var today = new Date();
  var day = today.getDate() + "";
  var monthEN = (today.getMonth()) + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;

  xdateCheck = months[monthEN] + " " + day + ", " + year + " " + hour + ":" + minutes + ":" + seconds ;
  //var GetWatingTime = "april 25, 2022 12:30:00";
}

function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}

function CloseAll() {
  document.getElementById('id01').style.display='none';
}
