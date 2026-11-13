/* ============================================================
   VDTC LAPTOP — SPA core
   Hash router + Auth (21 tài khoản seed từ Excel) + Cart + Orders
   ============================================================ */

/* ---------------- Tiện ích ---------------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const fmtMoney = n => n.toLocaleString("vi-VN") + "₫";
const fmtDate = ts => new Date(ts).toLocaleString("vi-VN", { hour12: false });

function toast(msg, type = "") {
  const t = $("#toast");
  t.textContent = msg;
  t.className = "toast show " + type;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.className = "toast", 2600);
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------------- Laptop CSS art (không cần ảnh) ---------------- */
function laptopArt(p, sm = false) {
  return `
  <div class="laptop-art ${sm ? "sm" : ""}" style="--c1:${p.art[0]};--c2:${p.art[1]}">
    <div class="la-screen">
      <div class="la-inner">
        <div>
          <span>${esc(p.brand.toUpperCase())}</span>
          <small>${esc(p.cpu.split(" ").slice(0, 3).join(" "))}</small>
        </div>
      </div>
    </div>
    <div class="la-base"></div>
  </div>`;
}

/* ---------------- Store (localStorage) ---------------- */
const DB = {
  get users() {
    let u = JSON.parse(localStorage.getItem("lt_users") || "null");
    if (!u) {
      u = SEED_USERS.map(s => ({
        stt: s.stt, name: s.name.trim(), email: s.email,
        pass: defaultPassword(s.email), role: "user"
      }));
      u.push({ ...ADMIN_USER, stt: 0, pass: defaultPassword(ADMIN_USER.email) });
      localStorage.setItem("lt_users", JSON.stringify(u));
    }
    return u;
  },
  set users(v) { localStorage.setItem("lt_users", JSON.stringify(v)); },
  get session() { return JSON.parse(localStorage.getItem("lt_session") || "null"); },
  set session(v) { v ? localStorage.setItem("lt_session", JSON.stringify(v))
                     : localStorage.removeItem("lt_session"); },
  get cart() { return JSON.parse(localStorage.getItem("lt_cart") || "[]"); },
  set cart(v) { localStorage.setItem("lt_cart", JSON.stringify(v)); },
  ordersOf(email) {
    const all = JSON.parse(localStorage.getItem("lt_orders") || "{}");
    return all[email] || [];
  },
  ordersAll() {
    const all = JSON.parse(localStorage.getItem("lt_orders") || "{}");
    return Object.entries(all).flatMap(([email, orders]) =>
      orders.map(o => ({ ...o, email })));
  },
  saveOrder(email, order) {
    const all = JSON.parse(localStorage.getItem("lt_orders") || "{}");
    (all[email] = all[email] || []).unshift(order);
    localStorage.setItem("lt_orders", JSON.stringify(all));
  }
};

/* ---------------- Auth helpers ---------------- */
function currentUser() { return DB.session; }

function renderAuthArea() {
  const u = currentUser();
  const area = $("#authArea");
  if (u) {
    const initials = u.name.split(" ").slice(-1)[0].slice(0, 2).toUpperCase();
    area.innerHTML = `
      <a href="#/account" class="nav-btn" title="${esc(u.name)}">
        <span class="nav-ico" style="background:var(--grad);color:#fff;border-radius:50%;width:24px;height:24px;display:grid;place-items:center;font-size:11px;font-weight:800">${esc(initials)}</span>
        <span class="nav-label">${esc(u.name.split(" ").slice(-1)[0])}</span>
      </a>
      ${u.role === "admin" ? `<a href="#/admin" class="nav-btn" title="Trang quản trị">
        <span class="nav-ico">🛡️</span><span class="nav-label">Admin</span></a>` : ""}`;
  } else {
    area.innerHTML = `<a href="#/login" class="btn-user"><span class="avatar">👤</span> Đăng nhập</a>`;
  }
}

function updateCartBadge() {
  const n = DB.cart.reduce((s, i) => s + i.qty, 0);
  $("#cartBadge").textContent = n;
}

/* ---------------- Cart actions ---------------- */
function addToCart(id, qty = 1) {
  const cart = DB.cart;
  const found = cart.find(i => i.id === id);
  if (found) found.qty += qty; else cart.push({ id, qty });
  DB.cart = cart;
  updateCartBadge();
  const p = PRODUCTS.find(x => x.id === id);
  toast(`🛒 Đã thêm "${p.name}" vào giỏ hàng`, "ok");
}

