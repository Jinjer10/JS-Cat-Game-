import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemys.js';
import { UI } from './UI.js';
import { HighScoresManager } from './saveRecords.js';

const backgroundMusic = new Audio(document.getElementById('backroundMusic').src);
backgroundMusic.loop = true;

backgroundMusic.play();

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 1800;
    const CANVAS_HEIGHT = canvas.height = 780;

    const highScoresManager = new HighScoresManager();

    
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 190;
            this.level = parseInt(localStorage.getItem('selectedLevel'));
            this.userName = localStorage.getItem('username'); 
            this.speed = 0;
            this.maxSpeed = 6 * this.level;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.particles = [];
            this.collisions = [];
            this.enemies = [];
            this.floatingMasseges = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000 / this.level;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'white';
            this.time = 0;
            this.timer = 0;
            this.winningScore = 80;
            this.seconds = 60;
            this.maxTime = 1000 * this.seconds / this.level ;
            this.gameOver = false;
            this.lives = 6 - this.level ; 
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.boomSound = new Audio(document.getElementById('boomSound').src);
        }
  
        update(deltaTime){
            this.timer += deltaTime;
            this.time += deltaTime;
            if ( this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
      
            // Enemy Management
            if( this.enemyTimer > this.enemyInterval){
              this.addEnemy();
              this.enemyTimer = 0;
            } else {
              this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
              enemy.update(deltaTime);
            });
      
            // Message Management
            this.floatingMasseges.forEach(massege => {
              massege.update();
            });
      
            // Particle Management
            this.particles.forEach(particle => {
              particle.update();
            });
            if(this.particles.length > this.maxParticles){
              this.particles.length = this.maxParticles;
            }
      
            // Collision Animation Management
            this.collisions.forEach(collision => {
              this.boomSound.play();
              collision.update(deltaTime);
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.floatingMasseges = this.floatingMasseges.filter(massege => !massege.markedForDeletion);
            console.log(game.time, game.maxTime, game.maxSpeed, game.enemyInterval, pausedTime)
          }
        draw(context){
            this.background.draw(context);
            this.player.draw(context)
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });  
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            }); 
  
            this.floatingMasseges.forEach(massege => {
                massege.draw(context); 
            }); 
            this.UI.draw(context);


        }
        addEnemy(){
            if ( this.speed > 0 && Math.random() < 0.5){
                this.enemies.push(new GroundEnemy(this));
            } else if ( this.speed > 0){
                this.enemies.push(new ClimbingEnemy(this));
            }
            this.enemies.push(new FlyingEnemy(this));
            
        }
        restart(){
            highScoresManager.updateHighScores(this.level, this.userName, this.score);
            location.reload();
        }
        endGame(press){
            highScoresManager.updateHighScores(this.level, this.userName, this.score);
            if (press === 'arrow'){
            window.location.href = document.getElementById('levelsPage').href;}
            else {
            window.location.href = document.getElementById('homePage').href;}   
            }

        }

  
        const game = new Game(canvas.width, canvas.height);
        let lastTime = 0;
        let pausedTime = game.time; // Variable to store the time when the game was paused
        let animationId; // Global variable to store the ID of the animation frame request
        
        function animate(timeStamp){
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.update(deltaTime);
            game.draw(ctx);
            if (!game.gameOver){ 
                animationId = requestAnimationFrame(animate); // Store the ID of the animation frame request
            } else {
                backgroundMusic.pause(); 
            }
        }
        animate(0);
        
        function pauseGame() {
            pausedTime = game.time;
            game.maxTime += pausedTime;
            cancelAnimationFrame(animationId); // Cancel the request for continuing the animation
        }
        
        // Function to resume the game
        function resumeGame() {
            lastTime = performance.now(); // Update the start time to the current time
            game.time += pausedTime; 
            animate(lastTime); // Restart the animation
        }
        
        function displayPopup() {
            // Get the popup window from HTML
            const popup = document.getElementById('popup');
            
            // Create a new function to handle clicking on the continue button
            function continueHandler() {
                resumeGame();
                popup.style.display = 'none';
            }
        
            // Create a new function to handle clicking on the cancel button
            function cancelHandler() {
                game.endGame('arrow');
                popup.style.display = 'none';
            }
        
            // Add click events to the buttons in the popup window
            document.getElementById('continue-btn').addEventListener('click', continueHandler);
            document.getElementById('cancel-btn').addEventListener('click', cancelHandler);
        
            // Display the popup window
            popup.style.display = 'block';
        }
        
        // Return arrow function
        document.getElementById('arrow').addEventListener('click', () => {
            pauseGame();
            displayPopup(); 
        });
        
        const toggleMusicButton = document.getElementById('toggleMusicButton');
        const musicImage = document.getElementById('musicImage');
        
        toggleMusicButton.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play(); // If the music is paused, play it
                musicImage.src = document.getElementById('play').src;
            } else {
                backgroundMusic.pause(); // If the music is playing, pause it
                musicImage.src = document.getElementById('mute').src;
            }
        });
        

});




