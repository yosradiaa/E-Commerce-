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

    function logoutAdmin() {
        sessionStorage.removeItem('currentCustomer');

        window.location.href = 'index.html'; 
    }
});
document.addEventListener('DOMContentLoaded', function () {
    displayOrderDetails();
});

function displayOrderDetails() {
    const orderDetailsContainer = document.getElementById('cart-Container');

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    document.getElementById('cart-Count').innerHTML=cartCount;
   
    cartItems.forEach(item => {
        const orderItemElement = document.createElement('div');
        orderItemElement.innerHTML = `
            <div>
                <p>${item.name}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <hr>
            </div>
        `;
        orderDetailsContainer.appendChild(orderItemElement);
    }
    )
    const ordertotalElement = document.createElement('p');
    const total = calculateTotalPriceFromCart();

    ordertotalElement.innerHTML = `
    Total <span class="price" style="color:black"><b>$${total.toFixed(2)}</b></span>
    `;
    orderDetailsContainer.appendChild(ordertotalElement); 
}
function calculateTotalPriceFromCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}


function placeOrder() {
    const customerName = document.getElementById('fname').value;
    const customerAddress = document.getElementById('adr').value;
    const customerEmail = document.getElementById('email').value;
    const total = calculateTotalPriceFromCart();


    const newOrder = {
        customer: {
            name: customerName,
            address: customerAddress,
            email: customerEmail,
        },
        items: JSON.parse(localStorage.getItem('cartItems')) || [],
        total:total,
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

    existingOrders.push(newOrder);

    localStorage.setItem('orders', JSON.stringify(existingOrders));


    clearCart();

    localStorage.setItem('cartCount',0);
    cartCount=0;
    updateCartCount();

    
    document.querySelector('.row').style.display = 'none';

    console.log('Order placed successfully. Pending admin approval.')
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = 'Order placed successfully. Pending admin approval.';
    successMessage.style.display = 'block';

}




function clearCart() {
    localStorage.removeItem('cartItems');
}

