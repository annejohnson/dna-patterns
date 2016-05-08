var ButtonMaker = function(buttonContainerId, options) {
  var buttonClass = "button chooser",
      buttonClassActive = "active";
  var buttonData = options.buttonData,
      preselectButtonDatum = options.preselectButtonDatum;

  this.makeButtons = function(options) {
    var buttons = buttonData.map(function(buttonDatum) {
      var highlight = preselectButtonDatum === buttonDatum;
      initializeButton(buttonDatum, options.clickHandler, highlight);
    });
  };

  var initializeButton = function(buttonDatum, clickHandler, highlight) {
    var btn = createButtonNode(buttonDatum, highlight);

    btn.onclick = function(e) {
      e.preventDefault();
      unhighlightAllButtons();
      highlightButton(this);
      clickHandler && clickHandler(buttonDatum);
    };

    return btn;
  };

  var createButtonNode = function(buttonDatum, highlight) {
    var btn = document.createElement("a");
    btn.textContent = buttonDatum.getName();
    btn.id = buttonDatum.getId();
    highlight ? highlightButton(btn) : unhighlightButton(btn);
    document.getElementById(buttonContainerId).appendChild(btn);
    return btn;
  };

  var unhighlightAllButtons = function() {
    var allButtons = document.getElementsByClassName(buttonClassActive);
    for (var i = 0; i < allButtons.length; i++)
      unhighlightButton(allButtons[i]);
  };

  var highlightButton = function(btn) {
    btn.className = buttonClass + " " + buttonClassActive;
  };

  var unhighlightButton = function(btn) {
    btn.className = buttonClass;
  };
};
