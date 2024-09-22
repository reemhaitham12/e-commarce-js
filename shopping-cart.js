// logout

document.getElementById('logout-button').addEventListener('click', () => {
    console.log("Logout button clicked");
    
    window.location.href = 'index.html';
})

document.addEventListener('DOMContentLoaded', () => {
    
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    console.log("Credentials removed");
});









function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; 

    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.title}" width="80"></td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });
}





function changeQuantity(index, change) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems[index].quantity += change;

    
    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCartItems();
}


function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCartItems();
}


document.getElementById('checkoutBtn').addEventListener('click', () => {
    alert("Checkout successful!");
    localStorage.removeItem('cartItems');
    loadCartItems();
});


loadCartItems();




function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');

    cartItemsContainer.innerHTML = ''; 

    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.title}" width="50" height="50"></td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>
                <input type="number" class="form-control quantity-input" value="${item.quantity}" min="1" data-index="${index}">
            </td>
            <td>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });

    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}


function updateQuantity(event) {
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value);
    
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems[index].quantity = newQuantity;
    
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    
    loadCartItems();
}


function removeItem(event) {
    const index = event.target.dataset.index;
    
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1); 
    
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    
    loadCartItems();
}


function handleCheckout() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Thank you for your purchase!');
        localStorage.removeItem('cartItems'); 
        loadCartItems(); 
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    
    
    document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);
});
