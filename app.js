(function () {
  var screenWidthBreakpoint = 600,
      circleDrawTime = 3000,
      circleRemoveTime = circleDrawTime / 4,
      redrawTimeout = 200,
      nucleotides = "ACGT",
      currBirdName = "pionus";

  var birdVisRaphaelObject;

  window.onload = function() {
    prepareContainer();
    initializeButtons();
    highlightButton(document.getElementById(currBirdName));
    displayCurrentBirdVis({ animate: true });
  };

  window.onresize = function() {
    prepareContainer();
    setTimeout(function() {
      displayCurrentBirdVis({ animate: false });
    }, redrawTimeout);
  };

  var prepareContainer = function() {
    if (!birdVisRaphaelObject) {
      birdVisRaphaelObject = Raphael("birdVis");
    }
    birdVisRaphaelObject.setSize(screen.width, screen.height);
  };

  var initializeButtons = function() {
    for (var birdName in birdData) {
      initializeButton(birdName);
    }
  };

  var initializeButton = function(birdName) {
    var btn = constructButtonNode(birdName);
    btn.onclick = function(e) {
      e.preventDefault();
      unhighlightAllButtons();
      highlightButton(this);
      currBirdName = this.id;
      displayCurrentBirdVis({ animate: true });
    };
  };

  var constructButtonNode = function(bird) {
    var btn = document.createElement("a");
    btn.textContent = birdData[bird].name;
    btn.id = bird;
    btn.className = "button chooser";
    document.getElementById("choicesContainer").appendChild(btn);
    return btn;
  };

  var unhighlightAllButtons = function() {
    var allButtons = document.getElementsByClassName("active");
    for (var i = 0; i < allButtons.length; i++)
      allButtons[i].className = "button chooser";
  };

  var highlightButton = function(btn) {
    btn.className = "button chooser active";
  };

  var nucleotideToNumber = function(char) {
    return nucleotides.indexOf(char);
  }

  var nucleotidesToNumbers = function(str) {
    return str.split('').map(nucleotideToNumber);
  }

  var largeOrSmallScreen = function() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    return width > screenWidthBreakpoint ? "large" : "small";
  };

  var displayCurrentBirdVis = function(options) {
    writeVis(
      nucleotidesToNumbers(birdData[currBirdName].seq),
      birdData[currBirdName].colors,
      options['animate']
    );
  };

  var writeVis = function(arrayOfInts, colorStrings, shouldAnimate) {
    removeAllCircles(shouldAnimate)
    var currX = 0,
      currY = 0,
      i = 0,
      drawOptions = defaultDrawOptions(),
      maxDiameter = 2 * drawOptions.maxRadius;
    while (currY <= screen.height + maxDiameter) {
      var radius = (arrayOfInts[i] + drawOptions.radiusAdder) * drawOptions.radiusMultiplier;
      var initialRadius = shouldAnimate ? 0 : radius;
      var newCircle;

      newCircle = birdVisRaphaelObject.circle(
        currX,
        currY,
        initialRadius
      );
      newCircle.attr({
        fill: colorStrings[arrayOfInts[i]],
        stroke: colorStrings[arrayOfInts[i]]
      });

      if (shouldAnimate) {
        newCircle.animate({ r: radius }, circleDrawTime, "elastic");
      }

      currX += radius + drawOptions.spacer;
      if (currX > screen.width) {
        currX = 0;
        currY += drawOptions.maxRadius + drawOptions.spacer;
      }
      i++;
    }
  };

  var removeAllCircles = function(shouldAnimate) {
    if (shouldAnimate) {
      birdVisRaphaelObject.forEach(function(circ) {
        circ.animate({ r: 0 }, circleRemoveTime, "linear", function() {
          circ.remove();
        });
      });
    } else {
      birdVisRaphaelObject.clear();
    }
  };

  var defaultDrawOptions = function() {
    var drawOptions = {
          small: {
            radiusMultiplier: 9,
            radiusAdder: 4
          },
          large: {
            radiusMultiplier: 18,
            radiusAdder: 4
          }
        };
    var margin = 4;

    ["small", "large"].map(function(size) {
      drawOptions[size].maxRadius = ((nucleotides.length - 1) + drawOptions[size].radiusAdder) * drawOptions[size].radiusMultiplier;
      drawOptions[size].spacer = drawOptions[size].maxRadius + margin;
    });

    return drawOptions[largeOrSmallScreen()];
  };

  var birdData = {
    pionus: {
      name: "Maximilian Pionus",
      seq: "ATAACTCCCATTGCAAAACTAATCTCAGCCCTAAGTATCCTGCTAGGAACAACAATAACAATCACAAGTAACCACTGAGCCATAGCTTGGGCAGGACTAGAAATCAACACCCTATCAATCATCCCCATAATCTCAAAATCCCACCACCCACGAGCCGTTGAAGCAGCAACCAAGTACTTCCTAGTACAAGCTGCCGCTTCAACACTAGTACTCTTCTCAAGCACAATCAACGCATGACACACAGGACAATGAGACATCACCCTACTCACCCATCCCCCAGCATGTCTCCTACTAACCACCGCAGTTGCTATTAAGCTGGGCCTAACTCCATTCCACTTTTGATTTCCAGAAGTACTCCAAGGGTCATCCCTCCCCACAGCCCTACTTCTCTCAACAGTAATAAAACTCCCACCAATTACACTCCTACTAATCACATCCCACTCACTAAACCCTGTCCTACTCACTACCATATCCATTATATCCGTCGCCCTTGGCGGCTGAATGGGACTAAACCAAACACAAACCCGAAAAATTATAGCCTTCTCATCCATCTCCCACCTGGGCTGAATAACATCCATTATCACCTACAGCCCAAAACTAACCCTACTAACCTTCTACGCCTACGCCCTAATAACAACCTCCATCTTCCTCACTATAAACACAACCAACACCTTAAAACTATCAACACTAATGACTGCATGAACCAAAACTCCCATACTAAACACAACCCTCATACTAACACTACTATCACTAGCAGGCCTCCCCCCACTAACAGGCTTCCTGCCCAAATGACTCATCATCCAAGAACTCGTCAAGCAAGAAATAACCACAACAGCCACAATCATCTCCATAATATCGCTCCTAGGGTTATTCTTCTACCTACGCCTAGCATACTGCTCCACTATCACACTCCCCCCCAACCCCTCTAGCAAGATAAAACAGTGATCCACTAAAAACCCAACCAACACTCTAGTCTCCACACTCACCTCCCTGTCCATCTCACTCCTCCCACTCTCCCCTATAATCCTCACCACCACTTAA",
      colors: ["olive", "green", "silver", "purple"]
    },
    regent: {
      name: "Regent Parakeet",
      seq: "ATGAGTCCCCTTACAAAACTTATTCTAACTACAAGTCTGCTCACAGGGACAACAATCACAATCACAAGCAACCACTGACTAATAGCCTGAACCGGATTAGAAATCAACACCTTAGCCATCATCCCCCTAATCTCAAAATCCCACCACCCACGAGCCATCGAAGCAGCAACCAAATACTTCCTAGTACAAGCAGCAGCCTCCACACTAATACTCTTCTCAAGCACAATAAACGCATGATTTACTGGACAGTGAGACATCACCCAGCTCACCCACCCTCCATCATCCGCTCTACTAACCGCTGCAATCGCTATTAAACTAGGCCTAGCCCCATTCCACTTCTGATTTCCAGAAGCACTCCAAGGGTCATCCCTTACCACGGCCCTCCTTCTCTCAACAGTAATAAAACTCCCACCAACTACCATTCTCCTACTCACATCACACTCACTAAACCCAACACTACTCACCACCATATCCATCATATCCATCGCCCTAGGTGGATGAATAGGACTTAACCAAACACAAACCCGCAAAATCCTAGCCTTCTCCTCCATTTCACACCTAGGCTGAATAACCACCATCATCATCTACAACCCAAAACTAACCCTACTAACCTTCCTCACCTACATCCTAATAACAACCTCTATCTTTCTCACCATAAACACAACCAACACCCTAAAGCTACCAACGCTAATAACCTCCTGAACCAAAACCCCCACCCTAAGCACAACCCTCATACTAACCCTCCTCTCACTAGCGGGTCTCCCCCCACTAACAGGATTTTTACCCAAATGACTCATCATCCAAGAGCTCACTAAACAAGAAATAACCACAACAGCTACAATCATCTCTATATTCTCACTCCTAGGACTATTCTTCTACCTCCGCTTGGCATACTGTTCAACAATCACCCTACCTCCAAACCCCTCAAACAAAATAAAACAATGATCCCCTAAAAAACCAACAAACATCCTAATCTCTACATCTACCTCACTATCCACCTCACTCCTACCACTCTCCCCTATAATTCTCACCACCATTTAA",
      colors: ["#ff3f00", "#446389", "#41d344", "#5a845a"] // red blue lightgreen olivegreen
    },
    yellowCrested: {
      name: "Yellow-Crested Cockatoo",
      seq: "GTTCAACTCCCTCCCCTACTAATGAGCCCCCTTACAAAACTCACCCTAACACTCAGCCTAGCCCTAGGAACAACAACCACAATCACAAGCAACCACTGAGTCACAGCCTGAGCTGGATTAGAAATCAACACCTTAGCCATTATTCCATTGATCTCAAAATCTCACCACCCCCGAGCTATCGAAGCAGCAACCAAATATTTCCTAACCCAAGCAACTGCCTCAGCACTAATACTCTTTTCAAGCACAACCAACGCATGGTCTTCCGGACAATGAGACATCACCCAACTCACCAACCCTCCATCATGTCTCCTCCTTACAACTGCAATCGCAATCAAACTAGGCCTCACCCCATTCCACTTTTGATTCCCAGAAGTGCTACAAGGCTCATCCCTCACCACAGCCCTGCTGCTCTCCACAGCAATAAAACTCCCACCAACCGCCATTCTACTCCTCACTTCACACTCACTAAACCCCACGCTACTCTTCACCATAGCCATAATATCTATTGCCTTAGGCGGCTGAATAGGGCTTAATCAAACACAAACCCGAAAGATCCTAGCCTTCTCATCCATCTCACACCTAGGCTGAATAACCATCATCATCACCTACAACCCAAAGCTAACTCTGCTAACCTTCTACCTCTACACCCTAATAACAGCATCCATCTTCCTCTCCATAAACTCAACCAATACCCTAAAACTATCAACACTAATAACCTCATGAACCAAAACCCCCATACTAAATACAACCCTTATACTAACCCTCCTGTCATTAGCAGGCCTCCCCCCACTAACAGGCTTTCTACCCAAATGACTTATCATCCAAGAGCTAACCAAACAGGAAATAGCCACAACAGCCACTATTATCTCTATACTCTCACTCCTGGGGCTATTCTTCTACCTACGCCTAGCGTACTGTTCAACAATCACCCTCCCCCCCAACTCCTCAAACAAAATAAAACAGTGATCCACCAAAAAACCAACTAACCCCCTAATTCCCACACTCACGCTCCTATCCCTGTTACTCCTGCCACTCTCCCCCATAATCCCCACCACCACTTAAGAAACTTAGGATAATATCAAACCAAGG",
      colors: ["orange", "white", "gray", "#fff200"] // orange white gray yellow
    },
    palm: {
      name: "Black Palm Cockatoo",
      seq: "GTTGAGCCCCCTCCCCTACTAATGAGCCCCCTCACAAAATTCATCCTAGCACTAAGCCTAACCTCAGGGACAATAATCACAATCACAAGCAACCACTGAGTAATAGCCTGAGCCGGACTAGAAATCAATACCCTAACCATTCTCCCCCTAATCTCAAAATCCCACCACCCCCGAGCCATCGAAGCTACAATCAAATACTTCCTAACACAAGCAACTGCCTCCATACTAATCCTCTTCTCAAGCATAACCAACGCATGGTCCTCCGGACAATGAGACATTACCCAACTCACCAACCCCCTCTCATGCCTTCTACTCACCACCGCAGTTGCTATCAAACTAGGACTAACTCCATTCCACTTCTGATTCCCAGAAGTACTACAAGGCTCATCCCTCTCCACAGCCCTGCTACTCTCGACAGCAATAAAACTCCCACCAACCACCATCCTACTTCTCACATCACACTCACTAAACCCCACATTACTCTCCACCATGGCTATCACATCCATCGCCCTAGGCGGCTGAATAGGACTTAACCAAACACAAACCCGAAAAATCCTAGCTTTTTCATCTATTTCACACCTAGGCTGAATAACCATCATCATCACCTACAACCCAAAACTAACCCTACTAACCTTCTACCTCTATACCCTAATAACAACGTCCATCTTCCTCACTATAAACTCAGCCAACACCCTAAAACTATCAACGCTAATAACCTCATGAACCAAAACCCCTGTACTAAATTCAACCCTCATACTAACCCTTCTATCACTAGCAGGCCTTCCCCCACTAACAGGCTTCCTCCCCAAATGACTCATCATTCAAGAACTCACCAAGCAAGAAATAACCGTAACAGCTACTATCATCTCCATACTCTCACTCCTAGGGCTCTTCTTCTATCTACGCCTAACGTACTGTTCAACAATCACACTCCCCCCCAACCCTTCAAACAAAATAAAACAATGATCCGCTAAAAAACCAATCAACATCTTAATCCCCCCATTCACCCTCCTATCCCTATCACTCCTACCACTCTCCCCCATAATCCTTACAACCACTTAAGAAACTTAGGATAATACCAAACCAAAG",
      colors: ["#ff3f00", "#666", "#444", "black"] // red gray gray black
    }
  };
})();
