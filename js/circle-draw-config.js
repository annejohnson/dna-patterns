var CircleDrawConfig = function(options) {
  options = options || {};
  var numberOfDifferentSizes = 4;
  var screenWidthBreakpoint = 600;

  var publicDefaults = [
    'maxRadius',
    'marginBetweenCircles',
    'circleDrawTime',
    'circleRemoveTime'
  ];
  publicDefaults.map(function(drawOption) {
    this[drawOption] = function() {
      return getDrawOption(drawOption);
    };
  }.bind(this));

  this.maxDiameter = function() {
    return this.maxRadius() * 2;
  };

  this.getRadius = function(sizeInt) {
    return getRadius(
      sizeInt,
      getDrawOption('radiusAdder'),
      getDrawOption('radiusMultiplier')
    );
  };

  var getRadius = function(sizeInt, radiusAdder, radiusMultiplier) {
    var normalizedSizeInt = sizeInt % numberOfDifferentSizes;
    return (normalizedSizeInt + radiusAdder) * radiusMultiplier;
  };

  var getDrawOption = function(drawOption) {
    return options[drawOption] || defaults()[drawOption];
  };

  var defaults = function() {
    var drawOptions;

    if (isLargeScreen()) {
      drawOptions = largeScreenDefaults();
    } else {
      drawOptions = smallScreenDefaults();
    }

    drawOptions.maxRadius = getRadius(
      numberOfDifferentSizes - 1,
      drawOptions.radiusAdder,
      drawOptions.radiusMultiplier
    );

    return drawOptions;
  };

  var isLargeScreen = function() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    return width > screenWidthBreakpoint;
  };

  var largeScreenDefaults = function() {
    return {
      radiusAdder: 4,
      radiusMultiplier: 11,
      circleDrawTime: 700,
      circleRemoveTime: 175,
      marginBetweenCircles: 4
    };
  };

  var smallScreenDefaults = function() {
    return {
      radiusAdder: 4,
      radiusMultiplier: 9,
      circleDrawTime: 700,
      circleRemoveTime: 175,
      marginBetweenCircles: 3
    };
  };
};
