/*
==================================================
MAGBUNGKAL MC
Main Application
Version 2.0
==================================================
*/

function initFaqModals() {
    const modal =
        document.getElementById("faqAnswerModal");

    const title =
        document.getElementById("faqModalTitle");

    const answer =
        document.getElementById("faqModalAnswer");

    const closeButton =
        document.getElementById("faqModalClose");

    const buttons =
        document.querySelectorAll(".faq-round-button");

    if (
        !modal ||
        !title ||
        !answer ||
        !closeButton ||
        !buttons.length
    ) {
        return;
    }

    function openModal(button) {
        title.textContent =
            button.dataset.question || "Question";

        answer.textContent =
            button.dataset.answer || "";

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            openModal(button);
        });
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            modal.classList.contains("open")
        ) {
            closeModal();
        }
    });
}

class MagbungkalApp {

    flashFooterButton(button) {
        const original = button.innerHTML;

        button.innerHTML = `
            <i class="fas fa-check"></i>
            <span>IP Copied!</span>
        `;

        button.classList.add("copied");

        setTimeout(() => {
            button.innerHTML = original;
            button.classList.remove("copied");
        }, 1800);
    }

    constructor() {

        this.serverIP = "play.magbungkal.com";

        this.init();

    }

    init() {

        document.addEventListener("DOMContentLoaded", () => {

        const joinCopyButtons = [
            {
                id: "copyJavaIP",
                value: "play.magbungkal.com"
            },
            {
                id: "copyBedrockIP",
                value: "play.magbungkal.com:20391"
            }
        ];

        joinCopyButtons.forEach(item => {

            const button =
                document.getElementById(item.id);

            if (!button) return;

            button.addEventListener("click", async () => {

                const originalHTML =
                    button.innerHTML;

                try {

                    await navigator.clipboard.writeText(
                        item.value
                    );

                    button.innerHTML = `
                        <i class="fas fa-check"></i>
                        Copied!
                    `;

                    button.classList.add("copied");

                } catch {

                    window.prompt(
                        "Copy the server address:",
                        item.value
                    );

                }

                window.setTimeout(() => {

                    button.innerHTML =
                        originalHTML;

                    button.classList.remove("copied");

                }, 1600);

            });

        });

            initFaqModals();

            this.cache();

            this.loader();

            this.mobileMenu();

            this.navbar();

            this.scrollProgress();

            this.copyButtons();

            this.theme();

            this.revealAnimations();

            this.activeNavigation();

            this.scrollTopButton();

            this.parallax();

        });

    }

    cache() {

        this.loaderElement =
            document.getElementById("loader");

        this.navbarElement =
            document.getElementById("navbar");

        this.progress =
            document.getElementById("scrollProgress");

        this.themeButton =
            document.getElementById("themeToggle");

    }

    /* =========================
       LOADER
    ========================= */

    loader() {

        if (!this.loaderElement) return;

        window.addEventListener("load", () => {

            setTimeout(() => {

                this.loaderElement.classList.add("hide");

            }, 1600);

        });

    }

    /* =========================
       NAVBAR
    ========================= */

    navbar() {

        if (!this.navbarElement) return;

        window.addEventListener("scroll", () => {

            if (window.scrollY > 80) {

                this.navbarElement.classList.add("scrolled");

            } else {

                this.navbarElement.classList.remove("scrolled");

            }

        });

    }

    /* =========================
       MOBILE MENU
    ========================= */

    mobileMenu() {

        const button =
            document.getElementById("menuBtn");

        const menu =
            document.getElementById("navLinks");

        if (!button || !menu) return;

        const setMenuOpen = open => {
            menu.classList.toggle("active", open);
            button.classList.toggle("active", open);
            button.setAttribute("aria-expanded", String(open));
            button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        };

        button.onclick = event => {
            event.stopPropagation();
            setMenuOpen(!menu.classList.contains("active"));
        };

        menu.querySelectorAll("a").forEach(link => {

            link.onclick = () => {

                setMenuOpen(false);

            };

        });

        document.addEventListener("click", event => {
            if (!event.target.closest("#navbar")) setMenuOpen(false);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") setMenuOpen(false);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) setMenuOpen(false);
        });

    }

    /* =========================
       SCROLL BAR
    ========================= */

