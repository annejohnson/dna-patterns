(function () {
  var drawVars = {
      small: {
        radiusMultiplier: 9,
        radiusAdder: 4
      },
      large: {
        radiusMultiplier: 18,
        radiusAdder: 4
      }
    },
    breakpoint = 600,
    circleDrawTime = 3000,
    circleRemoveTime = circleDrawTime / 4,
    redrawTimeout = 200,
    margin = 4;
    nucleotides = "ACGT",
    currBird = "pionus";

    drawVars.small.maxRadius = ((nucleotides.length - 1) + drawVars.small.radiusAdder) * drawVars.small.radiusMultiplier;
    drawVars.large.maxRadius = ((nucleotides.length - 1) + drawVars.large.radiusAdder) * drawVars.large.radiusMultiplier;

    drawVars.small.spacer = drawVars.small.maxRadius + margin;
    drawVars.large.spacer = drawVars.large.maxRadius + margin;

  var birdVis;

  // Turns a nucleotide into a number
  var nucleotideToNum = function(char) {
    return nucleotides.indexOf(char);
  }

  // Takes a DNA char string
  // Returns an array of nums
  var makeData = function(str) {
    return str.split('').map(function(char) { return nucleotideToNum(char); });
  }

  // Writes visualization to div#birdVis
  // param data: array of raw numbers used for computing radii
  // param colors: array of colors to be applied to shapes
  // param shouldAnimate: true if user wants animation
  // param drawVars: a JS object containing radiusAdder, radiusMultiplier, maxRadius, and spacer properties
  var writeVis = function(data, colors, shouldAnimate, drawVars){
    if (shouldAnimate) {
      birdVis.forEach(function(circ) {
        circ.animate({r: 0}, circleRemoveTime, "linear", function() {
          circ.remove();
        });
      });
    } else {
      birdVis.clear();
    }
    var currX = 0,
      currY = 0,
      i = 0;
    while (currY <= screen.height + 2 * drawVars.maxRadius) {
      var radius = (data[i] + drawVars.radiusAdder) * drawVars.radiusMultiplier;
      var newCircle;
      newCircle = birdVis.circle(currX, currY, (shouldAnimate ? 0 : radius));
      newCircle.attr({fill: colors[data[i]], stroke: colors[data[i]]});
      currX += radius + drawVars.spacer;
      if (shouldAnimate)
        newCircle.animate({r: radius}, circleDrawTime, "elastic");
      if (currX > screen.width) {
        currX = 0;
        currY += drawVars.maxRadius + drawVars.spacer;
      }
      i++;
    }
  };

  // Returns "large" or "small" based on the window size if available - otherwise based
  // on the screen size
  var getScreenSize = function() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    return width > breakpoint ? "large" : "small";
  };

  // Changes the visualization to show the selected bird
  // Param newBird: the simple string representing the type of bird
  var changeBird = function(newBird) {
    currBird = newBird;
    writeVis(makeData(birds[newBird].seq), birds[newBird].colors, true, drawVars[getScreenSize()]);
  };

  // Redraws the visualization after a brief timeout whenever the
  // screen is resized
  window.onresize = function() {
    birdVis.setSize(screen.width, screen.height);
    setTimeout(function() {
      writeVis(makeData(birds[currBird].seq), birds[currBird].colors, false, drawVars[getScreenSize()]);
    }, redrawTimeout);
  };

  // BOOM!
  window.onload = function() {
    birdVis = Raphael("birdVis");
    birdVis.setSize(screen.width, screen.height);
    makeSelectTag();
    changeBird(currBird);
  };

  // Makes link tags for the page
  // Binds clicks to visualization updates and maintains active nav
  var makeSelectTag = function() {
    for (var bird in birds) {
      var btn = document.createElement("a");
      btn.textContent = birds[bird].name;
      btn.id = bird;
      btn.className = "button chooser";
      document.getElementById("choicesContainer").appendChild(btn);
      btn.onclick = function(e) {
        e.preventDefault();
        var allButtons = document.getElementsByClassName("active");
        for (var i = 0; i < allButtons.length; i++)
          allButtons[i].className = "button chooser";
        this.className = "button chooser active";
        changeBird(this.id);
      };
    }
  };

  // Bird data!
  var birds = {
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
