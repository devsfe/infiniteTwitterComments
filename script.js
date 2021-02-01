const middle = document.getElementById('middle');
const loader = document.getElementById('loader');

let limit = 6;
let page = 1;

// show loadder
function showLoader() {
    
    loader.classList.add('active');

    setTimeout(() => {
        loader.classList.remove('active');

        setTimeout(() => {
            page++;
            showUser();
        }, 700);

    }, 1500);
}

// fetch and get random user
async function getRandomUser() {
    const res = await fetch(`https://randomuser.me/api/?page=${page}&results=${limit}&seed=abc`);

    const data = await res.json();

    return data
}

// fetch and get random comment
async function getRandomComment() {
    const res = await fetch (`https://jsonplaceholder.typicode.com/comments?_limit=500_page=${page}`);

    const data = await res.json();

    return data;
}

// show user & comment
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
                       Aguarde, comentário ainda não carregado. Tente esperar um pouco ou atualizar a página.
                </p> 
            <div class="comment-icons">
                <i class="far fa-comment middle-icon"></i>
                <i class="fas fa-retweet middle-icon"></i>
                <i class="far fa-heart middle-icon"></i>
            </div>
        </div>` 

        middle.appendChild(commentContainer); 

        // insert loader in DOM
        middle.insertBefore(loader, commentContainer.nextSibling);
        
    }); 

    const randomComment = await getRandomComment();

    var randomCommentArr = [...randomComment];

    for(let i = 0; i < randomCommentArr.length; i++) {
            const paragraph = document.querySelectorAll('.comment');

            paragraph[i].innerText = randomComment[i].body
    }
}

showUser();

// show loader, user & comment on scroll
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 120) {
        showLoader();
    }
});







