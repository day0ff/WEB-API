const URL = 'http://www.google.com/search?q=$s+svg';
window.onload = () => {
    const language = document.querySelector('select');

    language.addEventListener('change', ({target}) => {
        console.log('language changed')
    });

    fetch(URL.replace('$s','world')).then(response=>response.text()).then(text=>console.log(text));
};