/* ---------------- Views: trang chủ ---------------- */
function viewHome(filteredList) {
  const hot = PRODUCTS.filter(p => p.badge === "hot").slice(0, 4);
  const news = PRODUCTS.filter(p => p.badge === "new").slice(0, 4);
  const sale = [...PRODUCTS].sort((a, b) =>
    (b.oldPrice - b.price) - (a.oldPrice - a.price)).slice(0, 4);

  return `
  <section class="hero">
    <div class="hero-copy">
      <span class="hero-eyebrow">🔥 SALE CUỐI NĂM — GIẢM ĐẾN 30%</span>
      <h1>Laptop chính hãng, <span>giá tốt</span> mỗi ngày</h1>
      <p>MacBook, Dell, HP, Lenovo, MSI... đầy đủ cấu hình từ văn phòng đến gaming.
         Bảo hành 24 tháng, giao hàng toàn quốc trong 2 giờ.</p>
      <div class="hero-cta">
        <a href="#/products" class="btn btn-primary">Mua ngay →</a>
        <a href="#/products?sort=discount" class="btn btn-outline">Khuyến mãi hot</a>
      </div>
    </div>
    <div class="hero-art">${laptopArt({ brand: "VDTC", cpu: "Apple M3 Pro 11", art: ["rgba(255,255,255,.22)", "rgba(255,255,255,.08)"] })}</div>
  </section>

  <div class="features">
    <div class="feature"><span class="feature-ico">✅</span><div><b>100% chính hãng</b><span>Bảo hành 24 tháng</span></div></div>
    <div class="feature"><span class="feature-ico">🚚</span><div><b>Giao 2 giờ</b><span>Nội thành Hà Nội & SG</span></div></div>
    <div class="feature"><span class="feature-ico">💳</span><div><b>Trả góp 0%</b><span>Duyệt hồ sơ online</span></div></div>
    <div class="feature"><span class="feature-ico">🔄</span><div><b>Đổi trả 30 ngày</b><span>Lỗi là đổi mới</span></div></div>
  </div>

  <section class="section">
    <div class="section-head">
      <h2 class="section-title">Bán chạy nhất 🔥</h2>
      <a href="#/products" class="section-more">Xem thêm →</a>
    </div>
    <div class="grid">${hot.map(cardHTML).join("")}</div>
  </section>

  <section class="section">
    <div class="section-head">
      <h2 class="section-title">Hàng mới về ✨</h2>
      <a href="#/products" class="section-more">Xem thêm →</a>
    </div>
    <div class="grid">${news.map(cardHTML).join("")}</div>
  </section>

  <div class="stats-band">
    <div><div class="num">15+</div><div class="lbl">Mẫu laptop mới nhất</div></div>
    <div><div class="num">21</div><div class="lbl">Thành viên đã đăng ký</div></div>
    <div><div class="num">2h</div><div class="lbl">Giao hàng nội thành</div></div>
    <div><div class="num">24/7</div><div class="lbl">Hỗ trợ khách hàng</div></div>
  </div>

  <section class="section">
    <div class="section-head">
      <h2 class="section-title">Giảm giá sốc 💰</h2>
      <a href="#/products?sort=discount" class="section-more">Xem thêm →</a>
    </div>
    <div class="grid">${sale.map(cardHTML).join("")}</div>
  </section>`;
}

function cardHTML(p) {
  const disc = Math.round((1 - p.price / p.oldPrice) * 100);
  return `
  <article class="card">
    ${p.badge ? `<span class="badge ${p.badge}">${p.badge === "hot" ? "🔥 Hot" : p.badge === "new" ? "Mới" : "-" + disc + "%"}</span>` : ""}
    <div class="card-banner">${laptopArt(p, true)}</div>
    <div class="card-body">
      <span class="card-cate">${esc(p.brand)}</span>
      <a href="#/product/${p.id}" class="card-name">${esc(p.name)}</a>
      <div class="card-specs">
        <span>⚙️ ${esc(p.cpu)}</span>
        <span>🧠 ${esc(p.ram)} · 💾 ${esc(p.storage)}</span>
      </div>
      <div class="price-row">
        <span class="price">${fmtMoney(p.price)}</span>
        <span class="old-price">${fmtMoney(p.oldPrice)}</span>
      </div>
    </div>
    <div class="card-foot">
      <span class="rating"><span class="stars">★★★★★</span> ${p.rating} <span class="sold">· ${p.sold} đã bán</span></span>
      <button class="btn-add" onclick="addToCart(${p.id})">+ Giỏ</button>
    </div>
  </article>`;
}

