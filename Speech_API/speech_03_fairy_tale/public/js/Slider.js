export default class Slider {
    constructor({selector} = {selector: '.slider'}) {
        this.slider = document.querySelector(selector);
        this.attachEvents();
    }

    attachEvents() {
        this.slider.addEventListener('click', this.nextSlide.bind(this));
    }

    nextSlide() {
        const current = this.slider.querySelector('li.item.active');
        const nextElementSibling = current.nextElementSibling;

        current.classList.remove('active');
        current.classList.add('previous');
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
    }
}
