// logout

document.getElementById('logout-button').addEventListener('click', () => {
    console.log("Logout button clicked");
    // توجيه المستخدم إلى صفحة تسجيل الدخول
    window.location.href = 'index.html';
})

document.addEventListener('DOMContentLoaded', () => {
    // مسح بيانات الاعتماد عند تحميل الصفحة
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    console.log("Credentials removed");
});




// shopping-cart.js

// الحصول على المنتجات من Local Storage
// shopping-cart.js

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // تفريغ المحتوى

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

// ... بقية الدوال كما هي ...


// تغيير كمية المنتج
function changeQuantity(index, change) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems[index].quantity += change;

    // إزالة المنتج إذا كانت الكمية 0
    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCartItems();
}

// إزالة منتج من العربة
function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCartItems();
}

// إتمام عملية الدفع
document.getElementById('checkoutBtn').addEventListener('click', () => {
    alert("Checkout successful!");
    localStorage.removeItem('cartItems');
    loadCartItems();
});

// تحميل العناصر عند فتح الصفحة
loadCartItems();

// shopping-cart.js

// دالة تحميل المنتجات من Local Storage وعرضها في صفحة العربة
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');

    cartItemsContainer.innerHTML = ''; // تفريغ المحتوى

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

    // إضافة حدث لتحديث الكمية
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });

    // إضافة حدث لإزالة المنتج من العربة
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// دالة لتحديث كمية المنتج
function updateQuantity(event) {
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value);
    
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems[index].quantity = newQuantity;
    
    // تحديث Local Storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // إعادة تحميل المنتجات المحدثة
    loadCartItems();
}

// دالة لإزالة المنتج من العربة
function removeItem(event) {
    const index = event.target.dataset.index;
    
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1); // إزالة المنتج من المصفوفة
    
    // تحديث Local Storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // إعادة تحميل المنتجات المحدثة
    loadCartItems();
}

// دالة لمعالجة عملية الدفع عند الضغط على زر "Checkout"
function handleCheckout() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Thank you for your purchase!');
        localStorage.removeItem('cartItems'); // إزالة العناصر من Local Storage بعد الدفع
        loadCartItems(); // تحديث واجهة المستخدم
    }
}

// استدعاء دالة التحميل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    
    // إضافة حدث الضغط على زر "Checkout"
    document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);
});
