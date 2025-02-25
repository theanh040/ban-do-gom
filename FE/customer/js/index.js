let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 4500);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost/gomseller/BE/api/get_low_price_products.php");
        const products = await response.json();

        // Kiểm tra API trả về đúng dữ liệu
        if (!products.sale || !products.best_sellers) {
            console.error("Lỗi: API không trả về dữ liệu đúng");
            return;
        }

        // Hiển thị sản phẩm vào hai section
        renderProducts(products.sale, "productGrid", true);
        renderProducts(products.best_sellers, "productGrids", false);
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
});

// Hàm hiển thị sản phẩm
function renderProducts(products, containerId, isSale = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Xóa nội dung cũ trước khi render

    products.forEach((product) => {
        const productHTML = `
            <div class="product-item">
                ${isSale ? `<p class="sale">Sale</p>` : ""}
                <img src="${product.image}" alt="${product.product_name}" class="product-image">
                <h3 class="product-name">${product.product_name}</h3>
                <p class="product-price">${parseInt(product.price).toLocaleString()} VND</p>
                <button class="buy-btn">Thêm vào giỏ</button>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}
