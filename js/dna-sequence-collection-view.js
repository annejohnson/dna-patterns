var DNASequenceCollectionView = function(model, elements) {
  var publisher = new Publisher(),
      buttonContainerId = elements.buttonContainerId,
      patternContainerId = elements.patternContainerId,
      dnaVisual = null;

  model.subscribe("selectedIndexUpdated", function() {
    displaySequence(model.getSelectedSequence());
  });

  var displaySequence = function(sequence) {
    if (dnaVisual) {
      dnaVisual.clear();
    }
    dnaVisual = new DNAVisual(patternContainerId, sequence).render();
  };

  this.subscribe = function(eventName, callback) {
    publisher.subscribe(eventName, callback);
  };

  var processButtonClick = function(index) {
    publisher.publish('buttonClicked', index);
  };

  var initializeButtons = function() {
    document.getElementById(buttonContainerId).textContent = "";

    var btnMaker = new ButtonMaker(buttonContainerId, {
      buttonData: model.getSequences()
    });

    btnMaker.makeButtons({
      clickHandler: processButtonClick,
      preselectIndex: model.getSelectedIndex()
    });
  };

  initializeButtons();
  displaySequence(model.getSelectedSequence());
};
