


function closeModal(modal) {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of a modal, close it
window.onclick = function(event) {
  if (event.target == Instructions) {
      closeModal(Instructions);
  } else if (event.target == Records) {
      closeModal(Records);
  }
}

// Get the button that opens the Instructions
var btnI = document.getElementById("openInstructions");

// Get the <span> element that closes the Instructions
var spanI = document.querySelector("#Instructions .close");

// When the user clicks the button, open the Instructions 
btnI.onclick = function() {
  // Display the modal
  Instructions.style.display = "block";
}

// When the user clicks on <span> (x), close the Instructions
spanI.onclick = function() {
  closeModal(Instructions);
}

// Get the button that opens the Records
var btnR = document.getElementById("openRecords");

// Get the <span> element that closes the Records
var spanR = document.querySelector("#Records .close");

// When the user clicks the button, open the Records 
btnR.onclick = function() {
  // Display the modal
  Records.style.display = "grid";

  // Get high scores from local storage
  var highScores = JSON.parse(localStorage.getItem('highScores'));

  // Get the element where high scores will be displayed
  var highScoresList = document.getElementById("highScoresList");

  // Clear previous high scores
  highScoresList.innerHTML = '';

  // Iterate over each level
  for (var level in highScores) {
      if (highScores.hasOwnProperty(level)) {
          // Create an unordered list for high scores of this level
          var levelHighScoresList = document.createElement('ul');

          // Iterate over high scores of this level
          highScores[level].forEach(function(score) {
              // Create list item for each high score
              var listItem = document.createElement('li');
              listItem.textContent = score.playerName + ': ' + score.score;
              levelHighScoresList.appendChild(listItem);
          });

          // Append the list of high scores for this level to the main list
          highScoresList.appendChild(levelHighScoresList);
      } 
  }
}

// When the user clicks on <span> (x), close the Records
spanR.onclick = function() {
  closeModal(Records);
}
