// ─── TRẠNG THÁI ──────────────────────────────
function getCartKey() {
    const raw = localStorage.getItem("adidas_current_user");
    const uid = raw ? JSON.parse(raw).uid : "guest";
    return `bs_cart_${uid}`;
}
let cart = JSON.parse(localStorage.getItem(getCartKey()) || "[]");
let activeTab = "hot";
let selectedSize = null;
let currentPage = 1;
const PAGE_SIZE = 8;
let filteredProducts = [];

// ─── GIỎ HÀNG ────────────────────────────────
function addToCart(event, id) {
    event.stopPropagation();
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    addCartItem(p, p.sizes[0], 1);
}
window.addToCart = addToCart;

function addCartItem(product, size, qty = 1) {
    const key = `${product.id}-${size}`;
    const existing = cart.find((c) => c.key === key);
    if (existing) {
        existing.qty = Math.min(existing.qty + qty, 10);
    } else {
        cart.push({ key, id: product.id, name: product.name, brand: product.brand, price: product.price, image: product.image, size, qty });
    }
    saveCart();
    renderCart();
    showToast(`✓ Đã thêm ${product.name} vào giỏ`, "success");
}

function saveCart() {
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
}

function initCartUI() {
    document.getElementById("cartBtn")?.addEventListener("click", openCart);
    renderCart();
}

function openCart() {
    document.getElementById("cartSidebar").classList.add("active");
    document.getElementById("cartOverlay").classList.add("active");
    document.body.style.overflow = "hidden";
}
window.openCart = openCart;

function closeCart() {
    document.getElementById("cartSidebar").classList.remove("active");
    document.getElementById("cartOverlay").classList.remove("active");
    document.body.style.overflow = "";
}
window.closeCart = closeCart;

function renderCart() {
    const body = document.getElementById("cartBody");
    const empty = document.getElementById("cartEmpty");
    const footer = document.getElementById("cartFooter");
    const countEl = document.getElementById("cartCount");

    const totalQty = cart.reduce((s, c) => s + c.qty, 0);
    if (countEl) countEl.textContent = totalQty;

    if (!body) return;

    if (cart.length === 0) {
        body.innerHTML = `<div class="cart-empty"><p>Giỏ hàng trống</p></div>`;
        if (footer) footer.style.display = "none";
        return;
    }

    if (footer) footer.style.display = "block";
    body.innerHTML = cart
        .map(
            (item) => `
    <div class="cart-item" id="ci-${item.key}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" style="width:70px;height:70px;border-radius:8px;object-fit:cover;flex-shrink:0" onerror="imgErr(this,'70x70','IMG')">
      <div style="flex:1;min-width:0">
        <p class="cart-item-name" style="font-weight:600;font-size:0.875rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${item.name}</p>
        <p style="font-size:0.75rem;color:var(--text-muted);margin:2px 0">Size: ${item.size} · ${item.brand.replace(/-/g, " ")}</p>
        <p class="cart-item-price">${fmt(item.price)}</p>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty('${item.key}',-1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.key}',1)">+</button>
          <button class="cart-item-remove" onclick="removeCartItem('${item.key}')">✕ Xóa</button>
        </div>
      </div>
    </div>`
        )
        .join("");

    const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const totalEl = document.getElementById("cartTotal");
    if (totalEl) totalEl.textContent = fmt(total);
}

window.changeQty = function (key, delta) {
    const item = cart.find((c) => c.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter((c) => c.key !== key);
    } else if (item.qty > 10) {
        item.qty = 10;
    }
    saveCart();
    renderCart();
};

window.removeCartItem = function (key) {
    cart = cart.filter((c) => c.key !== key);
    saveCart();
    renderCart();
};

// ─── THANH TOÁN ──────────────────────────────
window.openCheckout = function () {
    const raw = localStorage.getItem("adidas_current_user");
    if (!raw) {
        showToast("🔐 Vui lòng đăng nhập để đặt hàng!", "info");
        setTimeout(() => {
            window.location.href = "./dang_ki/dangki_dangnhap.html";
        }, 1500);
        return;
    }
    if (cart.length === 0) {
        showToast("🛒 Giỏ hàng của bạn đang trống", "info");
        return;
    }

    const itemsEl = document.getElementById("checkoutItems");
    itemsEl.innerHTML = cart
        .map(
            (item) => `
      <div style="display:flex; gap:12px; align-items:center">
        <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;border-radius:8px;object-fit:cover;flex-shrink:0" onerror="imgErr(this,'50x50','IMG')">
        <div style="flex:1; min-width:0">
          <p style="font-size:0.85rem; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${item.name}</p>
          <p style="font-size:0.75rem; color:var(--text-muted)">Size ${item.size} · x${item.qty}</p>
        </div>
        <strong style="font-size:0.85rem; flex-shrink:0">${fmt(item.price * item.qty)}</strong>
      </div>`
        )
        .join("");

    const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
    document.getElementById("checkoutTotal").textContent = fmt(total);

    document.getElementById("checkoutOverlay").classList.add("active");
    document.getElementById("checkoutModal").classList.add("active");
};

window.closeCheckout = function () {
    document.getElementById("checkoutOverlay").classList.remove("active");
    document.getElementById("checkoutModal").classList.remove("active");
};

window.placeOrder = function (event) {
    event.preventDefault();

    // ── THÊM: lưu đơn hàng vào localStorage ──
    const raw = localStorage.getItem("adidas_current_user");
    if (raw) {
        const uid = JSON.parse(raw).uid;
        const key = `bs_orders_${uid}`;
        const orders = JSON.parse(localStorage.getItem(key) || "[]");
        orders.unshift({
            id: Date.now(),
            status: "delivering",   // trạng thái mặc định sau khi đặt
            items: cart.map(c => ({ ...c })),
            total: cart.reduce((s, c) => s + c.price * c.qty, 0),
            date: new Date().toLocaleDateString("vi-VN"),
        });
        localStorage.setItem(key, JSON.stringify(orders));
    }
    // ── KẾT THÚC THÊM ──

    cart = [];
    saveCart();
    renderCart();
    closeCheckout();
    closeCart();
    event.target.reset();

    showToast("🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm.", "success");
};

// ─── WISHLIST (đơn giản) ─────────────────────
window.wishlist = function (event, id) {
    event.stopPropagation();
    showToast("💖 Đã thêm vào danh sách yêu thích", "info");
};
