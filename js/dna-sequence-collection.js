var DNASequenceCollection = function(dnaSequences) {
  var publisher = new Publisher();
  var selectedIndex = 0;

  this.getSequences = function() {
    return dnaSequences;
  };

  this.getSelectedIndex = function() {
    return selectedIndex;
  };

  this.getSelectedSequence = function() {
    return dnaSequences[this.getSelectedIndex()];
  };

  this.setSelectedIndex = function(idx) {
    selectedIndex = idx;
    publisher.publish('selectedIndexUpdated', idx);
  };

  this.subscribe = function(eventName, callback) {
    publisher.subscribe(eventName, callback);
  };
};
