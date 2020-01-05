$(window).scroll(function() {
  var scrollTop= $(this).scrollTop();

  $('.ban').css({
    opacity: function() {
      var elementHeight = $(this).height();
      return 0.09-(scrollTop - elementHeight) /elementHeight ;
    }
  });
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "#EED9C4";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "#EED9C4";
}


/*$(window).load(function(){
  var scrollTop= $(this).scrollTop();
  $('.background').css({
    opacity: function() {
      var elementHeight = $(this).height();
      return 0.09-(scrollTop - elementHeight) /elementHeight ;
    }
});
});
*/
