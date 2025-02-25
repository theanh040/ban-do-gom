document.addEventListener("DOMContentLoaded", async () => {
    const categoryId = 2; // Chỉ lấy sản phẩm có category_id = 2 (Ấm chén)

    try {
        console.log(`Gọi API lấy sản phẩm của category_id = ${categoryId}`);

        const response = await fetch(`http://localhost/gomseller/BE/api/get_products.php?category_id=${categoryId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }

        const products = await response.json();

        console.log("Dữ liệu sản phẩm nhận được:", products); // Debug

        if (!products || products.length === 0) {
            document.getElementById("productsGrid").innerHTML = "<p>Không có sản phẩm nào.</p>";
            return;
        }

        renderProducts(products);
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
});


// Hàm hiển thị sản phẩm
function renderProducts(products) {
    const container = document.getElementById("productsGrid");
    container.innerHTML = ""; // Xóa nội dung cũ

    products.forEach((product) => {
        const productHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.product_name}">
                <h3>${product.product_name}</h3>
                <p>${product.description}</p>
                <p>Giá: ${parseInt(product.price).toLocaleString()} VNĐ</p>
                <button onclick="addToCart(${product.product_id})">Thêm vào giỏ</button>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}


// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    // Lấy danh sách sản phẩm từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ, tăng số lượng
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    // Lưu lại vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert("Sản phẩm đã được thêm vào giỏ!");
}

// Ví dụ gọi hàm khi bấm nút "Thêm vào giỏ"
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
        };
        addToCart(product);
    });
});
