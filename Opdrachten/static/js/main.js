$(function() {
	var uitklap		= $('nav > a');
		menu 		= $('nav ul');
		menuHeight	= menu.height();

	$(uitklap).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});

	$(window).resize(function(){
		var w = $(window).width();
		if(w > 915 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});

    $('fieldset:nth-of-type(2) input:nth-of-type(1)').click(function(){
      
        $('fieldset:nth-of-type(3)').css('display', 'none');
        $('fieldset:nth-of-type(4)').css('display', 'block');

   });

   $('fieldset:nth-of-type(2) input:nth-of-type(2)').click(function(){
      
        $('fieldset:nth-of-type(3)').css('display', 'block');
        $('fieldset:nth-of-type(4)').css('display', 'none');

   });

   $('footer > section:nth-of-type(3) > h1').on('click', function(){
        $('footer > section:nth-of-type(3) > ul').slideToggle(450);
    });

   $('footer > h1').on('click', function(){
        $('footer > section').slideToggle(450);
    });

});