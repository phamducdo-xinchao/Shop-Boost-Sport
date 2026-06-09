
// ─── DỮ LIỆU SẢN PHẨM ────────────────────────
const PRODUCTS = [
    // ── GIÀY ──
    {
        id: 1,
        name: "Nike Air Max 270 React",
        brand: "nike",
        category: "giay",
        price: 2_890_000,
        originalPrice: 3_500_000,
        tags: ["hot", "bestseller"],
        sizes: [38, 39, 40, 41, 42, 43],
        stars: 5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        desc: "Đệm Air Max 270 mang lại độ đàn hồi tối ưu cho mỗi bước chạy. Thiết kế hiện đại, phù hợp cả tập luyện lẫn thời trang đường phố.",
    },
    {
        id: 2,
        name: "Adidas Ultraboost 22",
        brand: "adidas",
        category: "giay",
        price: 3_200_000,
        originalPrice: 4_000_000,
        tags: ["hot", "sale"],
        sizes: [39, 40, 41, 42, 43, 44],
        stars: 5,
        reviews: 95,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
        desc: "Công nghệ Boost mang lại năng lượng hoàn trả tối đa. Đế ngoài Continental™ bám đường xuất sắc trong mọi điều kiện thời tiết.",
    },
    {
        id: 3,
        name: "Puma RS-X³ Puzzle",
        brand: "puma",
        category: "giay",
        price: 1_950_000,
        originalPrice: 2_400_000,
        tags: ["new", "sale"],
        sizes: [38, 39, 40, 41, 42],
        stars: 4,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&q=80",
        desc: "Phong cách chunky retro kết hợp lớp đế RS (Running System) siêu nhẹ. Màu sắc nổi bật, cá tính mạnh mẽ.",
    },
    {
        id: 4,
        name: "Converse Chuck Taylor All Star",
        brand: "converse",
        category: "giay",
        price: 1_290_000,
        originalPrice: null,
        tags: ["bestseller"],
        sizes: [36, 37, 38, 39, 40, 41, 42],
        stars: 5,
        reviews: 312,
        image: "https://images.unsplash.com/photo-1494496195158-c3bc6b26dca9?w=500&q=80",
        desc: "Huyền thoại canvas bất diệt từ 1917. Cổ cao classic với đế cao su vulcanized bền bỉ theo thời gian.",
    },
    {
        id: 5,
        name: "New Balance 574 Core",
        brand: "new-balance",
        category: "giay",
        price: 2_150_000,
        originalPrice: 2_600_000,
        tags: ["new"],
        sizes: [39, 40, 41, 42, 43, 44],
        stars: 4,
        reviews: 84,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        desc: "Đôi giày cổ điển với công nghệ ENCAP mang lại sự thoải mái suốt cả ngày. Chất liệu suede & mesh cao cấp.",
    },
    {
        id: 6,
        name: "Vans Old Skool Pro",
        brand: "vans",
        category: "giay",
        price: 1_490_000,
        originalPrice: 1_800_000,
        tags: ["sale", "hot"],
        sizes: [36, 37, 38, 39, 40, 41, 42, 43],
        stars: 4,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80",
        desc: "Phiên bản Pro với lớp lót Ultracush HD, tăng cường đệm và thoải mái cho skate hoặc streetwear hàng ngày.",
    },
    {
        id: 7,
        name: "Nike Air Force 1 '07",
        brand: "nike",
        category: "giay",
        price: 2_500_000,
        originalPrice: null,
        tags: ["bestseller", "hot"],
        sizes: [38, 39, 40, 41, 42, 43, 44],
        stars: 5,
        reviews: 247,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        desc: "Biểu tượng bóng rổ kể từ 1982, nay trở thành cột mốc của văn hóa streetwear toàn cầu. Đế Air bất hủ.",
    },
    {
        id: 8,
        name: "Adidas Stan Smith",
        brand: "adidas",
        category: "giay",
        price: 1_890_000,
        originalPrice: 2_200_000,
        tags: ["new", "sale"],
        sizes: [37, 38, 39, 40, 41, 42, 43],
        stars: 4,
        reviews: 193,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
        desc: "Giày tennis trắng tinh khôi với điểm nhấn xanh lá. Thiết kế tối giản trường tồn qua hơn 50 năm lịch sử.",
    },

    // ── DÉP ──
    {
        id: 9,
        name: "Adidas Adilette Aqua",
        brand: "adidas",
        category: "dep",
        price: 590_000,
        originalPrice: 750_000,
        tags: ["bestseller", "sale"],
        sizes: [38, 39, 40, 41, 42, 43],
        stars: 4,
        reviews: 220,
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80",
        desc: "Dép quai ngang nhẹ nhàng với đế EVA siêu êm. Chất liệu nhanh khô, lý tưởng cho hồ bơi và biển.",
    },
    {
        id: 10,
        name: "Nike Benassi JDI",
        brand: "nike",
        category: "dep",
        price: 650_000,
        originalPrice: null,
        tags: ["hot"],
        sizes: [37, 38, 39, 40, 41, 42],
        stars: 4,
        reviews: 178,
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80",
        desc: "Dép slide phong cách với quai dệt thêu logo Swoosh. Đế Phylon nhẹ và đàn hồi tốt cho mọi hoạt động.",
    },
    {
        id: 11,
        name: "Puma Cool Cat 2.0",
        brand: "puma",
        category: "dep",
        price: 480_000,
        originalPrice: 620_000,
        tags: ["new", "sale"],
        sizes: [36, 37, 38, 39, 40, 41, 42],
        stars: 3,
        reviews: 54,
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80",
        desc: "Dép unisex với phần quai rộng dễ điều chỉnh. Đế cao su mềm chống trơn trượt hiệu quả.",
    },
    {
        id: 12,
        name: "Under Armour Ignite Select",
        brand: "under-armour",
        category: "dep",
        price: 720_000,
        originalPrice: 900_000,
        tags: ["new"],
        sizes: [39, 40, 41, 42, 43, 44],
        stars: 4,
        reviews: 41,
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80",
        desc: "Công nghệ OrthoLite® mang lại sự thoải mái vượt trội sau các buổi tập luyện cường độ cao.",
    },

    // ── QUẦN ÁO ──
    {
        id: 13,
        name: "Nike Dri-FIT ADV Run Division",
        brand: "nike",
        category: "quan-ao",
        price: 1_290_000,
        originalPrice: 1_600_000,
        tags: ["hot", "sale"],
        sizes: [38, 40, 42, 44],
        stars: 5,
        reviews: 88,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80",
        desc: "Áo chạy bộ với công nghệ Dri-FIT ADV hút ẩm cực mạnh. Cấu trúc lưới thoáng khí tối ưu hóa cho tốc độ.",
    },
    {
        id: 14,
        name: "Adidas Tiro 23 Track Jacket",
        brand: "adidas",
        category: "quan-ao",
        price: 1_150_000,
        originalPrice: null,
        tags: ["bestseller", "new"],
        sizes: [38, 40, 42, 44, 46],
        stars: 4,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80",
        desc: "Áo khoác track jacket biểu tượng của Adidas. Vải polyester tái chế 100%, góp phần bảo vệ môi trường.",
    },
    {
        id: 15,
        name: "Puma Evostripe Full-Zip Hoodie",
        brand: "puma",
        category: "quan-ao",
        price: 990_000,
        originalPrice: 1_300_000,
        tags: ["sale"],
        sizes: [38, 40, 42, 44],
        stars: 4,
        reviews: 63,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80",
        desc: "Hoodie khóa kéo toàn thân từ chất liệu fleece mềm mại. Phần ôm vừa vặn, hoàn hảo cho tập gym hay dạo phố.",
    },
    {
        id: 16,
        name: "Under Armour Challenger Pro Pants",
        brand: "under-armour",
        category: "quan-ao",
        price: 850_000,
        originalPrice: 1_100_000,
        tags: ["hot", "sale"],
        sizes: [38, 40, 42, 44, 46],
        stars: 4,
        reviews: 77,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80",
        desc: "Quần track pants với vải woven chắn gió nhẹ. Thiết kế ergonomic theo chuyển động tự nhiên của cơ thể.",
    },
    {
        id: 17,
        name: "Reebok Identity Fleece Shorts",
        brand: "reebok",
        category: "quan-ao",
        price: 650_000,
        originalPrice: null,
        tags: ["new"],
        sizes: [38, 40, 42, 44],
        stars: 3,
        reviews: 29,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80",
        desc: "Quần short fleece unisex với logo Reebok Vector nổi bật. Lưng thun rộng thoải mái cho mọi hoạt động.",
    },

    // ── PHỤ KIỆN ──
    {
        id: 18,
        name: "Nike Heritage86 Cap",
        brand: "nike",
        category: "phu-kien",
        price: 450_000,
        originalPrice: 590_000,
        tags: ["bestseller", "sale"],
        sizes: [40],
        stars: 4,
        reviews: 145,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
        desc: "Mũ lưỡi trai 6 mảnh với dây điều chỉnh phía sau. Vải Dri-FIT giữ đầu luôn mát khi vận động.",
    },
    {
        id: 19,
        name: "Adidas Running Water Bottle 750ml",
        brand: "adidas",
        category: "phu-kien",
        price: 320_000,
        originalPrice: null,
        tags: ["new"],
        sizes: [40],
        stars: 4,
        reviews: 58,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
        desc: "Bình nước 750ml không chứa BPA với nắp flip-top tiện lợi. Giữ lạnh 12 giờ, giữ nóng 6 giờ.",
    },
    {
        id: 20,
        name: "Puma Training Gloves Pro",
        brand: "puma",
        category: "phu-kien",
        price: 380_000,
        originalPrice: 490_000,
        tags: ["hot", "sale"],
        sizes: [38, 40, 42],
        stars: 4,
        reviews: 37,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
        desc: "Găng tay tập gym với lớp đệm gel bảo vệ lòng bàn tay. Dây quấn cổ tay hỗ trợ và ổn định khớp.",
    },
    {
        id: 21,
        name: "New Balance Sport Backpack 25L",
        brand: "new-balance",
        category: "phu-kien",
        price: 890_000,
        originalPrice: 1_100_000,
        tags: ["new", "hot"],
        sizes: [40],
        stars: 5,
        reviews: 66,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
        desc: "Balo thể thao 25L với ngăn riêng cho giày và quần áo ướt. Dây đeo có đệm thoáng khí, phân tán tải trọng.",
    },
    {
        id: 22,
        name: "Under Armour SportsMask",
        brand: "under-armour",
        category: "phu-kien",
        price: 290_000,
        originalPrice: 380_000,
        tags: ["sale"],
        sizes: [40],
        stars: 3,
        reviews: 24,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
        desc: "Khẩu trang thể thao với lớp lọc 3D thoáng khí. Vải UA Iso-Chill giúp mát hơn khi vận động mạnh.",
    },
    {
        id: 23,
        name: "Nike Dri-FIT Wristband Set",
        brand: "nike",
        category: "phu-kien",
        price: 190_000,
        originalPrice: null,
        tags: ["bestseller"],
        sizes: [40],
        stars: 4,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
        desc: "Bộ băng cổ tay Dri-FIT thấm hút mồ hôi nhanh. Thiết kế co giãn, vừa vặn nhiều kích cỡ cổ tay.",
    },
    {
        id: 24,
        name: "Adidas Tiro League Shin Guards",
        brand: "adidas",
        category: "phu-kien",
        price: 240_000,
        originalPrice: 310_000,
        tags: ["new", "sale"],
        sizes: [38, 40, 42],
        stars: 4,
        reviews: 51,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
        desc: "Miếng bảo vệ ống chân bóng đá với lớp xốp EVA hấp thụ va đập. Nhẹ, ôm sát, không cản chuyển động.",
    },
];

// ─── TRẠNG THÁI ──────────────────────────────
let cart = JSON.parse(localStorage.getItem("bs_cart") || "[]");
let activeTab = "hot";
let selectedSize = null;
let currentPage = 1;
const PAGE_SIZE = 8;
let filteredProducts = [];

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
    localStorage.setItem("bs_cart", JSON.stringify(cart));
}

function initCartUI() {
    document.getElementById("cartBtn")?.addEventListener("click", openCart);
    renderCart();
}

function openCart() {
    document.getElementById("cartSidebar").classList.add("open");
    document.getElementById("cartOverlay").classList.add("active");
    document.body.style.overflow = "hidden";
}
window.openCart = openCart;

function closeCart() {
    document.getElementById("cartSidebar").classList.remove("open");
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

// ─── WISHLIST (đơn giản) ─────────────────────
window.wishlist = function (event, id) {
    event.stopPropagation();
    showToast("💖 Đã thêm vào danh sách yêu thích", "info");
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