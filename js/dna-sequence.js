var Nucleotide = function(nucleotideChar) {
  var nucleotides = "ACGT";

  this.toDrawDatum = function(options) {
    return {
      value: toNumber(),
      color: toColor(options.colors)
    };
  };

  var toNumber = function() {
    return nucleotides.indexOf(nucleotideChar);
  };

  var toColor = function(colors) {
    return colors[toNumber()];
  };
};

var DNASequence = function(options) {
  var speciesName = options.speciesName,
      commonName = options.commonName,
      sequence = options.sequence,
      colors = options.colors;

  this.getDrawDatum = function(idx) {
    return nucleotideAtPosition(idx).toDrawDatum({ colors: colors });
  };

  var nucleotideAtPosition = function(idx) {
    var nucleotideChar = sequence[idx] || nucleotides.split('')[0];
    return new Nucleotide(nucleotideChar);
  };
};
