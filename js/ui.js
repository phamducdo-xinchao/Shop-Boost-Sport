// ─── KHỞI ĐỘNG ───────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initFilters();
    initSearch();
    initSizeChips();
    initCartUI();
    applyFilters();
    initCountdown();
    initNavScroll();
    initBackToTop();
    initContactForm();
    initVoucherCopy();
    initLangSwitch();
});

// ─── TABS ─────────────────────────────────────
function initTabs() {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            activeTab = btn.dataset.tab;
            currentPage = 1;
            applyFilters();
        });
    });
}

// ─── FILTER ───────────────────────────────────
function initFilters() {
    const priceInput = document.getElementById("filterPrice");
    const priceLabel = document.getElementById("priceLabel");
    if (priceInput) {
        priceInput.addEventListener("input", () => {
            priceLabel.textContent = Number(priceInput.value).toLocaleString("vi-VN") + "đ";
            currentPage = 1;
            applyFilters();
        });
    }
}

function initSizeChips() {
    document.querySelectorAll(".size-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            if (chip.classList.contains("active")) {
                chip.classList.remove("active");
                selectedSize = null;
            } else {
                document.querySelectorAll(".size-chip").forEach((c) => c.classList.remove("active"));
                chip.classList.add("active");
                selectedSize = Number(chip.dataset.size);
            }
            currentPage = 1;
            applyFilters();
        });
    });
}

function applyFilters() {
    const brand = document.getElementById("filterBrand")?.value || "";
    const cat = document.getElementById("filterCat")?.value || "";
    const maxPrice = Number(document.getElementById("filterPrice")?.value || 5_000_000);

    filteredProducts = PRODUCTS.filter((p) => {
        if (brand && p.brand !== brand) return false;
        if (cat && p.category !== cat) return false;
        if (p.price > maxPrice) return false;
        if (selectedSize && !p.sizes.includes(selectedSize)) return false;
        if (activeTab === "hot" && !p.tags.includes("hot")) return false;
        if (activeTab === "bestseller" && !p.tags.includes("bestseller")) return false;
        if (activeTab === "sale" && !p.tags.includes("sale")) return false;
        if (activeTab === "new" && !p.tags.includes("new")) return false;
        return true;
    });

    renderGrid(filteredProducts.slice(0, currentPage * PAGE_SIZE));

    const loadBtn = document.getElementById("loadMoreBtn");
    if (loadBtn) {
        loadBtn.style.display = filteredProducts.length > currentPage * PAGE_SIZE ? "inline-flex" : "none";
    }
}

window.applyFilters = applyFilters;

function loadMore() {
    currentPage++;
    applyFilters();
}
window.loadMore = loadMore;

// ─── FILTER BY CATEGORY / BRAND (từ nav) ────
function filterCategory(cat) {
    const el = document.getElementById("filterCat");
    if (el) { el.value = cat; }
    currentPage = 1;
    applyFilters();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
}
window.filterCategory = filterCategory;

function filterBrand(brand) {
    const el = document.getElementById("filterBrand");
    if (el) { el.value = brand; }
    currentPage = 1;
    applyFilters();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
}
window.filterBrand = filterBrand;

