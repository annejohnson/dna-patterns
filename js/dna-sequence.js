var DNASequence = function(sequence) {
  var createNucleotide = function(nucleotideChar) {
    return new Nucleotide(nucleotideChar);
  };
  var nucleotides = sequence.split("").map(createNucleotide);

  this.getDrawData = function(colors) {
    return nucleotides.map(function(nucleotide) {
      return nucleotide.toDrawDatum(colors);
    });
  };
};
