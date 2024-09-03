const cartItemList = document.querySelector('.cart-item-list');


// BUTTON PLUS AND MINUS IN ITEM LIST AND CART LIST 
window.addEventListener('click', function(event){

    if(event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {

        const itemPlus = event.target.closest('.item-plus');
        const counter = itemPlus.querySelector('[data-counter]');
        // const textItem = event.target.closest('.text-item');
        // const itemPrice = textItem.querySelector('[data-price]')

        if(event.target.dataset.action === 'plus') {

            counter.innerText = ++counter.innerText;

        }

        if(event.target.dataset.action === 'minus') {

            if(parseInt(counter.innerText) > 1) {
                counter.innerText = --counter.innerText;
            } else if(event.target.closest('.cart-item') && parseInt(counter.innerText) === 1 ) {
                event.target.closest('.cart-item').remove();
                toogleCartStatus()
                calcCartPrice();
            }
        

        }

        if(event.target.hasAttribute('data-action') && event.target.closest('.cart-item-list')) {
            calcCartPrice();
        }

    }
});


// ADDING ITEM LIST IN CART LIST
window.addEventListener('click', function(event){

    if(event.target.hasAttribute('data-cart')) {
        const card = event.target.closest('.shop-item');
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            price: card.querySelector('.price').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };

        const itemInCart = cartItemList.querySelector(`[data-id="${productInfo.id}"]`);

        if(itemInCart) {
            const counterEl = itemInCart.querySelector('[data-counter]');
            counterEl.innerText = parseInt(counterEl.innerText) + parseInt(productInfo.counter);  
        } else {

        const cartItemHTML = `
            <div class="cart-item" data-id="${productInfo.id}">
                <img src="${productInfo.imgSrc}" class="cart-item-img">
                <div class="cart-item-main">
                    <div class="cart-item-text"><h2>${productInfo.title}</h2></div>
                    <div class="cart-item-count">
                        <div class="item-plus">
                            <button id="btn1" data-action="minus">-</button>
                            <h3 data-counter>${productInfo.counter}</h3>
                            <button id="btn2" data-action="plus">+</button>
                        </div>
                        <p class="price">${productInfo.price}<img src="https://ru.minecraft.wiki/images/thumb/Deepslate_%D0%B0%D0%BB%D0%BC%D0%B0%D0%B7%D0%BD%D0%B0%D1%8F_%D1%80%D1%83%D0%B4%D0%B0_JE1.png/150px-Deepslate_%D0%B0%D0%BB%D0%BC%D0%B0%D0%B7%D0%BD%D0%B0%D1%8F_%D1%80%D1%83%D0%B4%D0%B0_JE1.png?86e1f" alt="Ар" class="img-price"></p>
                    </div>
                </div>
            </div>`
            cartItemList.insertAdjacentHTML("beforeend", cartItemHTML);
        }

        card.querySelector(`[data-counter]`).innerText = "1"

        toogleCartStatus()

        calcCartPrice()
    };
     
}); 


function toogleCartStatus() {
    const cartItemList = document.querySelector('.cart-item-list');
    const cartEmpty = document.querySelector('[data-cart-empty]');
    const cartOrder = document.querySelector('[data-cart-order]');
    const cartPrice = document.querySelector('[data-cart-price]');

     if(cartItemList.children.length > 0) {

        cartEmpty.classList.add('none');
        cartOrder.classList.remove('none');
        cartPrice.classList.remove('none');
        

    } else {

        cartEmpty.classList.remove('none');
        cartOrder.classList.add('none');
        cartPrice.classList.add('none');

    }
};


function calcCartPrice() {
    const cartItems = document.querySelectorAll('.cart-item');
    
    const totalPriceText = document.querySelector('.general-price-number');

    let totalPrice = 0;

    cartItems.forEach(function(item) {
        const amountEl = item.querySelector('[data-counter]');
        const priceEl = item.querySelector('.price');
        const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText)
        totalPrice += currentPrice;
    })

    totalPriceText.innerText = totalPrice;
}

