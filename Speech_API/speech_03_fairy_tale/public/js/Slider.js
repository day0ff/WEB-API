export default class Slider {
    constructor({selector} = {selector: '.slider'}) {
        this.slider = document.querySelector(selector);
        this.attachEvents();
        this.timer = false;
    }

    attachEvents() {
        this.slider.addEventListener('click', this.nextSlide.bind(this));
    }

    nextSlide() {
        const current = this.slider.querySelector('li.item.active');
        const nextElementSibling = current.nextElementSibling;

        current.classList.remove('active');
        current.classList.add('previous');
        current.querySelector('div').firstElementChild.innerHTML = current.textContent;

        if (nextElementSibling) {
            nextElementSibling.classList.remove('next');
            nextElementSibling.classList.add('active');
        } else {
            const items = this.slider.querySelectorAll('li');
            items.forEach((item, index) => {
                if (index) {
                    item.classList.remove('previous');
                    item.classList.add('next');
                } else {
                    item.classList.remove('previous');
                    item.classList.add('active');
                }
            });
        }

        this.timer = false;
    }

    markWords(words) {
        const textElement = this.slider.querySelector('li.item.active div').firstElementChild;
        const markElement = textElement.querySelector('mark');
        const markArray = markElement && this.getArrayOfWords(markElement.textContent) || [];
        const textArray = this.getArrayOfWords(textElement.textContent).slice(markArray.length);
        const wordsArray = words.flatMap(word => this.getArrayOfWords(word));

        wordsArray.forEach(word => {
            if (textArray[0] === word) {
                markArray.push(textArray.shift());
            }
        });

        const markString = markArray.join('').split('');
        const markText = textElement.textContent.split('').reduce((acc, char) => {
            if (markString.length) {
                acc.push(char);
                markString[0] === char.toLowerCase() && markString.shift();
            }
            return acc;
        }, []).join('');

        textElement.innerHTML = '<mark>' + markText + '</mark>' + textElement.textContent.slice(markText.length);

        if (!textArray.length && !this.timer) {
            this.timer = true;
            window.setTimeout(() => this.nextSlide(), 800);
        }
    }

    getArrayOfWords(text) {
        return text ? text.replace(/[^a-zA-Zа-яА-Я ]/g, ' ').replace(/\s\s+/g, ' ').trim().toLowerCase().split(' ') : [];
    }
}
