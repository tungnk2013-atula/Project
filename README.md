# 💻 VDTC Laptop Store

Website bán hàng laptop — giao diện theo phong cách **giaothongso.com.vn (ePass)**: màu đỏ `#ee0033` kết hợp gradient đỏ→cam `#ff7543`, font **Montserrat**.

## 🚀 Chạy website

```bash
# Cách 1 — nếu máy có Node.js:
cd laptop-store
node server.mjs

# Cách 2 — dùng bản Node portable đã tải sẵn trong dự án:
D:\zAI\.tools\node-v22.14.0-win-x64\node.exe server.mjs
```

Mở trình duyệt: **http://localhost:8080**

## 👤 Tài khoản đăng nhập (21 tài khoản từ file Excel + 1 admin)

**Quy tắc mật khẩu mặc định:** `phần-trước-@-của-email` + `@123`

| # | Họ tên | Email | Mật khẩu |
|---|--------|-------|----------|
| 1 | Nguyễn Khánh Tùng | tungnk@viettel.com.vn | tungnk@123 |
| 2 | Đỗ Văn Doanh | doanhdv@viettel.com.vn | doanhdv@123 |
| 3 | Trần Thanh Sơn | tranthanhson220804@gmail.com | tranthanhson220804@123 |
| 4 | Lê Thanh Hoa | hoalt@vdtc.com.vn | hoalt@123 |
| 5 | Nguyễn Văn Quyền | nguyenquyen4820@gmail.com | nguyenquyen4820@123 |
| 6 | Vũ Đình Duy | vdduy2000@gmail.com | vdduy2000@123 |
| 7 | Hoàng Hải Yến | yenhh@vdtc.com.vn | yenhh@123 |
| 8 | Vũ Thị Linh | linhvt@vdtc.com.vn | linhvt@123 |
| 9 | Vi Thị Thu Hà Nhận | nhanvtth@vdtc.com.vn | nhanvtth@123 |
| 10 | Vũ Thanh Hằng | hangvt@vdtc.com.vn | hangvt@123 |
| 11 | Nguyễn Thị An | annt@vdtc.com.vn | annt@123 |
| 12 | Trần Đức Hải | haidt7t@gmail.com | haidt7t@123 |
| 13 | Nguyễn Văn Nam | namnv.230696@gmail.com | namnv.230696@123 |
| 14 | Ngô Trung Kiên | trungkiensp24@gmail.com | trungkiensp24@123 |
| 15 | Trần Xuân Đệ | detx@vdtc.com.vn | detx@123 |
| 16 | Dương Anh Tuấn | tuanduog04@gmail.com | tuanduog04@123 |
| 17 | Cung Tuệ Anh | tueanh171102@gmail.com | tueanh171102@123 |
| 18 | Nguyễn Minh Đức | pandasiunkan@gmail.com | pandasiunkan@123 |
| 19 | Hoàng Kim Anh | anhhk@vdtc.com.vn | anhhk@123 |
| 20 | Vũ Thị Ngọc Mai | tk1cuanam@gmail.com | tk1cuanam@123 |
| 21 | Đỗ Minh Hiếu | hieudo062@gmail.com | hieudo062@123 |

**Admin:** `admin@vdtc.com.vn` / `admin@123` ⭐

> 💡 Ở trang Đăng nhập có dropdown **"Điền nhanh"** — chọn tài khoản là tự điền email + mật khẩu.

## ✨ Tính năng

- **SPA** (Single Page App) — hash router không cần framework
- **15 sản phẩm laptop** thật: Apple, Dell, HP, Lenovo, Asus, Acer, MSI, LG, Gigabyte
- **Trang chủ**: hero + ưu đãi, bán chạy, hàng mới, giảm giá sốc, thống kê
- **Danh sách sản phẩm**: lọc theo hãng, tìm kiếm, sắp xếp (giá/giảm giá/bán chạy)
- **Chi tiết sản phẩm**: thông số kỹ thuật, số lượng, giảm giá %
- **Giỏ hàng**: thêm/xóa/tăng giảm số lượng (lưu localStorage)
- **Đặt hàng**: form thông tin + 3 phương thức thanh toán (COD/Bank/Ví)
- **Tài khoản**: lịch sử đơn hàng, đăng ký tài khoản mới
- **Responsive** cho mobile/tablet, hình laptop vẽ bằng CSS art (không cần ảnh)

## 📁 Cấu trúc

```
laptop-store/
├── index.html      # Khung trang (header, footer, view SPA)
├── css/style.css   # Design system phong cách ePass
├── js/data.js      # 15 sản phẩm + 21 tài khoản seed từ Excel
├── js/app.js       # Router, auth, giỏ hàng, đặt hàng
└── server.mjs      # Server tĩnh (Node.js thuần, 0 dependency)
```
