document.addEventListener('DOMContentLoaded', () => {
    const posts= JSON.parse(localStorage.getItem('posts'));
    displayPosts(posts);
    console.log(posts);

});

function displayPosts(posts) { 
    const postsContainer = document.getElementById('posts'); 
    postsContainer.innerHTML = ''; // Clear previous
    
    posts.forEach(post => { 
        const postElement = document.createElement('div'); 
        postElement.className = 'post';
        postElement.style.backgroundColor=getColor(post.theme); 

        const postDate = document.createElement('div'); 
        postDate.className = 'post-date'; 
        postDate.innerText = new Date(post.date).toLocaleString();

        const postText = document.createElement('div'); 
        postText.className = 'post-text'; 
        postText.innerText = post.text;

        postElement.appendChild(postDate); 
        postElement.appendChild(postText); 
        postsContainer.prepend(postElement); 
    }); 
}

function getColor(theme){
    switch(theme){
        case "theme1":
            return "rgb(218, 224, 238)";
        case("theme2"):
            return "rgb(211, 252, 179)";
        case("theme3"):
            return "rgb(214, 176, 231)";
        case("theme4"):
            return "rgb(71, 107, 150)";
    }
}


