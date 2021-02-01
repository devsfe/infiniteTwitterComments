const middle = document.getElementById('middle');


// fetch and get random user
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/?page=1&results=10&seed=abc');

    const data = await res.json();

    return data
}

// fetch and get random message
async function getRandomMessage() {
    const res = await fetch (`https://jsonplaceholder.typicode.com/comments?_limit=10&_page=1`);

    const data = await res.json();

    return data;
}

// show posts
async function showUser() {
    const user = await getRandomUser();

    user.results.forEach(post => {
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment-container');
        commentContainer.innerHTML = 
        `<div class="profile-container">
            <img src="${post.picture.medium}" alt="" class="comment-img">
            <div class="commentName-container">
                <h4 class="name">${post.name.first} </h4>
                <p class="username">@${post.login.username} · 10 h</p> 
                <p class="comment-answer">Em resposta a <a href="">@jaegereren</a></p>
                <p class="comment"> 
                       lol
                </p> 
            <div class="comment-icons">
                <i class="far fa-comment middle-icon"></i>
                <i class="fas fa-retweet middle-icon"></i>
                <i class="far fa-heart middle-icon"></i>
                <i class="fas fa-upload middle-icon"></i>
            </div>
        </div>` 

        middle.appendChild(commentContainer); 
        
    }); 

    const messages = await getRandomMessage();

    const messages2 = [...messages];

    
    for(let i = 0; i < messages2.length; i++) {
            var teste = document.querySelectorAll('.comment');

            teste[i].innerText = messages[i].body
    }
}

showUser();






