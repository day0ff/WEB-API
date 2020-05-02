import Slider from './Slider.js';

window.onload = () => {
    const language = document.querySelector('select');
    const slider = new Slider();

    window.SpeechRecognition = window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.interimResults = true;
    recognition.lang = language.value;


    recognition.addEventListener('result', ({results}) => {
        const words = Array.from(results)
            .map(result=>result[0])
            .map(result=>result.transcript);
        slider.markWords(words);
    });

    recognition.addEventListener('end', recognition.start);

    recognition.start();

    language.addEventListener('change', ({target}) => {
        recognition.lang = target.value;
        recognition.stop();
    });

};