// ─── RENDER GRID ──────────────────────────────
function renderGrid(products) {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted)">
      <p style="font-size:2rem;margin-bottom:12px">😕</p>
      <p>Không tìm thấy sản phẩm phù hợp</p>
    </div>`;
        return;
    }

    grid.innerHTML = products.map(productCard).join("");
}

function productCard(p) {
    const badge = p.tags.includes("hot")
        ? `<span class="product-badge badge-hot">HOT</span>`
        : p.tags.includes("sale")
            ? `<span class="product-badge badge-sale">SALE</span>`
            : p.tags.includes("new")
                ? `<span class="product-badge badge-new">NEW</span>`
                : p.tags.includes("bestseller")
                    ? `<span class="product-badge badge-best">⭐ BÁN CHẠY</span>`
                    : "";

    const discount = p.originalPrice
        ? `<span class="price-original">${fmt(p.originalPrice)}</span>`
        : "";

    const stars = "★".repeat(p.stars) + "☆".repeat(5 - p.stars);
    const sizeTags = p.sizes
        .slice(0, 5)
        .map((s) => `<span class="product-size-tag">${s}</span>`)
        .join("");

    return `
  <div class="product-card" onclick="openModal(${p.id})">
    <div class="product-img-wrap">
      ${badge}
      <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="imgErr(this,'400x300','NO+IMG')">
      <div class="product-actions">
        <button class="product-action-btn" title="Yêu thích" onclick="wishlist(event,${p.id})">♡</button>
        <button class="product-action-btn" title="Xem nhanh" onclick="openModal(${p.id})">👁</button>
      </div>
    </div>
    <div class="product-info">
      <p class="product-brand">${p.brand.replace(/-/g, " ")}</p>
      <p class="product-name">${p.name}</p>
      <div class="product-sizes">${sizeTags}</div>
      <div class="product-footer">
        <div class="product-price">
          <span class="price-current">${fmt(p.price)}</span>
          ${discount}
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="stars" title="${p.reviews} đánh giá">${stars}</div>
          <button class="btn-add-cart" title="Thêm vào giỏ" onclick="addToCart(event,${p.id})">+</button>
        </div>
      </div>
    </div>
  </div>`;
}

// ─── MODAL SẢN PHẨM ──────────────────────────
function openModal(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;

    let modalQty = 1;
    let modalSelectedSize = null;

    const stars = "★".repeat(p.stars) + "☆".repeat(5 - p.stars);
    const sizeButtons = p.sizes
        .map((s) => `<button class="modal-size-btn" data-size="${s}" onclick="selectModalSize(this,${s})">${s}</button>`)
        .join("");
    const origHtml = p.originalPrice
        ? `<p class="modal-price-orig">${fmt(p.originalPrice)}</p>`
        : "";
    const discountPct = p.originalPrice
        ? `<span style="background:#ff2d55;color:#fff;font-size:0.75rem;font-weight:700;padding:3px 8px;border-radius:4px;margin-left:10px">
        -${Math.round((1 - p.price / p.originalPrice) * 100)}%
      </span>`
        : "";

    document.getElementById("modalInner").innerHTML = `
    <div class="modal-imgs">
      <img src="${p.image}" alt="${p.name}" onerror="imgErr(this,'400x300','NO+IMG')">
    </div>
    <div class="modal-details">
      <p class="product-brand">${p.brand.replace(/-/g, " ")}</p>
      <h2>${p.name}</h2>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <div class="stars">${stars}</div>
        <span style="font-size:0.8rem;color:var(--text-muted)">(${p.reviews} đánh giá)</span>
      </div>
      <p class="modal-price">${fmt(p.price)}${discountPct}</p>
      ${origHtml}
      <p class="modal-desc">${p.desc}</p>
      <p class="modal-label">Chọn size</p>
      <div class="modal-sizes" id="modalSizes">${sizeButtons}</div>
      <p class="modal-label">Số lượng</p>
      <div class="qty-row">
        <div class="qty-large">
          <button onclick="changeModalQty(-1)">−</button>
          <span id="modalQtyDisplay">1</span>
          <button onclick="changeModalQty(1)">+</button>
        </div>
        <span style="font-size:0.85rem;color:var(--text-muted)">Còn hàng</span>
      </div>
      <div class="modal-btns">
        <button class="btn-primary" style="flex:1;justify-content:center" onclick="addToCartModal(${p.id})">
          🛒 Thêm vào giỏ
        </button>
        <button class="btn-ghost" style="flex:1;justify-content:center;border-color:var(--border);color:var(--text)">
          ♡ Yêu thích
        </button>
      </div>
    </div>`;

    document.getElementById("modalOverlay").classList.add("active");
    document.getElementById("productModal").classList.add("active");
    document.body.style.overflow = "hidden";
}
window.openModal = openModal;

function closeModal() {
    document.getElementById("modalOverlay").classList.remove("active");
    document.getElementById("productModal").classList.remove("active");
    document.body.style.overflow = "";
}
window.closeModal = closeModal;

window.selectModalSize = function (btn, size) {
    document.querySelectorAll(".modal-size-btn").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    window._modalSelectedSize = size;
};

window.changeModalQty = function (delta) {
    const display = document.getElementById("modalQtyDisplay");
    let qty = Number(display.textContent) + delta;
    if (qty < 1) qty = 1;
    if (qty > 10) qty = 10;
    display.textContent = qty;
};

window.addToCartModal = function (id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const qty = Number(document.getElementById("modalQtyDisplay")?.textContent || 1);
    const size = window._modalSelectedSize || p.sizes[0];
    addCartItem(p, size, qty);
    closeModal();
};

// ─── TÌM KIẾM ────────────────────────────────
function initSearch() {
    const btn = document.getElementById("searchToggle");
    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");
    if (!btn || !input) return;

    btn.addEventListener("click", () => {
        input.classList.toggle("active");
        if (input.classList.contains("active")) input.focus();
        else {
            input.value = "";
            if (results) results.style.display = "none";
        }
    });

    input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();
        if (!q || !results) { if (results) results.style.display = "none"; return; }
        const hits = PRODUCTS.filter(
            (p) => p.name.toLowerCase().includes(q) || p.brand.includes(q) || p.category.includes(q)
        ).slice(0, 6);
        if (hits.length === 0) { results.style.display = "none"; return; }
        results.style.display = "block";
        results.innerHTML = hits
            .map(
                (p) => `
      <div class="search-result-item" onclick="openModal(${p.id})">
        <img src="${p.image}" alt="${p.name}" onerror="imgErr(this,'50x50','IMG')">
        <div class="sr-info">
          <strong>${p.name}</strong>
          <span>${fmt(p.price)}</span>
        </div>
      </div>`
            )
            .join("");
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-wrap") && results) results.style.display = "none";
    });
}

// ─── CONTACT FORM ────────────────────────────
function initContactForm() {
    document.querySelector(".contact-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("✅ Tin nhắn đã được gửi! Chúng tôi sẽ phản hồi sớm.", "success");
        e.target.reset();
    });
}
window.submitContact = function (e) { e.preventDefault(); showToast("✅ Đã gửi tin nhắn!", "success"); e.target.reset(); };

// ─── VOUCHER ─────────────────────────────────
function initVoucherCopy() { }
window.copyVoucher = function (code) {
    navigator.clipboard.writeText(code).then(() => {
        showToast(`📋 Đã copy mã ${code}`, "info");
    }).catch(() => {
        showToast(`Mã voucher: ${code}`, "info");
    });
};

// ─── PROFILE & CLOSE ─────────────────────────
window.closeProfile = function () {
    document.getElementById("profileOverlay")?.classList.remove("active");
    document.getElementById("profileModal")?.classList.remove("active");
    document.body.style.overflow = "";
};

window.showProfileTab = function (tab) {
    document.getElementById("infoTab").style.display = tab === "info" ? "block" : "none";
    document.getElementById("ordersTab").style.display = tab === "orders" ? "block" : "none";
    document.querySelectorAll(".profile-nav-btn").forEach((b) => b.classList.remove("active"));
    if (tab === "info") {
        document.querySelector('.profile-nav-btn[onclick*="info"]')?.classList.add("active");
        // Load thông tin user vào form
        const raw = localStorage.getItem("adidas_current_user");
        if (raw) {
            const u = JSON.parse(raw);
            const saved = JSON.parse(localStorage.getItem(`bs_profile_${u.uid}`) || "{}");
            const nameEl = document.getElementById("profileName");
            const phoneEl = document.getElementById("profilePhone");
            const addrEl = document.getElementById("profileAddress");
            if (nameEl) nameEl.value = u.name || saved.name || "";
            if (phoneEl) phoneEl.value = saved.phone || "";
            if (addrEl) addrEl.value = saved.address || "";
            const emailEl = document.getElementById("profileEmail");
            if (emailEl) emailEl.value = u.email || "";
        }
    } else {
        document.querySelector('.profile-nav-btn[onclick*="showOrderTab"]')?.classList.add("active");
    }
};

// ─── LƯU THÔNG TIN TÀI KHOẢN ─────────────────
window.saveProfile = function () {
    const raw = localStorage.getItem("adidas_current_user");
    if (!raw) return;
    const u = JSON.parse(raw);
    const name = document.getElementById("profileName")?.value.trim();
    const phone = document.getElementById("profilePhone")?.value.trim();
    const address = document.getElementById("profileAddress")?.value.trim();

    if (phone && !/^0\d{9}$/.test(phone)) {
        showToast("📱 Số điện thoại không hợp lệ! Phải bắt đầu bằng 0 và đủ 10 chữ số.", "error");
        return;
    }

    // Cập nhật tên trong localStorage user
    if (name) {
        u.name = name;
        localStorage.setItem("adidas_current_user", JSON.stringify(u));
        // Cập nhật UI navbar
        const lastName = name.split(" ").pop();
        const initial = name.charAt(0).toUpperCase();
        const userNameEl = document.getElementById("userName");
        const userInitialEl = document.getElementById("userInitial");
        const userInitial2El = document.getElementById("userInitial2");
        const userMenuNameEl = document.getElementById("userMenuName");
        const sidebarNameEl = document.getElementById("sidebarName");
        const sidebarAvatarEl = document.getElementById("sidebarAvatar");
        if (userNameEl) userNameEl.textContent = lastName;
        if (userInitialEl) userInitialEl.textContent = initial;
        if (userInitial2El) userInitial2El.textContent = initial;
        if (userMenuNameEl) userMenuNameEl.textContent = name;
        if (sidebarNameEl) sidebarNameEl.textContent = name;
        if (sidebarAvatarEl) sidebarAvatarEl.textContent = initial;
    }

    // Lưu thêm phone, address
    localStorage.setItem(`bs_profile_${u.uid}`, JSON.stringify({ name, phone, address }));
    showToast("✅ Cập nhật thông tin thành công!", "success");
};

// ─── RENDER ORDERS ────────────────────────────
window.renderOrders = function () {
    const raw = localStorage.getItem("adidas_current_user");
    if (!raw) return;
    const uid = JSON.parse(raw).uid;
    const orders = JSON.parse(localStorage.getItem(`bs_orders_${uid}`) || "[]");
    const status = window._currentOrderTab || "all";
    const q = (document.getElementById("orderSearch")?.value || "").toLowerCase().trim();

    const STATUS_LABEL = {
        pending: "Chờ thanh toán",
        shipping: "Đang vận chuyển",
        delivering: "Chờ giao hàng",
        done: "Hoàn thành",
        cancel: "Đã hủy",
        return: "Trả hàng/Hoàn tiền",
    };
    const STATUS_COLOR = {
        pending: "#f59e0b",
        shipping: "#3b82f6",
        delivering: "#8b5cf6",
        done: "#10b981",
        cancel: "#ef4444",
        return: "#6b7280",
    };

    let filtered = orders.filter((o) => {
        if (status !== "all" && o.status !== status) return false;
        if (q) {
            const inItems = o.items?.some((i) => i.name?.toLowerCase().includes(q));
            const inId = String(o.id).includes(q);
            if (!inItems && !inId) return false;
        }
        return true;
    });

    const list = document.getElementById("orderList");
    if (!list) return;

    if (filtered.length === 0) {
        list.innerHTML = `<div style="text-align:center;padding:48px 0;color:var(--text-muted)">
            <p style="font-size:2.5rem;margin-bottom:12px">📦</p>
            <p>Không có đơn hàng nào</p>
        </div>`;
        return;
    }

    list.innerHTML = filtered.map((o) => {
        const statusLabel = STATUS_LABEL[o.status] || o.status;
        const statusColor = STATUS_COLOR[o.status] || "#888";
        const itemsHtml = (o.items || []).slice(0, 2).map((item) => `
            <div style="display:flex;gap:10px;align-items:center">
                <img src="${item.image}" alt="${item.name}" style="width:52px;height:52px;object-fit:cover;border-radius:8px;flex-shrink:0;border:1px solid var(--border)" onerror="imgErr(this,'52x52','IMG')">
                <div style="flex:1;min-width:0">
                    <p style="font-size:0.82rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${item.name}</p>
                    <p style="font-size:0.75rem;color:var(--text-muted)">Size ${item.size} · x${item.qty}</p>
                </div>
                <strong style="font-size:0.82rem;flex-shrink:0">${(item.price * item.qty).toLocaleString("vi-VN")}đ</strong>
            </div>`).join("");
        const moreItems = o.items?.length > 2 ? `<p style="font-size:0.78rem;color:var(--text-muted);margin-top:6px">+ ${o.items.length - 2} sản phẩm khác</p>` : "";

        const canCancel = o.status === "pending" || o.status === "delivering";
        const actionBtn = canCancel
            ? `<button onclick="cancelOrder(${o.id})" style="font-size:0.78rem;padding:6px 14px;border-radius:6px;border:1px solid #ef4444;color:#ef4444;background:transparent;cursor:pointer;font-weight:600">Hủy đơn</button>`
            : o.status === "done"
                ? `<button onclick="reorder(${o.id})" style="font-size:0.78rem;padding:6px 14px;border-radius:6px;border:1px solid var(--orange);color:var(--orange);background:transparent;cursor:pointer;font-weight:600">Mua lại</button>`
                : "";

        return `<div style="border:1px solid var(--border);border-radius:12px;overflow:hidden;background:var(--bg2)">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:var(--bg3);border-bottom:1px solid var(--border)">
                <span style="font-size:0.78rem;color:var(--text-muted)">Mã đơn: <strong style="color:var(--text)">#${o.id}</strong> · ${o.date || ""}</span>
                <span style="font-size:0.78rem;font-weight:700;color:${statusColor}">${statusLabel}</span>
            </div>
            <div style="padding:12px 14px;display:flex;flex-direction:column;gap:8px">${itemsHtml}${moreItems}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-top:1px solid var(--border)">
                <div>
                    <span style="font-size:0.78rem;color:var(--text-muted)">Tổng tiền: </span>
                    <strong style="color:var(--orange)">${(o.total || 0).toLocaleString("vi-VN")}đ</strong>
                </div>
                ${actionBtn}
            </div>
        </div>`;
    }).join("");
};

window.cancelOrder = function (id) {
    const raw = localStorage.getItem("adidas_current_user");
    if (!raw) return;
    const uid = JSON.parse(raw).uid;
    const key = `bs_orders_${uid}`;
    const orders = JSON.parse(localStorage.getItem(key) || "[]");
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    order.status = "cancel";
    localStorage.setItem(key, JSON.stringify(orders));
    showToast("🗑 Đơn hàng đã được hủy.", "info");
    renderOrders();
};

window.reorder = function (id) {
    const raw = localStorage.getItem("adidas_current_user");
    if (!raw) return;
    const uid = JSON.parse(raw).uid;
    const orders = JSON.parse(localStorage.getItem(`bs_orders_${uid}`) || "[]");
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    order.items.forEach((item) => {
        addCartItem({ id: item.id, name: item.name, brand: item.brand, price: item.price, image: item.image, sizes: [item.size] }, item.size, item.qty);
    });
    showToast("🛒 Đã thêm lại vào giỏ hàng!", "success");
    closeProfile();
    openCart();
};

// ─── COUNTDOWN ───────────────────────────────
function initCountdown() {
    const end = new Date();
    end.setHours(end.getHours() + 8, end.getMinutes() + 45, end.getSeconds() + 30);

    function tick() {
        const diff = end - Date.now();
        if (diff <= 0) {
            document.getElementById("cd-h").textContent = "00";
            document.getElementById("cd-m").textContent = "00";
            document.getElementById("cd-s").textContent = "00";
            return;
        }
        const h = Math.floor(diff / 3_600_000);
        const m = Math.floor((diff % 3_600_000) / 60_000);
        const s = Math.floor((diff % 60_000) / 1_000);
        document.getElementById("cd-h").textContent = String(h).padStart(2, "0");
        document.getElementById("cd-m").textContent = String(m).padStart(2, "0");
        document.getElementById("cd-s").textContent = String(s).padStart(2, "0");
        requestAnimationFrame(tick);
    }
    tick();
}

// ─── NAV SCROLL ──────────────────────────────
function initNavScroll() {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 60);
    });
}

// ─── BACK TO TOP ─────────────────────────────
function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener("scroll", () => {
        btn.classList.toggle("visible", window.scrollY > 400);
    });
}

// ─── LANG SWITCH ─────────────────────────────
function initLangSwitch() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            document.querySelectorAll(".lang-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            document.querySelectorAll(`[data-${lang}]`).forEach((el) => {
                if (el.dataset[lang]) el.textContent = el.dataset[lang];
            });
        });
    });
}

// ─── TOAST ───────────────────────────────────
function showToast(msg, type = "info") {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.className = `toast show ${type}`;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { toast.className = "toast"; }, 3000);
}
window.showToast = showToast;

// ─── FORMAT TIỀN ─────────────────────────────
function fmt(n) {
    return n.toLocaleString("vi-VN") + "đ";
}
// ─── ADMIN PANEL ──────────────────────────────
const ADMIN_EMAILS = ["admin@boostsport.vn", "admin@gmail.com"];

const STATUS_LABEL = {
    pending: "Chờ thanh toán",
    shipping: "Đang vận chuyển",
    delivering: "Chờ giao hàng",
    done: "Hoàn thành",
    cancel: "Đã hủy",
    return: "Trả hàng/Hoàn tiền",
};
const STATUS_COLOR = {
    pending: "#f59e0b",
    shipping: "#3b82f6",
    delivering: "#8b5cf6",
    done: "#10b981",
    cancel: "#ef4444",
    return: "#6b7280",
};
const STATUS_OPTIONS = Object.entries(STATUS_LABEL).map(([v, l]) => `<option value="${v}">${l}</option>`).join("");

function getAllOrders() {
    const all = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.startsWith("bs_orders_")) continue;
        const uid = key.replace("bs_orders_", "");
        try {
            const orders = JSON.parse(localStorage.getItem(key) || "[]");
            orders.forEach((o) => all.push({ ...o, _uid: uid }));
        } catch (e) { }
    }
    return all.sort((a, b) => b.id - a.id);
}

window.openAdmin = function () {
    const raw = localStorage.getItem("adidas_current_user");
    if (!raw) return;
    const user = JSON.parse(raw);
    if (!ADMIN_EMAILS.includes(user.email)) {
        showToast("🚫 Bạn không có quyền truy cập trang quản trị!", "error");
        return;
    }
    const panel = document.getElementById("adminPanel");
    const overlay = document.getElementById("adminOverlay");
    if (!panel) return;
    panel.style.display = "flex";
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    document.getElementById("userMenu").style.display = "none";
    setTimeout(() => {
        panel.style.opacity = "1";
        panel.style.transform = "translate(-50%,-50%) scale(1)";
    }, 10);
    renderAdminStats();
    renderAdminOrders();
};

window.closeAdmin = function () {
    const panel = document.getElementById("adminPanel");
    const overlay = document.getElementById("adminOverlay");
    if (!panel) return;
    panel.style.opacity = "0";
    panel.style.transform = "translate(-50%,-50%) scale(0.95)";
    setTimeout(() => { panel.style.display = "none"; }, 300);
    overlay.classList.remove("active");
    document.body.style.overflow = "";
};

function renderAdminStats() {
    const orders = getAllOrders();
    const total = orders.length;
    const revenue = orders.filter(o => o.status === "done").reduce((s, o) => s + (o.total || 0), 0);
    const pending = orders.filter(o => o.status === "pending" || o.status === "delivering").length;
    const done = orders.filter(o => o.status === "done").length;

    const stats = [
        { icon: "📋", label: "Tổng đơn hàng", value: total, color: "#3b82f6" },
        { icon: "⏳", label: "Chờ xử lý", value: pending, color: "#f59e0b" },
        { icon: "✅", label: "Hoàn thành", value: done, color: "#10b981" },
        { icon: "💰", label: "Doanh thu", value: revenue.toLocaleString("vi-VN") + "đ", color: "#ff6b35" },
    ];
    document.getElementById("adminStats").innerHTML = stats.map(s => `
        <div style="flex:1;min-width:140px;background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:12px 16px;display:flex;align-items:center;gap:12px">
            <span style="font-size:1.6rem">${s.icon}</span>
            <div>
                <p style="font-size:0.72rem;color:var(--text-muted);margin:0">${s.label}</p>
                <strong style="font-size:1.1rem;color:${s.color}">${s.value}</strong>
            </div>
        </div>`).join("");
}

window.renderAdminOrders = function () {
    let orders = getAllOrders();
    const q = (document.getElementById("adminSearch")?.value || "").toLowerCase().trim();
    const statusFilter = document.getElementById("adminStatusFilter")?.value || "all";

    if (statusFilter !== "all") orders = orders.filter(o => o.status === statusFilter);
    if (q) orders = orders.filter(o => {
        const inItems = o.items?.some(i => i.name?.toLowerCase().includes(q));
        const inId = String(o.id).includes(q);
        const inCustomer = o.customer?.name?.toLowerCase().includes(q) || o.customer?.email?.toLowerCase().includes(q);
        return inItems || inId || inCustomer;
    });

    const list = document.getElementById("adminOrderList");
    if (!list) return;

    if (orders.length === 0) {
        list.innerHTML = `<div style="text-align:center;padding:60px 0;color:var(--text-muted)">
            <p style="font-size:2.5rem;margin-bottom:12px">📭</p>
            <p>Không có đơn hàng nào</p>
        </div>`;
        return;
    }

    list.innerHTML = `
    <table style="width:100%;border-collapse:collapse;font-size:0.83rem">
      <thead>
        <tr style="background:var(--bg3);text-align:left">
          <th style="padding:11px 14px;font-weight:700;color:var(--text-muted);border-bottom:2px solid var(--border);white-space:nowrap">Mã đơn</th>
          <th style="padding:11px 14px;font-weight:700;color:var(--text-muted);border-bottom:2px solid var(--border)">Khách hàng</th>
          <th style="padding:11px 14px;font-weight:700;color:var(--text-muted);border-bottom:2px solid var(--border)">Sản phẩm</th>
          <th style="padding:11px 14px;font-weight:700;color:var(--text-muted);border-bottom:2px solid var(--border);white-space:nowrap">Tổng tiền</th>
          <th style="padding:11px 14px;font-weight:700;color:var(--text-muted);border-bottom:2px solid var(--border);white-space:nowrap">Ngày đặt</th>
          <th style="padding:11px 14px;font-weight:700;color:var(--text-muted);border-bottom:2px solid var(--border)">Trạng thái</th>
          <th style="padding:11px 14px;font-weight:700;color:var(--text-muted);border-bottom:2px solid var(--border)">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map((o, idx) => {
        const color = STATUS_COLOR[o.status] || "#888";
        const label = STATUS_LABEL[o.status] || o.status;
        const itemSummary = (o.items || []).slice(0, 2).map(i =>
            `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
                    <img src="${i.image}" style="width:30px;height:30px;border-radius:5px;object-fit:cover;flex-shrink:0" onerror="imgErr(this,'30x30','IMG')">
                    <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px">${i.name} <span style="color:var(--text-muted)">x${i.qty}</span></span>
                </div>`).join("");
        const moreItems = o.items?.length > 2 ? `<span style="color:var(--text-muted);font-size:0.75rem">+${o.items.length - 2} sản phẩm</span>` : "";
        const rowBg = idx % 2 === 0 ? "var(--bg2)" : "var(--bg3)";
        return `<tr style="background:${rowBg};border-bottom:1px solid var(--border)" id="admin-row-${o.id}">
              <td style="padding:12px 14px;vertical-align:top;white-space:nowrap">
                <strong style="color:var(--orange)">#${o.id}</strong>
              </td>
              <td style="padding:12px 14px;vertical-align:top;min-width:150px">
                <p style="font-weight:600;margin:0 0 2px">${o.customer?.name || "—"}</p>
                <p style="color:var(--text-muted);font-size:0.75rem;margin:0">${o.customer?.phone || ""}</p>
                <p style="color:var(--text-muted);font-size:0.75rem;margin:2px 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px">${o.customer?.address || ""}</p>
              </td>
              <td style="padding:12px 14px;vertical-align:top;min-width:200px">${itemSummary}${moreItems}</td>
              <td style="padding:12px 14px;vertical-align:top;white-space:nowrap">
                <strong style="color:var(--orange)">${(o.total || 0).toLocaleString("vi-VN")}đ</strong>
                <p style="font-size:0.72rem;color:var(--text-muted);margin:2px 0 0">${o.paymentMethod === "card" ? "💳 Thẻ" : "📦 COD"}</p>
              </td>
              <td style="padding:12px 14px;vertical-align:top;white-space:nowrap;color:var(--text-muted)">${o.date || "—"}</td>
              <td style="padding:12px 14px;vertical-align:top">
                <span style="display:inline-block;padding:4px 10px;border-radius:20px;font-size:0.72rem;font-weight:700;background:${color}22;color:${color};white-space:nowrap">${label}</span>
              </td>
              <td style="padding:12px 14px;vertical-align:top">
                <select onchange="updateAdminOrderStatus('${o._uid}', ${o.id}, this.value)"
                  style="padding:6px 10px;border-radius:7px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:0.78rem;cursor:pointer;outline:none;width:100%">
                  ${Object.entries(STATUS_LABEL).map(([v, l]) =>
            `<option value="${v}" ${o.status === v ? "selected" : ""}>${l}</option>`).join("")}
                </select>
              </td>
            </tr>`;
    }).join("")}
      </tbody>
    </table>`;
};

window.updateAdminOrderStatus = function (uid, orderId, newStatus) {
    const key = `bs_orders_${uid}`;
    const orders = JSON.parse(localStorage.getItem(key) || "[]");
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    order.status = newStatus;
    localStorage.setItem(key, JSON.stringify(orders));
    showToast(`✅ Cập nhật đơn #${orderId} → ${STATUS_LABEL[newStatus]}`, "success");
    renderAdminStats();
    renderAdminOrders();
};


