var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8000/posts", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let allPosts = JSON.parse(xhr.responseText)
        if (allPosts.length == 0) {
            document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend', '<div class="no-post-store"><h2 class="no-posts">Pas de posts, revenez plus tard !</h2></div>')
        }else{
            allPosts.forEach(element => {
                let divConainerString = document.getElementById("div-login").innerHTML;

                divConainerString = divConainerString.replaceAll('{{password}}', element.password)
                getUserById(element.user_id)
                .then((email)=>{
                    divConainerString = divConainerString.replaceAll('{{userEmail}}', email)
                    divConainerString = '<div class="data-popup">' + divConainerString +'</div>'
                })
            });
        }
    }
};
xhr.send();

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

window.onload = ()=>{
  let form = document.getElementById('add-data')
  form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const formData = new FormData(form);
      // console.log(formData.get('title'))
  })
}