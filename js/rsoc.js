var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_RSOC")==null) { location.href = "index.html"; }
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
  dbRSOCMember = firebase.firestore().collection("RSOC_Member");
  loadData();
}


function loadData() {
  var i = 0;
  var count = 0;
  var dataSet = "";
  var dataSrc = [];
  dbRSOCMember.orderBy('EmpName','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      xEmpMember = "";
      xTimegetBox = "";
      var xImg = "";
      var xText = "";
      if(doc.data().LinePicture!="") {
        xImg += '<img src="'+doc.data().LinePicture+'" class="profile-team" onerror="javascript:imgError(this,\''+ doc.id +'\')">';
      } else {
        if(doc.data().EmpSex=="M") {
          xImg += '<img src="./img/m.png" class="profile-team">';
        } else {
          xImg += '<img src="./img/f.png" class="profile-team">';
        }
      }
      xImg += '<div style="font-size:10px; color:#f68b1f;"><b>DISC-<font color="#0056ff">'+doc.data().DISC+'</font></b></div>';
      xText += '<div style="font-size:11px;line-height:1.3"><font color="#0056ff"><b>'+doc.data().EmpName+'</b></font><font color="#f68b1f"> ('+doc.data().ShortName+')</font><br>'+doc.data().EmpRH+'<br>โทร. <b>'+doc.data().EmpPhone+'</b></div>';
      dataSet = [xImg, xText, "<div class='btn-t1' style='max-width:60px;margin-top:0px;' id="+i+">คลิก</div>", doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 

    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        //{ title: "EmpID", className: "txt-center" },
        { title: "รูป", className: "txt-center" },
        { title: "รายละเอียด" },
        { title: "รายการ", className: "txt-center" },
        ],
/*
        "bLengthChange": false
*/
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          //lengthMenu: [[50, 100, 200, -1], [50, 100, 200, "All"]],
          lengthMenu: [[30, 50, 100, 200, -1], [30, 50, 100, 200, "All"]],
          columnDefs: [ { type: 'num-fmt', 'targets': [0] } ],
          order: [[ 1, 'asc']]
        //dom: 'Bfrtip', buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print' ]
      });   
      $('#ex-table tbody').on( 'click', 'tr', function () {
        var data = dTable.row( $(this).parents('tr') ).data();
        if(count!=0) {
            ClickID(dTable.row( this ).data()[4],dTable.row( this ).data()[3]);
        }
        //console.log(dTable.row( this ).data()[6]);
      });
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
  //$('#example').dataTable( { "lengthChange": false } );


}


function ClickID(x,uid) {
  var str = "";
  dbRSOCMember.where(firebase.firestore.FieldPath.documentId(), "==", uid)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      if(doc.data().LinePicture!="") { 
        str += '<center><div><img src="'+doc.data().LinePicture+'" class="add-profile" style="margin:10px auto 20px auto;"></div>';
        str += '<div class="NameLine">'+doc.data().LineName+'</div></center>';
      } else {
        if(doc.data().EmpSex=="M") {
          str += '<div style="text-align:center;"><img src="./img/m.png" class="add-profile"></div>';
        } else {
          str += '<div style="text-align:center;"><img src="./img/f.png" class="add-profile"></div>';
        }
      }
      str += '<div class="text-1">'+doc.data().EmpName+'<font color="#f68b1f"> ('+doc.data().ShortName+')</font></div>';
      str += '<div class="text-2">'+doc.data().EmpZone+'<br>'+doc.data().EmpPosition+'<br>'+doc.data().EmpRH+'<br>โทรศัพท์ : '+doc.data().EmpPhone+'<br>D I S C : <b><font color="#0056ff">Type '+ doc.data().DISC+'</font></b></div>';
      if(doc.data().LoadImg!="") {
        str += '<div style="margin-top:13px;text-align:center;"><img src="'+doc.data().LoadImg+'" style="width:100%; border-radius: 25px;"><div class="btn-t33" style="margin-top:3px;background:#69b8f1;border: solid #fff 1px;">'+doc.data().ShortName+'</div></div>';
      }
      //str += '</div>';
    });
    $("#DisplayProfile").html(str);  
    document.getElementById("id01").style.display = "block";
  });
}



function CloseAll() {
  document.getElementById('id01').style.display='none';
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


function ConvrtDate(str) {
  var date = new Date(str),
  mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()+543].join("/");
}

function imgError(image,id) {
    image.onerror = "";
    image.src = "./img/box.jpg";
    //alert(sessionStorage.getItem("LinePicture")+"==="+id);
    UpdateLinePicture(id);
    return true;
}


function UpdateLinePicture(id) {
    dbRSOCMember.doc(id).update({
      LinePicture : sessionStorage.getItem("LinePicture")
    });

}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}



