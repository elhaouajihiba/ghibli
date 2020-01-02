AOS.init();
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("menu").style.marginLeft = "250px";
  document.body.style.backgroundColor = "#EED9C4";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("menu").style.marginLeft= "0";
  document.body.style.backgroundColor = "#EED9C4";
}


$(window).scroll(function() {
  var scrollTop= $(this).scrollTop();

  $('.ban').css({
    opacity: function() {
      return 0.09-(scrollTop - window.innerHeight ) /window.innerHeight;
    }
  });
});
