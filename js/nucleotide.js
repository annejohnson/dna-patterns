var Nucleotide = function(nucleotideChar) {
  var nucleotideChars = "ACGT";

  this.toNumber = function() {
    return nucleotideChars.indexOf(nucleotideChar);
  };
};
