$(function(){
    var $animationContent = $('.animation__content');
    var $animationCharacter = $animationContent.find('.animation__character');
    var $imgCharacter = $animationContent.find('img');
    var heightCscroll = $animationContent.height();
    var lastScrollTop = 0

    function padLeadingZeros(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }
    function runCharacter(scrollTop, speed) {
        let imgId = Math.round(scrollTop/heightCscroll*100);
        imgId = imgId == 0 ? 1 : imgId;
        let imgIdspeed = Math.round(scrollTop/speed*16);
        if(imgId > 16*7) {
            imgId = imgId - 16*7;
        } else if(imgId > 16*6) {
            imgId = imgId - 16*6;
        } else if(imgId > 16*5) {
            imgId = imgId - 16*5;
        } else if(imgId > 16*4) {
            imgId = imgId - 16*4;
        } else if(imgId > 16*3) {
            imgId = imgId - 16*3;
        } else if(imgId > 16*2) {
            imgId = imgId - 16*2;
        } else if(imgId > 16) {
            imgId = imgId - 16;
        } 
        $imgCharacter.attr('src', characterSrc(imgId))
    }

    function detectSrollUpAndDown(scrollTop, delta){
        const nowScrollTop = scrollTop;
		if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
		 	if (nowScrollTop > lastScrollTop){
                $imgCharacter.css('transform', 'rotate3d(1, 100, 1, 0deg)')
		 	} else {
                $imgCharacter.css('transform', 'rotate3d(1, 100, 1, 180deg)')
			}
		    lastScrollTop = nowScrollTop;
		}
    }

    function characterActivGo(scrollTop) {
        var leftCharacter = (scrollTop/heightCscroll)*100 + '%';
        // var topCharacter = (scrollTop + 175) - 5400;
        if(scrollTop > 5400 && scrollTop <= 5600) {
            $animationCharacter.css({
                left: '67.5%',
                top: `${(scrollTop + 175) - 5400}px`
            });
        }else if(scrollTop > 5600 && scrollTop <= 6200) {
            $animationCharacter.css({
                left: leftCharacter,
                top: `375px`
            });
        } else if(scrollTop > 6200) {
            $animationCharacter.css({
                left: '77.4%',
                top: `${(scrollTop + 375) - 6200}px`
            });
        }else {
            $animationCharacter.css({
                left: leftCharacter,
                top: `175px`
            });
        }
    }

    function characterSrc(imgaeId) {
        return `/assets/images/animation/run${padLeadingZeros(imgaeId, 2)}.png`
    }

    detectSrollUpAndDown($(window).scrollTop(), 10);
    characterActivGo($(window).scrollTop());
    runCharacter($(window).scrollTop(), 500);
    $(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        detectSrollUpAndDown(scrollTop, 10);
        characterActivGo(scrollTop);
        runCharacter(scrollTop, 500);
    });
})