/* ---------------- Views: danh sách sản phẩm ---------------- */
function viewProducts(params) {
  let list = [...PRODUCTS];
  const { brand, q, sort, tag } = params;

  if (brand) list = list.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
  if (tag) list = list.filter(p => p.tags.includes(tag));
  if (q) {
    const kw = q.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(kw) || p.brand.toLowerCase().includes(kw) ||
      p.cpu.toLowerCase().includes(kw) || p.tags.join(" ").includes(kw));
  }
  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
  if (sort === "discount") list.sort((a, b) => (b.oldPrice - b.price) - (a.oldPrice - a.price));
  if (sort === "sold") list.sort((a, b) => b.sold - a.sold);

  const keep = k => params[k] ? `${k}=${encodeURIComponent(params[k])}` : null;
  const qs = ["brand", "q", "tag"].map(keep).filter(Boolean).join("&");
  const curSort = sort || "";

  return `
  <div class="toolbar">
    <select onchange="location.hash = '#/products${qs ? "?" + qs + "&" : "?"}sort=' + this.value">
      <option value="" ${curSort === "" ? "selected" : ""}>Sắp xếp: Mặc định</option>
      <option value="price-asc" ${curSort === "price-asc" ? "selected" : ""}>Giá tăng dần</option>
      <option value="price-desc" ${curSort === "price-desc" ? "selected" : ""}>Giá giảm dần</option>
      <option value="discount" ${curSort === "discount" ? "selected" : ""}>Giảm giá nhiều nhất</option>
      <option value="sold" ${curSort === "sold" ? "selected" : ""}>Bán chạy nhất</option>
    </select>
    <span class="chip ${!brand ? "on" : ""}" onclick="location.hash='#/products'">Tất cả</span>
    ${[...new Set(PRODUCTS.map(p => p.brand))].map(b =>
      `<span class="chip ${brand === b ? "on" : ""}" onclick="location.hash='#/products?brand=${encodeURIComponent(b)}${curSort ? "&sort=" + curSort : ""}'">${b}</span>`).join("")}
    <span class="result-info">Tìm thấy <b>${list.length}</b> sản phẩm${q ? ` cho "<b>${esc(q)}</b>"` : ""}</span>
  </div>
  ${list.length ? `<div class="grid">${list.map(cardHTML).join("")}</div>`
                : `<div class="empty"><div class="big">🔎</div><h3>Không tìm thấy sản phẩm</h3><p>Thử từ khoá khác hoặc xem tất cả sản phẩm.</p><a href="#/products" class="btn btn-grad">Xem tất cả</a></div>`}`;
}

