var DnaData = function(dnaString) {
  var nucleotides = "ACGT";

  this.getDrawDatum = function(idx) {
    var nucleotide = dnaString[idx] || nucleotides.split('')[0];
    return getNucleotideDrawDatum(nucleotide);
  };

  var getNucleotideDrawDatum = function(nucleotide) {
    return {
      value: nucleotideToNumber(nucleotide),
      color: nucleotideToColor(nucleotide)
    };
  };

  var nucleotideToNumber = function(char) {
    return nucleotides.indexOf(char);
  }

  var nucleotideToColor = function(nucleotide) {
    return ["#ff3f00", "#666", "#444", "black"][nucleotideToNumber(nucleotide)];
  };
};
