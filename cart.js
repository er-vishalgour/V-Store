if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}
else {
    ready();
}

function ready() {
    onLoadCartNumber();
    onLoadcartDisplay();
    let removeCartItems = document.getElementsByClassName("remove");
    for (let i = 0; i < removeCartItems.length; i++) {
        const button = removeCartItems[i];
        button.addEventListener('click', removeCartItem);

    }
    let quantityInput = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }
    let addToCart = document.getElementsByClassName('addToCart');
    for (let i = 0; i < addToCart.length; i++) {
        let button = addToCart[i];
        button.addEventListener('click', AddItems);
    }
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function AddItems(event) {
    let button = event.target;
    let shopItem = button.parentElement;
    let title = shopItem.getElementsByClassName('item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('item-price')[0].innerText;
    let imgItem = button.parentElement.parentElement;
    let imgSrc = imgItem.getElementsByClassName('imgSrc')[0].src;
    console.log(title, price, imgSrc);
    addItemToCart(title, price, imgSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
    console.log(title, price, imgSrc);
    let cartRow = document.createElement('tr');
    let cartItems = document.getElementsByClassName('product_table')[0];
    console.log(cartItems)
    let cartItemName = document.getElementsByClassName('cart-item-title');
    
    let cartRowContents = `
    <tr class="cart-row">
        <td>
            <div class="cart-info">
                <img src="${imgSrc}">
                <div>
                    <p class="cart-item-title">${title}</p>
                    <small>Price: ${price}</small><br>
                    <a href="" class="remove" onclick="return false;">Remove</a>
                </div>
            </div>
        </td>
        <td><input type="number" value="1" class="cart-quantity"></td>
        <td class="cart-price">${price}</td>
    </tr><br>`

    cartRow.innerHTML = cartRowContents;

    cartItems.append(cartRow);
    console.log(cartItems);
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    displayCart(cartItems);

}
function displayCart(cartItems) {
    let cartArray = [];
    console.log(typeof(cartArray));
    let existing = localStorage.getItem('cartDisplay');
    if (existing) {
        cartArray.push(cartItems.innerHTML)
        localStorage.setItem('cartDisplay',JSON.stringify(cartArray));

    }
    else {
        cartArray.push(cartItems.innerHTML)
        console.log(cartArray);
        localStorage.setItem('cartDisplay', JSON.stringify(cartArray));
    }
}

function updateCartTotal() {
    let cart_page = document.querySelector('.cart-page');
    if (cart_page) {
        let cartItemContainer = document.getElementsByClassName("cart-page")[0];
        let cartRows = cartItemContainer.getElementsByClassName("cart_table");
        let total = 0;
        for (let i = 0; i < cartRows.length; i++) {
            const cartrow = cartRows[i];
            let priceElement = cartrow.getElementsByClassName("cart-price")[0];
            let quantityElement = cartrow.getElementsByClassName("cart-quantity")[0];
            let price = parseFloat(priceElement.innerText.replace('$', ''));
            let quantity = parseInt(quantityElement.value);
            total = total + (price * quantity);
        }
        total = Math.round(total, 3);
        document.getElementsByClassName('t-price')[0].innerText = '$' + total;
    }
}

let carts = document.querySelectorAll('.addToCart');
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers();
    })

}
function onLoadCartNumber() {
    let productNumber = localStorage.getItem('cartNumbers');
    if (productNumber) {
        document.querySelector('.cart-span').textContent = productNumber;
    }
}
function cartNumbers() {
    let productNumber = localStorage.getItem('cartNumbers');
    productNumber = parseInt(productNumber)

    if (productNumber) {
        localStorage.setItem('cartNumbers', productNumber + 1);
        document.querySelector('.cart-span').textContent = productNumber + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-span').textContent = 1;
    }


}



function onLoadcartDisplay() {
    let cartDisplayItem = JSON.parse(localStorage.getItem('cartDisplay'));
    if (cartDisplayItem) {
        document.querySelector('.cart_table').innerHTML = cartDisplayItem;
    }
}

