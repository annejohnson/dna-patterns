var Species = function(options) {
  var sequence = new DNASequence(options.sequence);

  this.getDnaSequence = function() {
    return sequence;
  };

  [
    "speciesName",
    "commonName",
    "colors",
    "id"
  ].map(function(attr) {
    var methodName = "get" + attr[0].toUpperCase() + attr.slice(1);
    this[methodName] = function() {
      return options[attr];
    };
  }.bind(this));

  var drawData = this.getDnaSequence().getDrawData(
    this.getColors()
  );

  this.getDrawDatum = function(index) {
    return drawData[index];
  };
};
