var DNASequence = function(options) {
  var speciesName = options.speciesName,
      commonName = options.commonName,
      sequence = options.sequence,
      colors = options.colors,
      id = options.id;

  this.getDrawDatum = function(idx) {
    return nucleotideAtPosition(idx).toDrawDatum({ colors: colors });
  };

  this.getName = function() {
    return commonName;
  };

  this.getId = function() {
    return id;
  };

  var nucleotideAtPosition = function(idx) {
    var nucleotideChar = sequence[idx] || nucleotides.split('')[0];
    return new Nucleotide(nucleotideChar);
  };
};
