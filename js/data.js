/* ============================================================
   VDTC LAPTOP — Dữ liệu sản phẩm & tài khoản
   Tài khoản được seed từ file "Thông tin tài khoản xin cấp
   lưu lượng VDTC - VAI.xlsx" (21 tài khoản)
   ============================================================ */

const PRODUCTS = [
  {
    id: 1, brand: "Apple", name: "MacBook Air M3 13\"",
    price: 27990000, oldPrice: 30990000,
    cpu: "Apple M3 8 lõi", ram: "8GB Unified", storage: "256GB SSD",
    screen: "13.6\" Liquid Retina", gpu: "GPU 8 lõi tích hợp",
    weight: "1.24 kg", battery: "18 giờ",
    badge: "hot", stock: 15, rating: 4.9, sold: 320,
    tags: ["mỏng nhẹ", "văn phòng", "sinh viên"],
    desc: "MacBook Air M3 mỏng nhẹ với hiệu năng ấn tượng, pin 18 giờ, hoàn hảo cho công việc và học tập hàng ngày.",
    art: ["#1d1d1f", "#3a3a3c"], accent: "#ee0033"
  },
  {
    id: 2, brand: "Apple", name: "MacBook Pro 14 M3 Pro",
    price: 52990000, oldPrice: 56990000,
    cpu: "Apple M3 Pro 11 lõi", ram: "18GB Unified", storage: "512GB SSD",
    screen: "14.2\" Liquid Retina XDR", gpu: "GPU 14 lõi",
    weight: "1.61 kg", battery: "17 giờ",
    badge: "new", stock: 8, rating: 5.0, sold: 96,
    tags: ["đồ họa", "lập trình", "cao cấp"],
    desc: "Sức mạnh M3 Pro cho dựng video, thiết kế 3D và lập trình chuyên nghiệp. Màn hình XDR tuyệt đẹp.",
    art: ["#1d1d1f", "#4a4a4e"], accent: "#ff7543"
  },
  {
    id: 3, brand: "Dell", name: "XPS 13 Plus 9320",
    price: 34990000, oldPrice: 39990000,
    cpu: "Intel Core i7-1360P", ram: "16GB LPDDR5", storage: "512GB SSD",
    screen: "13.4\" OLED 3.5K", gpu: "Intel Iris Xe",
    weight: "1.24 kg", battery: "12 giờ",
    badge: "sale", stock: 10, rating: 4.7, sold: 143,
    tags: ["mỏng nhẹ", "cao cấp", "văn phòng"],
    desc: "Thiết kế không viền đột phá, màn OLED 3.5K sống động — chiếc ultrabook sang trọng bậc nhất của Dell.",
    art: ["#0f3a71", "#1b6ec2"], accent: "#0076ce"
  },
  {
    id: 4, brand: "Dell", name: "Inspiron 15 3520",
    price: 14990000, oldPrice: 17990000,
    cpu: "Intel Core i5-1235U", ram: "8GB DDR4", storage: "512GB SSD",
    screen: "15.6\" FHD 120Hz", gpu: "Intel UHD Graphics",
    weight: "1.85 kg", battery: "8 giờ",
    badge: "sale", stock: 25, rating: 4.4, sold: 510,
    tags: ["văn phòng", "sinh viên", "giá rẻ"],
    desc: "Laptop quốc dân cho sinh viên và dân văn phòng: cấu hình ổn định, giá hợp lý, màn 120Hz mượt mà.",
    art: ["#103a71", "#3d6fb5"], accent: "#0076ce"
  },
  {
    id: 5, brand: "HP", name: "Pavilion 15 EG2039TU",
    price: 16990000, oldPrice: 19490000,
    cpu: "Intel Core i5-1235U", ram: "16GB DDR4", storage: "512GB SSD",
    screen: "15.6\" FHD IPS", gpu: "Intel Iris Xe",
    weight: "1.75 kg", battery: "9 giờ",
    badge: "", stock: 18, rating: 4.5, sold: 287,
    tags: ["văn phòng", "sinh viên"],
    desc: "RAM 16GB thoải mái đa nhiệm, thiết kế trẻ trung — lựa chọn cân bằng giữa giá và hiệu năng.",
    art: ["#0d5eaf", "#3f8fd6"], accent: "#0096d6"
  },
  {
    id: 6, brand: "HP", name: "Envy x360 14 2-in-1",
    price: 26990000, oldPrice: 29990000,
    cpu: "Intel Core i7-1355U", ram: "16GB LPDDR5", storage: "1TB SSD",
    screen: "14\" WUXGA cảm ứng", gpu: "Intel Iris Xe",
    weight: "1.39 kg", battery: "13 giờ",
    badge: "new", stock: 12, rating: 4.6, sold: 88,
    tags: ["2-trong-1", "mỏng nhẹ", "văn phòng"],
    desc: "Máy tính bảng + laptop trong một: xoay 360°, màn cảm ứng, bút Digital Pen hỗ trợ ghi chú.",
    art: ["#1a1a2e", "#4a4e7c"], accent: "#0096d6"
  },
  {
    id: 7, brand: "Lenovo", name: "ThinkPad E14 Gen 5",
    price: 21990000, oldPrice: 24990000,
    cpu: "Intel Core i5-1335U", ram: "16GB DDR4", storage: "512GB SSD",
    screen: "14\" WUXGA IPS", gpu: "Intel Iris Xe",
    weight: "1.61 kg", battery: "12 giờ",
    badge: "", stock: 20, rating: 4.7, sold: 231,
    tags: ["văn phòng", "bền bỉ", "kinh doanh"],
    desc: "Bàn phím ThinkPad huyền thoại, đạt chuẩn quân sự MIL-STD — người bạn đồng hành kinh doanh tin cậy.",
    art: ["#22252a", "#454a52"], accent: "#e2231a"
  },
  {
    id: 8, brand: "Lenovo", name: "Legion 5 Pro RTX 4060",
    price: 41990000, oldPrice: 45990000,
    cpu: "AMD Ryzen 7 7745HX", ram: "16GB DDR5", storage: "1TB SSD",
    screen: "16\" WQXGA 165Hz", gpu: "NVIDIA RTX 4060 8GB",
    weight: "2.55 kg", battery: "6 giờ",
    badge: "hot", stock: 9, rating: 4.8, sold: 175,
    tags: ["gaming", "đồ họa"],
    desc: "Quái vật gaming: RTX 4060, màn 165Hz QHD, tản nhiệt ColdFront — chiến mọi tựa game AAA.",
    art: ["#1c2530", "#37475c"], accent: "#ff0033"
  },
  {
    id: 9, brand: "Asus", name: "Vivobook 15 A1502VA",
    price: 17990000, oldPrice: 19990000,
    cpu: "Intel Core i5-13500H", ram: "8GB DDR4", storage: "512GB SSD",
    screen: "15.6\" FHD 60Hz", gpu: "Intel Iris Xe",
    weight: "1.70 kg", battery: "9 giờ",
    badge: "", stock: 30, rating: 4.5, sold: 402,
    tags: ["văn phòng", "sinh viên", "giá rẻ"],
    desc: "CPU H-series hiệu năng cao trong phân khúc giá tốt, thiết kế mỏng 1.79cm hiện đại.",
    art: ["#2c3e50", "#5d6d7e"], accent: "#00539b"
  },
  {
    id: 10, brand: "Asus", name: "ROG Strix G16 G614",
    price: 49990000, oldPrice: 54990000,
    cpu: "Intel Core i9-13980HX", ram: "16GB DDR5", storage: "1TB SSD",
    screen: "16\" FHD+ 165Hz", gpu: "NVIDIA RTX 4070 8GB",
    weight: "2.50 kg", battery: "6 giờ",
    badge: "hot", stock: 6, rating: 4.9, sold: 121,
    tags: ["gaming", "đồ họa", "cao cấp"],
    desc: "i9 thế hệ 13 + RTX 4070: hiệu năng đỉnh cho gaming 165Hz và render video 4K chuyên nghiệp.",
    art: ["#1a1a2e", "#e94560"], accent: "#ff0026"
  },
  {
    id: 11, brand: "Acer", name: "Aspire 5 Spin 14",
    price: 18990000, oldPrice: 21990000,
    cpu: "Intel Core i5-1335U", ram: "16GB LPDDR5", storage: "512GB SSD",
    screen: "14\" WUXGA cảm ứng", gpu: "Intel Iris Xe",
    weight: "1.50 kg", battery: "10 giờ",
    badge: "sale", stock: 14, rating: 4.3, sold: 96,
    tags: ["2-trong-1", "văn phòng", "sinh viên"],
    desc: "Convertible giá tốt: xoay 360°, màn cảm ứng, RAM 16GB — linh hoạt cho học tập và làm việc.",
    art: ["#14425c", "#2a7f9e"], accent: "#83b81a"
  },
  {
    id: 12, brand: "MSI", name: "Modern 14 C13M",
    price: 13990000, oldPrice: 15990000,
    cpu: "Intel Core i5-1335U", ram: "16GB DDR4", storage: "512GB SSD",
    screen: "14\" FHD IPS", gpu: "Intel Iris Xe",
    weight: "1.40 kg", battery: "11 giờ",
    badge: "sale", stock: 22, rating: 4.4, sold: 189,
    tags: ["mỏng nhẹ", "văn phòng", "giá rẻ"],
    desc: "Nhỏ gọn 1.4kg, pin 11 giờ, RAM 16GB — máy tính xách tay đi làm, đi học cực kỳ tiện lợi.",
    art: ["#2f3640", "#535c68"], accent: "#e60000"
  },
  {
    id: 13, brand: "LG", name: "Gram 14 2024",
    price: 28990000, oldPrice: 32990000,
    cpu: "Intel Core i7-1360P", ram: "16GB LPDDR5", storage: "512GB SSD",
    screen: "14\" WUXGA IPS", gpu: "Intel Iris Xe",
    weight: "0.99 kg", battery: "15 giờ",
    badge: "new", stock: 11, rating: 4.7, sold: 64,
    tags: ["mỏng nhẹ", "cao cấp", "kinh doanh"],
    desc: "Kỷ lục nhẹ chưa đến 1kg nhưng bền chuẩn MIL-STD, pin 15 giờ — vua di chuyển của dân công tác.",
    art: ["#d8dde6", "#aab3c2"], accent: "#a50034"
  },
  {
    id: 14, brand: "Gigabyte", name: "Aero 14 OLED RTX 4050",
    price: 35990000, oldPrice: 39990000,
    cpu: "Intel Core i7-13700H", ram: "16GB DDR5", storage: "1TB SSD",
    screen: "14\" 2.8K OLED 90Hz", gpu: "NVIDIA RTX 4050 6GB",
    weight: "1.80 kg", battery: "8 giờ",
    badge: "", stock: 7, rating: 4.6, sold: 52,
    tags: ["đồ họa", "lập trình", "mỏng nhẹ"],
    desc: "Creator laptop: màn OLED 2.8K chuẩn màu 100% DCI-P3, RTX 4050 cho Photoshop, Premiere, AI.",
    art: ["#1f2833", "#45a29e"], accent: "#ff4655"
  },
  {
    id: 15, brand: "Acer", name: "Swift Go 14 OLED",
    price: 22990000, oldPrice: 25990000,
    cpu: "Intel Core i5-13500H", ram: "16GB LPDDR5", storage: "512GB SSD",
    screen: "14\" 2.8K OLED 90Hz", gpu: "Intel Iris Xe",
    weight: "1.25 kg", battery: "12 giờ",
    badge: "new", stock: 16, rating: 4.6, sold: 118,
    tags: ["mỏng nhẹ", "văn phòng", "sinh viên"],
    desc: "Màn OLED 2.8K 90Hz trong thân máy 1.25kg — trải nghiệm hình ảnh đỉnh cao cho dân văn phòng.",
    art: ["#3a4a5c", "#6a7f9e"], accent: "#83b81a"
  }
];

