const state = {
    posts: JSON.parse(localStorage.getItem('posts')) || []
};

function setState(newState) {
    Object.assign(state, newState);
    render();
}

function render() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = ''; // Clear previous

    state.posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.style.backgroundColor = getColor(post.theme);

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

document.addEventListener('DOMContentLoaded', () => {
    render();
    console.log(state.posts);
});

function getColor(theme) {
    switch (theme) {
        case "theme1":
            return "rgb(218, 224, 238)";
        case "theme2":
            return "rgb(211, 252, 179)";
        case "theme3":
            return "rgb(214, 176, 231)";
        case "theme4":
            return "rgb(71, 107, 150)";
        default:
            return "white";
    }
}
