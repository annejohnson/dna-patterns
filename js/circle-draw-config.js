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
