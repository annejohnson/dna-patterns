var SpeciesCollectionController = function(model, view) {
  view.onButtonClick(function(index) {
    setSelectedIndex(index);
  });

  var setSelectedIndex = function(index) {
    model.setSelectedIndex(index);
  };
};
