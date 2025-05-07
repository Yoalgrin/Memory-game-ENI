// Permet de Vérifier si les données de l'utilisateur sont stockées dans le localStorage
const userProfile = JSON.parse(localStorage.getItem("userProfile"));

// Si les données n'existent pas
if (!userProfile) {
  document.getElementById("name").textContent = "Aucun profil trouvé";
  document.getElementById("email").textContent = "Veuillez vous connecter ou créer un profil.";
  
} else {
  // Afficher les données utilisateur si elles existent
  document.getElementById("name").textContent = userProfile.name;
  document.getElementById("email").textContent = userProfile.email;
  
}
// Affichage des données dans la fiche
document.getElementById("name").textContent =
  userProfile?.name || defaultProfileProfile.name;
document.getElementById("email").textContent =
  userProfile?.email || defaultProfile.email;

