function startGame(theme) {
  const availableCount = themeImageCounts[theme];
  const numPairs = Math.min(6, availableCount); // max 6 ou moins si pas assez d'images

  let imageIndexes = Array.from({ length: availableCount }, (_, i) => i + 1);
  shuffle(imageIndexes); // Mélange les index

  let selectedIndexes = imageIndexes.slice(0, numPairs);
  let selectedImages = selectedIndexes.map((i) => `img/${theme}/${i}.png`);

  const gameImages = [...selectedImages, ...selectedImages];
  shuffle(gameImages);

  createBoard(gameImages);

  document.getElementById("theme-selector").style.display = "none";
  document.getElementById("game-board").style.display = "block";
}
