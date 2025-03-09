const menu = document.querySelector(".menu");
const menuBtn = document.getElementById("menu-btn");
const shadow = document.querySelector(".shadow");
const playPart = document.querySelector(".menu .play-part");
const editLevelsPart = document.querySelector(".menu .edit-levels-part");
// const partSelection = document.querySelector(".menu .menu-header .selection");
const play = document.querySelector(".menu .menu-header .play");
const editLevels = document.querySelector(".menu .menu-header .edit-levels");

let menuOn = false; // Indique si le menu est ouvert
let menuPart = "play";

// Détecter les clics pour ouvrir ou fermer le menu
menuBtn.addEventListener("click", (e) => {
	if (!menuOn) {
		openMenu();
	} else {
		closeMenu();
	}
});

shadow.addEventListener("click", (e) => {
	hide_shadow();
	if (menuOn) {
		closeMenu();
	}
});

// Afficher le shadow (ombre pour les pop-ups)
function show_shadow() {
	shadow.style.display = "flex";
	setTimeout(() => {
		shadow.style.opacity = "0.3";
	}, 10);
}

// Cacher le shadow (ombre pour les pop-ups)
function hide_shadow() {
	shadow.style.opacity = "0";
	setTimeout(() => {
		shadow.style.display = "none";
	}, 500);
}

play.addEventListener("click", (e) => {
	menuPart = "play";
	refreshMenuPart();
});

editLevels.addEventListener("click", (e) => {
	menuPart = "edit-levels-part";
	refreshMenuPart();
});

playPart.addEventListener("click", (e) => {
	const classes = e.target.classList;
	if (classes.contains("level") && classes.contains("unlocked")) {
		closeMenu();
		setTimeout(() => {
			game.currentLevel = parseInt(e.target.textContent);
			game.removeDrawLevel();
			game.start();
		}, 500);
	}
});

// Rafraichir la partie du menu
function refreshMenuPart() {
	if (menuPart == "play") {
		for (let i = 0; i < Object.keys(levels).length; i++) {
			console.log("OUUUUAS");
			const levelsElement = document.querySelectorAll(".menu .play-part .level");
			if (game.levels_unlocked.includes(i + 1)) {
				levelsElement[i].classList.add("unlocked");
			}
		}
		playPart.style.display = "flex";
		editLevelsPart.style.display = "none";
		play.classList.add("selected");
		editLevels.classList.remove("selected");
	} else if (menuPart == "edit-levels-part") {
		editLevelsPart.style.display = "flex";
		playPart.style.display = "none";
		play.classList.remove("selected");
		editLevels.classList.add("selected");
	}
}

// Ouvrir le menu
function openMenu() {
	show_shadow();
	refreshMenuPart();
	menuOn = true; // Menu est ouvert

	// Animation pour le menu
	menu.style.display = "flex";
	setTimeout(() => {
		menu.style.opacity = "1";
		menu.style.transform = "scale(1)";
	}, 10);
}

// Fermer le menu
function closeMenu() {
	hide_shadow();
	menuOn = false; // Menu est fermé

	// Animation pour le menu
	menu.style.opacity = "0";
	menu.style.transform = "scale(1.5)";
	setTimeout(() => {
		menu.style.display = "none";
	}, 500);
}
