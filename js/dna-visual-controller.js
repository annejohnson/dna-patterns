var DNAVisualController = function(options) {
  var visualContainerId = options.visualContainerId,
      buttonContainerId = options.buttonContainerId,
      sequences = options.sequences,
      preselectSequence = sequences[0],
      dnaVisual = null;

  this.start = function() {
    displayInitialVisual();
    initializeButtons();
    return this;
  };

  this.rerender = function() {
    dnaVisual.clear().render();
    return this;
  };

  var displayInitialVisual = function() {
    displaySequence(preselectSequence);
  };

  var initializeButtons = function() {
    document.getElementById(buttonContainerId).textContent = "";

    var btnMaker = new ButtonMaker(buttonContainerId, {
      buttonData: sequences,
      preselectButtonDatum: preselectSequence
    });

    btnMaker.makeButtons({
      clickHandler: displaySequence
    });
  };

  var displaySequence = function(sequence) {
    if (dnaVisual) {
      dnaVisual.clear();
    }
    dnaVisual = new DNAVisual(visualContainerId, sequence).render();
  };
};
