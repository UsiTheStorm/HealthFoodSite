import { getDigit } from './slider';

function calcFunc() {
    // Калькулятор Каллорий
    const calcResult = document.querySelector('.calculating__result span');

    let sex;
    let height;
    let weight;
    let age;
    let ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    function initCalculator() {
        const chooseSex = document.querySelector(`#${sex}`);
        const chooseRatio = document.querySelector(`[data-ratio="${ratio}"]`);
        chooseSex.classList.add('calculating__choose-item_active');
        chooseRatio.classList.add('calculating__choose-item_active');
    }
    initCalculator();

    function calcTotal() {
        let res;
        if (!sex || !height || !weight || !age || !ratio) {
            calcResult.innerHTML = '____';
            return;
        }

        if (sex === 'female') {
            res = (447, 6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio;
        } else {
            res = (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio;
        }
        calcResult.innerHTML = Math.round(res);
    }

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach((el) => {
                    el.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    function getDinamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.classList.add('wrong-input');
            } else if (input.value.match(/\d/g)) {
                input.classList.remove('wrong-input');
            }

            switch (input.getAttribute('id')) {
                case 'height': {
                    height = getDigit(input.value);
                    break;
                }
                case 'weight': {
                    weight = getDigit(input.value);
                    break;
                }
                case 'age': {
                    age = getDigit(input.value);
                    break;
                }
                default: {
                    console.log('no input');
                    break;
                }
            }
            calcTotal();
        });
    }
    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
    getDinamicInfo('#height');
    getDinamicInfo('#weight');
    getDinamicInfo('#age');
}

export default calcFunc;
