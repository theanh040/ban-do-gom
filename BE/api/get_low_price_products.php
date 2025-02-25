<?php
include("../config/db.php");

// Lấy 6 sản phẩm có giá thấp nhất (SALE)
$sqlSale = "SELECT * FROM products ORDER BY price ASC LIMIT 6";
$resultSale = mysqli_query($conn, $sqlSale);
$saleProducts = mysqli_fetch_all($resultSale, MYSQLI_ASSOC);

// Lấy 10 sản phẩm tiếp theo (BÁN CHẠY)
$sqlBestSellers = "SELECT * FROM products ORDER BY price ASC LIMIT 6, 10";
$resultBestSellers = mysqli_query($conn, $sqlBestSellers);
$bestSellers = mysqli_fetch_all($resultBestSellers, MYSQLI_ASSOC);

// ** Hàm xử lý đường dẫn ảnh đúng chuẩn **
function fixImagePath($imagePath) {
    // Nếu không có ảnh, đặt ảnh mặc định
    if (empty($imagePath) || $imagePath == "/gomseller/") {
        return "/gomseller/uploads/default.jpg";
    }

    // Xóa ký tự "image" ở đầu đường dẫn nếu có
    $imagePath = str_replace("image", "", $imagePath);

    // Chuyển dấu "\" thành "/"
    $imagePath = str_replace("\\", "/", $imagePath);

    // Chỉ lấy tên file, không lấy đường dẫn ổ đĩa
    $imagePath = basename($imagePath);

    // Đảm bảo đường dẫn đúng với server
    return "/gomseller/uploads/" . $imagePath;
}

// ** Cập nhật đường dẫn ảnh cho tất cả sản phẩm **
foreach ($saleProducts as &$product) {
    $product['image'] = fixImagePath($product['image']);
}
foreach ($bestSellers as &$product) {
    $product['image'] = fixImagePath($product['image']);
}

// Trả về JSON
echo json_encode(["sale" => $saleProducts, "best_sellers" => $bestSellers]);

$conn->close();
?>
