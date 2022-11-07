var GetListNumber = [];
var GetCountVoteMember = [];
var TVnumber1 = "TV1";
var TVnumber2 = "TV2";
var TVnumber3 = "TV3";
var TVnumber4 = "TV4";
var TVnumber5 = "TV5";
var TVnumber6 = "TV6";
var TVnumber7 = "TV7";




$(document).ready(function () {
  $("#DisplayNameCamp").html("ผลโหวตล่าสุด The Voice RSOC");
  Connect_DB();
  LoadRatioScore();
  setInterval("LoadRatioScore();",8000); 
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
}



function LoadRatioScore() {
	var Cal1=0;
	var Cal2=0; 
	var Cal3=0; 
	var Cal4=0;
  var Cal5=0;
  var Cal6=0;
  var Cal7=0;
	var SumAllCal = 0;
	var Ratio1 = 0;
	var Ratio2 = 0;
	var Ratio3 = 0;
	var Ratio4 = 0;
  var Ratio5 = 0;
  var Ratio6 = 0;
  var Ratio7 = 0;
	var CountVote = 0;
	var RatioVote = 0;
	dbRSOCMember.where('VoteTheVoice','!=',0)
	.get().then((snapshot)=> {
	snapshot.forEach(doc=>{
			if(doc.data().VoteTheVoice==1) {
				Cal1 = parseInt(Cal1)+1;
			} else if(doc.data().VoteTheVoice==2) { 
				Cal2 = parseInt(Cal2)+1;
			} else if(doc.data().VoteTheVoice==3) { 
				Cal3 = parseInt(Cal3)+1;
			} else if(doc.data().VoteTheVoice==4) { 
				Cal4 = parseInt(Cal4)+1;
      } else if(doc.data().VoteTheVoice==5) { 
        Cal5 = parseInt(Cal5)+1;
      } else if(doc.data().VoteTheVoice==6) { 
        Cal6 = parseInt(Cal6)+1;
      } else if(doc.data().VoteTheVoice==7) { 
        Cal7 = parseInt(Cal7)+1;
			}
	});
		SumAllCal = parseInt(Cal1)+parseInt(Cal2)+parseInt(Cal3)+parseInt(Cal4)+parseInt(Cal5)+parseInt(Cal6)+parseInt(Cal7);
		Ratio1 = (parseInt(Cal1)*100)/parseInt(SumAllCal);
		Ratio2 = (parseInt(Cal2)*100)/parseInt(SumAllCal);
		Ratio3 = (parseInt(Cal3)*100)/parseInt(SumAllCal);
		Ratio4 = (parseInt(Cal4)*100)/parseInt(SumAllCal);
    Ratio5 = (parseInt(Cal5)*100)/parseInt(SumAllCal);
    Ratio6 = (parseInt(Cal6)*100)/parseInt(SumAllCal);
    Ratio7 = (parseInt(Cal7)*100)/parseInt(SumAllCal);
		//var sss = [Cal1, Cal2, Cal3, Cal4];
		var GetListNumber = [];
		var GetCountVoteMember = [];

//        GetListNumber.push("TV1");
//        GetCountVoteMember.push({ CustomerID: "TV1", RatioVote: Ratio1.toFixed(2) });


        GetListNumber.push(TVnumber1);
        GetCountVoteMember.push({ TVnumber: TVnumber1, CountVote: parseInt(Cal1), RatioVote: Ratio1.toFixed(2) });

        GetListNumber.push(TVnumber2);
        GetCountVoteMember.push({ TVnumber: TVnumber2, CountVote: parseInt(Cal2), RatioVote: Ratio2.toFixed(2) });

        GetListNumber.push(TVnumber3);
        GetCountVoteMember.push({ TVnumber: TVnumber3, CountVote: parseInt(Cal3), RatioVote: Ratio3.toFixed(2) });

        GetListNumber.push(TVnumber4);
        GetCountVoteMember.push({ TVnumber: TVnumber4, CountVote: parseInt(Cal4), RatioVote: Ratio4.toFixed(2) });

        GetListNumber.push(TVnumber5);
        GetCountVoteMember.push({ TVnumber: TVnumber5, CountVote: parseInt(Cal5), RatioVote: Ratio5.toFixed(2) });

        GetListNumber.push(TVnumber6);
        GetCountVoteMember.push({ TVnumber: TVnumber6, CountVote: parseInt(Cal6), RatioVote: Ratio6.toFixed(2) });

        GetListNumber.push(TVnumber7);
        GetCountVoteMember.push({ TVnumber: TVnumber7, CountVote: parseInt(Cal7), RatioVote: Ratio7.toFixed(2) });

		console.log(GetCountVoteMember.sort( compare ) );

    	$("#Show1").html(GetCountVoteMember[0].RatioVote+"%");  
    	$("#Show2").html(GetCountVoteMember[1].RatioVote+"%");  
    	$("#Show3").html(GetCountVoteMember[2].RatioVote+"%");  
    	$("#Show4").html(GetCountVoteMember[3].RatioVote+"%");  
      $("#Show5").html(GetCountVoteMember[4].RatioVote+"%");  
      $("#Show6").html(GetCountVoteMember[5].RatioVote+"%");  
      $("#Show7").html(GetCountVoteMember[6].RatioVote+"%");  

	});  
}



function compare( a, b ) {
  if ( a.CountVote> b.CountVote ){
    return -1;
  }
  if ( a.CountVote < b.CountVote ){
    return 1;
  }
  return 0;
}

//GetCountVoteMember.sort( compare );

//var GetListNumber = [];
//var GetCountVoteMember = [];
