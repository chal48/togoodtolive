const popupContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.close-btn');
const popupLink = document.querySelector('.link2');

// Ajouter un gestionnaire d'événements "click" au bouton de fermeture
closeBtn.addEventListener('click', () => {
  popupContainer.style.display = 'none';
});

// Ajouter un gestionnaire d'événements "click" au lien
popupLink.addEventListener('click', (event) => {
  // Empêcher le comportement par défaut du lien (aller à la page suivante)
  event.preventDefault();

  // Afficher la popup
  popupContainer.style.display = 'flex';
});