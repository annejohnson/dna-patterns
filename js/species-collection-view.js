var SpeciesCollectionView = function(model, elements) {
  var buttonContainerId = elements.buttonContainerId,
      patternContainerId = elements.patternContainerId,
      onButtonClick = null,
      speciesVisual = null;

  model.subscribe("selectedIndexUpdated", function() {
    displaySpecies(model.getSelectedSpecies());
  });

  var displaySpecies = function(species) {
    if (speciesVisual) {
      speciesVisual.clear(function() {
        speciesVisual.render(species);
      });
    } else {
      speciesVisual = new Visual(patternContainerId).render(species);
    }
  };

  var initializeButtons = function() {
    var btnMaker = new ButtonMaker(buttonContainerId, {
      buttonData: model.getSpeciesCollection(),
      htmlFunction: speciesToHTMLDescription
    });

    btnMaker.makeButtons({
      clickHandler: processButtonClick,
      preselectIndex: model.getSelectedIndex()
    });
  };

  var speciesToHTMLDescription = function(species) {
    return species.getCommonName() +
             "<div class=\"species-name\">" +
               species.getSpeciesName() +
             "</div>";
  };

  this.onButtonClick = function(callback) {
    onButtonClick = callback;
  };

  var processButtonClick = function(index) {
    if (speciesVisual.currentlyRendering()) {
      return false;
    } else {
      onButtonClick(index);
      return true;
    }
  };

  initializeButtons();
  displaySpecies(model.getSelectedSpecies());
};
