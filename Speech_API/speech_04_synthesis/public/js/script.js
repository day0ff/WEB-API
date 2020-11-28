window.onload = async () => {
    const language = document.querySelector('select');
    const say = document.querySelector('button');
    const textarea = document.querySelector('textarea');
    const message = new SpeechSynthesisUtterance();
    const voices = await getVoices()
        .then(voices => voices.filter(voice => /(ru|en|fr|de)/i.test(voice.lang)));

    language.innerHTML = getOptions(voices).join('');
    message.voice = voices[0];

    say.addEventListener('click', () => {
        if (textarea.value) {
            message.voice = voices[language.value];
            message.text = textarea.value;
            window.speechSynthesis.speak(message);
        }
    });
};

function getVoices() {
    return new Promise((resolve) => {
        let voices = speechSynthesis.getVoices();
        if (voices.length) {
            resolve(voices);
            return;
        }
        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices();
            resolve(voices);
        }
    })
}

function getOptions(languages) {
    return languages.map((language, index) => {
        const option = document.createElement('option');

        option.value = index;
        option.innerText = `${language.lang} - ${language.name}`;
        return option.outerHTML;
    });
}
