var Nucleotide = function(nucleotideChar) {
  var nucleotideChars = "ACGT";

  this.toDrawDatum = function(colors) {
    return {
      value: toNumber(),
      color: toColor(colors)
    };
  };

  var toNumber = function() {
    return nucleotideChars.indexOf(nucleotideChar);
  };

  var toColor = function(colors) {
    return colors[toNumber()] || colors[0];
  };
};
