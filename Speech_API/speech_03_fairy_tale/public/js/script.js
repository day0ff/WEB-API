window.onload = () => {
    const language = document.querySelector('select');
    const article = document.querySelector('article');

    window.SpeechRecognition = window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.interimResults = false;
    recognition.lang = language.value;

    let paragraph = document.createElement('p');

    // recognition.addEventListener('result', async({results}) => {
    //     const words = Array.from(results)
    //         .map(result=>result[0])
    //         .map(result=>result.transcript);
    //     paragraph.textContent = words.join('');
    //     if(results[0].isFinal){
    //         paragraph = document.createElement('p');
    //         const img = document.createElement('img');
    //         const {word, src} = await searchImage(words[0]);
    //         img.src = src;
    //         console.log(word, src);
    //         paragraph.appendChild(img);
    //         article.innerHTML = '';
    //         article.appendChild(paragraph);
    //     }
    // });

    recognition.addEventListener('end', recognition.start);

    // recognition.start();

    language.addEventListener('change', ({target}) => {
        recognition.lang = target.value;
        recognition.stop();
    });

};

// function searchImage(word){
//     return fetch(`/img?word=${word}`)
//         .then(response => response.json());
// }