/* ---------------- Views: chi tiết sản phẩm ---------------- */
function viewProduct(id) {
  const p = PRODUCTS.find(x => x.id === +id);
  if (!p) return viewNotFound();
  const disc = Math.round((1 - p.price / p.oldPrice) * 100);
  return `
  <nav style="margin-top:18px;font-size:13px;color:var(--gray)">
    <a href="#/">Trang chủ</a> / <a href="#/products">Laptop</a> /
    <a href="#/products?brand=${encodeURIComponent(p.brand)}">${esc(p.brand)}</a> / <b style="color:var(--ink)">${esc(p.name)}</b>
  </nav>
  <div class="detail">
    <div class="detail-art">${laptopArt(p)}</div>
    <div>
      <span class="detail-brand">${esc(p.brand)} · Mã SP: LT-${String(p.id).padStart(3, "0")}</span>
      <h2>${esc(p.name)}</h2>
      <div class="rating"><span class="stars" style="color:var(--orange-bright)">★★★★★</span> ${p.rating} · ${p.sold} đã bán · Tình trạng: <b style="color:#409206">Còn ${p.stock} máy</b></div>
      <div class="detail-price">${fmtMoney(p.price)} <span class="detail-old">${fmtMoney(p.oldPrice)}</span></div>
      <span class="detail-save">🔥 Tiết kiệm ${fmtMoney(p.oldPrice - p.price)} (-${disc}%)</span>
      <div class="tag-row">${p.tags.map(t => `<span class="tag">#${esc(t)}</span>`).join("")}</div>
      <table class="spec-table">
        <tr><td>CPU</td><td><b>${esc(p.cpu)}</b></td></tr>
        <tr><td>RAM</td><td>${esc(p.ram)}</td></tr>
        <tr><td>Ổ cứng</td><td>${esc(p.storage)}</td></td></tr>
        <tr><td>Màn hình</td><td>${esc(p.screen)}</td></tr>
        <tr><td>Card đồ hoạ</td><td>${esc(p.gpu)}</td></td></tr>
        <tr><td>Trọng lượng</td><td>${esc(p.weight)}</td></tr>
        <tr><td>Pin</td><td>${esc(p.battery)}</td></tr>
      </table>
      <p style="font-size:14px;color:var(--ink-soft)">${esc(p.desc)}</p>
      <div class="qty-row">
        <span style="font-size:13.5px;font-weight:700">Số lượng:</span>
        <div class="qty-box">
          <button onclick="stepQty(-1)">−</button>
          <input id="qtyInput" type="number" value="1" min="1" max="${p.stock}">
          <button onclick="stepQty(1)">+</button>
        </div>
      </div>
      <div class="detail-cta">
        <button class="btn btn-grad" onclick="addToCart(${p.id}, +document.getElementById('qtyInput').value || 1); location.hash='#/cart'">🛒 Mua ngay</button>
        <button class="btn btn-dark" onclick="addToCart(${p.id}, +document.getElementById('qtyInput').value || 1)">+ Thêm vào giỏ</button>
      </div>
      <p class="stock-note">✓ Bảo hành 24 tháng · ✓ Trả góp 0% · ✓ Giao hàng miễn nội thành</p>
    </div>
  </div>`;
}

function stepQty(d) {
  const inp = $("#qtyInput");
  const max = +inp.max || 99;
  inp.value = Math.min(max, Math.max(1, (+inp.value || 1) + d));
}

/* ---------------- Views: giỏ hàng ---------------- */
function viewCart() {
  const cart = DB.cart;
  if (!cart.length) return `
    <div class="empty">
      <div class="big">🛒</div>
      <h3>Giỏ hàng trống trơn!</h3>
      <p>Cùng khám phá các mẫu laptop đang giảm giá nhé.</p>
      <a href="#/products" class="btn btn-grad">Mua sắm ngay</a>
    </div>`;

  const rows = cart.map(i => {
    const p = PRODUCTS.find(x => x.id === i.id);
    return `
    <div class="cart-row">
      <div class="cart-thumb">${laptopArt(p, true)}</div>
      <div><a href="#/product/${p.id}" class="cart-name">${esc(p.name)}</a></div>
      <div class="cart-price col-price-cell">${fmtMoney(p.price)}</div>
      <div class="col-qty"><div class="qty-box" style="transform:scale(.9)">
        <button onclick="setQty(${p.id}, ${i.qty - 1})">−</button>
        <input value="${i.qty}" readonly style="width:34px">
        <button onclick="setQty(${p.id}, ${i.qty + 1})">+</button>
      </div></div>
      <div class="cart-price col-sum">${fmtMoney(p.price * i.qty)}</div>
      <button class="cart-remove" onclick="setQty(${p.id}, 0)" title="Xoá">✕</button>
    </div>`;
  }).join("");

  const total = cart.reduce((s, i) => s + PRODUCTS.find(x => x.id === i.id).price * i.qty, 0);
  const old = cart.reduce((s, i) => s + PRODUCTS.find(x => x.id === i.id).oldPrice * i.qty, 0);

  return `
  <div class="cart-layout page-cart">
    <div class="cart-table">
      <div class="cart-row head">
        <span>Sản phẩm</span><span>Tên</span><span class="col-price-cell">Đơn giá</span>
        <span class="col-qty">SL</span><span class="col-sum">Thành tiền</span><span></span>
      </div>
      ${rows}
    </div>
    <aside class="cart-summary">
      <h3>🧾 Tóm tắt đơn hàng</h3>
      <div class="sum-row"><span>Tạm tính</span><span>${fmtMoney(old)}</span></div>
      <div class="sum-row"><span>Giảm giá</span><span style="color:var(--red);font-weight:700">−${fmtMoney(old - total)}</span></div>
      <div class="sum-row"><span>Phí vận chuyển</span><span>Miễn phí</span></div>
      <div class="sum-row total"><span>TỔNG CỘNG</span><b>${fmtMoney(total)}</b></div>
      <a href="#/checkout" class="btn btn-grad" style="width:100%;margin-top:16px">Thanh toán →</a>
    </aside>
  </div>`;
}

function setQty(id, qty) {
  let cart = DB.cart;
  if (qty <= 0) cart = cart.filter(i => i.id !== id);
  else {
    const it = cart.find(i => i.id === id);
    if (it) it.qty = Math.min(9, qty);
  }
  DB.cart = cart;
  updateCartBadge();
  render();
}

/* ---------------- Views: đăng nhập / đăng ký ---------------- */
function viewLogin() {
  return `
  <div class="auth-wrap">
    <div class="auth-card">
      <h2>👋 Đăng nhập</h2>
      <p class="auth-sub">Dùng email được cấp theo danh sách VDTC - VAI</p>
      <div class="quick-fill">
        <p>⚡ Điền nhanh từ danh sách (${SEED_USERS.length} tài khoản):</p>
        <select onchange="if(this.value){document.getElementById('loginEmail').value=this.value;document.getElementById('loginPass').value=this.getAttribute('data-pw')}">
          <option value="">— Chọn tài khoản —</option>
          ${SEED_USERS.map(u =>
            `<option value="${esc(u.email)}" data-pw="${esc(defaultPassword(u.email))}">${u.stt}. ${esc(u.name)} — ${esc(u.email)}</option>`).join("")}
        </select>
      </div>
      <form onsubmit="doLogin(event)">
        <div class="field">
          <label>Email</label>
          <input id="loginEmail" type="email" required placeholder="ban@vdtc.com.vn">
        </div>
        <div class="field">
          <label>Mật khẩu</label>
          <input id="loginPass" type="password" required placeholder="••••••••">
        </div>
        <button class="btn btn-grad" style="width:100%">Đăng nhập</button>
      </form>
      <p class="auth-switch">Chưa có tài khoản? <a href="#/register">Đăng ký ngay</a></p>
    </div>
  </div>`;
}

function viewRegister() {
  return `
  <div class="auth-wrap">
    <div class="auth-card">
      <h2>✨ Đăng ký tài khoản</h2>
      <p class="auth-sub">Tạo tài khoản mới để mua sắm và theo dõi đơn hàng</p>
      <form onsubmit="doRegister(event)">
        <div class="field">
          <label>Họ và tên</label>
          <input id="regName" type="text" required placeholder="Nguyễn Văn A">
        </div>
        <div class="field">
          <label>Email</label>
          <input id="regEmail" type="email" required placeholder="ban@email.com">
        </div>
        <div class="field field-row">
          <div>
            <label>Mật khẩu</label>
            <input id="regPass" type="password" required minlength="6" placeholder="≥ 6 ký tự">
          </div>
          <div>
            <label>Nhập lại mật khẩu</label>
            <input id="regPass2" type="password" required minlength="6" placeholder="••••••••">
          </div>
        </div>
        <button class="btn btn-grad" style="width:100%">Tạo tài khoản</button>
      </form>
      <p class="auth-switch">Đã có tài khoản? <a href="#/login">Đăng nhập</a></p>
    </div>
  </div>`;
}

function doLogin(e) {
  e.preventDefault();
  const email = $("#loginEmail").value.trim().toLowerCase();
  const pass = $("#loginPass").value;
  const u = DB.users.find(x => x.email === email && x.pass === pass);
  if (!u) return toast("❌ Email hoặc mật khẩu không đúng!", "err");
  DB.session = { email: u.email, name: u.name, role: u.role };
  renderAuthArea();
  toast(`👋 Xin chào ${u.name}!`, "ok");
  location.hash = "#/";
}

function doRegister(e) {
  e.preventDefault();
  const name = $("#regName").value.trim();
  const email = $("#regEmail").value.trim().toLowerCase();
  const p1 = $("#regPass").value, p2 = $("#regPass2").value;
  if (p1 !== p2) return toast("❌ Mật khẩu nhập lại không khớp!", "err");
  const users = DB.users;
  if (users.some(u => u.email === email)) return toast("❌ Email này đã được đăng ký!", "err");
  users.push({ stt: users.length, name, email, pass: p1, role: "user" });
  DB.users = users;
  DB.session = { email, name, role: "user" };
  renderAuthArea();
  toast("🎉 Đăng ký thành công!", "ok");
  location.hash = "#/";
}

function logout() {
  DB.session = null;
  renderAuthArea();
  toast("Bạn đã đăng xuất.");
  location.hash = "#/";
}

/* ---------------- Views: thanh toán ---------------- */
function viewCheckout() {
  const cart = DB.cart;
  if (!cart.length) return viewCart();
  const u = currentUser();
  const total = cart.reduce((s, i) => s + PRODUCTS.find(x => x.id === i.id).price * i.qty, 0);
  return `
  <div class="checkout-grid">
    <div class="panel">
      <h3><span class="step-dot">1</span> Thông tin nhận hàng</h3>
      <form onsubmit="placeOrder(event)">
        <div class="field field-row">
          <div><label>Họ và tên</label><input id="ckName" required value="${u ? esc(u.name) : ""}"></div>
          <div><label>Số điện thoại</label><input id="ckPhone" required placeholder="09xx.xxx.xxx"></div>
        </div>
        <div class="field"><label>Email</label><input id="ckEmail" type="email" required value="${u ? esc(u.email) : ""}"></div>
        <div class="field"><label>Địa chỉ nhận hàng</label><input id="ckAddr" required placeholder="Số nhà, đường, phường/xã, tỉnh/thành"></div>
        <div class="field"><label>Ghi chú (tuỳ chọn)</label><textarea id="ckNote" rows="2" placeholder="VD: giao giờ hành chính..."></textarea></div>

        <h3 style="margin-top:20px"><span class="step-dot">2</span> Phương thức thanh toán</h3>
        <label class="pay-opt on"><input type="radio" name="pay" value="COD" checked onchange="pickPay(this)"> 💵 Thanh toán khi nhận hàng (COD)</label>
        <div style="height:8px"></div>
        <label class="pay-opt"><input type="radio" name="pay" value="Bank" onchange="pickPay(this)"> 🏦 Chuyển khoản ngân hàng</label>
        <div style="height:8px"></div>
        <label class="pay-opt"><input type="radio" name="pay" value="Momo" onchange="pickPay(this)"> 📱 Ví MoMo / ZaloPay</label>

        <button class="btn btn-grad" style="width:100%;margin-top:20px">✅ Đặt hàng — ${fmtMoney(total)}</button>
      </form>
    </div>
    <aside class="cart-summary">
      <h3>🧾 Đơn hàng (${cart.length} sản phẩm)</h3>
      ${cart.map(i => {
        const p = PRODUCTS.find(x => x.id === i.id);
        return `<div class="sum-row"><span>${esc(p.name)} × ${i.qty}</span><span>${fmtMoney(p.price * i.qty)}</span></div>`;
      }).join("")}
      <div class="sum-row total"><span>TỔNG CỘNG</span><b>${fmtMoney(total)}</b></div>
    </aside>
  </div>`;
}

function pickPay(radio) {
  $$(".pay-opt").forEach(l => l.classList.toggle("on", l.contains(radio)));
}

function placeOrder(e) {
  e.preventDefault();
  const u = currentUser();
  if (!u) { toast("Vui lòng đăng nhập để đặt hàng!", "err"); location.hash = "#/login"; return; }
  const cart = DB.cart;
  const items = cart.map(i => {
    const p = PRODUCTS.find(x => x.id === i.id);
    return { name: p.name, qty: i.qty, price: p.price };
  });
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const order = {
    id: "VDTC" + Date.now().toString().slice(-8),
    at: Date.now(),
    name: $("#ckName").value, phone: $("#ckPhone").value, email: $("#ckEmail").value,
    addr: $("#ckAddr").value, note: $("#ckNote").value,
    pay: ($$('input[name=pay]').find(r => r.checked) || {}).value || "COD",
    items, total, status: "Đang xử lý"
  };
  DB.saveOrder(u.email, order);
  DB.cart = [];
  updateCartBadge();
  toast("🎉 Đặt hàng thành công! Mã đơn: " + order.id, "ok");
  location.hash = "#/account";
}

/* ---------------- Views: tài khoản ---------------- */
function viewAccount() {
  const u = currentUser();
  if (!u) { setTimeout(() => location.hash = "#/login"); return viewLogin(); }
  const orders = DB.ordersOf(u.email);
  const initials = u.name.split(" ").slice(-1)[0].slice(0, 2).toUpperCase();
  return `
  <div class="acct-heroline">
    <div class="acct-av">${esc(initials)}</div>
    <div style="flex:1">
      <h3>${esc(u.name)}</h3>
      <p>${esc(u.email)} ${u.role === "admin" ? "· ⭐ Quản trị viên" : ""}</p>
    </div>
    <div style="text-align:right">
      <p style="font-size:12.5px;opacity:.85">Tổng đơn hàng</p>
      <div style="font-size:26px;font-weight:900">${orders.length}</div>
    </div>
    <button class="btn btn-outline" onclick="logout()">Đăng xuất</button>
  </div>

  <section class="section">
    <div class="section-head"><h2 class="section-title">🧾 Đơn hàng của tôi</h2></div>
    ${orders.length ? orders.map(o => `
      <div class="order-card">
        <div class="order-top">
          <span class="order-id">${o.id}</span>
          <span>${fmtDate(o.at)}</span>
          <span class="status">${o.status}</span>
          <span>${o.pay === "COD" ? "💵 COD" : o.pay === "Bank" ? "🏦 Chuyển khoản" : "📱 Ví điện tử"}</span>
        </div>
        ${o.items.map(i => `<div class="order-item"><span>${esc(i.name)} × ${i.qty}</span><span>${fmtMoney(i.price * i.qty)}</span></div>`).join("")}
        <div class="order-total">Tổng: ${fmtMoney(o.total)}</div>
        <div style="font-size:12.5px;color:var(--gray);margin-top:6px">📍 Giao đến: ${esc(o.addr)} · 📞 ${esc(o.phone)}</div>
      </div>`).join("")
    : `<div class="empty"><div class="big">📦</div><h3>Chưa có đơn hàng nào</h3><p>Mua chiếc laptop đầu tiên của bạn nhé!</p><a href="#/products" class="btn btn-grad">Mua sắm ngay</a></div>`}
  </section>`;
}

/* ---------------- Views: ADMIN ---------------- */
function viewAdmin() {
  const u = currentUser();
  if (!u) { setTimeout(() => location.hash = "#/login"); return viewLogin(); }
  if (u.role !== "admin") {
    return `<div class="empty"><div class="big">⛔</div><h3>Trang chỉ dành cho quản trị viên</h3>
      <p>Tài khoản "${esc(u.email)}" không có quyền truy cập.</p>
      <a href="#/" class="btn btn-grad">Về trang chủ</a></div>`;
  }

  const orders = DB.ordersAll().sort((a, b) => b.at - a.at);
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const itemsSold = orders.reduce((s, o) => s + o.items.reduce((x, i) => x + i.qty, 0), 0);
  const users = DB.users.filter(x => x.role !== "admin");

  // Doanh thu theo hãng
  const byBrand = {};
  orders.forEach(o => o.items.forEach(i => {
    const p = PRODUCTS.find(x => x.name === i.name);
    const brand = p ? p.brand : "Khác";
    byBrand[brand] = (byBrand[brand] || 0) + i.price * i.qty;
  }));

  return `
  <div class="stats-band admin-band">
    <div><div class="num">${orders.length}</div><div class="lbl">Tổng đơn hàng</div></div>
    <div><div class="num">${itemsSold}</div><div class="lbl">Sản phẩm đã bán</div></div>
    <div><div class="num">${fmtMoney(revenue).replace("₫", "")}₫</div><div class="lbl">Tổng doanh thu</div></div>
    <div><div class="num">${users.length}</div><div class="lbl">Tài khoản người dùng</div></div>
  </div>

  <section class="section">
    <div class="section-head"><h2 class="section-title">🧾 Tất cả đơn hàng</h2>
      <span class="result-info">${byBrand.brandLabel || ""}</span></div>
    ${orders.length ? orders.map(o => `
      <div class="order-card">
        <div class="order-top">
          <span class="order-id">${o.id}</span>
          <span>${fmtDate(o.at)}</span>
          <span class="status ${o.status === "Hoàn thành" ? "done" : ""}">${o.status}</span>
          <span>👤 ${esc(o.email)}</span>
          <span>${o.pay === "COD" ? "💵 COD" : o.pay === "Bank" ? "🏦 CK" : "📱 Ví"}</span>
          <button class="btn btn-sm btn-dark" style="margin-left:auto" onclick="markDone('${o.id}', '${esc(o.email)}')">✔ Hoàn thành</button>
        </div>
        ${o.items.map(i => `<div class="order-item"><span>${esc(i.name)} × ${i.qty}</span><span>${fmtMoney(i.price * i.qty)}</span></div>`).join("")}
        <div class="order-total">Tổng: ${fmtMoney(o.total)}</div>
        <div style="font-size:12.5px;color:var(--gray);margin-top:6px">📍 ${esc(o.addr)} · 📞 ${esc(o.phone)} · 👤 ${esc(o.name)}</div>
      </div>`).join("")
    : `<div class="empty"><div class="big">📦</div><h3>Chưa có đơn hàng nào trong hệ thống</h3>
       <p>Đơn hàng từ mọi tài khoản sẽ hiện ở đây.</p></div>`}
  </section>

  ${Object.keys(byBrand).length ? `
  <section class="section">
    <div class="section-head"><h2 class="section-title">📊 Doanh thu theo hãng</h2></div>
    <div class="panel">
      ${Object.entries(byBrand).sort((a, b) => b[1] - a[1]).map(([b, v]) => `
        <div style="margin-bottom:12px">
          <div class="sum-row"><b>${esc(b)}</b><span>${fmtMoney(v)}</span></div>
          <div style="height:8px;background:var(--bg-soft);border-radius:99px;overflow:hidden">
            <div style="height:100%;width:${Math.max(4, Math.round(v / revenue * 100))}%;background:var(--grad-btn);border-radius:99px"></div>
          </div>
        </div>`).join("")}
    </div>
  </section>` : ""}

  <section class="section">
    <div class="section-head"><h2 class="section-title">👥 Tài khoản hệ thống (${users.length})</h2></div>
    <div class="cart-table" style="overflow-x:auto">
      <div class="cart-row head" style="grid-template-columns:60px 1.4fr 1.6fr 1fr 100px">
        <span>STT</span><span>Họ tên</span><span>Email</span><span>Số đơn</span><span>PW mặc định</span>
      </div>
      ${users.map(x => `
        <div class="cart-row" style="grid-template-columns:60px 1.4fr 1.6fr 1fr 100px;font-size:13.5px">
          <span>${x.stt || "-"}</span>
          <span><b>${esc(x.name)}</b>${x.email === u.email ? " ⭐" : ""}</span>
          <span style="color:var(--gray)">${esc(x.email)}</span>
          <span>${DB.ordersOf(x.email).length}</span>
          <span><code style="font-size:11.5px;background:var(--bg-soft);padding:2px 8px;border-radius:6px">${esc(x.pass)}</code></span>
        </div>`).join("")}
    </div>
  </section>`;
}

function markDone(orderId, email) {
  const all = JSON.parse(localStorage.getItem("lt_orders") || "{}");
  const list = all[email] || [];
  const o = list.find(x => x.id === orderId);
  if (o) { o.status = "Hoàn thành"; localStorage.setItem("lt_orders", JSON.stringify(all)); }
  toast(`✔ Đơn ${orderId} đã hoàn thành`, "ok");
  render();
}

function viewNotFound() {
  return `<div class="empty"><div class="big">🤖</div><h3>404 — Không tìm thấy trang</h3><p>Đường dẫn không tồn tại.</p><a href="#/" class="btn btn-grad">Về trang chủ</a></div>`;
}

/* ---------------- Router ---------------- */
function parseHash() {
  const h = location.hash.replace(/^#\/?/, "");
  const [path, query] = h.split("?");
  const params = {};
  if (query) query.split("&").forEach(kv => {
    const [k, v] = kv.split("=");
    if (k) params[k] = decodeURIComponent(v || "");
  });
  return { parts: path.split("/").filter(Boolean), params };
}

function render() {
  const { parts, params } = parseHash();
  const view = $("#view");
  let html;

  if (parts.length === 0) html = viewHome();
  else if (parts[0] === "products") html = viewProducts(params);
  else if (parts[0] === "product" && parts[1]) html = viewProduct(parts[1]);
  else if (parts[0] === "cart") html = viewCart();
  else if (parts[0] === "login") html = viewLogin();
  else if (parts[0] === "register") html = viewRegister();
  else if (parts[0] === "checkout") html = viewCheckout();
  else if (parts[0] === "account") html = viewAccount();
  else if (parts[0] === "admin") html = viewAdmin();
  else html = viewNotFound();

  view.innerHTML = html;
  updateCartBadge();
}

/* ---------------- Khởi động ---------------- */
window.addEventListener("hashchange", render);

document.addEventListener("DOMContentLoaded", () => {
  void DB.users.length; // seed 21 tài khoản Excel + admin ngay khi tải trang
  renderAuthArea();
  render();

  $("#searchBtn").addEventListener("click", doSearch);
  $("#searchInput").addEventListener("keydown", e => { if (e.key === "Enter") doSearch(); });

  function doSearch() {
    const q = $("#searchInput").value.trim();
    location.hash = q ? `#/products?q=${encodeURIComponent(q)}` : "#/products";
  }
});
