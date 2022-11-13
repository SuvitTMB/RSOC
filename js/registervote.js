var EidProfile = "";
var EidRSOCMember = "";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var xdateCheck = "";
var sCountView = 0;

$(document).ready(function () {
  var str = "";
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" style="margin:-60px auto 20px auto;"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
});


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
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbRSOCMember = firebase.firestore().collection("RSOC_Member");
  CheckData();
}


var CheckFoundData = 0;
function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = doc.data().statusconfirm;
      EidProfile = doc.id;
      document.getElementById("txtEmpID").value = doc.data().empID;
      document.getElementById('txtEmpID').setAttribute("class","DisableEmpID"); 
      document.getElementById("txtEmpName").value = doc.data().empName;
      document.getElementById('txtEmpName').setAttribute("class","DisableEmpID"); 
      document.getElementById("txtEmpPhone").value = doc.data().empPhone;
      document.getElementById('loading').style.display='none';
      document.getElementById('ShowForm').style.display='block';
    });
    if(CheckFoundData==0) {
      document.getElementById('loading').style.display='none';
      document.getElementById('ShowForm').style.display='block';
    }
  });


  dbRSOCMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID_RSOC")))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidRSOCMember = doc.id;
    });
  });

}


var sCheckBottom = 0;
function CheckRegister() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var str="";
  sCheckBottom = 0;
  stxtEmpID = document.getElementById("txtEmpID").value;
  stxtEmpName = document.getElementById("txtEmpName").value;
  stxtEmpPhone = document.getElementById("txtEmpPhone").value;
  stxtEmpBR = "Retail Strategy and Omni Channel Experience";
  stxtEmpRH = "ttb bank";

  sessionStorage.setItem("EmpID_RSOC", stxtEmpID);
  sessionStorage.setItem("EmpBR_RSOC", stxtEmpBR);

  if(stxtEmpID !== null && stxtEmpID !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรอกรหัสพนักงาน\n'; }
  if(stxtEmpName !== null && stxtEmpName !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรอกชื่อ-นามสกุล\n'; }
  if(stxtEmpPhone !== null && stxtEmpPhone !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรอกหมายเลขโทรศัพท์\n'; }

  if(sCheckBottom!=3) { 
    alert("คุณยังกรอกข้อมูลไม่ครบ\n\n"+str);
  } else {
    sessionStorage.setItem("EmpID_RSOC", stxtEmpID);
    sessionStorage.setItem("EmpName_RSOC", stxtEmpName);
    sessionStorage.setItem("EmpBR_RSOC", stxtEmpBR);
    if(EidProfile!="") {
      dbProfile.doc(EidProfile).update({
        linename : sessionStorage.getItem("LineName"),
        linePicture : sessionStorage.getItem("LinePicture"),
        empPicture : sessionStorage.getItem("LinePicture"),
        empPhone : stxtEmpPhone,
        empRH : stxtEmpRH,
        empBr : stxtEmpBR,
        DateAccept : xdateCheck,
        DateRegister : dateString
      });
    } else {
      dbProfile.add({
        lineID : sessionStorage.getItem("LineID"),
        linename : sessionStorage.getItem("LineName"),
        linePicture : sessionStorage.getItem("LinePicture"),
        empPicture : sessionStorage.getItem("LinePicture"),
        empID : stxtEmpID,
        empName : stxtEmpName,
        empPhone : stxtEmpPhone,
        empRH : stxtEmpRH,
        empBr : stxtEmpBR,
        statusconfirm : 2,
        statusedit : 1,
        statuspass : 0,
        lastcheckin : '',
        memo : '',
        EmpCheckIN : 0,
        DateAccept : xdateCheck,
        DateRegister : dateString
      });
    }
    CheckRSOCMember();
  }
}


function CheckRSOCMember() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var str="";
  document.getElementById('id01').style.display='block';
  dbRSOCMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID_RSOC")))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidRSOCMember = doc.id;
    });
    if(EidRSOCMember!="") {
      dbRSOCMember.doc(EidRSOCMember).update({
        LineID : sessionStorage.getItem("LineID"),
        LineName : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        EmpPhone : stxtEmpPhone,
        empRH : stxtEmpRH,
        empBr : stxtEmpBR,
        //ShortName : stxtShortName,
        StatusRegister : 1,
        LoadImg : sessionStorage.getItem("UploadRSOCImg"),
        TimeStampRec : TimeStampDate,
        TimeRegister : dateString
      });
    }
  });
}


function CheckButtomClick() {
  if($('#txtEmpAccept').is(':checked')) {
    $('#SubmitApp').removeClass('disabledbutton');
  } else {
    var element = document.getElementById("SubmitApp");
    element.classList.add("disabledbutton");
  }
}

function GotoHome() {
  location.href = "vote-thevoice.html";
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
