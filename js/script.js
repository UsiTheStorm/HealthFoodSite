import calcFunc from './modules/calc';
import cardsFunc from './modules/cards';
import formsFunc from './modules/forms';
import modalFunc, { showModal } from './modules/modal';
import sliderFunc from './modules/slider';
import tabsFunc from './modules/tabs';
import timerFunc from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 500000);

    calcFunc();
    cardsFunc();
    formsFunc('form', modalTimerId);
    modalFunc('[data-modal]', '.modal', modalTimerId);
    sliderFunc({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        currentCounter: '#current',
        totalCounter: '#total',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });
    tabsFunc('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timerFunc('.timer', '2022-09-06');
});
