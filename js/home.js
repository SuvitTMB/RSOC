var DoneSurvey = 0;
var ShowScore = 0;



$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_RSOC")==null) { location.href = "index.html"; }
  Connect_DB();
  CheckPoll();
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
  dbRSOCPoll = firebase.firestore().collection("RSOC_Poll");
}


function CheckPoll() {
  dbRSOCPoll.where('EmpID','==',sessionStorage.getItem("EmpID_RSOC"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      DoneSurvey = 1;
      ShowScore = doc.data().AdvScore;
    });
    document.getElementById('DisplayWait').style.display='none';
    document.getElementById('DisplayPoll').style.display='block';
  });
}


function OpenPage(page) {
  var str = "";
  if(page==1) {
    str += '<div class="slideanim slide"><img src="./img/TeamBuilding.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">เกี่ยวกับ RSOC Team Building</div></center>';
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
    str += '<div class="slideanim slide"><img src="./img/agenda.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">กำหนดการ</div></center>';
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
    str += '<div class="slideanim slide"><img src="./img/document.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">เอกสารประกอบการอบรม</div></center>';
    str += '<div class="text-black">เราได้จัดเตรียมเอกสารทั้งหมดไว้ที่นี่ เพื่อให้ทุกท่านได้นำไปทบทวน นำไปปฏิบัติงาน เพื่อให้บรรลุเป้าหมายที่เราได้ร่วมกันกำหนดไว้</div>';
/*
    str += '<div style="margin:20px auto;width:50%;">';
    str += '<div class="box-menu" style="width:100%; font-size:11px;height:122px;" onclick="OpenLink(5)">';
    str += '<img src="./img/writing.png" style="width:70px;"><br>คลิกเพื่อ<br>โหลดเอกสาร';
    str += '</div>';
*/

    str += '<div style="margin:20px auto;width:100%;">';

    str += '<div class="box-menu" style="width:46%; font-size:11px;height:122px;" onclick="OpenLink(5)">';
    str += '<img src="./img/ms-pdf.png" style="width:70px;"><br>คลิกเพื่อ<br>โหลดเอกสาร</div>';
    str += '<div class="box-menu" style="width:46%; font-size:11px;height:122px;" onclick="OpenLink(5)">';
    str += '<img src="./img/ms-powerpoint.png" style="width:70px;"><br>คลิกเพื่อ<br>โหลดเอกสาร</div>';
    str += '<div class="box-menu" style="width:46%; font-size:11px;height:122px;" onclick="OpenLink(5)">';
    str += '<img src="./img/ms-excel.png" style="width:70px;"><br>คลิกเพื่อ<br>โหลดเอกสาร</div>';
    str += '<div class="box-menu" style="width:46%; font-size:11px;height:122px;" onclick="OpenLink(5)">';
    str += '<img src="./img/ms-word.png" style="width:70px;"><br>คลิกเพื่อ<br>โหลดเอกสาร</div>';


    str += '</div>';
  } else if(page==4) {
    str += '<div class="slideanim slide"><img src="./img/rewards.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">รางวัลสำหรับการแข่งขัน</div></center>';
    str += '<div class="text-black">เราได้เตรียมรางวัลไว้มากมาย มูลค่ารวมนับแสนมาให้ทุก ๆ ทีมที่สามารถทำคะแนนได้สูงสุด<ul style="margin-top:10px;margin-left:-20px;">';
    str += '<li>Gift Voucher Lotus<br><img src="./img/gift-1.jpg" style="width:60%;padding:5px 0 10px 0;"></li>';
    str += '<li>Gift Voucher After You<br><img src="./img/gift-2.jpg" style="width:60%;padding:5px 0 10px 0;"></li>';
    str += '<li>Gift Voucher KFC<br><img src="./img/gift-3.jpg" style="width:60%;padding:5px 0 10px 0;"></li>';
    str += '</ul></div>';
    str += '</div>';
  } else if(page==5) {
    str += '<div class="slideanim slide"><img src="./img/survey.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">ประเมินผลกิจกรรม</div></center>';

    //str += '<div class="text-naviblue">Expected outcome</div>';
    str += '<div class="text-black">ในทุก ๆ กิจกรรมเมื่อกิจกรรมที่ได้ร่วมกันทำสิ้นสุดลง การประเมินผลก็จะเป็นส่วนหนึ่งที่จะบอกว่าอะไรที่คุณชอบ หรือไม่ชอบ มีอะไรที่อยากจะบอกเราเพื่อให้ปรับปรุงกิจกรรมในการจัดในครั้งต่อไป</div>';
    str += '<div style="margin:20px auto;width:50%;">';
    if(DoneSurvey==1) {
        //alert(ShowScore);
        str += '<div class="box-menu" style="width:100%; font-size:11px;height:122px;background:#f2f2f0;color:#0056ff;">';
        str += '<img src="./img/poll.png" style="width:70px;"><br>ผลการประเมินของคุณ<br>'+parseFloat(ShowScore).toFixed(2)+'';
    } else {
        str += '<div class="box-menu" style="width:100%; font-size:11px;height:122px;" onclick="OpenLink(3)">';
        str += '<img src="./img/poll.png" style="width:70px;"><br>คลิกเพื่อทำ<br>แบบประเมินผล';
    }
    str += '</div>';
    //str += '<div class="box-menu" style="width:46%; font-size:11px;">';
    //str += '<img src="./img/poll.png" style="width:70px;"><br>คลิกเพื่อทำ<br>แบบประเมินผล';
    //str += '</div>';
    str += '</div></div>';
  } else if(page==6) {
    str += '<div class="slideanim slide"><img src="./img/activity.jpg" style="width:100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>';
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">ประมวลภาพกิจกรรม</div></center>';

    //str += '<div class="text-naviblue">Expected outcome</div>';
    str += '<div class="text-black">เราจะเก็บทุก ๆ ความเคลื่อนไหวของทุก ๆ คนที่เข้าร่วมกิจกรรมรวมไว้ในที่นี่</div>';
    str += '<div style="margin:20px auto;width:50%;">';
    str += '<div class="box-menu" style="width:100%; font-size:11px;height:122px;" onclick="OpenLink(7)">';
    str += '<img src="./img/photo.png" style="width:70px;"><br>คลิกเพื่อ<br>ดูภาพกิจกรรม';
    str += '</div>';
    //str += '<div class="box-menu" style="width:46%; font-size:11px;">';
    //str += '<img src="./img/poll.png" style="width:70px;"><br>คลิกเพื่อทำ<br>แบบประเมินผล';
    //str += '</div>';
    str += '</div></div>';
  } else if(page==7) {
  } else if(page==9) {
    str += '<div class="text-wb1" style="width:90%;margin:auto;">';
    str += '<center><div class="btn-t33">ข้อมูลยังไม่พร้อมใช้งาน</div></center>';
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
  } else if(page==3) { // ประเมินผล
    location.href = 'poll.html';
  } else if(page==4) { // ดูภาพกิจกรรม
    location.href = 'leader.html';
  } else if(page==5) { // เอกสารอบรม
    location.href = 'home.html';
  } else if(page==6) {
    location.href = 'rsoc.html';
  } else if(page==7) {
    location.href = 'https://drive.google.com/drive/folders/1ImqFECrSQafDPx2aakZxBxmSBZidH4Nf?usp=sharing';
  } else if(page==99) {
    location.href = '#';
  }
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  //document.getElementById('id02').style.display='none';
}
