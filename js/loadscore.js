
/*
  var a0 = "30%";
  var a1 = "40%";
  var a2 = "50%";
  var a3 = "60%";
  var a4 = "70%";
  var a5 = "80%";
  var a6 = "90%";
  var a7 = "100%";
*/
  var b0 = "เหลือง";
  var b1 = "เขียว";
  var b2 = "ฟ้า";
  var b3 = "ชมพู";
  var b4 = "ส้ม";
  var b5 = "นำ้เงิน";
  var b6 = "ม่วง";
  var b7 = "แดง";


//$(document).ready(function () {
//  Connect_DB();
//});
Connect_DB();

function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    databaseURL: "https://file-upload-6f4fc.firebaseio.com",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbRSOCScore = firebase.firestore().collection("RSOC_Score");
  CheckScore();
}

function CheckScore() {
  dbRSOCScore.orderBy('EmpTeam','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      console.log(doc.data().EmpTeam+" === "+doc.data().SumAll);
      if(doc.data().EmpTeam=="RSOC-1") {
        a0 = doc.data().SumAll+"%";
        sa0 = doc.data().SumAll+"%";
      } else if(doc.data().EmpTeam=="RSOC-2") { 
        a1 = doc.data().SumAll+"%";
      } else if(doc.data().EmpTeam=="RSOC-3") { 
        a2 = doc.data().SumAll+"%";
      } else if(doc.data().EmpTeam=="RSOC-4") { 
        a3 = doc.data().SumAll+"%";
      } else if(doc.data().EmpTeam=="RSOC-5") { 
        a4 = doc.data().SumAll+"%";
      } else if(doc.data().EmpTeam=="RSOC-6") { 
        a5 = doc.data().SumAll+"%";
      } else if(doc.data().EmpTeam=="RSOC-7") { 
        a6 = doc.data().SumAll+"%";
      } else if(doc.data().EmpTeam=="RSOC-8") { 
        a7 = doc.data().SumAll+"%";
      }
    });
    //alert(a0+"-"+a1+"-"+a2+"-"+a3+"-"+a4+"-"+a5+"-"+a6+"-"+a7);
    NewSet();
  });
}


function NewSet() {
  document.getElementById('A0').setAttribute('data-percent', a0);
  document.getElementById('A1').setAttribute('data-percent', a1);
  document.getElementById('A2').setAttribute('data-percent', a2);
  document.getElementById('A3').setAttribute('data-percent', a3);
  document.getElementById('A4').setAttribute('data-percent', a4);
  document.getElementById('A5').setAttribute('data-percent', a5);
  document.getElementById('A6').setAttribute('data-percent', a6);
  document.getElementById('A7').setAttribute('data-percent', a7);

  //document.getElementById('AA0').html(a0);

  $("#B0").html(b0);
  $("#B1").html(b1);
  $("#B2").html(b2);
  $("#B3").html(b3);
  $("#B4").html(b4);
  $("#B5").html(b5);
  $("#B6").html(b6);
  $("#B7").html(b7);

  $('.skillbar').skillBars({
    from: 0,
    speed: 2000, 
    interval: 100,
    decimals: 0,
  });


}
