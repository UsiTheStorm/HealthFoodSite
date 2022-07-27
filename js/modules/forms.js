import { closeModal, showModal } from './modal';
import { postData } from '../services/services';

function formsFunc(formSelector, modalTimerId) {
    //  Модальное поздравление после отправки формы

    function showThanksModal(mess) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${mess}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    // Формы(отправка на сервер Fetch и Async)

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Mы с вами свяжемся как можно сокрее',
        failur: 'Что-то пошло не так. Попробуйте позже ',
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.classList.add('loading');
            statusMessage.src = message.loading;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then((data) => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failur);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    forms.forEach((item) => {
        bindPostData(item);
    });

    fetch('http://localhost:3000/menu')
        .then((data) => data.json())
        .then((res) => console.log(res));
}

export default formsFunc;
