import { getResource } from '../services/services';

function cardsFunc() {
    // Карточки
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 35;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const newCard = document.createElement('div');
            this.classes.forEach((className = 'menu__item') => newCard.classList.add(className));
            newCard.innerHTML = `
                    <img src=${this.src} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(newCard);
        }
    }

    getResource('http://localhost:3000/menu').then((data) => {
        data.forEach(({
            img, altimg, title, descr, price,
        }) => {
            new MenuCard(
                img,
                altimg,
                title,
                descr,
                price,
                '.menu .container',
                'menu__item',
            ).render();
        });
    });
}

export default cardsFunc;
