const state = {
    chosenTheme: localStorage.getItem('chosenTheme') || null,
    savedText: localStorage.getItem('savedText') || '',
    posts: JSON.parse(localStorage.getItem('posts')) || [],
    fact: ''
};

function setState(newState) {
    Object.assign(state, newState);
    render();
}

function render() {
    if (state.chosenTheme) {
        document.documentElement.classList.remove('theme1', 'theme2', 'theme3', 'theme4');
        document.documentElement.classList.add(state.chosenTheme);
        const radios = document.querySelectorAll('input[name="theme"]');
        radios.forEach(radio => {
            if (radio.id === state.chosenTheme) {
                radio.checked = true;
            }
        });
    }

    const text_area = document.getElementsByClassName('input-area')[0];
    if (text_area) {
        text_area.value = state.savedText;
    }

    const posts_container = document.getElementById('posts-container');
    if (posts_container) {
        posts_container.innerHTML = '';
        state.posts.forEach(post => {
            const post_element = document.createElement('div');
            post_element.className = 'post';
            post_element.innerHTML = `
                <div class="post-theme">${post.theme}</div>
                <div class="post-date">${new Date(post.date).toLocaleString()}</div>
                <div class="post-text">${post.text}</div>
            `;
            posts_container.appendChild(post_element);
        });
    }

    const span = document.getElementsByClassName('fact')[0];
    if (span) {
        span.textContent = state.fact;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    restoreTheme();
    restoreText();
    makeSendButton();
    getFact();
    render();
});

async function setLogo(){
    const logo = document.getElementById('logo');
    const response = await fetch("http://localhost:500/logo");
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    logo.src = imgUrl;
}

function restoreTheme(){
    const radios = document.querySelectorAll('input[name="theme"]');
    radios.forEach(radio => {
        radio.addEventListener('click', () => {
            const newTheme = radio.id;
            localStorage.setItem('chosenTheme', newTheme);
            setState({ chosenTheme: newTheme });
        });
    });
    const theme = state.chosenTheme;
    if (theme) {
        setState({ chosenTheme: theme });
    }
}

function restoreText(){
    const text_area = document.getElementsByClassName('input-area')[0];
    if (text_area) {
        text_area.addEventListener('input', () => {
            setTimeout(() => {
                try {
                    const newText = text_area.value;
                    localStorage.setItem('savedText', newText);
                    setState({ savedText: newText });
                }
                catch (e) {
                    console.error('Error saving to localStorage:', e);
                }
            }, 1000);
        });
    }
}

function makeSendButton(){
    const saveButton = document.getElementById("savePost");
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            console.log("clicked");
            let selectedId;
            const text = state.savedText;
            const selectedRadio = document.querySelector('input[name="theme"]:checked');
            if (selectedRadio) {
                selectedId = selectedRadio.id;
            }
            savePost(text, selectedId);
        });
    } else {
        console.log("Button didn't found");
    }
}

function savePost(text, theme) {
    console.log(text, theme);
    const newPost = {
        text: text,
        date: new Date().toISOString(),
        theme: theme,
    };
    const posts = [...state.posts, newPost];
    localStorage.setItem('posts', JSON.stringify(posts));
    setState({ posts: posts });
}

async function getFact(){
    const response = await fetch("https://catfact.ninja/fact");
    const json = await response.json();
    setState({ fact: json.fact });
}


