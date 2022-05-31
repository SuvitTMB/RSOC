
$(document).ready(function () {
/*
  $('.skillbar').skillBars({
    from: 0,
    speed: 2000, 
    interval: 100,
    decimals: 0,
  });
*/
  //NewSet();
});

//alert(a0);
function NewSet() {
  //alert(a0);
  document.getElementById('A0').setAttribute('data-percent', a0);
  document.getElementById('A1').setAttribute('data-percent', a1);
  document.getElementById('A2').setAttribute('data-percent', a2);
  document.getElementById('A3').setAttribute('data-percent', a3);
  document.getElementById('A4').setAttribute('data-percent', a4);
  document.getElementById('A5').setAttribute('data-percent', a5);
  document.getElementById('A6').setAttribute('data-percent', a6);
  document.getElementById('A7').setAttribute('data-percent', a7);

  $("#B0").html(b0);
  $("#B1").html(b1);
  $("#B2").html(b2);
  $("#B3").html(b3);
  $("#B4").html(b4);
  $("#B5").html(b5);
  $("#B6").html(b6);
  $("#B7").html(b7);

  $('.skillbar').skillBars({
    from: 0,
    speed: 2000, 
    interval: 100,
    decimals: 0,
  });

}



