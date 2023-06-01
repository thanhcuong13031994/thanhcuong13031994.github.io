'use strict';
var ua                   = window.navigator.userAgent;
var appVer               = window.navigator.appVersion;

var isIE                 = ua.indexOf('MSIE') != -1 || ua.indexOf('Trident') != -1;
var isIE6                = isIE && appVer.indexOf('MSIE 6') != -1;
var isIE7                = isIE && appVer.indexOf('MSIE 7.') != -1;
var isIE8                = isIE && ua.indexOf('Trident/4.') != -1  || appVer.indexOf('MSIE 8.') != -1;
var isIE9                = isIE && ua.indexOf('Trident/5.') != -1;
var isIE10               = isIE && ua.indexOf('Trident/6.') != -1;
var isIE11               = ua.indexOf('Trident/7.') != -1;
var isMicrosoftEdge      = ua.indexOf('Edge') != -1;
var isOldIE              = isIE8 || isIE7 || isIE6;

var isFirefox            = ua.indexOf('Firefox') != -1;
var isChrome             = ua.indexOf('Chrome') != -1;
var isSafari             = ua.indexOf('Safari') != -1;

var isMobileSafari       = ua.match(/iPhone|iPad|iPod/i) ? true : false;
var isMobileSafariTypeT  = ua.match(/ipad/i) ? true : false;
var isMobileSafariTypeS  = ua.match(/iphone|ipod/i) ? true : false;
var isAndroid            = ua.indexOf('Android') != -1;
var isMobileAndroidTypeT = isAndroid && ua.indexOf('Mobile') == -1;
var isMobileAndroidTypeS = isAndroid && ua.indexOf('Mobile') != -1;
var isAndroidChrome      = isChrome && isAndroid;
var isAndroidFirefox     = isFirefox && isAndroid;
var isMobileFirefox      = isFirefox && ua.indexOf('Mobile') != -1;
var isTabletFirefox      = isFirefox && ua.indexOf('Tablet') != -1;

var isTablet             = isMobileSafariTypeT || isMobileAndroidTypeT || isTabletFirefox;
var isSmartPhone         = isMobileSafariTypeS || isMobileAndroidTypeS || isMobileFirefox;
var isMobile             = isTablet && isSmartPhone && isAndroidChrome;
var isPC                 = !isMobile;

var isFacebookAPP        = ua.indexOf('FBAN') != -1;

var locationHref     = window.location.href;     // http://www.google.com:80/search?q=demo#test
var locationProtocol = window.location.protocol; // http:
var locationHostname = window.location.hostname; // www.google.com
var locationHost     = window.location.host;     // www.google.com:80
var locationPort     = window.location.port;     // 80
var locationPath     = window.location.pathname; // /search
var locationSearch   = window.location.search;   // ?q=demo
var locationHash     = window.location.hash;     // #test
var locationReplace  = window.location.replace;

var filename = location.href.substring(location.href.lastIndexOf("/")+1, location.href.length);

var urlParam = new Object;
var urlParam2 = location.search.substring(1).split('&');
for(var i=0; urlParam2[i]; i++) {
	var urlParamVal = urlParam2[i].split('=');
	urlParam[urlParamVal[0]] = urlParamVal[1];
}

var breakPoint      = 768;
var breakPoint2      = 767;
var breakPointTb    = 1025;
var $window         = $(window);
var isWindowWidth   = $window.width();
var lang = $('html').attr('lang');
lang = lang.replace(/\r?\n/g, "");
lang = lang.replace(/\s+/g, "");

function viewport(){
	var e = window, a = 'inner';
	if ( !( 'innerWidth' in window ) ){
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}
$.fn.jsFullBackground = function(config){
	var defaults = {
		position : 'center center',
		bgsize: 'cover',
		repeat: 'no-repeat'
	};
	var config = $.extend({}, defaults, config);

	return this.each(function() {
		var $this = $(this);
		var $imgPc = $this.children('img.pc').first();
		var $imgSp = $this.children('img.sp').first();
        var $img = viewport().width < 768 ? $imgSp : $imgPc;
		if (!$img.length) return false;
		var src = $img.attr('src');
		var position = config.position;
		var bgsize = config.bgsize;
		var repeat = config.repeat;
		if ($this.data('position')) {
			position = $this.data('position');
		}
		if ($this.data('bgsize')) {
			bgsize = $this.data('bgsize');
		}
		if ($this.data('repeat')) {
			repeat = $this.data('repeat');
		}
		$this.css({
			backgroundSize: bgsize,
			backgroundImage: 'url(' + src + ')',
			backgroundRepeat: repeat,
			backgroundPosition: position
		});
		$img.hide();
		$imgPc.hide();
		$imgSp.hide();
	});
}
$(function(){
	$('.js-fullbg').jsFullBackground();
    $window.resize(function() {
        $('.js-fullbg').jsFullBackground();
    });
    $("a").on('click', function(event) {
        if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){
            window.location.hash = hash;
        });
        }
    });
    $(".js-scrollTop").click(function() {
        console.log('js-scrollTop');
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

	var imgPopup = $('.img-popup');
	var popupImage = $('.img-popup img');
	var closeBtn = $('.close-btn');
	var imgPopupTrigger = $('.js-img-popup');

	// handle events
	imgPopupTrigger.on('click', function() {
		var img_src = $(this).attr('src');
		imgPopup.children('img').attr('src', img_src);
		imgPopup.addClass('opened');
	});

	$(imgPopup, closeBtn).on('click', function() {
		imgPopup.removeClass('opened');
		imgPopup.children('img').attr('src', '');
	});

	popupImage.on('click', function(e) {
		e.stopPropagation();
	});
});




$(function () {
	function loadScript() {
		if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}
	}
	
	// 3. This function creates an <iframe> (and YouTube player)
		  //    after the API code downloads.
		  var player;
		  function onYouTubeIframeAPIReady() {
			player = new YT.Player('player', {
			  height: '390',
			  width: '640',
			  videoId: 'WYj-7IrjC4c',
			  playerVars: {
				'playsinline': 1
			  },
			  events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			  }
			});
		  }
	
		  // 4. The API will call this function when the video player is ready.
		  function onPlayerReady(event) {
			// event.target.playVideo();
		  }
	
		  // 5. The API calls this function when the player's state changes.
		  //    The function indicates that when playing a video (state=1),
		  //    the player should play for six seconds and then stop.
		  function onPlayerStateChange(event) {
			if (event.data == YT.PlayerState.PLAYING) {
				$('.js-click-play-video').addClass('is-active');
			} else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED){
				console.log(YT.PlayerState);
				$('.js-click-play-video').removeClass('is-active');
			}
		  }
	
	function loadPlayer() {
			window.onYouTubePlayerAPIReady = function() {
				onYouTubeIframeAPIReady();
			};
	}
	loadScript();
	loadPlayer();
	$('.js-click-play-video').click(function() {
		if(!$(this).hasClass('is-active')) {
			$(this).addClass('is-active');
			player.playVideo();
		} else {
			$(this).removeClass('is-active');
			player.pauseVideo();
		}
	});
})	