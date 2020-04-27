window.onload = ()=>{
    const language = document.querySelector('select');
    const save = document.querySelector('button');
    const content = document.querySelector('content');

    // TODO Implement check for support. Gecko is currently not support it.
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.interimResults = true;
    recognition.lang = language.value;

    let paragraph = document.createElement('p');

    paragraph.textContent = '...';
    content.appendChild(paragraph);

    recognition.addEventListener('result', event => {
        paragraph.textContent = Array.from(event.results)
            .map(result=>result[0])
            .map(result=>result.transcript)
            .join('');
        if(event.results[0].isFinal){
            paragraph = document.createElement('p');
            paragraph.textContent = '...';
            content.appendChild(paragraph);
        }
    });

    recognition.addEventListener('end', recognition.start);

    recognition.start();

    language.addEventListener('change', ({target}) => {
        recognition.lang = target.value;
        recognition.stop();
    });

    save.addEventListener('click', () => {
        const time = new Date().getTime().toString().slice(-6);
        const data = Array.from(content.querySelectorAll('p')).map(p=>p.textContent).join('\n');
        const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);

        a.href = url;
        a.download = `speech${time}.txt`;
        document.body.appendChild(a);
        a.click();

        setTimeout(()=> {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);

    });
};
