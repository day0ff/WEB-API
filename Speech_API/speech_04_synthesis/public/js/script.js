const PHRASES = {
    'ru-RU': 'Всем привет! Будьте здоровы!',
    'en-US': 'Hello everyone! Be healthy!',
    'fr-FR': 'Salut là-bas! À vos souhaits!',
    'de-DE': 'Hallo zusammen! Gesundheit!',
    'hi-IN': 'हैलो हर कोई स्वस्थ हो!',
    'it-IT': 'Ciao a tutti! Salute!',
    'ja-JP': 'こんにちは皆さん健康です！',
    'ko-KR': '안녕하세요 모두 건강!',
    'pl-PL': 'Cześć wszystkim! Bądźcie zdrowy!',
    'zh-CN': '大家好健康！',
};

window.onload = async () => {
    const language = document.querySelector('select');
    const say = document.querySelector('button');
    const textarea = document.querySelector('textarea');
    const message = new SpeechSynthesisUtterance();
    const voices = await getVoices()
        .then(voices => voices.filter(voice => /(ru-RU|en-US|fr-FR|de-DE|hi-IN|it-IT|ja-JP|ko-KR|pl-PL|zh-CN)/i.test(voice.lang)));

    language.innerHTML = getOptions(voices).join('');
    message.voice = voices[0];
    textarea.value = PHRASES[voices[language.value].lang];

    language.addEventListener('change', () => {
        textarea.value = PHRASES[voices[language.value].lang];
        console.log(textarea.value);
    });

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
