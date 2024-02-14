document.addEventListener("DOMContentLoaded", () => {
  // État et variables du jeu
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-display");
  const ground = document.querySelector(".ground-moving");
  const borderTop = 700;

  let birdLeft = 220;
  let birdBottom = 450;
  let gravity = 3;
  let isGameOver = false;
  let gap = 500;
  let score = 0;

  // Fonction pour sauvegarder le score
  function saveScore(score) {
    localStorage.setItem("flappy_bird_highscore", score);
  }

  // Fonction pour charger le score enregistré
  function loadScore() {
    return localStorage.getItem("flappy_bird_highscore") || 0;
  }

  // Fonctions du jeu
  function startGame() {
    // définir la position de l'oiseau au début de la partie
    if (isGameOver) return;

    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";

    // Ajoutez cette condition pour éviter que l'oiseau ne descende indéfiniment
    if (birdBottom < 0) {
      birdBottom = 0;
    }
  }

  let gameTimerId = setInterval(startGame, 20);

  function control(e) {
    const enterKey = 13;

    if (e.keyCode === enterKey) {
      jump();
    }
  }

  function jump() {
    if (birdBottom < borderTop) {
      birdBottom += 50;
      bird.style.bottom = birdBottom + "px";
    }
  }

  document.addEventListener("keydown", control);

  function generateObstacle() {
    if (isGameOver) return;

    let obstacleLeft = window.screen.width;
    let randomHeight = Math.random() * 150;
    let obstacleBottom = randomHeight;

    // générer les obstacles avec document.createElement('div')
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");

    obstacle.classList.add("obstacle");
    topObstacle.classList.add("topObstacle");

    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);

    obstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";

    // Positionnement de l'obstacle supérieur
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    // Ajouter l'image à chaque obstacle
    obstacle.style.backgroundImage =
      "url('assets/flappybird-pipe.png')";

    function moveObstacle() {
      obstacleLeft -= 5; // ajuster la vitesse
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft < -60) {
        if (
          gameDisplay.contains(obstacle) &&
          gameDisplay.contains(topObstacle)
        ) {
          gameDisplay.removeChild(obstacle);
          gameDisplay.removeChild(topObstacle);

          score++;
          generateObstacle();
        }
      }

      // Vérifier la collision avec l'oiseau
      if (
        birdBottom < obstacleBottom + 300 &&
        birdBottom > obstacleBottom &&
        obstacleLeft > 200 &&
        obstacleLeft < 280
      ) {
        gameOver();
      }
    }

    setInterval(moveObstacle, 20);
  }

  function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
    const currentScore = score;
    const highScore = loadScore();
    if (currentScore > highScore) {
      saveScore(currentScore);
      alert("New High Score! Your score: " + currentScore);
    } else {
      alert(
        "Game Over! Your score: " +
          currentScore +
          ", High Score: " +
          highScore
      );
    }
  }

  generateObstacle(); // Commencer à générer des obstacles dès le début du jeu
});
