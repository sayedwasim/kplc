/*---------- MORPH BUTTON ----------*/
(function(){function b(){window.scrollTo(a?a.x:0,a?a.y:0)}function e(){window.removeEventListener("scroll",f);window.addEventListener("scroll",b)}function c(){window.addEventListener("scroll",f)}function f(){d||(d=!0,setTimeout(function(){a={x:window.pageXOffset||g.scrollLeft,y:window.pageYOffset||g.scrollTop};d=!1},60))}var g=window.document.documentElement,d,a;c();[].slice.call(document.querySelectorAll(".morph-button")).forEach(function(a){new UIMorphingButton(a,{closeEl:".morph-close",onBeforeOpen:function(){e()},
onAfterOpen:function(){window.removeEventListener("scroll",b);c()},onBeforeClose:function(){e()},onAfterClose:function(){window.removeEventListener("scroll",b);c()}})})})();


/*---------- PRELOADER ----------*/
function reveal(){
	// window sizes
	var winsize = { width : window.innerWidth, height : window.innerHeight };
	
	// if animating return
	if( this.isAnimating ) {
		return false;
	}
	this.isAnimating = true;
	
	var widthVal, heightVal, transform;
	var pageDiagonal = Math.sqrt(Math.pow(winsize.width, 2) + Math.pow(winsize.height, 2));
	widthVal = heightVal = pageDiagonal + 'px';
	transform = 'translate3d(-50%,-50%,0) rotate3d(0,0,1,45deg) translate3d(0,' + pageDiagonal + 'px,0)';
	
	var revealerWrapper = document.getElementById("revealer");
	revealerWrapper.style.width = widthVal;
	revealerWrapper.style.height = heightVal;
	revealerWrapper.style.WebkitTransform = revealerWrapper.style.transform = transform;
	revealerWrapper.style.opacity = 1;
	
	setTimeout(function(){revealerWrapper.style.opacity = 0;}, 1600);
	setTimeout(function(){$("#loader-wrapper").fadeOut();}, 750);
	
}

