export class HighScoresManager {
    constructor() {
      // Check if high scores exist in localStorage, if not create new structure
      this.highScores = JSON.parse(localStorage.getItem('highScores')) || {};
  
      // Check and create empty lists for each level if no high scores exist
      for (let level = 1; level <= 3; level++) {
        if (!this.highScores[level]) {
          this.highScores[level] = [{ playerName: 'no records', score: '' }, { playerName: 'no records', score: '' }, { playerName: 'no records', score: '' }];
        }
      }
    }
  
    updateHighScores(level, playerName, score) {
      // Add score to high scores list
      this.highScores[level].push({ playerName: playerName, score: score });
  
      // Sort and find top high scores
      this.highScores[level].sort((a, b) => b.score - a.score);
      this.highScores[level] = this.highScores[level].slice(0, 3);
  
      // Save high scores to localStorage
      localStorage.setItem('highScores', JSON.stringify(this.highScores));
    }
  }
  