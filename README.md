Flappy Bird Game Basis
Flappy bird for educative purpose : giving basis to start the project.

Intro / But
Le but est d'initialiser le projet ensemble et de couvrir toute la logique oralement, pour :

Que vous commenciez à coder le jeu en direct avec moi
Que vous terminiez le jeu en autonomie sans moi
Que je vous corrige et vous donne une note
Grands axes nécessaires pour réaliser le jeu
Initialisation :

Sélection des éléments du jeu (bird, gameDisplay, ground).
Définition des variables de position, gravité, et état du jeu.
Fonction startGame :

Mise à jour de la position du bird en fonction de la gravité.
Contrôle (barre d'espace) :

Fonction control pour gérer le saut du bird.
Ajout d'un écouteur d'événement pour la touche espace.
Fonction jump :

Incrémentation de la position du bird pour simuler un saut.
Génération d'obstacles :

Fonction generateObstacle pour créer des obstacles à intervalles réguliers.
Mouvement des obstacles vers la gauche.
Gestion de collisions avec le bird et suppression des obstacles hors de l'écran.
Appel récursif pour générer de nouveaux obstacles.
Fin de jeu :

Fonction gameOver pour arrêter le jeu et afficher un message de fin.
Suppression de l'écouteur d'événement pour la touche espace.
Modification de la classe du sol pour l'arrêter.