window.onload = ()=>{
    const language = document.querySelector('select');
    const say = document.querySelector('button');


    say.addEventListener('click', () => {
        const msg = new SpeechSynthesisUtterance('Hello World');

        window.speechSynthesis.speak(msg);
    });
};
