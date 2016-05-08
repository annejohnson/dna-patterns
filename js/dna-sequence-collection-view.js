var DNASequenceCollectionView = function(model, elements) {
  var buttonContainerId = elements.buttonContainerId,
      patternContainerId = elements.patternContainerId,
      onButtonClick = null,
      dnaVisual = null;

  model.subscribe("selectedIndexUpdated", function() {
    displaySequence(model.getSelectedSequence());
  });

  var displaySequence = function(sequence) {
    if (dnaVisual) {
      dnaVisual.clear(function() {
        dnaVisual.render(sequence);
      });
    } else {
      dnaVisual = new DNAVisual(patternContainerId).render(sequence);
    }
  };

  var initializeButtons = function() {
    var btnMaker = new ButtonMaker(buttonContainerId, {
      buttonData: model.getSequences()
    });

    btnMaker.makeButtons({
      clickHandler: processButtonClick,
      preselectIndex: model.getSelectedIndex()
    });
  };

  this.onButtonClick = function(callback) {
    onButtonClick = callback;
  };

  var processButtonClick = function(index) {
    if (dnaVisual.currentlyRendering()) {
      return false;
    } else {
      onButtonClick(index);
      return true;
    }
  };

  initializeButtons();
  displaySequence(model.getSelectedSequence());
};
