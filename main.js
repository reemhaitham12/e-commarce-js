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
// main.js
// main.js

document.addEventListener('DOMContentLoaded', () => {
    // دالة لإضافة المنتج إلى Local Storage
    function addToCart(product) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find(item => item.title === product.title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert("Product added to cart successfully!");
    }

    // الحصول على كل أزرار "Add to cart" وإضافة حدث الضغط عليها
    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const product = {
                title: card.querySelector('.card-title').textContent,
                price: card.querySelector('.fw-bold').textContent,
                image: card.querySelector('img').src,
            };
            addToCart(product);
        });
    });
});
