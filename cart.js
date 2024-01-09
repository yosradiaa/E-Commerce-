

var wishlistCount = parseInt(localStorage.getItem('wishlistCount')) || 0;

var cartCount = parseInt(localStorage.getItem('cartCount')) || 0;


function updateWishlistCount() {
    const wishlistCountElement = document.getElementById('wishlistCount');

    wishlistCountElement.textContent = wishlistCount > 0 ? wishlistCount : '';
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');

    cartCountElement.textContent = cartCount > 0 ? cartCount : '';
}

updateWishlistCount();
updateCartCount();

document.addEventListener('DOMContentLoaded', function () {
    const logoutLink = document.getElementById('logoutLink');

    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();

        logoutAdmin();
    });

    // function logoutAdmin() {
    //     sessionStorage.removeItem('currentCustomer');

    //     window.location.href = 'index.html'; 
    // }
});

document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
    calculateTotalPrice();
});

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; 

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item'); 

        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('cart-item-details');

        const productImage = document.createElement('img');
        productImage.src = item.image;
        productImage.alt = item.name;
        productImage.classList.add('product-image'); 

        const productName = document.createElement('p');
        productName.textContent = item.name;

        const quantityPriceContainer = document.createElement('div');
        quantityPriceContainer.classList.add('quantity-price');

        const quantity = document.createElement('span');
        quantity.textContent = `Quantity: ${item.quantity}`;

        const price = document.createElement('span');
        price.textContent = `Price: $${(item.price * item.quantity).toFixed(2)}`;

        quantityPriceContainer.appendChild(quantity);
        quantityPriceContainer.appendChild(price);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(item.id);

        detailsContainer.appendChild(productImage);
        detailsContainer.appendChild(productName);
        detailsContainer.appendChild(quantityPriceContainer);

        cartItemElement.appendChild(detailsContainer);
        cartItemElement.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItemElement);
    });
}



function calculateTotalPriceFromCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateTotalPrice() {

    const totalPriceElement = document.getElementById('totalPrice');
    const total = calculateTotalPriceFromCart();
    totalPriceElement.textContent = total.toFixed(2);

    const checkoutSection = document.getElementById('checkoutButton');

    if (total > 0) {
        checkoutSection.style.display = 'inline'; 
    } else {
        checkoutSection.style.display = 'none'; 
    }
}
function removeFromCartInLocalStorage(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const index = cartItems.findIndex(item => item.id === productId);

    if (index !== -1) {
        const removedProduct = cartItems[index];
        const removedQuantity = removedProduct.quantity;

        cartItems.splice(index, 1);

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        cartCount -= removedQuantity;
        localStorage.setItem('cartCount', cartCount.toString());

        updateCartCount();
    }
}


function removeFromCart(productId) {
    removeFromCartInLocalStorage(productId); // Remove item from localStorage and update count
    displayCartItems(); // Refresh cart items
    calculateTotalPrice(); // Recalculate total price
}



function goToCheckout() {
    window.location.href = 'checkout.html';
}