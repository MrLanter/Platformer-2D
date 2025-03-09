const playground = document.querySelector(".playground");
const playButton = document.querySelector(".play-btn");
const fill = document.querySelector(".fill");
const title = document.querySelector(".title");

// Chaque level du jeu
const levels = {
	level_1: {
		spawn: ["center", 750],
		parts: [
			[0, -20, 1000, 20, "normal"],
			[100, 100, 100, 20, "normal"],
			[300, 250, 100, 20, "normal"],
			[800, 200, 80, 20, "normal"],
			[800, 400, 80, 20, "normal"],
			[800, 600, 80, 20, "normal"],
			[400, 650, 60, 20, "normal"],
			[200, 750, 60, 20, "normal"],
			[300, 900, 60, 20, "normal"],
			[700, 920, 200, 20, "normal"],
		],
	},
	level_2: {
		spawn: [50, 850],
		parts: [
			[-300, 800, 1200, 20, "normal"],
			[900, 100, 100, 20, "normal"],
			[600, 100, 100, 20, "normal"],
			[300, 100, 100, 20, "normal"],
			[0, 100, 100, 20, "normal"],
			[-150, 300, 100, 20, "normal"],
			[200, 350, 50, 20, "normal"],
			[400, 350, 40, 20, "normal"],
			[600, 400, 40, 20, "normal"],
			[100, 600, 600, 20, "normal"],
		],
	},
	level_3: {
		spawn: [10, 850],
		parts: [
			[0, 800, 100, 20, "normal"],
			[200, 780, 1100, 20, "normal"],
			[400, 0, 100, 20, "normal"],
			[600, 0, 100, 100, "normal"],
			[900, 0, 100, 100, "normal"],
			[1000, 200, 100, 100, "normal"],
			[700, 300, 100, 200, "normal"],
			[500, 650, 100, 20, "normal"],
			[450, 550, 40, 20, "normal"],
			[450, 750, 500, 20, "normal"],
			[950, 730, 20, 20, "normal"],
		],
	},
	level_4: {
		spawn: [0, 50],
		parts: [
			[0, 0, 300, 20, "normal"],
			[450, 50, 20, 20, "normal"],
			[700, 150, 20, 20, "normal"],
			[1000, 250, 20, 100, "normal"],
			[700, 400, 20, 20, "normal"],
			[400, 400, 20, 20, "normal"],
			[50, 550, 220, 20, "normal"],
			[200, 700, 100, 20, "normal"],
			[250, 850, 100, 20, "normal"],
			[400, 950, 400, 20, "normal"],
			[900, 930, 400, 20, "normal"],
			[950, 700, 20, 20, "normal"],
		],
	},
	level_5: {
		spawn: [1000, 50],
		parts: [
			[990, 0, 30, 20, "normal"],
			[750, 0, 30, 20, "normal"],
			[500, 0, 30, 20, "normal"],
			[250, 0, 20, 20, "normal"],
			[-110, 3, 50, 20, "normal"],
			[-200, 200, 50, 20, "normal"],
			[100, 300, 20, 20, "normal"],
			[300, 300, 10, 100, "normal"],
			[350, 300, 10, 100, "normal"],
			[400, 300, 10, 100, "normal"],
			[450, 300, 10, 100, "normal"],
			[550, 280, 10, 100, "normal"],
			[650, 260, 10, 100, "normal"],
			[750, 240, 10, 100, "normal"],
			[850, 220, 10, 100, "normal"],
			[900, 220, 10, 100, "normal"],
			[950, 220, 10, 100, "normal"],
			[1000, 220, 10, 100, "normal"],
			[1050, 220, 10, 780, "normal"],
			[1100, 400, 20, 20, "normal"],
			[900, 600, 20, 20, "normal"],
			[1100, 800, 20, 20, "normal"],
			[400, 950, 500, 20, "normal"],
			[-450, 930, 750, 20, "normal"],
			[220, 600, 20, 20, "normal"],
			[220, 700, 20, 20, "normal"],
			[-100, 900, 250, 20, "normal"],
			[-150, 710, 50, 20, "normal"],
			[-200, 910, 50, 20, "normal"],
		],
	},
};

// Démarrer le jeu
game = new Game();
game.displayHomepage();
// game.start();
