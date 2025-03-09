class Game {
	constructor() {
		this.currentLevel = 1; // Dépend d'où le joueur s'est arrêté
		this.levels_unlocked = [1]; // A débloqué 1 niveau (donc seulement le premier)
	}

	// Démarrer le jeu
	start() {
		// Adapter la taille du playground à tout type d'écran
		playground.style.zoom = String(window.innerHeight / 1170);

		// Mettre à jour l'indicateur visuel du niveau actuel
		const levelIndicator = document.querySelector(".level-indicator");
		levelIndicator.textContent = "level " + String(game.currentLevel);

		// Resets importants (liés aux animations)
		playground.style.display = "flex";
		playButton.style.display = "none";
		title.style.display = "none";

		this.player = new Player();

		setTimeout(() => {
			this.drawLevel();
		}, 500);

		// Rafraichir le jeu et le joueur toutes les 10 millisecondes
		this.gameInterval = setInterval(() => {
			this.player.movesRefresh();
			this.player.gravity();
			this.player.refreshPosition();
		}, 10);
	}

	// Quand le niveau a été réussi par le joueur
	gameWon() {
		// Retirer le contrôle du personnage par le joueur et afficher le menu
		this.player.removePlayerControls();
		setTimeout(() => {
			clearInterval(this.gameInterval);
			openMenu();
		}, 1000);

		// Débloquer le prochain niveau
		if (!this.levels_unlocked.includes(this.currentLevel + 1)) {
			this.levels_unlocked.push(this.currentLevel + 1);
		}
	}

	removeDrawLevel() {
		// Enlever le howToPlayIndicator
		const howToPlayIndicator = document.querySelector(".how-to-play-indicator");
		howToPlayIndicator.style.opacity = "0";
		setTimeout(() => {
			howToPlayIndicator.style.display = "none";
		}, 300);

		const parts = playground.querySelectorAll(".part");

		for (let i = 0; i < parts.length; i++) {
			parts[i].remove();
		}
		clearInterval(this.gameInterval);
		this.player.elementHTML.remove();
		delete this.player;
		playground.querySelector(".finish-part").remove();
	}

	// Déssiner le niveau actuel en ajoutant des parts à l'écran (éléments HTML)
	drawLevel() {
		// Récupérer le niveau actuel
		const parts = levels["level_" + String(this.currentLevel)]["parts"];

		// Afficher le howToPlayerIndicator pour le niveau 1
		const howToPlayIndicator = document.querySelector(".how-to-play-indicator");
		if (this.currentLevel == 1) {
			setTimeout(() => {
				howToPlayIndicator.style.display = "unset";
				setTimeout(() => {
					howToPlayIndicator.style.opacity = "1";
				}, 10);
			}, 2500);
		}

		// Itérer sur chaque part à ajouter du level
		for (let i = 0; i < parts.length; i++) {
			// Créer et ajouter chaque part à l'écran
			const newPart = document.createElement("article");

			// Différencier le part classique et le part d'arrivée
			if (i == parts.length - 1) {
				newPart.classList.add("finish-part");
			} else {
				newPart.classList.add("part");
			}

			// Spécifier x, y, width, et height du part
			newPart.style.left = parts[i][0] + "px";
			newPart.style.bottom = parts[i][1] + "px";
			newPart.style.width = parts[i][2] + "px";
			newPart.style.height = parts[i][3] + "px";
			newPart.style.opacity = "0";
			newPart.style.transition = "1s all ease";
			playground.appendChild(newPart);

			// Animation d'apparition du part
			setTimeout(() => {
				setTimeout(() => {
					newPart.style.opacity = "1";
				}, 150 * i);
			}, 10);
		}
	}

	// Vérifier si le joueur a gagné le jeu
	isGameWon() {
		const part = this.player.playerTouchPart(true);
		const parts = levels["level_" + String(this.currentLevel)]["parts"];

		return parts[parts.length - 1] == part;
	}

	// Afficher la page d'acceuil
	displayHomepage() {
		setTimeout(() => {
			// Animation pour faire apparaître titre et playButton
			title.style.opacity = "1";
			title.style.transform = "scale(1)";
			// Pour éviter une animation ratée (le boutton bloquerait le titre et l'effet serait moins réussis sinon)
			setTimeout(() => {
				playButton.style.opacity = "1";
				setTimeout(() => {
					playButton.style.transition = "2s transform ease, 2s background-color ease, 2s opacity ease";
				}, 10);
			}, 500);

			setTimeout(() => {
				playButton.style.transform = "scale(1)";
				fill.style.height = "0";
			}, 2000);
		}, 500);

		// Démarrer la partie quand playButton est cliqué
		playButton.addEventListener("click", (e) => {
			// Animation stylée
			playButton.style.opacity = "0";
			title.style.color = "var(--primary-blue)";

			setTimeout(() => {
				game.start();
			}, 2500);
		});
	}
}
