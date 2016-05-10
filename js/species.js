var Species = function(options) {
  var sequence = new DNASequence(options.sequence),
      colors = options.colors,
      drawDataGenerator = new DNASequenceDrawDataGenerator(sequence, colors);

  this.getDrawDatum = function(num) {
    return drawDataGenerator.getDrawDatum(num);
  };

  [
    "speciesName",
    "commonName",
    "id"
  ].map(function(attr) {
    var methodName = "get" + attr[0].toUpperCase() + attr.slice(1);
    this[methodName] = function() {
      return options[attr];
    };
  }.bind(this));
};
