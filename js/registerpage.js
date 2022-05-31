var EidProfile = "";
var EidRSOCMember = "";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var xdateCheck = "";
var sCountView = 0;

$(document).ready(function () {
  //if(sessionStorage.getItem("EmpID_RSOC")==null) { location.href = "index.html"; }
  $('#imageFile').change(function(evt) {
     var files = evt.target.files;
     var file = files[0];
     if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
            ResizeImage();
            //alert(document.getElementById('preview').src);
        };
        reader.readAsDataURL(file);
    }
  });

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
  //CheckSurvey();
}

/*
function CheckSurvey() {
  dbSurveyMember.where('EmpID','==',sessionStorage.getItem("EmpID_RSOC"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      document.getElementById('loading').style.display='none';
      gotoShowSurvey();
    });
    CheckData();
  });
}
*/

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
      document.getElementById("txtEmpBR").value = doc.data().empBr;
      //document.getElementById("txtEmpAddress").value = doc.data().empAddress;
      document.getElementById('loading').style.display='none';
      document.getElementById('ShowForm').style.display='block';
    });
    if(CheckFoundData==0) {
      document.getElementById('loading').style.display='none';
      document.getElementById('ShowForm').style.display='block';
      //document.getElementById('ShowUploadFile').style.display='block';
    }
  });


  dbRSOCMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID_RSOC")))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidRSOCMember = doc.id;
      sessionStorage.setItem("UploadRSOCImg", doc.data().LoadImg);
      document.getElementById("txtShortName").value = doc.data().ShortName;
      $("#outputImg").html('<img src="'+doc.data().LoadImg+'" style="width:70%; max-width: 400px;margin:10px auto;">');
      //$("#lastsubmit").html('<div style="font-size:11px;color:#ccc;padding-top:6px;">บันทึกรายการล่าสุด '+doc.data().TimeRegister+'</div>');
      //document.getElementById('LinkPage').style.display='block';
    });
    //if(EidRSOCMember!="") {
    //alert(sessionStorage.getItem("UploadRSOCImg"));
    if(sessionStorage.getItem("UploadRSOCImg")!="") {
      if(CheckFoundData==0) { 
        document.getElementById('ShowUploadFile').style.display='block';
      } else {
        document.getElementById('ShowUploadFile').style.display='none';
      }
      document.getElementById('ShowImgFile').style.display='block';
    } else {
      document.getElementById('ShowUploadFile').style.display='block';
      document.getElementById('ShowImgFile').style.display='none';
    }
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
  stxtEmpBR = document.getElementById("txtEmpBR").value;
  stxtEmpRH = "ttb bank";
  //stxtEmpAddress = document.getElementById("txtEmpAddress").value;
  stxtShortName = document.getElementById("txtShortName").value;
  stxtEmpAccept = $('#txtEmpAccept').is(':checked')

  sessionStorage.setItem("EmpID_RSOC", stxtEmpID);
  sessionStorage.setItem("EmpBR_RSOC", stxtEmpBR);

  if(stxtEmpID !== null && stxtEmpID !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรอกรหัสพนักงาน\n'; }
  if(stxtEmpName !== null && stxtEmpName !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรอกชื่อ-นามสกุล\n'; }
  if(stxtEmpPhone !== null && stxtEmpPhone !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรอกหมายเลขโทรศัพท์\n'; }
  if(stxtEmpBR !== null && stxtEmpBR !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรอกสังกัดหน่วยงาน\n'; sessionStorage.setItem("EmpBR_RSOC", stxtEmpBR);
}

  if(sCheckBottom!=4) { 
    var element = document.getElementById("SubmitApp");
    element.classList.add("disabledbutton");
    document.getElementById("txtEmpAccept").checked = false;
    alert("คุณยังกรอกข้อมูลไม่ครบ\n\n"+str);
  }

  if(stxtEmpAccept == true && sCheckBottom==4) { 
    sessionStorage.setItem("EmpID_RSOC", stxtEmpID);
    sessionStorage.setItem("EmpName_RSOC", stxtEmpName);
    sessionStorage.setItem("EmpBR_RSOC", stxtEmpBR);

    if(EidProfile!="") {
      //document.getElementById('id01').style.display='block';
      dbProfile.doc(EidProfile).update({
        linename : sessionStorage.getItem("LineName"),
        linePicture : sessionStorage.getItem("LinePicture"),
        empPicture : sessionStorage.getItem("LinePicture"),
        empPhone : stxtEmpPhone,
        empRH : stxtEmpRH,
        empBr : stxtEmpBR,
        //empAddress : stxtEmpAddress,
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
        //empAddress : stxtEmpAddress,
        empAccept : stxtEmpAccept,
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
    /*
    if(EidRSOCMember!="") {
      alert(EidRSOCMember);
      dbRSOCMember.doc(EidRSOCMember).update({
        linename : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        empPicture : sessionStorage.getItem("LinePicture"),
        EmpPhone : stxtEmpPhone,
        empRH : stxtEmpRH,
        empBr : stxtEmpBR,
        ShortName : stxtShortName,
        StatusRegister : 1,
        LoadImg : sessionStorage.getItem("UploadRSOCImg"),
        TimeStampRec : TimeStampDate,
        TimeRegister : dateString
      });
      //GotoHome();
    }
    */
    //document.getElementById('id01').style.display='block';
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
      //alert(EidRSOCMember);
      dbRSOCMember.doc(EidRSOCMember).update({
        LineID : sessionStorage.getItem("LineID"),
        LineName : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        //empPicture : sessionStorage.getItem("LinePicture"),
        EmpPhone : stxtEmpPhone,
        empRH : stxtEmpRH,
        empBr : stxtEmpBR,
        ShortName : stxtShortName,
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
  location.href = "index.html";
}
/*

function GotoSurvey() {
  location.href = "question.html";
}

function gotoShowSurvey() {
  location.href = 'showsurvey.html';
}
*/


function ResizeImage() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var filesToUploads = document.getElementById('imageFile').files;
        var file = filesToUploads[0];
        //alert(filesToUploads[0]);
        if (file) {
             var reader = new FileReader();
            // Set the image once loaded into file reader
            reader.onload = function(e) {
 
                var img = document.createElement("img");
                img.src = e.target.result;
 
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
 
                var MAX_WIDTH = 400;
                var MAX_HEIGHT = 400;
                var width = img.width;
                var height = img.height;
 
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
 
                dataurl = canvas.toDataURL(file.type);
                document.getElementById('output').src = dataurl;
            }
            reader.readAsDataURL(file);
 
            //NewDate();
            var sCampRound = "RSOC";
            var DateTimeStamp = Math.round(Date.now() / 1000);


  //stxtEmpID = document.getElementById("txtEmpID").value;
  //alert(document.getElementById("txtEmpID").value);
            if(sessionStorage.getItem("EmpID_RSOC")!=null) {
              var ImgName = sCampRound+"-"+sessionStorage.getItem("EmpID_RSOC")+"-"+DateTimeStamp;
            } else {
              var ImgName = sCampRound+"-"+document.getElementById("txtEmpID").value+"-"+DateTimeStamp;
            }


            var uploadTask = firebase.storage().ref('RSOC/'+ImgName).put(file);
            var storage = firebase.storage().ref('RSOC/'+ImgName);
            var upload = storage.put(file);
            upload.on(
              "state_changed",
              function progress(snapshot) {
                //var percentage =
                //(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              },

              function error() {
                alert("error uploading file");
              },

              function complete() {
                  uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                    sessionStorage.setItem("UploadRSOCImg", url);
                  }
                );
                //alert(sessionStorage.getItem("UploadRSOCImg"));
              }
            );
        }
     } else {
        alert('The File APIs are not fully supported in this browser.');
    }
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
