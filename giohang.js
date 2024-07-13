// Get references to the cart icon, cart element, and close cart button
const cartIcon = document.getElementById('cartIcon');
const cartElement = document.getElementById('cart');
const closeCartButton = document.getElementById('closeCartButton');

// Toggle the cart display when the cart icon is clicked
cartIcon.addEventListener('click', function(event) {
    event.preventDefault();
    cartElement.style.display = cartElement.style.display === 'none' ? 'block' : 'none';
});

// Close the cart when the close cart button is clicked
closeCartButton.addEventListener('click', function() {
    cartElement.style.display = 'none';
});

// Initialize the cart object with items and total properties
const cart = {
    items: [],
    total: 0,
};

// Load the cart data from local storage when the page is loaded
window.addEventListener('load', function() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart.items = savedCart.items;
        cart.total = savedCart.total;
        updateCartDisplay();
    }
});

// Get references to all the "Add to Cart" buttons on the page
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Add a click event listener to each "Add to Cart" button
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Function to add a product to the cart
function addToCart(event) {
    event.preventDefault();

    // Extract product information from the clicked button's dataset
    const productId = event.target.dataset.productId;
    const productName = event.target.dataset.productName;
    const productPrice = parseFloat(event.target.dataset.productPrice);
    const productImage = event.target.dataset.productImage;

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.id === productId);

    // If the product is already in the cart, increase its quantity; otherwise, add it to the cart
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    // Update the cart display
    updateCartDisplay();
}

// Function to update the cart display and save the cart data to local storage
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    cart.items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            ${item.name} - Size:
            <select class="size-select" data-product-id="${item.id}">
                <option value="M" ${item.size === 'M' ? 'selected' : ''}>M</option>
                <option value="L" ${item.size === 'L' ? 'selected' : ''}>L</option>
                <option value="XL" ${item.size === 'XL' ? 'selected' : ''}>XL</option>
            </select>
            - $${item.price} x
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-product-id="${item.id}">
            <button class="remove-from-cart-btn" data-product-id="${item.id}" data-product-size="${item.size}">Xóa</button>
        `;
        cartItemsElement.appendChild(li);

        // Add an event listener to the quantity input field
        const quantityInput = li.querySelector('.quantity-input');
        quantityInput.addEventListener('input', function() {
            updateQuantity(item.id, parseInt(quantityInput.value));
        });

        // Add an event listener to the "Remove" button
        const removeButton = li.querySelector('.remove-from-cart-btn');
        removeButton.addEventListener('click', function() {
            removeFromCart(item.id, item.size);
        });
    });

    cart.total = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Total: $${cart.total}`;

    // Add an event listener to the "Thanh Toán" button
    const checkoutButton = document.getElementById('checkout-button');
    const successMessage = document.createElement('p');
    successMessage.id = 'success-message';
    successMessage.style.display = 'none';
    checkoutButton.parentNode.insertBefore(successMessage, checkoutButton.nextSibling);

    checkoutButton.addEventListener('click', function() {
        // Disable the button to prevent multiple clicks
        checkoutButton.disabled = true;

        // Display the success message and redirect to the homepage
        successMessage.textContent = 'Thanh toán thành công!';
        successMessage.style.display = 'block';
        setTimeout(function() {
            window.location.href = 'home.html';
        }, 2000); // Redirect after 2 seconds (adjust the delay as needed)

        // Clear the cart data from local storage
        localStorage.removeItem('cart');
    });

    // Save the cart data to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateQuantity(productId, quantity) {
    const item = cart.items.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        updateCartDisplay();
    }
}

// Function to remove a product from the cart and save the cart data to local storage
function removeFromCart(productId, productSize) {
    const index = cart.items.findIndex(item => item.id === productId && item.size === productSize);
    if (index !== -1) {
        cart.items.splice(index, 1);
        updateCartDisplay();
    }
}
