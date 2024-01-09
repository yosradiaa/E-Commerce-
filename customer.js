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

products.forEach(product => {
    product.inWishlist = product.inWishlist || false; 
});

var wishlistCount = parseInt(localStorage.getItem('wishlistCount')) || 0;

var cartCount = parseInt(localStorage.getItem('cartCount')) || 0;


function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 

    products.forEach(product => {
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
function searchProducts() {
    // const categoryInput = document.getElementById('category').value.toLowerCase();
    const productNameInput = document.getElementById('productName').value.toLowerCase();
    // const priceFromInput = parseFloat(document.getElementById('priceFrom').value) || 0;
    // const priceToInput = parseFloat(document.getElementById('priceTo').value) || Number.MAX_SAFE_INTEGER;

    const filteredProducts = products.filter(product => {
        // const categoryMatch = categoryInput === '' || product.category.toLowerCase().includes(categoryInput);
        const nameMatch = productNameInput === '' || product.name.toLowerCase().includes(productNameInput);
        // const priceMatch = product.price >= priceFromInput && product.price <= priceToInput;

        return nameMatch ;
    });

    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 

    filteredProducts.forEach(product => {
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

function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');

    cartCountElement.textContent = cartCount > 0 ? cartCount : '';
}

displayProducts();
document.addEventListener('DOMContentLoaded', function () {
    displayCustomerOrders();
});

function displayCustomerOrders() {
    const orderListContainer = document.getElementById('customerOrderList');

    orderListContainer.innerHTML = '';

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.forEach((order, index) => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order');

        const status = order.isAccepted !== undefined
            ? (order.isAccepted ? 'Approved' : 'Rejected')
            : 'Pending';

        const statusColor = order.isAccepted !== undefined
            ? (order.isAccepted ? 'green' : 'red')
            : 'black'; 

        orderElement.innerHTML = `
            <h3>Order #${index + 1}</h3>
            <h4>Status: <span style="color: ${statusColor}">${status}</span></h4>
            <p><strong>Name:</strong> ${order.customer.name}</p>
            <p><strong>Address:</strong> ${order.customer.address}</p>
            <p><strong>Email:</strong> ${order.customer.email}</p>
            <h4>Order Items</h4>
            <ul>
                ${order.items.map(item => `<li>${item.name} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)}</li>`).join('')}
            </ul>
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        `;
        orderListContainer.appendChild(orderElement);
    });
}
