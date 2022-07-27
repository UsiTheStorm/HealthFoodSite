function showModalScrollDown(modalSelector, modalTimerId) {
    const { clientHeight } = document.documentElement;
    const { pageYOffset } = window;
    const { scrollHeight } = document.documentElement;

    if (clientHeight + pageYOffset >= scrollHeight) {
        showModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', () => showModalScrollDown((modalSelector, modalTimerId)));
        clearInterval(modalTimerId);
    }
}

function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = '1.1%';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }

    window.removeEventListener('scroll', () => showModalScrollDown((modalSelector, modalTimerId)));
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    document.body.style.marginRight = '0';
}

function modalFunc(triggerSelector, modalSelector, modalTimerId) {
    // Модальное Окно
    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', () => showModal(modalSelector, modalTimerId));
    });

    window.addEventListener('scroll', () => showModalScrollDown((modalSelector, modalTimerId)));

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
}

export default modalFunc;
export { closeModal };
export { showModal };
