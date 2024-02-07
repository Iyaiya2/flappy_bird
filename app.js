document.addEventListener('DOMContentLoaded', () => {
    // État et variables du jeu
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-display');
    const ground = document.querySelector('.ground-moving');

    let birdLeft = 220;
    let birdBottom = 450;
    let gravity = 3;
    let isGameOver = false;
    let gap = 500;
    let score = 0;

    // Fonction pour sauvegarder le score
    function saveScore(score) {
        localStorage.setItem('flappy_bird_highscore', score);
    }

    // Fonction pour charger le score enregistré
    function loadScore() {
        return localStorage.getItem('flappy_bird_highscore') || 0;
    }

    // Fonctions du jeu
    function startGame() {
        // définir la position de l'oiseau au début de la partie
        if (isGameOver) return;

        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';

        // Ajoutez cette condition pour éviter que l'oiseau ne descende indéfiniment
        if (birdBottom < 0) {
            birdBottom = 0;
        }
    }

    let gameTimerId = setInterval(startGame, 20);

    function control(e) {
        // utiliser e (event) pour cibler la barre espace
        // Mots clés qu'on avait trouvé pour faire une recherche 
        // sur comment cibler un espace : "key, space, eventListeners"

        // quand la touche de contrôle est utilisée, l'oiseau saute (jump())
        if (e.keyCode === 13) { // 13 corresponds to the Enter key
            jump();
        }
    }

    function jump() {
        // attention à bien faire en sorte que l'oiseau 
        // ne puisse sauter que quand il n'a pas dépassé le border-top
        if (birdBottom < 500) {
            birdBottom += 50;
            bird.style.bottom = birdBottom + 'px';
        }
    }

    document.addEventListener('keydown', control);

    function generateObstacle() {
        if (isGameOver) return;

        let obstacleLeft = 500;
        let randomHeight = Math.random() * 150; // mettre une hauteur random
        let obstacleBottom = randomHeight;

        // générer les obstacles avec document.createElement('div')
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');

        obstacle.classList.add('obstacle');
        topObstacle.classList.add('topObstacle');

        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);

        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';

        // Positionnement de l'obstacle supérieur
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        // Ajouter l'image à chaque obstacle
        obstacle.style.backgroundImage = "url('assets/flappybird-pipe.png')";

        function moveObstacle() {
            obstacleLeft -= 5; // ajuster la vitesse
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            // Si l'obstacle est hors de la vue, le supprimer et générer un nouveau
            if (obstacleLeft < -60) {
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
                score++; // augmenter le score ici si nécessaire
                generateObstacle();
            }

            // Vérifier la collision avec l'oiseau
            if (
                (birdBottom < obstacleBottom + 300 && birdBottom > obstacleBottom) &&
                (obstacleLeft > 200 && obstacleLeft < 280)
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
            alert('New High Score! Your score: ' + currentScore);
        } else {
            alert('Game Over! Your score: ' + currentScore + ', High Score: ' + highScore);
        }
    }

    generateObstacle(); // Commencer à générer des obstacles dès le début du jeu
});
