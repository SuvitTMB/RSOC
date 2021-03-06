var i = 0;
var EidProfile = "";
var dateString = "";



$(document).ready(function () {

/*
  sessionStorage.clear(); 
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
*/  

  main();
});



async function main() {
  await liff.init({ liffId: "1655966947-l6e0adNj" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  //alert("Check Porfile");
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


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
  //dbTNIdate = firebase.firestore().collection("TNIdate");
  //dbTNIapprove = firebase.firestore().collection("TNImember");
  //dbTNIRedeemPoint = firebase.firestore().collection("TNIRedeemPoint");
  //dbTNIlog = firebase.firestore().collection("TNIlog");
  //CheckTNIdate();
  CheckData();
}

/*
function CheckTNIdate() {
  dbTNIdate.where('CodeName','==',sCodeName)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sessionStorage.setItem("TNIdate", doc.data().DateUpload);
      $("#DateUpload").html(doc.data().DateUpload);  
    });
  });
}
*/
function CheckData() {
  var sCheck = 0;
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheck = 1;
      sessionStorage.setItem("EmpID_RSOC", doc.data().empID);
      sessionStorage.setItem("EmpName_RSOC", doc.data().empName);
      sessionStorage.setItem("EmpBR_RSOC", doc.data().empBr);
      //alert("==="+sessionStorage.getItem("EmpID_RSOC"));
    });
    if(sCheck == 0) {
      //location.href = 'registerpage.html';
      document.getElementById('loading').style.display='none';
      document.getElementById('NewSurvey').style.display='block';
    } else {
      CheckSurvey();
    }
  });
}


var DoneSurvey = 0;
function CheckSurvey() {
  dbRSOCMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID_RSOC")))
  //.where('StatusRegister','==',1)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      DoneSurvey = 1;
      if(doc.data().StatusRegister==0) {
        document.getElementById('loading').style.display='none';
        document.getElementById('NewSurvey').style.display='none';
        document.getElementById('NewUploadFile').style.display='block';

      } else if(doc.data().StatusRegister==1) {
        document.getElementById('loading').style.display='none';
        document.getElementById('OldSurvey').style.display='block';
      }
    });
    if(DoneSurvey==0) {
        document.getElementById('loading').style.display='none';
        document.getElementById('NewSurvey').style.display='none';
        document.getElementById('OldSurvey').style.display='none';
        document.getElementById('CancelSurvey').style.display='block';
    }
  });
}




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


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
}
