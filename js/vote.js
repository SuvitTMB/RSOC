var UserVote = 0;
var TVnumber1 = "เจ้าพ่อเซียงไฮ";
var TVnumber2 = "สุดใจ (ปู พงษ์สิทธิ์)";
var TVnumber3 = "นะหน้าทอง (โจอี้ ภูวศิษฐ์)";
var TVnumber4 = "ขอบใจนะ (แพรว คณิตกุล)";
var TVnumber5 = "หมาดห่วง (วง Cocktail)";
var TVnumber6 = "เสียใจได้ยินไหม (ใหม่ เจริญปุระ)";
var TVnumber7 = "ไหง่ง่อง (ตั๊กแตน ชลดา)";

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Vote")==null) { location.href = "vote-thevoice.html"; }
  Connect_DB();
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
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbRSOCMember = firebase.firestore().collection("RSOC_Member");
  CheckVote();
}


var Eid = "";
function CheckVote() {
  var str = "";
  dbRSOCMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID_Vote")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      DoneSurvey = 1;
      if(doc.data().VoteTheVoice==0) {
        Eid = doc.id;
        document.getElementById('loading').style.display='none';
        document.getElementById('VoteTeam').style.display='block';
        document.getElementById('ShowTeam').style.display='none';
      } else {
        str += '<div style="width:100%;margin:auto;text-align:center;">';
        str += '<div><img src="./img/TV'+doc.data().VoteTheVoice+'.png" style="width:85%;"></div>';
        str += '<div class="header-font" style="color:#fff;margin-top:10px;">รายการที่คุณได้ทำการโหวตเลือกไว้</div>';
        str += '</div>';
        $('#DisplaySelectVote').html(str);
        document.getElementById('loading').style.display='none';
        document.getElementById('VoteTeam').style.display='none';
        document.getElementById('ShowTeam').style.display='block';
      }
    });
  });
}


function SelectTeam(x) {
  var str = "";
  str += '<div style="width:100%;margin:auto;text-align:center;">';
  str += '<div><img src="./img/TV'+x+'.png" class="VoteImg1"></div>';
  if(x==1) {
    str += '<div style="margin-top:-20px;color:#0056ff;"><b>บทเพลง : '+ TVnumber1 +'</b></div>';
  } else if(x==2) {
    str += '<div style="margin-top:-20px;color:#0056ff;"><b>บทเพลง : '+ TVnumber2 +'</b></div>';
  } else if(x==3) {
    str += '<div style="margin-top:-20px;color:#0056ff;"><b>บทเพลง : '+ TVnumber3 +'</b></div>';
  } else if(x==4) {
    str += '<div style="margin-top:-20px;color:#0056ff;"><b>บทเพลง : '+ TVnumber4 +'</b></div>';
  } else if(x==5) {
    str += '<div style="margin-top:-20px;color:#0056ff;"><b>บทเพลง : '+ TVnumber5 +'</b></div>';
  } else if(x==6) {
    str += '<div style="margin-top:-20px;color:#0056ff;"><b>บทเพลง : '+ TVnumber6 +'</b></div>';
  } else if(x==7) {
    str += '<div style="margin-top:-20px;color:#0056ff;"><b>บทเพลง : '+ TVnumber7 +'</b></div>';
  }
  str += '<div class="btn-t1" onclick="VoteNumber('+x+')" style="margin-top:15px;">โหวตหมายเลข '+x+'</div>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:15px;">เลือกหมายเลขใหม่</div>';
  str += '<div class="clr" style="height: 25px;"></div>';
  str += '</div>';
  $('#DisplayProfile').html(str);
  document.getElementById('id01').style.display='block';
  //alert(Eid);
}


function VoteNumber(x) {
  SaveVote(x);
  var str = "";
  str += '<div style="width:100%;margin:auto;text-align:center;">';
  str += '<div style="margin-top:50px;"><img src="./img/thankyou2.gif" class="VoteImg1" style="width:80%;"></div>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:15px;">ดูรายการที่คุณโหวต</div>';
  str += '<div class="clr" style="height: 25px;"></div>';
  str += '</div>';
  $('#DisplayProfile').html(str);
}


function SaveVote(x) {
  if(Eid!="") {
    dbRSOCMember.doc(Eid).update({
      VoteTheVoice : parseFloat(x)
    });
  }
  CheckVote();
}


/*

function gotoShowSurvey() {
  location.href = 'showsurvey.html';
}

function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
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
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}
*/

function CloseAll() {
  document.getElementById('id01').style.display='none';
  //document.getElementById('id02').style.display='none';
}
