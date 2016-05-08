var Point = function(options) {
  this.x = options.x;
  this.y = options.y;
};

var CircleDrawConfig = function(options) {
  options = options || {};

  this.maxRadius = function() {
    return options.maxRadius || 126;
  };

  this.maxDiameter = function() {
    return this.maxRadius() * 2;
  };

  this.marginBetweenCircles = function() {
    return options.marginBetweenCircles || 130;
  };

  this.radiusAdder = function() {
    return options.radiusAdder || 4;
  };

  this.radiusMultiplier = function() {
    return options.radiusMultiplier || 18;
  };

  this.circleDrawTime = function() {
    return options.circleDrawTime || 3000;
  };

  this.circleRemoveTime = function() {
    return options.circleRemoveTime || (this.circleDrawTime() / 8);
  };
};

var DnaData = function(dnaString) {
  var nucleotides = "ACGT",
      drawData;

  var initializeDrawData = function() {
    drawData = dnaString.split('').map(getNucleotideDrawDatum);
  };

  this.getDrawDatum = function(idx) {
    return drawData[idx] || getDefaultDrawDatum();
  };

  var getNucleotideDrawDatum = function(nucleotide) {
    return {
      value: nucleotideToNumber(nucleotide),
      color: nucleotideToColor(nucleotide)
    };
  };

  var getDefaultDrawDatum = function() {
    return getNucleotideDrawDatum(nucleotides.split('')[0]);
  };

  var nucleotideToNumber = function(char) {
    return nucleotides.indexOf(char);
  }

  var nucleotideToColor = function(nucleotide) {
    return ["#ff3f00", "#666", "#444", "black"][nucleotideToNumber(nucleotide)];
  };

  initializeDrawData();
};

var DnaVisualContainer = function(containerId) {
  var raphaelObject;

  this.prepare = function() {
    raphaelObject = Raphael(containerId);
    raphaelObject.setSize(screen.width, screen.height);
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

var DnaVisual = function(containerId, dnaString) {
  var container = new DnaVisualContainer(containerId);
  var drawOptions = new CircleDrawConfig();
  var dnaData = new DnaData(dnaString);

  this.render = function() {
    container.prepare();
    createVisual();
    return this;
  };

  this.clear = function() {
    container.clear(drawOptions.circleRemoveTime());
    return this;
  };

  var createVisual = function() {
    var point = new Point({ x: 0, y: 0 }),
        circleIdx = 0;

    while (!screenHasFilled(point)) {
      var datum = dnaData.getDrawDatum(circleIdx);
      var radius = getRadius(datum.value);
      var colorString = datum.color;

      container.drawCircle(point, radius, colorString, drawOptions.circleDrawTime());
      updatePoint(point, radius);

      circleIdx++;
    }
  };

  var screenHasFilled = function(point) {
    return point.y > (screen.height + drawOptions.maxDiameter());
  };

  var getRadius = function(dataInt) {
    return (dataInt + drawOptions.radiusAdder()) * drawOptions.radiusMultiplier();
  };

  var updatePoint = function(point, radius) {
    if (rowHasFilled(point)) {
      point.x = 0;
      point.y = point.y + drawOptions.maxRadius() + drawOptions.marginBetweenCircles();
    } else {
      point.x = point.x + radius + drawOptions.marginBetweenCircles();
    }
  };

  var rowHasFilled = function(point) {
    return point.x > screen.width;
  };
};
