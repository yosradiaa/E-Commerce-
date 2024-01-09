document.addEventListener('DOMContentLoaded', function () {
    const logoutLink = document.getElementById('logoutLink');

    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();

        logoutAdmin();
    });

    function logoutAdmin() {
        sessionStorage.removeItem('currentAdmin');

        window.location.href = 'index.html'; 
    }
});

document.addEventListener('DOMContentLoaded', function () {
    displayOrders();
});

function displayOrders() {
    const orderListContainer = document.getElementById('orderList');

    orderListContainer.innerHTML = '';

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.forEach((order, index) => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order');

        orderElement.innerHTML = `
            <h3>Order #${index + 1}</h3>
            <p><strong>Name:</strong> ${order.customer.name}</p>
            <p><strong>Address:</strong> ${order.customer.address}</p>
            <p><strong>Email:</strong> ${order.customer.email}</p>
            <h4>Order Items</h4>
            <ul>
                ${order.items.map(item => `<li>${item.name} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)}</li>`).join('')}
            </ul>
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
            
            ${
                order.isAccepted !== undefined
                    ? `<p><strong>Status:</strong> ${order.isAccepted ? 'Approved' : 'Rejected'}</p>`
                    : `
                        <!-- Add approve and reject buttons -->
                        <button onclick="approveOrder(${index})">Approve</button>
                        <button class="reject" onclick="rejectOrder(${index})">Reject</button>
                    `
            }
            
            <hr>
        `;
        orderListContainer.appendChild(orderElement);
    });
}

function approveOrder(index) {
    updateOrderStatus(index, true); 
}

function rejectOrder(index) {
    updateOrderStatus(index, false); 
}

function updateOrderStatus(index, isAccepted) {
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

    existingOrders[index].isAccepted = isAccepted;

    localStorage.setItem('orders', JSON.stringify(existingOrders));

    displayOrders();
}
