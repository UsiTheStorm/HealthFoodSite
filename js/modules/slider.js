function getDigit(str) {
    return +str.replace(/\D/g, '');
}

function sliderFunc({
    container,
    slide,
    prevArrow,
    nextArrow,
    currentCounter,
    totalCounter,
    wrapper,
    field,
}) {
    // Слайдер
    const slider = document.querySelector(container);
    const slides = document.querySelectorAll(slide);
    const slideBtnPrev = document.querySelector(prevArrow);
    const slideBtnNext = document.querySelector(nextArrow);
    const slideCurrentCounter = document.querySelector(currentCounter);
    const slideTotalCounter = document.querySelector(totalCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const slideWidth = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        slideTotalCounter.innerHTML = `0${slides.length}`;
    } else {
        slideTotalCounter.innerHTML = slides.length;
    }
    slideCurrentCounter.innerHTML = `0${slideIndex}`;

    slidesField.style.width = `${100 * slides.length}%`;

    slides.forEach((slide) => {
        slide.style.width = slideWidth;
    });

    function changeSlideCounter(n) {
        slideIndex += n;

        if (slideIndex > slides.length) slideIndex = 1;
        else if (slideIndex < 1) slideIndex = slides.length;

        if (slideIndex < 10) {
            slideCurrentCounter.innerHTML = `0${slideIndex}`;
        } else {
            slideCurrentCounter.innerHTML = slideIndex;
        }
        switchDot();
    }

    function moveSlider(set) {
        slidesField.style.transform = `translateX(-${set}px)`;
    }

    slideBtnNext.addEventListener('click', () => {
        if (offset >= getDigit(slideWidth) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += getDigit(slideWidth);
        }
        moveSlider(offset);
        changeSlideCounter(1);
    });

    slideBtnPrev.addEventListener('click', () => {
        if (offset <= 0) {
            offset = getDigit(slideWidth) * (slides.length - 1);
        } else {
            offset -= getDigit(slideWidth);
        }
        moveSlider(offset);
        changeSlideCounter(-1);
    });

    // Точки Слайдера

    const dotIndicators = document.createElement('ol');
    const dots = [];
    dotIndicators.classList.add('carousel-indicators');
    slider.appendChild(dotIndicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);

        if (i === 0) {
            dot.style.opacity = 1;
        }
        dotIndicators.appendChild(dot);
        dots.push(dot);
    }

    function switchDot() {
        dots.forEach((dot) => {
            dot.style.opacity = '0.4';
        });
        dots[slideIndex - 1].style.opacity = 1;
    }

    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const slideTo = parseInt(e.target.getAttribute('data-slide-to'), 10);

            slideIndex = slideTo;
            offset = getDigit(slideWidth) * (slideTo - 1);
            moveSlider(offset);
            changeSlideCounter(0);
        });
    });
}

export default sliderFunc;
export { getDigit };
