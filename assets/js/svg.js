window.addEventListener('DOMContentLoaded', function(){
    var lastScrollTop = 0
    var speed = 0;
    function positionCharcater(speed) {
        var scrollY = window.scrollY || window.pageYOffset;
        var maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
        var path = document.getElementById("path1");
        var pathLen = path.getTotalLength() + speed;
        var dist = pathLen * scrollY / maxScrollY;
        var pos = path.getPointAtLength(dist);
        var charcater = document.getElementById("charcater");
        var nowScrollTop = scrollY;
		if(Math.abs(lastScrollTop - nowScrollTop) >= 10){
		 	if (nowScrollTop > lastScrollTop){
                charcater.style.transform = `translate(${pos.x - 50}px,${pos.y - 50}px) rotate3d(1, 100, 1, 0deg)`;
		 	} else {
                charcater.style.transform = `translate(${pos.x + 50}px,${pos.y - 50}px) rotate3d(1, 100, 1, 180deg)`;
			}
		    lastScrollTop = nowScrollTop;
		}
    }
    positionCharcater(speed);
    window.addEventListener("scroll", function(){
        positionCharcater(speed);
    });
})