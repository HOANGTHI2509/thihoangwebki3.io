// Chọn tất cả hình thu nhỏ của sản phẩm
const productThumbs = document.querySelectorAll('.products-thumb img');

// Thêm trình nghe sự kiện vào mỗi hình thu nhỏ
productThumbs.forEach(thumb => {
    thumb.addEventListener('mouseover', () => {
        // Increase size
        thumb.style.transform = 'scale(1.1)';
        thumb.style.transition = 'transform 0.3s ease';
    });

    thumb.addEventListener('mouseout', () => {
        // Return to original size
        thumb.style.transform = 'scale(1)';
    });
});

// Select all product items
const productItems = document.querySelectorAll('.products-item');

// Add event listener to each product item
productItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        // Show product description
        const productName = item.querySelector('.products-name').textContent;
        const productPrice = item.querySelector('.product-price').textContent;
        item.setAttribute('title', `${productName} - ${productPrice}`);
    });
});
