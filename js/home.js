var DoneSurvey = 0;
var ShowScore = 0;



$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_RSOC")==null) { location.href = "index.html"; }
  Connect_DB();
  loadUser()
  //CheckPoll();
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
  //dbRSOCPoll = firebase.firestore().collection("RSOC_Poll");
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
    str += '<li><font color="#f68b1f">09:00 น.</font> ลงทะเบียน <br>พร้อมแสดงผลตรวจ ATK  แจกของ welcome pack, แบ่งสีตามกิจกรรมกลุ่ม  (มีอาหารเช้าให้ทานก่อนเข้างาน) เปลี่ยนเสื้อ เพื่อร่วมกิจกรรมเลย* </li>';
    str += '<li><font color="#f68b1f">09:30 น.</font> กิจกรรมอุ่นเครื่อง โดย อ.ดวง (S2G)<br><ul style="margin-left:-20px;">';
      str += '<li>ละลายพฤติกรรม</li>';
      str += '<li>กิจกรรม Who Song</li>';
      str += '<li>บรรยาย Diversity and Inclusion </li>';
      str += '<li>การบริหารความหลากหลายในการทำงานร่วมกันด้วยหลัก DISC</li>';
    str += '</ul></li>';
    str += '<li><font color="#f68b1f">12:00 น.</font> รับประทานอาหาร (Thai Buffet)</li>';
    str += '<li><font color="#f68b1f">13:00 น.</font> แบ่งกลุ่มตามกิจกรรม <br>จำนวน 8 กลุ่ม ๆ ละ 15 คน กิจกรรม Outdoor สร้างพลังสร้างทีม (เรียนรู้หลัก ICARE ผ่านกิจกรรม) - 500 Challenges โดย อ.ดวง (S2G) </li>';
    str += '<li><font color="#f68b1f">16:30 น.</font> สรุปกิจกรรม</li>';
    str += '<li><font color="#f68b1f">17:00 น.</font> Chick in พักผ่อนตามอัธยาศัย </li>';
    str += '<li><font color="#f68b1f">18:00 น.</font> กิจกรรมภาคค่ำ (ดนตรี)<ul style="margin-left:-20px;">';
      str += '<li>ประกาศผลทีมที่มีคะแนนรวมสูงสุด 3 อันดับแรก และมอบรางวัล</li>';
      str += '<li>ประกวดการแต่งกายและการแสดงทีม 9 ทีม ตามธีมปาร์ตี้ น. หนู ( ทีมละ 5 นาที )</li>';
      str += '<li>คณะกรรมการตัดสินการประกวดการแต่งกาย  และมอบรางวัล</li>';
    str += '</ul></li>';
    str += '<li><font color="#f68b1f">21:00 น.</font> จับรางวัล Lucky Draw</li>';
    str += '<li><font color="#f68b1f">21:30 น.</font> คุณนก กล่าวปิดกิจกรรม Day 1 </li>';
    str += '<li><font color="#f68b1f">21:40 น.</font> ร้อง เต้น กับวงดนตรี </li>';
    str += '<li><font color="#f68b1f">22:30 น.</font> พักผ่อน</li>';
    str += '</ul></div>';

    str += '<div class="text-naviblue">วันศุกร์ที่ 24 มิถุนายน 2565</div>';
    str += '<div class="text-black"><ul style="margin-top:10px;margin-left:-20px;">';
    str += '<li><font color="#f68b1f">06:00 - 08:30 น.</font> รับประทานอาหารเช้า </li>';
    str += '<li><font color="#f68b1f">09:00 - 10:00 น.</font> <br>-Ice Breaking<br>-RSOC s Direction & 2nd Half-Key Priorities.  </li>';
    str += '<li><font color="#f68b1f">10:00 - 12:00 น.</font> <br>-TH’s OKRs, Key Priorities and team structure  ( 10 mins each by team head)<br>- Q&A</li>';
    str += '<li><font color="#f68b1f">12:00 น.</font> รับประทานอาหารกลางวัน</li>';
    str += '<li><font color="#f68b1f">13:30 น.</font> เดินทางกลับ</li>';
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
    str += '<li>Gift Voucher PTT<br><img src="./img/gift-4.jpg" style="width:60%;padding:5px 0 10px 0;"></li>';
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

function OpenTeam(x) {
  //var sTeam = "RSOC-"+x ;
  location.href = 'team.html?gid='+x;
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  //document.getElementById('id02').style.display='none';
}
