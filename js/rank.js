$(document).ready(function() {
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
  dbRSOCScore = firebase.firestore().collection("RSOC_Score");
  CheckScore();
}

function CheckScore() {
  dbRSOCScore.orderBy('EmpTeam','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      console.log(doc.data().EmpTeam+" === "+doc.data().SumAll);
      if(doc.data().EmpTeam=="RSOC-1") {
        a0 = doc.data().SumAll;
      } else if(doc.data().EmpTeam=="RSOC-2") { 
        a1 = doc.data().SumAll;
      } else if(doc.data().EmpTeam=="RSOC-3") { 
        a2 = doc.data().SumAll;
      } else if(doc.data().EmpTeam=="RSOC-4") { 
        a3 = doc.data().SumAll;
      } else if(doc.data().EmpTeam=="RSOC-5") { 
        a4 = doc.data().SumAll;
      } else if(doc.data().EmpTeam=="RSOC-6") { 
        a5 = doc.data().SumAll;
      } else if(doc.data().EmpTeam=="RSOC-7") { 
        a6 = doc.data().SumAll;
      } else if(doc.data().EmpTeam=="RSOC-8") { 
        a7 = doc.data().SumAll;
      }
    });
    //alert(a0+"-"+a1+"-"+a2+"-"+a3+"-"+a4+"-"+a5+"-"+a6+"-"+a7);
    NewSet();
  });
}

function NewSet() {
  str = '';
  str += "<div class='bar'><div class='bar-info rsoc1' data-total="+ a0 +">เหลือง";
  str += "<span class='percent' style='float: right;'>"+ a0 +"</span></div></div>";  
  str += "<div class='bar'><div class='bar-info rsoc2' data-total="+ a1 +">เขียว";
  str += "<span class='percent' style='float: right;'>"+ a1 +"</span></div></div>";  
  str += "<div class='bar'><div class='bar-info rsoc3' data-total="+ a2 +">ฟ้า";
  str += "<span class='percent' style='float: right;'>"+ a2 +"</span></div></div>";  
  str += "<div class='bar'><div class='bar-info rsoc4' data-total="+ a3 +">ชมพู";
  str += "<span class='percent' style='float: right;'>"+ a3 +"</span></div></div>";  
  str += "<div class='bar'><div class='bar-info rsoc5' data-total="+ a4 +">ส้ม";
  str += "<span class='percent' style='float: right;'>"+ a4 +"</span></div></div>";  
  str += "<div class='bar'><div class='bar-info rsoc6' data-total="+ a5 +">สัม";
  str += "<span class='percent' style='float: right;'>"+ a5 +"</span></div></div>";  
  str += "<div class='bar'><div class='bar-info rsoc7' data-total="+ a6 +">ม่วง";
  str += "<span class='percent' style='float: right;'>"+ a6 +"</span></div></div>";  
  str += "<div class='bar'><div class='bar-info rsoc8' data-total="+ a7 +">แดง";
  str += "<span class='percent' style='float: right;'>"+ a7 +"</span></div></div>";  



  $('#Display').html(str);




  function skillSet() {
    $('.bar-info').each(function() {
      total = $(this).data("total");
      $(this).css("width", total + "%");
    });
    
    $('.percent').each(function() {
      var $this = $(this);
      $({
        Counter: 10
      }).animate({
        Counter: $this.text()
      }, {
        duration: 3000,
        easing: 'swing',
        step: function() {
          $this.text(Math.ceil(this.Counter) + "%");
        }
      });
    });
  };
  setTimeout(skillSet, 1000);

  //alert(a0);
  //document.getElementById('A0').setAttribute('data-total', "87");
}


