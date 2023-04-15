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
                let startDate = new Date(element.start_date)
                let endDate = new Date(element.end_date)

                let startDateString = ((startDate.getDate() < 10) ? '0' + (startDate.getDate() + 1) : startDate.getDate() + 1) + '/' + ((startDate.getMonth() < 10) ? '0' + (startDate.getMonth() + 1) : startDate.getMonth() + 1) + '/' + startDate.getFullYear()
                let endDateString = ((endDate.getDate() < 10) ? '0' + (endDate.getDate()) : endDate.getDate()) + '/' + ((endDate.getMonth() < 10) ? '0' + (endDate.getMonth() + 1) : endDate.getMonth() + 1) + '/' + endDate.getFullYear()

                let divConainerString = document.getElementById("div0").innerHTML;

                divConainerString = divConainerString.replaceAll('{{title}}', element.title)
                divConainerString = divConainerString.replaceAll('{{content}}', element.content)
                divConainerString = divConainerString.replaceAll('{{dateStart}}', startDateString)
                divConainerString = divConainerString.replaceAll('{{dateEnd}}', endDateString)

                getUserById(element.user_id)
                .then((email)=>{
                    divConainerString = divConainerString.replaceAll('{{userEmail}}', email)
                    divConainerString = '<div class="carré">' + divConainerString +'</div>'

                    document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend', divConainerString)
                })
            });
        }
    }
};
xhr.send();

window.onload = ()=>{
    let form = document.getElementById('add-post')
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const formData = new FormData(form);
        console.log(formData.get('title'))
    })
}

function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function getUserById(id){
    return new Promise((resolve, reject) => {
        var xhr2 = new XMLHttpRequest();
        xhr2.open("GET", "http://localhost:8000/user/" + id, true);
        xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr2.onreadystatechange = function() { 
            if (xhr.readyState === 4 && xhr.status === 200) {
                let user = JSON.parse(xhr2.responseText)
                resolve(user.email)
            }
        }
        xhr2.send()
    })
}