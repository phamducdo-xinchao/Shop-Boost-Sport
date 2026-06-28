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

    // Reset voucher state
    window._appliedVoucher = null;
    const voucherInput = document.getElementById("ck-voucher");
    const voucherMsg = document.getElementById("voucherMsg");
    const discountRow = document.getElementById("checkoutDiscountRow");
    if (voucherInput) voucherInput.value = "";
    if (voucherMsg) { voucherMsg.style.display = "none"; voucherMsg.textContent = ""; }
    if (discountRow) discountRow.style.display = "none";

    updateCheckoutTotals();

    document.getElementById("checkoutOverlay").classList.add("active");
    document.getElementById("checkoutModal").classList.add("active");
};

window.closeCheckout = function () {
    document.getElementById("checkoutOverlay").classList.remove("active");
    document.getElementById("checkoutModal").classList.remove("active");
};

// ─── PHƯƠNG THỨC THANH TOÁN ──────────────────
window.togglePaymentFields = function () {
    const selected = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    const cardFields = document.getElementById("cardFields");
    const mbbankFields = document.getElementById("mbbankFields");
    const momoFields = document.getElementById("momoFields");
    const vnpayFields = document.getElementById("vnpayFields");

    const isCard = selected === "card";
    if (cardFields) cardFields.style.display = isCard ? "flex" : "none";
    if (mbbankFields) mbbankFields.style.display = selected === "mbbank" ? "flex" : "none";
    if (momoFields) momoFields.style.display = selected === "momo" ? "flex" : "none";
    if (vnpayFields) vnpayFields.style.display = selected === "vnpay" ? "flex" : "none";

    ["ck-cardNumber", "ck-cardExpiry", "ck-cardCvv"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.required = isCard;
    });
};

window.placeOrder = function (event) {
    event.preventDefault();

    const name = document.getElementById("ck-name").value.trim();
    const phone = document.getElementById("ck-phone").value.trim();
    const email = document.getElementById("ck-email").value.trim();
    const address = document.getElementById("ck-address").value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || "cod";

    // ── VALIDATE SỐ ĐIỆN THOẠI: bắt đầu bằng 0, đủ 10 chữ số ──
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
        showToast("📱 Số điện thoại không hợp lệ! Phải bắt đầu bằng số 0 và có đủ 10 chữ số.", "error");
        document.getElementById("ck-phone").focus();
        return;
    }

    // ── VALIDATE EMAIL: bắt buộc đuôi @gmail.com ──
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        showToast("📧 Email không hợp lệ! Vui lòng dùng email có đuôi @gmail.com.", "error");
        document.getElementById("ck-email").focus();
        return;
    }

    // ── VALIDATE THÔNG TIN THẺ (nếu chọn thanh toán bằng thẻ) ──
    if (paymentMethod === "card") {
        const cardNumber = document.getElementById("ck-cardNumber").value.replace(/\s/g, "");
        const cardExpiry = document.getElementById("ck-cardExpiry").value.trim();
        const cardCvv = document.getElementById("ck-cardCvv").value.trim();

        if (!/^\d{16}$/.test(cardNumber)) {
            showToast("💳 Số thẻ không hợp lệ! Vui lòng nhập đủ 16 chữ số.", "error");
            document.getElementById("ck-cardNumber").focus();
            return;
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
            showToast("💳 Ngày hết hạn không hợp lệ! Định dạng MM/YY.", "error");
            document.getElementById("ck-cardExpiry").focus();
            return;
        }
        if (!/^\d{3,4}$/.test(cardCvv)) {
            showToast("💳 Mã CVV không hợp lệ!", "error");
            document.getElementById("ck-cardCvv").focus();
            return;
        }
    }

    // ── THÊM: lưu đơn hàng vào localStorage ──
    const raw = localStorage.getItem("adidas_current_user");
    if (raw) {
        const uid = JSON.parse(raw).uid;
        const key = `bs_orders_${uid}`;
        const orders = JSON.parse(localStorage.getItem(key) || "[]");
        const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
        const voucher = window._appliedVoucher || null;
        const discount = voucher ? calcDiscount(voucher, subtotal) : 0;
        orders.unshift({
            id: Date.now(),
            status: "delivering",
            items: cart.map(c => ({ ...c })),
            subtotal,
            discount,
            voucher: voucher ? voucher.code : null,
            total: subtotal - discount,
            date: new Date().toLocaleDateString("vi-VN"),
            customer: { name, phone, email, address },
            paymentMethod,
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
    togglePaymentFields();
    window._appliedVoucher = null;
    if (typeof markVoucherUsed === "function") markVoucherUsed();

    const toastMessages = {
        card: "🎉 Thanh toán thẻ thành công! Cảm ơn bạn đã mua sắm.",
        mbbank: "🏦 Đặt hàng thành công! Vui lòng chuyển khoản MB Bank để xác nhận đơn.",
        momo: "💜 Đặt hàng thành công! Vui lòng thanh toán qua ví MoMo để xác nhận.",
        vnpay: "💙 Đặt hàng thành công! Vui lòng thanh toán qua VNPAY để xác nhận.",
    };
    showToast(toastMessages[paymentMethod] || "🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm.", "success");
};

// ─── WISHLIST (đơn giản) ─────────────────────
window.wishlist = function (event, id) {
    event.stopPropagation();
    showToast("💖 Đã thêm vào danh sách yêu thích", "info");
};