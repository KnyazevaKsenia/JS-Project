const state = {
    chosenTheme: localStorage.getItem('chosenTheme') || null,
    savedText: localStorage.getItem('savedText') || '',
    posts: JSON.parse(localStorage.getItem('posts')) || [],
    fact: '',
};

function setState(newState) {
    Object.assign(state, newState);
}

function renderTheme() {
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
}

function renderText(){
    const textArea = document.getElementsByClassName('input-area')[0];
    if (textArea) {
        textArea.value = state.savedText;
    }
}

function renderFact() {
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
            renderTheme(); // Вызываем рендеринг после установки состояния
        });
    });
    const theme = state.chosenTheme;
    if (theme) {
        setState({ chosenTheme: theme });
        renderTheme();
    }
}

function restoreText() {
    const textArea = document.getElementsByClassName('input-area')[0];
    let text = localStorage.getItem("savedText")
    if (textArea) {
        textArea.addEventListener('input', () => {
            setTimeout(() => {
                const newText = textArea.value;
                    localStorage.setItem('savedText', newText);
                    setState({ savedText: newText });
                    renderText();
            }, 1000);
        });
    }
    textArea.textContent = text;
}

function makeSendButton() {
    const saveButton = document.getElementById("savePost");
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            let selectedId;
            const text = state.savedText;
            const selectedRadio = document.querySelector('input[name="theme"]:checked');
            if (selectedRadio) {
                selectedId = selectedRadio.id;
                renderTheme();
            }
            savePost(text, selectedId);
        });
    } 
}

function savePost(text, theme) {
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
    renderFact(); 
}
