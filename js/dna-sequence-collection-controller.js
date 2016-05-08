var DNASequenceCollectionController = function(model, view) {
  view.subscribe('buttonClicked', function(index) {
    setSelectedIndex(index);
  });

  var setSelectedIndex = function(index) {
    model.setSelectedIndex(index);
  };
};