/* ------------------------------------------------------------
   TÀI KHOẢN ĐƯỢC SEED TỪ FILE EXCEL
   "Thông tin tài khoản xin cấp lưu lượng VDTC - VAI.xlsx"
   Mật khẩu mặc định: [phần trước @ của email] + "@123"
   ------------------------------------------------------------ */
const SEED_USERS = [
  { stt: 1,  name: "Nguyễn Khánh Tùng",  email: "tungnk@viettel.com.vn" },
  { stt: 2,  name: "Đỗ Văn Doanh",       email: "doanhdv@viettel.com.vn" },
  { stt: 3,  name: "Trần Thanh Sơn",     email: "tranthanhson220804@gmail.com" },
  { stt: 4,  name: "Lê Thanh Hoa",       email: "hoalt@vdtc.com.vn" },
  { stt: 5,  name: "Nguyễn Văn Quyền",   email: "nguyenquyen4820@gmail.com" },
  { stt: 6,  name: "Vũ Đình Duy",        email: "vdduy2000@gmail.com" },
  { stt: 7,  name: "Hoàng Hải Yến",      email: "yenhh@vdtc.com.vn" },
  { stt: 8,  name: "Vũ Thị Linh",        email: "linhvt@vdtc.com.vn" },
  { stt: 9,  name: "Vi Thị Thu Hà Nhận", email: "nhanvtth@vdtc.com.vn" },
  { stt: 10, name: "Vũ Thanh Hằng",      email: "hangvt@vdtc.com.vn" },
  { stt: 11, name: "Nguyễn Thị An",      email: "annt@vdtc.com.vn" },
  { stt: 12, name: "Trần Đức Hải",       email: "haidt7t@gmail.com" },
  { stt: 13, name: "Nguyễn Văn Nam",     email: "namnv.230696@gmail.com" },
  { stt: 14, name: "Ngô Trung Kiên",     email: "trungkiensp24@gmail.com" },
  { stt: 15, name: "Trần Xuân Đệ",       email: "detx@vdtc.com.vn" },
  { stt: 16, name: "Dương Anh Tuấn",     email: "tuanduog04@gmail.com" },
  { stt: 17, name: "Cung Tuệ Anh",       email: "tueanh171102@gmail.com" },
  { stt: 18, name: "Nguyễn Minh Đức",    email: "pandasiunkan@gmail.com" },
  { stt: 19, name: "Hoàng Kim Anh",      email: "anhhk@vdtc.com.vn" },
  { stt: 20, name: "Vũ Thị Ngọc Mai",    email: "tk1cuanam@gmail.com" },
  { stt: 21, name: "Đỗ Minh Hiếu",       email: "hieudo062@gmail.com" }
];

// Tài khoản quản trị (thêm ngoài danh sách Excel)
const ADMIN_USER = { name: "Quản trị viên", email: "admin@vdtc.com.vn", role: "admin" };

// Quy tắc sinh mật khẩu mặc định từ email
function defaultPassword(email) {
  return email.split("@")[0].toLowerCase() + "@123";
}
