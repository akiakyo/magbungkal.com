/*
==================================================
MAGBUNGKAL MC
Store V3
Literal products currently offered for sale
==================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    const STORE_DATA = {
        serverIp: "play.magbungkal.com",
        discordUrl: "https://discord.gg/shyBMGTV6C",

        paymentMethods: [
            {
                id: "gcash",
                label: "GCash",
                logo: "images/gcash.png",
                qrCode: "images/gcashqrcode.png",
                description: "Philippine mobile wallet",
                accountName: "ARIEL V",
                accountLabel: "Mobile Number",
                accountValue: "09157317051",
                userId: "WDY5PQ"
            },
            {
                id: "paypal",
                label: "PayPal",
                logo: "https://pngimg.com/uploads/paypal/paypal_PNG7.png",
                description: "Currently under maintenance",
                maintenance: true
                /* Restore these details when PayPal becomes available:
                accountName: "YOUR PAYPAL NAME",
                accountLabel: "PayPal",
                accountValue: "YOUR PAYPAL LINK"
                */
            },
            {
                id: "maribank",
                label: "MariBank",
                logo: "https://images.seeklogo.com/logo-png/66/1/maribank-logo-png_seeklogo-660295.png",
                description: "Currently under maintenance",
                maintenance: true
                /* Restore these details when MariBank becomes available:
                accountName: "YOUR MARIBANK NAME",
                accountLabel: "Account Number",
                accountValue: "YOUR ACCOUNT NUMBER"
                */
            },
            {
                id: "maya",
                label: "Maya",
                logo: "https://assets-eu-01.kc-usercontent.com/44bc0180-e274-014f-6b99-e5fc8ab7f759/bc691f85-09de-48ff-9746-e954cf86378d/Maya_logo.svg.png",
                description: "Currently under maintenance",
                maintenance: true
                /* Restore these details when Maya becomes available:
                accountName: "YOUR MAYA NAME",
                accountLabel: "Mobile Number",
                accountValue: "09XX XXX XXXX"
                */
            }
        ],

        keyPackages: [
            { quantity: 3, price: 100 },
            { quantity: 7, price: 200 },
            { quantity: 10, price: 350 }
        ],

        modes: {
            skyblock: {
                label: "SkyBlock-Economy",
                ranks: [
                    {
                        name: "Knight Rank",
                        shortName: "Knight",
                        price: 200,
                        period: "/month",
                        image: "images/knight.png",
                        basics: "Homes: 2 | Auction Slots: 2 | Player Vaults: 2 | PWarps: 2 | Jobs: 2",
                        sectionTitle: "Commands",
                        features: ["/dispose", "/feed", "/hat", "/realname", "/craft"]
                    },
                    {
                        name: "Viscount Rank",
                        shortName: "Viscount",
                        price: 500,
                        period: "/month",
                        image: "images/viscount.png",
                        basics: "Homes: 4 | Auction Slots: 4 | Player Vaults: 4 | PWarps: 4 | Jobs: 6",
                        sectionTitle: "Commands",
                        features: ["/back", "/clear", "/compass", "/ptime"]
                    },
                    {
                        name: "Duke Rank",
                        shortName: "Duke",
                        price: 700,
                        period: "/month",
                        image: "images/duke.png",
                        basics: "Homes: 10 | Auction Slots: 10 | Player Vaults: 10 | PWarps: 10 | Jobs: 10",
                        sectionTitle: "Perks",
                        features: ["/nickname (RGB+ Supported)", "/fly", "/heal", "/smite"]
                    }
                ],
                keys: [
                    { name: "Demon Edge Key", image: "images/demonedgeKey.png" },
                    { name: "Sakura Key", image: "images/sakuraKey.png" },
                    { name: "Radiance Key", image: "images/radianceKey.png" },
                    { name: "Dracula Key", image: "images/draculaKey.png" }
                ]
            },

            survival: {
                label: "Survival-Economy",
                ranks: [
                    {
                        name: "Patron Rank",
                        shortName: "Patron",
                        price: 200,
                        period: "/month",
                        image: "images/patron.png",
                        basics: "Homes: 2 | Auction Slots: 2 | Player Vaults: 2 | PWarps: 2 | Jobs: 2",
                        sectionTitle: "Commands",
                        features: ["/dispose", "/feed", "/hat", "/realname", "/craft"]
                    },
                    {
                        name: "Sovereign Rank",
                        shortName: "Sovereign",
                        price: 500,
                        period: "/month",
                        image: "images/sovereign.png",
                        basics: "Homes: 4 | Auction Slots: 4 | Player Vaults: 4 | PWarps: 4 | Jobs: 6",
                        sectionTitle: "Commands",
                        features: ["/back", "/clear", "/compass", "/ptime"]
                    },
                    {
                        name: "Luminary Rank",
                        shortName: "Luminary",
                        price: 700,
                        period: "/month",
                        image: "images/luminary.png",
                        basics: "Homes: 10 | Auction Slots: 10 | Player Vaults: 10 | PWarps: 10 | Jobs: 10",
                        sectionTitle: "Perks",
                        features: ["/nickname (RGB+ Supported)", "/fly", "/heal", "/smite"]
                    }
                ],
                keys: [
                    { name: "Demon Edge Key", image: "images/demonedgeKey.png" },
                    { name: "Sakura Key", image: "images/sakuraKey.png" },
                    { name: "Radiance Key", image: "images/radianceKey.png" },
                    { name: "Dracula Key", image: "images/draculaKey.png" }
                ]
            }
        }
    };

    const money = value =>
        `₱${Number(value).toLocaleString("en-PH")}`;

    const state = {
        mode: "skyblock",
        category: "all",
        search: "",
        sort: "featured",
        selectedProduct: null,
        selectedKeyPackage: STORE_DATA.keyPackages[0],
        selectedPayment: STORE_DATA.paymentMethods[0].id
    };

    const productGrid = document.getElementById("storeProductGrid");
    const emptyState = document.getElementById("storeEmptyState");
    const resultText = document.getElementById("storeResultText");
    const searchInput = document.getElementById("storeSearch");
    const searchLabel = searchInput?.closest(".store-v3-search");
    const searchClear = document.getElementById("storeSearchClear");
    const sortSelect = document.getElementById("storeSort");
    const toast = document.getElementById("storeToast");

    function showToast(message, options = {}) {
        if (!toast) return;

        const { type = "info", title = "Magbungkal MC", duration = 4200 } = options;
        const icon = type === "error" ? "fa-triangle-exclamation" : "fa-circle-info";

        toast.className = `store-v3-toast is-${type}`;
        toast.innerHTML = `
            <i class="fas ${icon}" aria-hidden="true"></i>
            <div class="store-v3-toast-copy">
                <strong>${title}</strong>
                <span>${message}</span>
            </div>
            <button class="store-v3-toast-close" type="button" aria-label="Close notification">
                <i class="fas fa-xmark" aria-hidden="true"></i>
            </button>
        `;

        requestAnimationFrame(() => toast.classList.add("show"));
        toast.querySelector(".store-v3-toast-close")?.addEventListener("click", () => {
            toast.classList.remove("show");
        }, { once: true });

        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(
            () => toast.classList.remove("show"),
            duration
        );
    }

    function showMaintenanceMessage(methodLabel) {
        showToast(
            `Sorry for the inconvenience. ${methodLabel} is currently under maintenance. Please create a ticket if you wish to proceed with this mode of payment.`,
            {
                type: "error",
                title: "Payment Method Unavailable",
                duration: 6000
            }
        );
    }

    async function copyServerIP(button) {
        const original = button.innerHTML;

        try {
            await navigator.clipboard.writeText(STORE_DATA.serverIp);
            button.innerHTML = '<i class="fas fa-check"></i> IP Copied!';
            showToast("Server IP copied.");
        } catch {
            window.prompt("Copy the server IP:", STORE_DATA.serverIp);
        }

        window.setTimeout(() => {
            button.innerHTML = original;
        }, 1600);
    }

    ["storeHeroCopyIP", "copyFooterIP"].forEach(id => {
        const button = document.getElementById(id);
        button?.addEventListener("click", () => copyServerIP(button));
    });

    const paymentBrandGrid =
        document.getElementById("storePaymentBrands");

    STORE_DATA.paymentMethods.forEach(method => {
        const card = document.createElement("article");
        card.className = `store-v3-payment-card${method.maintenance ? " is-maintenance" : ""}`;
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `${method.label}: ${method.description}`);
        card.innerHTML = `
            <img src="${method.logo}" alt="${method.label}" loading="lazy">
            <strong>${method.label}</strong>
            <span>${method.description}</span>
            ${method.maintenance ? '<em class="store-v3-maintenance-badge">Maintenance</em>' : ''}
        `;

        if (method.maintenance) {
            const showMethodMaintenance = () => showMaintenanceMessage(method.label);
            card.addEventListener("click", showMethodMaintenance);
            card.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    showMethodMaintenance();
                }
            });
        }

        paymentBrandGrid.appendChild(card);
    });

    function allProductsForMode() {
        const mode = STORE_DATA.modes[state.mode];

        const ranks = mode.ranks.map((rank, index) => ({
            ...rank,
            id: `${state.mode}-rank-${index}`,
            type: "rank",
            modeId: state.mode,
            modeLabel: mode.label,
            displayPrice: `${money(rank.price)}${rank.period}`,
            numericPrice: rank.price,
            description: `${rank.basics}.`
        }));

        const keys = mode.keys.map((key, index) => ({
            ...key,
            id: `${state.mode}-key-${index}`,
            type: "key",
            modeId: state.mode,
            modeLabel: mode.label,
            displayPrice: `From ${money(STORE_DATA.keyPackages[0].price)}`,
            numericPrice: STORE_DATA.keyPackages[0].price,
            description: `Available in 3×, 7×, and 10× key packages.`
        }));

        return [...ranks, ...keys];
    }

    function filteredProducts() {
        let products = allProductsForMode();

        if (state.category !== "all") {
            products = products.filter(
                product => product.type === state.category
            );
        }

        const term = state.search.trim().toLowerCase();

        if (term) {
            products = products.filter(product =>
                product.name.toLowerCase().includes(term) ||
                product.modeLabel.toLowerCase().includes(term) ||
                product.type.toLowerCase().includes(term)
            );
        }

        products.sort((a, b) => {
            if (state.sort === "price-asc") {
                return a.numericPrice - b.numericPrice;
            }

            if (state.sort === "price-desc") {
                return b.numericPrice - a.numericPrice;
            }

            if (state.sort === "name") {
                return a.name.localeCompare(b.name);
            }

            if (a.type !== b.type) {
                return a.type === "rank" ? -1 : 1;
            }

            return a.numericPrice - b.numericPrice;
        });

        return products;
    }

    function createProductCard(product) {
        const card = document.createElement("article");
        card.className = "store-v3-product";

        const badge =
            product.type === "rank" && product.numericPrice === 700
                ? "Highest Tier"
                : product.type === "key"
                    ? "Crate Key"
                    : "Rank";

        card.innerHTML = `
            <div class="store-v3-product-media">
                <span class="store-v3-badge">${badge}</span>
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>

            <div class="store-v3-product-body">
                <span class="store-v3-product-mode">
                    ${product.modeLabel} ${product.type === "rank" ? "Rank" : "Crate Key"}
                </span>

                <h3>${product.name}</h3>

                <p class="store-v3-product-description">
                    ${product.description}
                </p>

                <div class="store-v3-price">
                    <strong>${product.displayPrice}</strong>
                </div>

                <div class="store-v3-product-actions">
                    <button
                        class="store-v3-info-btn"
                        type="button"
                        aria-label="View ${product.name} details">
                        <i class="fas fa-circle-info"></i>
                    </button>

                    <button
                        class="store-v3-buy-btn"
                        type="button">
                        <i class="fas fa-cart-shopping"></i>
                        Purchase
                    </button>
                </div>
            </div>
        `;

        card.querySelector(".store-v3-info-btn")
            .addEventListener("click", () => openProductModal(product));

        card.querySelector(".store-v3-buy-btn")
            .addEventListener("click", () => openProductModal(product, true));

        return card;
    }

    function renderProducts() {
        const products = filteredProducts();

        productGrid.innerHTML = "";

        products.forEach(product =>
            productGrid.appendChild(createProductCard(product))
        );

        productGrid.hidden = products.length === 0;
        emptyState.hidden = products.length !== 0;

        const modeLabel = STORE_DATA.modes[state.mode].label;
        const categoryLabel =
            state.category === "all"
                ? "products"
                : state.category === "rank"
                    ? "ranks"
                    : "crate keys";

        resultText.textContent =
            `Showing ${products.length} ${modeLabel} ${categoryLabel}`;
    }

    function setMode(modeId, shouldScroll = false) {
        if (!STORE_DATA.modes[modeId]) return;

        state.mode = modeId;

        document.querySelectorAll("[data-store-mode]").forEach(button => {
            const active = button.dataset.storeMode === modeId;
            button.classList.toggle("active", active);

            if (button.hasAttribute("aria-selected")) {
                button.setAttribute("aria-selected", String(active));
            }
        });

        renderProducts();

        if (shouldScroll) {
            document.getElementById("storeCatalog")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    document.addEventListener("click", event => {
        const modeButton = event.target.closest("[data-store-mode]");

        if (!modeButton) return;

        event.preventDefault();
        setMode(modeButton.dataset.storeMode, true);
    });

    document.querySelectorAll("[data-store-category]").forEach(button => {
        button.addEventListener("click", () => {
            state.category = button.dataset.storeCategory;

            document.querySelectorAll("[data-store-category]").forEach(item => {
                item.classList.toggle(
                    "active",
                    item.dataset.storeCategory === state.category
                );
            });

            renderProducts();
        });
    });

    searchInput?.addEventListener("input", () => {
        state.search = searchInput.value;
        searchLabel?.classList.toggle("has-value", Boolean(state.search));
        renderProducts();
    });

    searchClear?.addEventListener("click", () => {
        searchInput.value = "";
        state.search = "";
        searchLabel?.classList.remove("has-value");
        searchInput.focus();
        renderProducts();
    });

    sortSelect?.addEventListener("change", () => {
        state.sort = sortSelect.value;
        renderProducts();
    });

    document.getElementById("storeResetControls")?.addEventListener("click", () => {
        state.category = "all";
        state.search = "";
        state.sort = "featured";

        searchInput.value = "";
        sortSelect.value = "featured";
        searchLabel?.classList.remove("has-value");

        document.querySelectorAll("[data-store-category]").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.storeCategory === "all"
            );
        });

        renderProducts();
    });

    const productModal = document.getElementById("storeProductModal");
    const productModalClose = document.getElementById("storeProductModalClose");
    const modalImage = document.getElementById("storeModalImage");
    const modalMode = document.getElementById("storeModalMode");
    const modalTitle = document.getElementById("storeModalTitle");
    const modalPrice = document.getElementById("storeModalPrice");
    const modalKeyPackages = document.getElementById("storeModalKeyPackages");
    const modalDetails = document.getElementById("storeModalDetails");
    const continueCheckout = document.getElementById("storeContinueCheckout");

    function openModal(modal) {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal(modal) {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");

        if (!document.querySelector(".store-v3-modal.open")) {
            document.body.style.overflow = "";
        }
    }

    function openProductModal(product, continueImmediately = false) {
        state.selectedProduct = product;
        state.selectedKeyPackage = STORE_DATA.keyPackages[0];

        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalMode.textContent = product.modeLabel;
        modalTitle.textContent = product.name;

        if (product.type === "key") {
            modalKeyPackages.hidden = false;
            modalKeyPackages.innerHTML = "";

            STORE_DATA.keyPackages.forEach((pkg, index) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className =
                    `store-v3-key-option${index === 0 ? " active" : ""}`;

                button.innerHTML = `
                    <strong>${pkg.quantity}× Keys</strong>
                    <span>${money(pkg.price)}</span>
                `;

                button.addEventListener("click", () => {
                    state.selectedKeyPackage = pkg;

                    modalKeyPackages.querySelectorAll("button").forEach(item =>
                        item.classList.toggle("active", item === button)
                    );

                    modalPrice.textContent = money(pkg.price);
                });

                modalKeyPackages.appendChild(button);
            });

            modalPrice.textContent = money(state.selectedKeyPackage.price);
            modalDetails.innerHTML = `
                <p>Choose one of the currently available crate key packages.</p>
                <ul>
                    ${STORE_DATA.keyPackages
                        .map(pkg => `<li>${pkg.quantity}× Keys — ${money(pkg.price)}</li>`)
                        .join("")}
                </ul>
            `;
        } else {
            modalKeyPackages.hidden = true;
            modalKeyPackages.innerHTML = "";
            modalPrice.textContent = `${money(product.price)}${product.period}`;
            modalDetails.innerHTML = `
                <p>${product.basics}</p>
                <h3>${product.sectionTitle}</h3>
                <ul>
                    ${product.features.map(feature => `<li>${feature}</li>`).join("")}
                </ul>
            `;
        }

        openModal(productModal);

        if (continueImmediately) {
            showToast("Review the product details, then continue to checkout.");
        }
    }

    productModalClose?.addEventListener("click", () =>
        closeModal(productModal)
    );

    productModal?.addEventListener("click", event => {
        if (event.target === productModal) {
            closeModal(productModal);
        }
    });

    const checkoutModal = document.getElementById("storeCheckoutModal");
    const checkoutClose = document.getElementById("storeCheckoutClose");
    const checkoutImage = document.getElementById("storeCheckoutImage");
    const checkoutMode = document.getElementById("storeCheckoutMode");
    const checkoutTitle = document.getElementById("storeCheckoutTitle");
    const checkoutPrice = document.getElementById("storeCheckoutPrice");
    const usernameInput = document.getElementById("storeCheckoutUsername");
    const paymentTabs = document.getElementById("storePaymentTabs");
    const paymentPanels = document.getElementById("storePaymentPanels");

    STORE_DATA.paymentMethods.forEach((method, index) => {
        const tab = document.createElement("button");
        tab.type = "button";
        tab.className =
            `store-v3-payment-tab${index === 0 ? " active" : ""}`;
        tab.dataset.paymentId = method.id;
        tab.textContent = method.maintenance ? `${method.label} — Maintenance` : method.label;
        tab.classList.toggle("is-maintenance", Boolean(method.maintenance));
        paymentTabs.appendChild(tab);

        const panel = document.createElement("section");
        panel.className =
            `store-v3-payment-panel${index === 0 ? " active" : ""}`;
        panel.dataset.paymentPanel = method.id;

        panel.innerHTML = method.maintenance ? `
            <div class="store-v3-payment-brand"><img class="store-v3-payment-logo" src="${method.logo}" alt="${method.label} logo"></div>
            <div class="store-v3-maintenance-panel">
                <strong>${method.label} is currently under maintenance.</strong>
                <p>Sorry for the inconvenience. Please create a Discord ticket if you wish to proceed with this mode of payment.</p>
            </div>
        ` : `
            <div class="store-v3-payment-brand"><img class="store-v3-payment-logo" src="${method.logo}" alt="${method.label} logo"></div>
            ${method.qrCode ? `
                <div class="store-v3-gcash-qr">
                    <span>Scan to pay with GCash</span>
                    <img class="store-v3-gcash-qr-image" src="${method.qrCode}" alt="GCash QR code">
                </div>` : ""}
            <p>
                Send the exact amount and keep your receipt.
                <br>
                <strong>Account Name:</strong> ${method.accountName}
                <br>
                <strong>${method.accountLabel}:</strong> ${method.accountValue}
                ${method.userId ? `<br><strong>User ID:</strong> ${method.userId}` : ""}
            </p>
        `;

        paymentPanels.appendChild(panel);
    });

    paymentTabs.addEventListener("click", event => {
        const tab = event.target.closest("[data-payment-id]");
        if (!tab) return;

        const method = STORE_DATA.paymentMethods.find(item => item.id === tab.dataset.paymentId);
        if (method?.maintenance) {
            showMaintenanceMessage(method.label);
            return;
        }

        state.selectedPayment = tab.dataset.paymentId;

        paymentTabs.querySelectorAll("button").forEach(button =>
            button.classList.toggle("active", button === tab)
        );

        paymentPanels.querySelectorAll("[data-payment-panel]").forEach(panel =>
            panel.classList.toggle(
                "active",
                panel.dataset.paymentPanel === state.selectedPayment
            )
        );
    });

    continueCheckout?.addEventListener("click", () => {
        const product = state.selectedProduct;
        if (!product) return;

        checkoutImage.src = product.image;
        checkoutImage.alt = product.name;
        checkoutMode.textContent = product.modeLabel;
        checkoutTitle.textContent =
            product.type === "key"
                ? `${product.name} — ${state.selectedKeyPackage.quantity}×`
                : product.name;

        checkoutPrice.textContent =
            product.type === "key"
                ? money(state.selectedKeyPackage.price)
                : `${money(product.price)}${product.period}`;

        closeModal(productModal);
        openModal(checkoutModal);
    });

    checkoutClose?.addEventListener("click", () =>
        closeModal(checkoutModal)
    );

    checkoutModal?.addEventListener("click", event => {
        if (event.target === checkoutModal) {
            closeModal(checkoutModal);
        }
    });

    const receiptInput = document.getElementById("storeReceiptInput");
    const receiptDrop = document.getElementById("storeReceiptDrop");
    const receiptPrompt = document.getElementById("storeReceiptPrompt");
    const receiptPreview = document.getElementById("storeReceiptPreview");

    function previewReceipt(file) {
        if (!file || !file.type.startsWith("image/")) {
            showToast("Please select an image file.");
            return;
        }

        const reader = new FileReader();

        reader.onload = event => {
            receiptPreview.src = event.target.result;
            receiptPreview.hidden = false;
            receiptPrompt.hidden = true;
            showToast("Receipt preview loaded.");
        };

        reader.readAsDataURL(file);
    }

    receiptInput?.addEventListener("change", () =>
        previewReceipt(receiptInput.files?.[0])
    );

    ["dragenter", "dragover"].forEach(type => {
        receiptDrop?.addEventListener(type, event => {
            event.preventDefault();
            receiptDrop.classList.add("dragover");
        });
    });

    ["dragleave", "drop"].forEach(type => {
        receiptDrop?.addEventListener(type, event => {
            event.preventDefault();
            receiptDrop.classList.remove("dragover");
        });
    });

    receiptDrop?.addEventListener("drop", event => {
        previewReceipt(event.dataTransfer.files?.[0]);
    });

    const faqModal = document.getElementById("storeFaqModal");
    const faqClose = document.getElementById("storeFaqClose");
    const faqTitle = document.getElementById("storeFaqTitle");
    const faqAnswer = document.getElementById("storeFaqAnswer");

    document.querySelectorAll("[data-store-question]").forEach(button => {
        button.addEventListener("click", () => {
            faqTitle.textContent = button.dataset.storeQuestion;
            faqAnswer.textContent = button.dataset.storeAnswer;
            openModal(faqModal);
        });
    });

    faqClose?.addEventListener("click", () =>
        closeModal(faqModal)
    );

    faqModal?.addEventListener("click", event => {
        if (event.target === faqModal) {
            closeModal(faqModal);
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;

        document.querySelectorAll(".store-v3-modal.open").forEach(modal =>
            closeModal(modal)
        );
    });

    const savedUsername =
        localStorage.getItem("magbungkalStoreUsername") || "";

    usernameInput.value = savedUsername;

    usernameInput?.addEventListener("input", () => {
        localStorage.setItem(
            "magbungkalStoreUsername",
            usernameInput.value.trim()
        );
    });

    setMode("skyblock");
});
