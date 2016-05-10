var DNASequenceDrawDataGenerator = function(dnaSequence, colors) {
  var nucleotides = dnaSequence.getNucleotides();
  var nucleotideToDrawDatum = function(nucleotide) {
    return {
      value: nucleotide.toNumber(),
      color: colors[nucleotide.toNumber()] || colors[0]
    };
  };
  var drawData = nucleotides.map(nucleotideToDrawDatum);

  this.getDrawDatum = function(index) {
    return drawData[index % drawData.length];
  };
};
