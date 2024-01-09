

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

var products = JSON.parse(localStorage.getItem('products')) || [];
var productsInWishlist = products.filter(product => product.inWishlist);

var wishlistCount = parseInt(localStorage.getItem('wishlistCount')) || 0;
var cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

console.log(productsInWishlist);

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 

    productsInWishlist.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item'); 

        const imageElement = document.createElement('img');
        imageElement.src = product.image;
        imageElement.alt = product.name;
        imageElement.classList.add('zoom-image');

        productItem.appendChild(imageElement);

        productItem.innerHTML += `
            <p>Name: ${product.name}</p>
            <p>Category: ${product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Description: ${product.description}</p>
            <p>Quantity: ${product.quantity}</p>
            <select id="quantity${product.id}" name="quantity">
                ${generateQuantityOptions(product.quantity)}
            </select>

            <button onclick="addToCart(${product.id}, ${product.quantity})">Add to Cart</button>
            
            <span class="wishlist-icon" onclick="toggleWishlist(${product.id})">${product.inWishlist ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>'}</span>`;
    
        productList.appendChild(productItem);
    });

    updateWishlistCount();
    updateCartCount();
}
function generateQuantityOptions(maxQuantity) {
    let options = '';
    for (let i = 1; i <= maxQuantity; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    return options;
}

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (product.inWishlist) {
            removeFromWishlist(product);
        } else {
            addToWishlist(product);
        }

        localStorage.setItem('products', JSON.stringify(products));

        displayProducts();
    }
}

function updateWishlistCount() {
    const wishlistCountElement = document.getElementById('wishlistCount');

    wishlistCountElement.textContent = wishlistCount > 0 ? wishlistCount : '';
}

function addToWishlist(product) {
    product.inWishlist = true;
    wishlistCount++;
    localStorage.setItem('wishlistCount', wishlistCount.toString());
}

function removeFromWishlist(product) {
    product.inWishlist = false;
    wishlistCount--;
    localStorage.setItem('wishlistCount', wishlistCount.toString());
}


function addToCart(productId, maxQuantity) {
    const selectedQuantity = document.getElementById(`quantity${productId}`).value;

    const selectedProduct = products.find(p => p.id === productId);

    if (selectedProduct) {
        const cartItem = {
            id: selectedProduct.id,
            image: selectedProduct.image,
            name: selectedProduct.name,
            price: selectedProduct.price,
            quantity: parseInt(selectedQuantity),
        };

        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const existingCartItemIndex = cartItems.findIndex(item => item.id === cartItem.id);

        if (existingCartItemIndex !== -1) {
            cartItems[existingCartItemIndex].quantity += cartItem.quantity;
        } else {
            cartItems.push(cartItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        cartCount += parseInt(selectedQuantity);
        localStorage.setItem('cartCount', cartCount.toString());

        updateCartCount();
    }
}


function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');

    cartCountElement.textContent = cartCount > 0 ? cartCount : '';
}

document.addEventListener('DOMContentLoaded', function () {
    displayProducts();
});