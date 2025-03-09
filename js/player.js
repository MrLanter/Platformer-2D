class Player {
	constructor() {
		// Attributs relatifs au joueur
		this.x = parseInt(getComputedStyle(playground).width.slice(0, -2)) / 2;
		this.y = parseInt(getComputedStyle(playground).height.slice(0, -2)) * 0.7;
		this.speed = 0;
		this.maxSpeed = 7;
		this.minSpeed = this.maxSpeed * -1;
		this.powerSpeed = 0.2;
		this.gravityPower = 0;
		this.respawning = false; // Permet d'interdire de bouger quand le joueur spawn (sinon il peut tricher)
		this.keysPressed = {
			ArrowRight: false,
			ArrowLeft: false,
			ArrowUp: false,
			ArrowDown: false, // Non utilisé, mais pourrait l'être si le projet évolue
			w: false,
			a: false,
			s: false,
			d: false,
		};

		// Créer et gérer l'élément HTML de Player
		const player = document.createElement("article");
		player.style.opacity = "0";
		player.classList.add("player");
		playground.appendChild(player);
		this.elementHTML = player;
		this.respawn();
		this.playerControls();
		this.refreshPosition();
	}

	// Faire réapparaître le joueur
	respawn() {
		// Indiquer que le joueur respawn (important pour ne pas qu'il triche en allant sur des parts en avance)
		// C'est ensuite la fonction gravity qui remet respawning sur false au bon moment
		this.respawning = true;

		// Animation qui permet une apparition fluide du joueur (opacity)
		this.elementHTML.style.transition = "none";
		setTimeout(() => {
			this.elementHTML.style.opacity = "0";
			setTimeout(() => {
				this.elementHTML.style.transition = "0.5s opacity ease";
				setTimeout(() => {
					this.elementHTML.style.opacity = "1";
				}, 10);
			}, 10);

			// Récupérer les données x et y du spawn du joueur (relatif au niveau actuel)
			const spawn = levels["level_" + String(game.currentLevel)]["spawn"];

			if (spawn[0] == "center") {
				this.x = parseInt(getComputedStyle(playground).width.slice(0, -2)) / 2;
			} else {
				this.x = spawn[0];
			}

			if (spawn[1] == "center") {
				this.y = parseInt(getComputedStyle(playground).height.slice(0, -2)) / 2;
			} else {
				this.y = spawn[1];
			}

			this.speed = 0;
			this.gravityPower = 0;
		}, 10);
	}

	// Presser des touches
	keydown(e) {
		for (const [key, value] of Object.entries(this.keysPressed)) {
			if (key == e.key) {
				this.keysPressed[key] = true;
			}
		}
	}

	// Lever des touches
	keyup(e) {
		for (const [key, value] of Object.entries(this.keysPressed)) {
			if (key == e.key) {
				this.keysPressed[key] = false;
			}
		}
	}

	// Permettre au joueur de presser des touches
	playerControls() {
		this.keydownHandler = this.keydown.bind(this);
		this.keyupHandler = this.keyup.bind(this);
		window.addEventListener("keydown", this.keydownHandler);
		window.addEventListener("keyup", this.keyupHandler);
	}

	removePlayerControls() {
		for (const [key, value] of Object.entries(this.keysPressed)) {
			this.keysPressed[key] = false;
		}
		window.removeEventListener("keydown", this.keydownHandler);
		window.removeEventListener("keyup", this.keyupHandler);
	}

	// Rafraichir la position du joueur sur l'écran
	refreshPosition() {
		this.elementHTML.style.left = this.x + "px";
		this.elementHTML.style.bottom = this.y + "px";
	}

	// Fonction qui permet au joueur de contrôler son personnage
	movesRefresh() {
		// Sauter
		if ((this.keysPressed["w"] || this.keysPressed["ArrowUp"]) && this.playerTouchPart() && !this.respawning) {
			this.y += 10;
			this.gravityPower = -12;
		}

		if (!this.respawning) {
			// Vérifier si le joueur a la permission de contrôler son personnage
			// Aller à gauche, et à droite
			if (this.keysPressed["d"] || this.keysPressed["ArrowRight"]) {
				this.speed += this.powerSpeed;
			} else if (this.keysPressed["a"] || this.keysPressed["ArrowLeft"]) {
				this.speed -= this.powerSpeed;
			} else {
				// Animation fluide qui fait perdre de la vitesse au joueur quand il ne presse aucune touche
				if (this.speed > 0) {
					this.speed -= this.powerSpeed;
				} else if (this.speed < 0) {
					this.speed += this.powerSpeed;
				}
				// En js, 0.1+0.1+0.1 donne 0.30000000000000004, ce qui crée des bugs ! Cette condition le résous
				if (Math.abs(this.speed) < this.powerSpeed) {
					this.speed = 0;
				}
			}
		}

		// Vitesse maximale et minimale à respecter
		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed;
		}
		if (this.speed < this.minSpeed) {
			this.speed = this.minSpeed;
		}

		this.x += this.speed;
	}

	// Vérifier si le joueur est au dessus d'un part
	playerTouchPart(get_part = false) {
		// Données du joueur à utiliser ici (sauf le height)
		const [x, y, width, height] = [this.x, this.y, parseFloat(getComputedStyle(this.elementHTML).width.slice(0, -2)), parseFloat(getComputedStyle(this.elementHTML).height.slice(0, -2))];

		for (const part of levels["level_" + String(game.currentLevel)]["parts"]) {
			// up, left et right: conditions pour vérifier si le joueur est sur l'objet
			const up = y == part[1] + part[3] || (y >= part[1] + part[3] && y - this.gravityPower < part[1] + part[3]);
			const left = x + width >= part[0];
			const right = x <= part[0] + part[2];

			if (up && right && left) {
				// Si un part est touché retourner true, sinon false
				if (get_part) {
					return part;
				} else {
					return true;
				}
			}
		}

		return false;
	}

	// Gérer la gravité du joueur (et aussi si le joueur tombe de la map)
	gravity() {
		// Si le joueur est dans l'air, le faire retomber
		if (this.y > -200) {
			const part = this.playerTouchPart(true);

			if (part) {
				// Si le joueur touche un part
				this.y = part[1] + part[3];
				this.gravityPower = 0; // Pour que le joueur ne retombe pas trop vite après
				this.respawning = false; // Le joueur peut désormais contrôler son personnage

				// Si le jeu est gagné, appeller gameWon
				if (game.isGameWon()) {
					game.gameWon();
				}
				return;
			}

			this.gravityPower += 0.35; // Augmenter la vitesse de gravité (physique d'un objet)
			// Vitesse de gravitée maximale (20)
			if (this.gravityPower > 20) {
				this.gravityPower = 20;
			}
			this.y -= this.gravityPower;
		} else {
			// Le joueur est tombé de la map, il doit respawn (this.y <= -200)
			this.respawn();
		}
	}
}
