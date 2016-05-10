var DNASequence = function(sequence) {
  var createNucleotide = function(nucleotideChar) {
    return new Nucleotide(nucleotideChar);
  };
  var nucleotides = sequence.split("").map(createNucleotide);

  this.getNucleotides = function() {
    return nucleotides;
  };
};