    scrollProgress() {

        if (!this.progress) return;

        window.addEventListener("scroll", () => {

            const total =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const percent =
                (window.scrollY / total) * 100;

            this.progress.style.width = percent + "%";

        });

    }

    /* =========================
       COPY BUTTONS
    ========================= */

    copyButtons() {

        const ids = [

            "copyIP",

            "copyHeroIP"

        ];

        ids.forEach(id => {

            const button =
                document.getElementById(id);

            if (!button) return;

            button.onclick = async () => {

                try {

                    await navigator.clipboard.writeText(
                        this.serverIP
                    );

                    this.flashButton(button);

                }

                catch {

                    alert(this.serverIP);

                }

            };

        });

    }

    flashButton(button) {

        const old =
            button.innerHTML;

        button.innerHTML =
            '<i class="fas fa-check"></i> Copied';

        button.classList.add("copied");

        setTimeout(() => {

            button.innerHTML = old;

            button.classList.remove("copied");

        }, 1800);

    }

    /* =========================
       DARK MODE
    ========================= */

    theme() {

        if (!this.themeButton) return;

        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        const useDark = saved === "dark" || (!saved && prefersDark);
        const themeColor = document.querySelector('meta[name="theme-color"]');

        const applyTheme = (dark) => {
            document.body.classList.toggle("dark-theme", dark);
            document.body.classList.toggle("light-theme", !dark);
            document.documentElement.style.colorScheme = dark ? "dark" : "light";
            this.themeButton.innerHTML = dark
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
            this.themeButton.setAttribute(
                "aria-label",
                dark ? "Switch to light mode" : "Switch to dark mode"
            );
            this.themeButton.setAttribute("title", dark ? "Light mode" : "Dark mode");
            if (themeColor) themeColor.setAttribute("content", dark ? "#242424" : "#ffbf6c");
        };

        applyTheme(useDark);

        this.themeButton.onclick = () => {
            const dark = !document.body.classList.contains("dark-theme");
            localStorage.setItem("theme", dark ? "dark" : "light");
            applyTheme(dark);
        };

    }

    /* =========================
       REVEAL
    ========================= */

    revealAnimations() {

        const cards = document.querySelectorAll(

            ".feature-card,.staff-card,.analytics-card,.glass-card"

        );

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        }, {

            threshold: .15

        });

        cards.forEach(card => {

            card.classList.add("hidden");

            observer.observe(card);

        });

    }

    /* =========================
       ACTIVE NAV
    ========================= */

    activeNavigation() {

        const sections =
            document.querySelectorAll("section[id]");

        const links =
            document.querySelectorAll("#navLinks a");

        if (!sections.length) return;

        window.addEventListener("scroll", () => {

            let current = "";

            sections.forEach(section => {

                const top =
                    section.offsetTop - 120;

                if (

                    scrollY >= top &&

                    scrollY < top + section.offsetHeight

                ) {

                    current =
                        section.id;

                }

            });

            links.forEach(link => {

                link.classList.remove("active");

                if (

                    link.getAttribute("href") === "#" + current

                ) {

                    link.classList.add("active");

                }

            });

        });

    }

    /* =========================
       SCROLL TO TOP
    ========================= */

    scrollTopButton() {

        const button =
            document.createElement("button");

        button.id = "scrollTop";

        button.innerHTML =
            '<i class="fas fa-chevron-up"></i>';

        document.body.appendChild(button);

        button.onclick = () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        };

        window.addEventListener("scroll", () => {

            button.classList.toggle(

                "visible",

                window.scrollY > 500

            );

        });

    }

    /* =========================
       HERO PARALLAX
    ========================= */

    parallax() {

        const hero =
            document.querySelector(".hero");

        if (!hero) return;

        window.addEventListener("mousemove", e => {

            const x =
                (e.clientX / innerWidth - .5) * 15;

            const y =
                (e.clientY / innerHeight - .5) * 15;

            hero.style.backgroundPosition =

                `${50 + x}% ${50 + y}%`;

        });

    }

copyButtons() {
    const ids = [
        "copyIP",
        "copyHeroIP",
        "copyFooterIP"
    ];

    ids.forEach(id => {
        const button = document.getElementById(id);

        if (!button) return;

        button.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(
                    this.serverIP
                );

                this.flashFooterButton(button);
            } catch {
                window.prompt(
                    "Copy the server IP:",
                    this.serverIP
                );
            }
        });
    });
}

}

new MagbungkalApp();