// ─── VOUCHER SYSTEM ───────────────────────────
const VOUCHERS = {
    "NIKE20": {
        code: "NIKE20",
        type: "percent",        // phần trăm
        value: 20,              // 20%
        condition: (cart) => cart.some(i => i.brand === "nike"),
        conditionMsg: "Chỉ áp dụng cho sản phẩm Nike",
        desc: "Giảm 20% toàn bộ sản phẩm Nike",
        expiry: new Date("2026-12-31"),
    },
    "FREESHIP": {
        code: "FREESHIP",
        type: "fixed",          // cố định
        value: 50000,           // giảm 50.000đ
        minOrder: 500000,       // đơn tối thiểu 500K
        condition: (cart, total) => total >= 500000,
        conditionMsg: "Đơn hàng tối thiểu 500.000đ",
        desc: "Freeship – Giảm 50.000đ cho đơn từ 500K",
        expiry: null,           // không hết hạn
    },
    "NEWBIE15": {
        code: "NEWBIE15",
        type: "percent",
        value: 15,
        condition: () => true,
        conditionMsg: "",
        desc: "Giảm 15% cho khách hàng mới",
        expiry: null,
        oneTime: true,          // chỉ dùng 1 lần
    },
};

// Tính số tiền giảm
function calcDiscount(voucher, subtotal) {
    if (voucher.type === "percent") {
        return Math.round(subtotal * voucher.value / 100);
    }
    if (voucher.type === "fixed") {
        return Math.min(voucher.value, subtotal);
    }
    return 0;
}
window.calcDiscount = calcDiscount;

