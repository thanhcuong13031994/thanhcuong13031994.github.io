window.addEventListener('DOMContentLoaded', function(){
    function positionCar() {
        var scrollY = window.scrollY || window.pageYOffset;
        var maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
        var path = document.getElementById("path1");
        // Calculate distance along the path the car should be for the current scroll amount
        var pathLen = path.getTotalLength();
        var dist = pathLen * scrollY / maxScrollY;
        var pos = path.getPointAtLength(dist);
        console.log(pos);
        // Calculate position a little ahead of the car (or behind if we are at the end), so we can calculate car angle
        // if (dist + 1 <= pathLen) {
        //     var posAhead = path.getPointAtLength(dist + 1);
        //     var angle = Math.atan2(posAhead.y - pos.y, posAhead.x - pos.x);
        // } else {
        //     var posBehind = path.getPointAtLength(dist - 1);
        //     var angle = Math.atan2(pos.y - posBehind.y, pos.x - posBehind.x);
        // }
        // Position the car at "pos" totated by "angle"
        var car = document.getElementById("car");
        car.setAttribute("transform", "translate(" + (pos.x - 10) + "," + (pos.y - 10) + ")");
        // car.setAttribute("transform", "translate(" + pos.x + "," + pos.y + ") rotate(" + rad2deg(angle) + ")");
    }

    // function rad2deg(rad) {
    //     return 180 * rad / Math.PI;
    // }

    // Reposition car whenever there is a scroll event
    window.addEventListener("scroll", positionCar);

    // Position the car initially
    positionCar();
})