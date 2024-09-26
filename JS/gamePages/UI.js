export class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 70;
      this.fontFamily = 'Are You Serious';
      this.livesImage = document.getElementById('lives');
      this.loosingSound = new Audio(document.getElementById('loosingSound').src);
      this.winningSound = new Audio(document.getElementById('winningSound').src);
    }
  
    draw(context) {
      context.save();
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.shadowColor = 'black';
      context.shadowBlur = 3;
  
      context.font = this.fontSize + 'px ' + this.fontFamily;
      context.textAlign = 'left';
      context.fillStyle = this.game.fontColor;
  
      // Score
      context.fillText('Score: ' + this.game.score, 20, 60);
  
      // Timer
      context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
      context.fillText('Time: ' + (this.game.timer * 0.001).toFixed(1), 20, 120);
  
      // Lives
      for (let i = 0; i < this.game.lives; i++) {
        context.drawImage(this.livesImage, 40 * i + 20, 140, 40, 40);
      }
  
      // Game Over
      if (this.game.gameOver) {
        context.textAlign = 'center';
        context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
  
        if (this.game.score > this.game.winningScore) {
          // Win
          this.winningSound.play();
          context.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5 - 50);
          context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
          context.fillText('What are creatures of the night afraid of? YOU!!!', this.game.width * 0.5, this.game.height * 0.5 + 20);
        } else {
          // Lose
          this.loosingSound.play();
          context.fillText('Love at first bite?', this.game.width * 0.5, this.game.height * 0.5 - 50);
          context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
          context.fillText('Nope, Better luck next time!', this.game.width * 0.5, this.game.height * 0.5 + 20);
        }
  
        // Restart Message
        context.beginPath();
        var text = 'Press R to restart / E to end game';
        var textWidth = context.measureText(text).width;
        context.rect(this.game.width * 0.5 - textWidth / 2 - 10, this.game.height * 0.5 + 90 - 60, textWidth + 50, 60);
        context.strokeStyle = 'white';
        context.lineWidth = 2;
        context.stroke();
        context.fillText(text, this.game.width * 0.5, this.game.height * 0.5 + 80);
      }
  
      context.restore();
    }
  }
  