// Cập nhật hiển thị tổng tiền checkout
function updateCheckoutTotals() {
    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const voucher = window._appliedVoucher || null;
    const discount = voucher ? calcDiscount(voucher, subtotal) : 0;
    const total = subtotal - discount;

    const subtotalEl = document.getElementById("checkoutSubtotal");
    const totalEl = document.getElementById("checkoutTotal");
    const discountRow = document.getElementById("checkoutDiscountRow");
    const discountEl = document.getElementById("checkoutDiscount");
    const voucherCodeEl = document.getElementById("checkoutVoucherCode");

    if (subtotalEl) subtotalEl.textContent = fmt(subtotal);
    if (totalEl) totalEl.textContent = fmt(total);
    if (discountRow) discountRow.style.display = discount > 0 ? "flex" : "none";
    if (discountEl) discountEl.textContent = "-" + fmt(discount);
    if (voucherCodeEl && voucher) voucherCodeEl.textContent = voucher.code;
}
window.updateCheckoutTotals = updateCheckoutTotals;

window.applyVoucher = function () {
    const code = (document.getElementById("ck-voucher")?.value || "").trim().toUpperCase();
    const msgEl = document.getElementById("voucherMsg");
    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

    function setMsg(text, ok) {
        if (!msgEl) return;
        msgEl.style.display = "block";
        msgEl.style.color = ok ? "#10b981" : "#ef4444";
        msgEl.textContent = text;
    }

    if (!code) { setMsg("⚠️ Vui lòng nhập mã voucher.", false); return; }

    const voucher = VOUCHERS[code];
    if (!voucher) { setMsg("❌ Mã voucher không hợp lệ.", false); window._appliedVoucher = null; updateCheckoutTotals(); return; }

    // Kiểm tra hết hạn
    if (voucher.expiry && new Date() > voucher.expiry) {
        setMsg("❌ Mã voucher đã hết hạn.", false);
        window._appliedVoucher = null; updateCheckoutTotals(); return;
    }

    // Kiểm tra dùng 1 lần
    if (voucher.oneTime) {
        const raw = localStorage.getItem("adidas_current_user");
        if (raw) {
            const uid = JSON.parse(raw).uid;
            const used = JSON.parse(localStorage.getItem(`bs_used_vouchers_${uid}`) || "[]");
            if (used.includes(code)) {
                setMsg("❌ Bạn đã sử dụng mã này rồi.", false);
                window._appliedVoucher = null; updateCheckoutTotals(); return;
            }
        }
    }

    // Kiểm tra điều kiện
    if (!voucher.condition(cart, subtotal)) {
        setMsg("⚠️ " + voucher.conditionMsg, false);
        window._appliedVoucher = null; updateCheckoutTotals(); return;
    }

    window._appliedVoucher = voucher;
    updateCheckoutTotals();
    const discount = calcDiscount(voucher, subtotal);
    setMsg(`✅ Áp dụng thành công! Giảm ${fmt(discount)}`, true);
};

// Gọi sau khi đặt hàng thành công để đánh dấu voucher 1 lần đã dùng
window.markVoucherUsed = function () {
    const voucher = window._appliedVoucher;
    if (!voucher || !voucher.oneTime) return;
    const raw = localStorage.getItem("adidas_current_user");
    if (!raw) return;
    const uid = JSON.parse(raw).uid;
    const key = `bs_used_vouchers_${uid}`;
    const used = JSON.parse(localStorage.getItem(key) || "[]");
    if (!used.includes(voucher.code)) {
        used.push(voucher.code);
        localStorage.setItem(key, JSON.stringify(used));
    }
};