$(document).ready(function(){
	
	/*--- Header ---*/
	var $header = $('#header');
	var offset = 20;
	
	$(window).scroll(function(){
		if ($(this).scrollTop() > offset ) {
			$header.addClass('scrolling');
		} else {
			$header.removeClass('scrolling');
		}
	});
	
	/*--- MOBILE MENU ---*/
	$('.btn-menu').bind('click', function(){
		$("body").addClass("menu-open");
		$("#mobile_nav_wrapper").scrollTop(0);
	});
	
	$('#main_menu a').bind('click', function(){
		$("body").addClass("menu-open");
		$("#mobile_nav_wrapper").scrollTop(0);
		var navID = $(this).attr('href');	
		var sub_nav = $(navID).children(".sub-nav");
		
		$(".mobile-nav li").removeClass("open");
		$(".sub-nav").hide();
		setTimeout(function() { 
			$(navID).addClass("open");
			sub_nav.slideDown(200);
		}, 600);		
		return false;
	});
	
	$('body').on('click', function(event){
		if($(event.target).is('body.menu-open') || $(event.target).is('.menu-close')) {
			$('body').removeClass('menu-open');
			event.preventDefault();
		}
	});
	
	$(".mobile-nav .has-children .toggle").click(function() {
		var sub_nav = $(this).closest("li").children(".sub-nav");
		if(sub_nav.is(':visible'))
		{
			$(this).closest("li").removeClass("open");
			sub_nav.slideUp(200);
		}
		else
		{
			$(".mobile-nav li").removeClass("open");
			$(this).closest("li").addClass("open");
			$(".sub-nav").slideUp(200);
			sub_nav.slideDown(200);
		}
				
		return false;
		
	});
	
	/*--- SEARCH ---*/
	$('.btn-search').bind('click', function(){
		$("#search").addClass('search-open');
		setTimeout(function() { 
			$('#search .txtsearch').focus();
		}, 100);
	});
	
	$('.btn-search-close').bind('click', function(){
		$("#search").removeClass('search-open');
		$('#search .txtsearch').blur().val('');
	});
	
	
	/*---------- HOME SLIDER ----------*/
	$("#home_banner .owl-carousel").owlCarousel({
		items:1,
		dots:true,
		responsiveRefreshRate:0,
		loop:true,
		autoplay:true,
		animateOut: 'fadeOut'
	});
	
	if ($('.dd').length){
		$('.dd').selectric();
	}
	
	/*---------- EQUAL HEIGHT ----------*/
	if($('.who-we-are').length){
		$('.who-we-are .info').matchHeight();
	}
	
	if($('.blog-posts').length){
		$('.blog-posts li').matchHeight();
	}
	
	/*---------- CUSTOM RADIO BUTTONS ----------*/
	$('input').iCheck();
	
	/*---------- PROJECTS SLIDER ----------*/
	$(".projects-slider").owlCarousel({
		items:1,
		dots:true,
		responsiveRefreshRate:0,
		loop:true,
		autoplay:true
	});
	
	/*---------- VIEWPORT CHECKER ----------*/
	$('.anim-element').viewportChecker();
	

	/*---------- ACCORDION ----------*/
	$(".accordion .title").bind('click', function(e){
		if(!$(this).parent("li").hasClass("content-visible")){
			$(".accordion li").removeClass("content-visible");
			$(".accordion .desc").slideUp(200);
		}
		$(this).next('.desc').slideToggle(200).end().parent('li').toggleClass('content-visible');
		e.preventDefault();
	});
	
	/*---------- STICKY TABLE HEADERS ----------*/
	var thHeight = $('.sticky-enabled th').height();
	var stickyColTh = $('.sticky-col th').outerWidth();
	$('.sticky-intersect th').height(thHeight);
	$('.sticky-intersect').width(stickyColTh);
	
	$(window).scroll(function(){
		
		
		if ($(this).scrollTop() > 20 ) {
			$('.sticky-wrap .sticky-thead').css('margin-top','72px');
			$('.sticky-wrap .sticky-intersect').css('margin-top','72px');
		}
		else{
			$('.sticky-wrap .sticky-thead').css('margin-top','0');
			$('.sticky-wrap .sticky-intersect').css('margin-top','0');
		}
		
	});
	
	/*---------- POPUP ----------*/
	$(".popup-trigger").bind('click', function(e){
		$("body").addClass("popup-open");
		$(".popup").removeClass("show");
		$(this).parent().find('.popup').addClass('show');
		e.preventDefault();
	});
	
	$(".popup .btn-close").bind('click', function(){
		$("body").removeClass("popup-open");
		$(".popup").removeClass("show");
	});
	
	if($(window).width() > 1000){
		$(".popup .scrollable").niceScroll({cursorcolor:"#000", cursorborder:"0px", autohidemode:false});
	}
	
	//close popup
	$('body').on('click', function(event){
		if( $(event.target).is('.popup .btn-close') || $(event.target).is('body.popup-open')) {
			$("body").removeClass("popup-open");
			$(".popup").removeClass("show");
			event.preventDefault();
		}
	});
	
	
	/*---------- MORPH FORM ----------*/
	if($(window).width() > 1000){
		$(".morph-content .scrollable").niceScroll({cursorcolor:"#000", cursorborder:"0px", autohidemode:false});
	}
	
	/*---------- BOD ----------*/	
	var sliderFinalWidth = 355,
		maxQuickWidth = 900;

	//open the quick view panel
	$('.cd-trigger').on('click', function(event){
		var selectedImage = $(this).children('img'),
			selectedmember = $(this).parent('.cd-item'),
			memberID = $(this).attr("id"),
			qvcontent = selectedmember.children('.quick-view-content').html(),
			qvwrapper = document.getElementById('cd-quick-view');
		
		$('body').addClass('overlay-layer');
		animateQuickView(selectedImage, sliderFinalWidth, maxQuickWidth, 'open');
		
		$('#cd-quick-view').children('.quick-view-content-wrapper').remove();
		$(qvwrapper).append(myData[memberID]);
		
		if($(window).width() > 1000){
			$(".cd-quick-view .desc").niceScroll({cursorcolor:"#000", cursorborder:"0px", autohidemode:false});
		}
		
		event.preventDefault();
		
	});
	
	//close the quick view panel
	$('body').on('click', function(event){
		if( $(event.target).is('.cd-close') || $(event.target).is('body.overlay-layer')) {
			closeQuickView( sliderFinalWidth, maxQuickWidth);
			event.preventDefault();
		}
	});
	
	$(document).keyup(function(event){
		//check if user has pressed 'Esc'
    	if(event.which=='27'){
				if($('.cd-quick-view.is-visible').length){
					closeQuickView( sliderFinalWidth, maxQuickWidth);
				}			
				$("body").removeClass("popup-open");
				$(".popup").removeClass("show");
				
				if( $('body').hasClass('menu-open') ) {
					$('body').removeClass('menu-open');
				}
				
				if($("#search").hasClass('search-open')){
					$("#search").removeClass('search-open');
					$('#search .txtsearch').blur().val('');
				}
				
				if($('.bill-detail').length){
					$('.bill-detail').removeClass('open');
					$('.hotspots a').removeClass('active');
				}
				
			}
	});

	//center quick-view on window resize
	$(window).on('resize', function(){
		if($('.cd-quick-view').hasClass('is-visible')){
			window.requestAnimationFrame(resizeQuickView);
		}
	});
	
	function resizeQuickView() {
		var quickViewLeft = ($(window).width() - $('.cd-quick-view').width())/2,
			quickViewTop = ($(window).height() - $('.cd-quick-view').height())/2;
		$('.cd-quick-view').css({
		    "top": quickViewTop,
		    "left": quickViewLeft,
		});
	} 
	
	function closeQuickView(finalWidth, maxQuickWidth) {
		var close = $('.cd-close'),
			selectedImage = $('.empty-box').find('img');
		if( !$('.cd-quick-view').hasClass('velocity-animating') && $('.cd-quick-view').hasClass('add-content')) {
			animateQuickView(selectedImage, finalWidth, maxQuickWidth, 'close');
		} else {
			closeNoAnimation(selectedImage, finalWidth, maxQuickWidth);
		}
	}
	
	function animateQuickView(image, finalWidth, maxQuickWidth, animationType) {
		var parentListItem = image.closest('.cd-item'),
			topSelected = image.offset().top - $(window).scrollTop(),
			leftSelected = image.offset().left,
			widthSelected = image.width(),
			heightSelected = image.height(),
			windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			finalLeft = (windowWidth - finalWidth)/2,
			finalHeight = finalWidth * heightSelected/widthSelected,
			finalTop = (windowHeight - finalHeight)/2,
			quickViewWidth = ( windowWidth * .8 < maxQuickWidth ) ? windowWidth * .8 : maxQuickWidth ,
			quickViewLeft = (windowWidth - quickViewWidth)/2;

		if( animationType == 'open') {
			//hide the image in the gallery
			parentListItem.addClass('empty-box');
			//place the quick view over the image gallery and give it the dimension of the gallery image
			$('.cd-quick-view').css({
			    "top": topSelected,
			    "left": leftSelected,
			    "width": widthSelected,
			});
			
			if($(window).width() > 1000){
				$('.cd-quick-view').velocity({
					//animate the quick view: animate its width and center it in the viewport
					//during this animation, only the slider image is visible
						'top': finalTop+ 'px',
						'left': finalLeft+'px',
						'width': finalWidth+'px',
				}, 1000, [ 400, 20 ], function(){
					//animate the quick view: animate its width to the final value
					$('.cd-quick-view').addClass('animate-width').velocity({
						'left': quickViewLeft+'px',
							'width': quickViewWidth+'px',
					}, 300, 'ease' ,function(){
						//show quick view content
						$('.cd-quick-view').addClass('add-content');
					});
				});
			}
			else{
				$('.cd-quick-view').velocity({
					//animate the quick view: animate its width and center it in the viewport
					//during this animation, only the slider image is visible
						'top': finalTop+ 'px',
						'left': finalLeft+'px',
						'width': finalWidth+'px',
				}, 0, [ 400, 20 ], function(){
					//animate the quick view: animate its width to the final value
					$('.cd-quick-view').addClass('animate-width').velocity({
						'left': quickViewLeft+'px',
							'width': quickViewWidth+'px',
					}, 300, 'ease' ,function(){
						//show quick view content
						$('.cd-quick-view').addClass('add-content');
					});
				});
			}
			
			$('.cd-quick-view').addClass('is-visible');
		} else {
			//close the quick view reverting the animation
			$('.cd-quick-view').removeClass('add-content').velocity({
			    'top': finalTop+ 'px',
			    'left': finalLeft+'px',
			    'width': finalWidth+'px',
			}, 300, 'ease', function(){
				$('body').removeClass('overlay-layer');
				$('.cd-quick-view').removeClass('animate-width').velocity({
					"top": topSelected,
				    "left": leftSelected,
				    "width": widthSelected,
				}, 500, 'ease', function(){
					$('.cd-quick-view').removeClass('is-visible');
					parentListItem.removeClass('empty-box');
				});
			});
		}
	}
	
	function closeNoAnimation(image, finalWidth, maxQuickWidth) {
		var parentListItem = image.closest('.cd-item'),
			topSelected = image.offset().top - $(window).scrollTop(),
			leftSelected = image.offset().left,
			widthSelected = image.width();

		//close the quick view reverting the animation
		$('body').removeClass('overlay-layer');
		parentListItem.removeClass('empty-box');
		$('.cd-quick-view').velocity("stop").removeClass('add-content animate-width is-visible').css({
			"top": topSelected,
		    "left": leftSelected,
		    "width": widthSelected,
		});
	}
	
	
	$('.investor-form .btn-next, .investor-form .btn-prev, .investor-steps a').on('click', function(event){
		
		var stepID = $(this).attr('rel');
				
		$('.investor-form .form-container').hide();
		$('.investor-steps').find('.current').addClass('done');
		$('.investor-steps a').removeClass('current');
		$('#' + stepID).show();
		$('.investor-steps').find('.' + stepID).addClass('current').removeClass('done');
		
		var target = $('.investor-form-wrapper');
		if(target != "") {
			$('html,body').animate({
				scrollTop: $(target).offset().top - 80
			}, 1000);
		}
		
		event.preventDefault();
	});
	
	$('.investor-form .btn-submit').on('click', function(event){
		
		var stepID = $(this).attr('rel');
				
		$('.investor-form .form-container').hide();
		$('.investor-steps a').removeClass('current done');
		$('#' + stepID).show();
		$('.investor-steps').find('.' + stepID).addClass('current');
		
		var target = $('.investor-form-wrapper');
		if(target != "") {
			$('html,body').animate({
				scrollTop: $(target).offset().top - 80
			}, 1000);
		}
		
		event.preventDefault();
	});
	
	/*---------- KNOW YOUR BILL ----------*/
	$('.hotspots a').bind('click', function(e){
		var detailID = $(this).attr('href');
		if(!$(this).hasClass('active')){
			$('.bill-detail').removeClass('open');
			$('.hotspots a').removeClass('active');
			$(this).addClass('active');
			$(detailID).addClass('open');
			$('body').addClass('bill-open');
		}
		e.preventDefault();
	});
	
	$('.bill-detail-close').bind('click', function(e){
		$('.bill-detail').removeClass('open');
		$('.hotspots a').removeClass('active');
		e.preventDefault();
	});
	
		
});//document.ready end

$(window).load(function() {
	if($('#revealer').length){
		reveal();
	}
	$("body.home").addClass("loaded");
	$(".home #quick_links").addClass("initial");
	setTimeout(function() { 
		$(".home #quick_links").removeClass("initial");
	}, 2000);
	
});