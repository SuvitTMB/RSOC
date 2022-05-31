var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });


$(document).ready(function () {
  Connect_DB()

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
  dbRSOCMember = firebase.firestore().collection("RSOC_Member");
  loadUser();
}


function loadUser() { 
  str = "";
  dbRSOCMember.where('EmpID','==', parseFloat(sessionStorage.getItem("EmpID_RSOC")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {

      str +='<div class="box-user">';
      str +='<div style="width:25%;float: left;text-align: center;padding:8px; "><img src="'+ doc.data().LinePicture +'" class="profile-team1">';
      str +='<div style="margin-top:-30px;"><img src="./img/'+ doc.data().EmpTeam +'.png" style="width:40px;"></div></div>';
      str +='<div style="width:75%;float: left;">';
      str +='<div class="text-1" style="margin-top:5px;">'+ doc.data().EmpName +'<font color="#f68b1f"> ('+ doc.data().ShortName +')</font></div>';
      str +='<div class="text-2">'+ doc.data().EmpRH +'<br><b>'+ doc.data().EmpPhone +'</b></div>';
      str +='<div class="btn-t2" style="margin:2px 0 0 0;" onclick="OpenTeam(\''+ doc.data().EmpTeam +'\')">ดูรายละเอียดของทีม</div></div>';
      str +='</div>';
    }); 
    $("#DisplayYourTeam").html(str);  
  });
}


function OpenPage(page) {
  var str = "";
  if(page==1) {
    str += '<div class="slideanim slide"><img src="./img/3toONE.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<div class="head-team">เกี่ยวกับ RSOC Team Building</div>';
    str += '<div class="text-naviblue">Objective</div>';
    str += '<div class="text-black">For information on direction and team’s work plan<br><ul style="margin-top:10px;margin-left:-20px;">';
    str += '<li>To introduce organization and work structure</li>';
    str += "<li>To strengthen team's collaboration & Build up staff relationship</li>";
    str += '</ul></div>';
    str += '<div class="text-naviblue">Expected outcome</div>';
    str += '<div class="text-black"><ul style="margin-top:10px;margin-left:-20px;">';
    str += '<li>Staffs feel more connected can produce better collaboration work</li>';
    str += "<li>Corporate cultures often attract similar types of employees</li>";
    str += "<li>Understanding, appreciating and maximizing team</li>";
    str += '</ul></div>';
    str += '<div class="text-naviblue">Key Message</div>';
    str += '<div class="text-black"><ul style="margin-top:10px;margin-left:-20px;">';
    str += '<li>To continue the same work directions and to build relationships within the team</li>';
    str += "<li>OKR ทุกฝ่ายมองเห็นเป้าหมายเดียวกันผ่านตัวชี้วัดที่มองเห็นซึ่งกันและกันได</li>";
    str += '</ul></div>';
    str += '<div class="text-naviblue">Activity</div>';
    str += '<div class="text-black">The 2 days -1 night Team building outing which includes townhall is part of the activities for promotion teamwork and communication within team</div>';
    str += '</div>';
  } else if(page==2) {
    str += '<div class="slideanim slide"><img src="./img/3toONE.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<div class="head-team">กำหนดการ</div>';
    str += '<div class="text-naviblue">วันพฤหัสบดีที่ 23 มิถุนายน 2565</div>';
    str += '<div class="text-black"><ul style="margin-top:10px;margin-left:-20px;">';
    str += '<li>09:30 – 10:00 น.<br>ลงทะเบียน ณ โรงแรม Buddy รับชุดอุปกรณ์</li>';
    str += '<li>10:00 - 10:30 น.<br>รับประทานอาหารว่าง, Check in</li>';
    str += '<li>10:30 - 12.00 น.<br>ผู้บริหารกล่าวทักทาย และให้ Direction</li>';
    str += '<li>12:00 -13:30 น.<br>รับประทานอาหารเที่ยง ณ ห้องอาหารของโรงแรม</li>';
    str += '<li>13:30 - 17:00 น.<br>กิจกรรม Team Building 5 ฐานกิจกรรม 8 ทีม ทีมละ 16 คน (เก็บคะแนน)</li>';
    str += '<li>17:00 - 18:00 น.<br>เข้าห้องพัก พักผ่อนตามอัธยาศัย</li>';
    str += '<li>18:00 - 23:00 น.<br>Dinner Party</li>';
    str += '</ul></div>';

    str += '<div class="text-naviblue">วันศุกร์ที่ 24 มิถุนายน 2565</div>';
    str += '<div class="text-black"><ul style="margin-top:10px;margin-left:-20px;">';
    str += '<li>08:00 - 10:00 น.<br>รับประทานอาหาเช้า และพักผ่อนตามอัธยาศัย</li>';
    str += '<li>11:00 น.<br>เดินทางออกจากโรงแรม</li>';
    str += '<li>13:30 น.<br>ถึง ttb สำนักงานใหญ่</li>';
    str += '</ul></div>';


    str += '</div>';

  } else if(page==3) {
  } else if(page==4) {
  } else if(page==5) {
  } else if(page==9) {
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<div class="head-team">ข้อมูลยังไม่พร้อมใช้งาน</div>';
    str += '<center><img src="./img/Construction1.gif" style="width:100%;margin-top:-0px;"></center>';

    str += '</div>';

  }
  str += '<div class="clr"></div><center>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:15px;">ปิดหน้าต่างนี้</div>';
  str += '<div class="clr" style="height: 25px;"></div>';
  $("#DisplayRSOC").html(str);  
  document.getElementById('id01').style.display='block';

}



function OpenLink(page) {
  if(page==1) {
    location.href = 'gotomap.html';
  } else if(page==2) {
    location.href = 'allteam.html';
  } else if(page==6) {
    location.href = '#';
  }
}


function OpenTeam(x) {
  //var sTeam = "RSOC-"+x ;
  location.href = 'team.html?gid='+x;
}



function CloseAll() {
  document.getElementById('id01').style.display='none';
  //document.getElementById('id02').style.display='none';
}
