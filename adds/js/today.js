document.addEventListener('DOMContentLoaded', () => {
    //await setLogo();
    restoreTheme();
    restoreText();
    makeSendButton();
    
});

async function setLogo(){
    const logo=document.getElementsById('logo');
    const respose= fetch("http://localhost:500/logo")
}

function restoreTheme(){
    const radios = document.querySelectorAll('input[name="theme"]');
    radios.forEach(radio => {
        radio.addEventListener('click', () => {
            changeTheme(radio.id);
        });
    });
    const theme = localStorage.getItem('chosenTheme');
    if (theme) {
        changeTheme(theme);
        radios.forEach(radio => {
            if (radio.id === theme) {
                radio.checked = true;
            }
        });
    }
}

function restoreText(){
    const text_area = document.getElementsByClassName('input-area')[0]; 
    const savedText = localStorage.getItem('savedText');
    if (savedText) { 
        text_area.value = savedText; 
    }  
    text_area.addEventListener('input', () => { 
        setTimeout(() => { 
            try { 
                localStorage.removeItem('savedText');
                localStorage.setItem('savedText', text_area.value); 
            } 
            catch (e) { 
                console.error('Error saving to localStorage:', e); 
            } 
        }, 1000); 
    });

}

function makeSendButton(){
    const saveButton = document.getElementById("savePost");
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            console.log("clicked");
            let selectedId;
            const text = document.getElementsByClassName('input-area')[0].value;
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

function changeTheme(id) {
    document.documentElement.classList.remove('theme1', 'theme2', 'theme3', 'theme4');
    document.documentElement.classList.add(id);
    try {
        localStorage.removeItem('chosenTheme');
    } finally {
        localStorage.setItem('chosenTheme', id);
    }
};

function savePost(text, theme) {
    console.log(text, theme);
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        text: text,
        date: new Date().toISOString(),
        theme: theme,
    };
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
};

//
async function SaveNote() {
    let theme = localStorage.getItem('chosenTheme');
    let text = localStorage.getItem('savedText');
    let data = { theme: theme, text: text, user_id: authorizationData.user_id };
    if (theme && text) {
        return fetch('/saveNote', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }
    else {
        return Promise.reject('Theme or text is missing'
        );
    }
    
}




