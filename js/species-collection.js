var SpeciesCollection = function(speciesArray) {
  var publisher = new Publisher();
  var selectedIndex = 0;

  this.getSpeciesCollection = function() {
    return speciesArray;
  };

  this.getSelectedIndex = function() {
    return selectedIndex;
  };

  this.getSelectedSpecies = function() {
    return this.getSpeciesCollection()[this.getSelectedIndex()];
  };

  this.setSelectedIndex = function(idx) {
    selectedIndex = idx;
    publisher.publish('selectedIndexUpdated', idx);
  };

  this.subscribe = function(eventName, callback) {
    publisher.subscribe(eventName, callback);
  };
};
