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
    document.querySelectorAll(".profile-tab").forEach((b) => b.classList.remove("active"));
    document.querySelector(`.profile-tab[onclick*="${tab}"]`)?.classList.add("active");
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