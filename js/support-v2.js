/*
==================================================
MAGBUNGKAL MC
Support Page V2
==================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    const SERVER_IP =
        "play.magbungkal.com";

    const detailsModal =
        document.getElementById(
            "supportDetailsModal"
        );

    const detailsClose =
        document.getElementById(
            "supportModalClose"
        );

    const modalTitle =
        document.getElementById(
            "supportModalTitle"
        );

    const modalDescription =
        document.getElementById(
            "supportModalDescription"
        );

    const modalResponse =
        document.getElementById(
            "supportModalResponse"
        );

    const modalRequirements =
        document.getElementById(
            "supportModalRequirements"
        );

    const faqModal =
        document.getElementById(
            "supportFaqModal"
        );

    const faqClose =
        document.getElementById(
            "supportFaqClose"
        );

    const faqTitle =
        document.getElementById(
            "supportFaqTitle"
        );

    const faqAnswer =
        document.getElementById(
            "supportFaqAnswer"
        );

    function lockPage() {
        document.body.style.overflow =
            "hidden";
    }

    function unlockPage() {
        if (
            !detailsModal?.classList.contains(
                "open"
            ) &&
            !faqModal?.classList.contains(
                "open"
            )
        ) {
            document.body.style.overflow =
                "";
        }
    }

    function openDetails(button) {
        const requirements =
            (
                button.dataset
                    .supportRequirements || ""
            )
                .split("|")
                .filter(Boolean);

        modalTitle.textContent =
            button.dataset.supportTitle ||
            "Support Category";

        modalDescription.textContent =
            button.dataset
                .supportDescription || "";

        modalResponse.textContent =
            button.dataset.supportResponse ||
            "Response time varies";

        modalRequirements.innerHTML = "";

        requirements.forEach(requirement => {
            const item =
                document.createElement("li");

            item.textContent =
                requirement;

            modalRequirements.appendChild(
                item
            );
        });

        detailsModal.classList.add(
            "open"
        );

        detailsModal.setAttribute(
            "aria-hidden",
            "false"
        );

        lockPage();
    }

    function closeDetails() {
        detailsModal?.classList.remove(
            "open"
        );

        detailsModal?.setAttribute(
            "aria-hidden",
            "true"
        );

        unlockPage();
    }

    document
        .querySelectorAll(
            ".support-v2-details-btn"
        )
        .forEach(button => {
            button.addEventListener(
                "click",
                () => openDetails(button)
            );
        });

    detailsClose?.addEventListener(
        "click",
        closeDetails
    );

    detailsModal?.addEventListener(
        "click",
        event => {
            if (
                event.target === detailsModal
            ) {
                closeDetails();
            }
        }
    );

    function openFaq(button) {
        faqTitle.textContent =
            button.dataset.faqQuestion ||
            "Question";

        faqAnswer.textContent =
            button.dataset.faqAnswer || "";

        faqModal.classList.add("open");

        faqModal.setAttribute(
            "aria-hidden",
            "false"
        );

        lockPage();
    }

    function closeFaq() {
        faqModal?.classList.remove("open");

        faqModal?.setAttribute(
            "aria-hidden",
            "true"
        );

        unlockPage();
    }

    document
        .querySelectorAll(
            "[data-faq-question]"
        )
        .forEach(button => {
            button.addEventListener(
                "click",
                () => openFaq(button)
            );
        });

    faqClose?.addEventListener(
        "click",
        closeFaq
    );

    faqModal?.addEventListener(
        "click",
        event => {
            if (
                event.target === faqModal
            ) {
                closeFaq();
            }
        }
    );

    document.addEventListener(
        "keydown",
        event => {
            if (event.key !== "Escape") {
                return;
            }

            closeDetails();
            closeFaq();
        }
    );

    const copyButton =
        document.getElementById(
            "supportCopyIP"
        );

    copyButton?.addEventListener(
        "click",
        async () => {
            const original =
                copyButton.innerHTML;

            try {
                await navigator.clipboard
                    .writeText(SERVER_IP);

                copyButton.innerHTML = `
                    <i class="fas fa-check"></i>
                    IP Copied!
                `;
            } catch {
                window.prompt(
                    "Copy the server IP:",
                    SERVER_IP
                );
            }

            window.setTimeout(() => {
                copyButton.innerHTML =
                    original;
            }, 1700);
        }
    );
});
