var DnaData = function(dnaString) {
  var nucleotides = "ACGT",
      drawData;

  var initializeDrawData = function() {
    drawData = dnaString.split('').map(getNucleotideDrawDatum);
  };

  this.getDrawDatum = function(idx) {
    return drawData[idx] || getDefaultDrawDatum();
  };

  var getNucleotideDrawDatum = function(nucleotide) {
    return {
      value: nucleotideToNumber(nucleotide),
      color: nucleotideToColor(nucleotide)
    };
  };

  var getDefaultDrawDatum = function() {
    return getNucleotideDrawDatum(nucleotides.split('')[0]);
  };

  var nucleotideToNumber = function(char) {
    return nucleotides.indexOf(char);
  }

  var nucleotideToColor = function(nucleotide) {
    return ["#ff3f00", "#666", "#444", "black"][nucleotideToNumber(nucleotide)];
  };

  initializeDrawData();
};
