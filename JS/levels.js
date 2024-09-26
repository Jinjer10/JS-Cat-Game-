// Arrow back function
document.getElementById('arrow').addEventListener('click', () => {
  // Redirect to login page
  window.location.href = document.getElementById('logIn').href;
});

function setLevel(level) {
  // Save level in localStorage
  localStorage.setItem('selectedLevel', level);
  // Redirect to game page
  window.location.href = 'gamePage.html';
}
