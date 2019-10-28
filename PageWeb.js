$(window).scroll(function() {
  var scrollTop= $(this).scrollTop();

  $('.background').css({
    opacity: function() {
      var elementHeight = $(this).height();
      return 0.09-(scrollTop - elementHeight) /elementHeight ;
    }
  });
});
