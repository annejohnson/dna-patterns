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
