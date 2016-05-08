var RaphaelWrapper = function(containerId) {
  var raphaelObject;

  this.prepare = function() {
    if (!raphaelObject) {
      raphaelObject = Raphael(containerId);
      raphaelObject.setSize(screen.width, screen.height);
    }
  };

  this.drawCircle = function(point, radius, colorString, animationTime) {
    var initialRadius = 0;
    var circle = raphaelObject.circle(point.x, point.y, initialRadius)
                        .attr({
                          fill: colorString,
                          stroke: colorString
                        });

    circle.animate({ r: radius }, (animationTime || 0), "elastic");
    return circle;
  };

  this.clear = function(animationTime) {
    animationTime = animationTime || 0;

    raphaelObject.forEach(function(circ) {
      circ.animate(
        { r: 0 },
        animationTime,
        "linear",
        function() {
          circ.remove();
        }
      );
    });
  };
};
