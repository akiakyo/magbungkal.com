/*
==================================================
MAGBUNGKAL MC
Vote Page V2
==================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    const SERVER_IP =
        "play.magbungkal.com";

    /*
     * Replace each placeholder URL with the
     * actual Magbungkal MC voting link.
     */
    const voteSites = [
        {
            name: "Best Minecraft Servers",
            description: "Vote for Magbungkal MC on Best Minecraft Servers.",
            reward: "₱1,500 + 1x Vote Key",
            icon: "fa-ranking-star",
            url: "https://best-minecraft-servers.co/server-magbungkal.18178",
            tag: "Popular"
        },
        {
            name: "MinecraftServers.org",
            description: "Support Magbungkal MC on MinecraftServers.org.",
            reward: "₱1,500 + 1x Vote Key",
            icon: "fa-server",
            url: "https://minecraftservers.org/server/653325",
            tag: "Featured"
        },
        {
            name: "Top Minecraft Servers",
            description: "Submit your vote on Top Minecraft Servers.",
            reward: "₱1,500 + 1x Vote Key",
            icon: "fa-trophy",
            url: "https://topminecraftservers.org/vote/34432",
            tag: ""
        },
        {
            name: "MineRank",
            description: "Help our community grow through MineRank.",
            reward: "₱1,500 + 1x Vote Key",
            icon: "fa-chart-line",
            url: "https://www.minerank.com/play-magbungkal-com/vote",
            tag: ""
        },
        {
            name: "TopG",
            description: "Vote for Magbungkal MC through TopG.",
            reward: "₱1,500 + 1x Vote Key",
            icon: "fa-star",
            url: "https://topg.org/minecraft-servers/server-655955",
            tag: ""
        },
        {
            name: "Minecraft-MP",
            description: "Support us through the Minecraft-MP server list.",
            reward: "₱1,500 + 1x Vote Key",
            icon: "fa-cubes",
            url: "https://minecraft-mp.com/server-s322307",
            tag: ""
        },
        {
            name: "MinecraftList.org",
            description: "Vote on MinecraftList.org and help more players find us.",
            reward: "₱1,500 + 1x Vote Key",
            icon: "fa-list",
            url: "https://minecraftlist.org/server/32012",
            tag: ""
        },
        {
            name: "Minecraft.Buzz",
            description: "Boost Magbungkal MC on Minecraft.Buzz.",
            reward: "₱1,500 + 1x Vote Key",
            icon: "fa-bullhorn",
            url: "https://minecraft.buzz/server/magbungkal-mc",
            tag: ""
        },
        {
            name: "Minecraft Server List",
            description: "Cast your vote on Minecraft Server List.",
            reward: "₱1,500 + 1x Vote Key",
            icon: "fa-earth-asia",
            url: "https://minecraft-server-list.com/server/502409/",
            tag: ""
        }
    ];

    const STORAGE_USERNAME =
        "magbungkalVoteUsername";

    const STORAGE_PROGRESS =
        "magbungkalVoteProgress";

    const grid =
        document.getElementById(
            "voteSiteGrid"
        );

    const usernameInput =
        document.getElementById(
            "voteUsername"
        );

    const usernameLabel =
        usernameInput?.closest(
            ".vote-v2-username"
        );

    const usernameClear =
        document.getElementById(
            "voteUsernameClear"
        );

    const completedCount =
        document.getElementById(
            "voteCompletedCount"
        );

    const totalCount =
        document.getElementById(
            "voteTotalCount"
        );

    const siteCount =
        document.getElementById(
            "voteSiteCount"
        );

    const progressBar =
        document.getElementById(
            "voteProgressBar"
        );

    const resetProgress =
        document.getElementById(
            "voteResetProgress"
        );

    let completed =
        readCompleted();

    function readCompleted() {
        try {
            const stored =
                JSON.parse(
                    localStorage.getItem(
                        STORAGE_PROGRESS
                    ) || "[]"
                );

            return new Set(
                Array.isArray(stored)
                    ? stored
                    : []
            );
        } catch {
            return new Set();
        }
    }

    function saveCompleted() {
        localStorage.setItem(
            STORAGE_PROGRESS,
            JSON.stringify(
                Array.from(completed)
            )
        );
    }

    function saveUsername() {
        const value =
            usernameInput?.value.trim() || "";

        localStorage.setItem(
            STORAGE_USERNAME,
            value
        );

        usernameLabel?.classList.toggle(
            "has-value",
            Boolean(value)
        );
    }

    function updateProgress() {
        const count =
            completed.size;

        completedCount.textContent =
            count.toLocaleString();

        totalCount.textContent =
            voteSites.length.toLocaleString();

        siteCount.textContent =
            voteSites.length.toLocaleString();

        const percentage =
            voteSites.length
                ? (count / voteSites.length) * 100
                : 0;

        progressBar.style.width =
            `${percentage}%`;

        document
            .querySelectorAll(
                ".vote-v2-card"
            )
            .forEach(card => {
                const index =
                    Number(
                        card.dataset.voteIndex
                    );

                const done =
                    completed.has(index);

                card.classList.toggle(
                    "completed",
                    done
                );

                const button =
                    card.querySelector(
                        ".vote-v2-complete"
                    );

                if (button) {
                    button.innerHTML = done
                        ? '<i class="fas fa-check"></i>'
                        : '<i class="fas fa-circle"></i>';

                    button.setAttribute(
                        "aria-label",
                        done
                            ? "Mark voting site as incomplete"
                            : "Mark voting site as completed"
                    );
                }
            });
    }

    function openVoteSite(index) {
        const site =
            voteSites[index];

        const username =
            usernameInput?.value.trim() || "";

        if (!username) {
            usernameInput?.focus();

            usernameInput?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }

        saveUsername();

        if (
            !site.url ||
            site.url === "#"
        ) {
            window.alert(
                `Add the real voting URL for ${site.name} inside js/vote-v2.js.`
            );

            return;
        }

        let url =
            site.url;

        if (url.includes("{username}")) {
            url =
                url.replace(
                    "{username}",
                    encodeURIComponent(
                        username
                    )
                );
        }

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );
    }

    function createCard(site, index) {
        const card =
            document.createElement(
                "article"
            );

        card.className =
            "vote-v2-card";

        card.dataset.voteIndex =
            String(index);

        card.innerHTML = `
            ${
                site.tag
                    ? `<span class="vote-v2-card-tag">${site.tag}</span>`
                    : ""
            }

            <div class="vote-v2-card-icon">
                <i class="fas ${site.icon}"></i>
            </div>

            <h3>${site.name}</h3>

            <p>${site.description}</p>

            <div class="vote-v2-reward">
                <span>Reward</span>
                <strong>${site.reward}</strong>
            </div>

            <div class="vote-v2-card-actions">
                <button
                    class="vote-v2-open"
                    type="button">
                    Vote Now
                    <i class="fas fa-arrow-up-right-from-square"></i>
                </button>

                <button
                    class="vote-v2-complete"
                    type="button"
                    aria-label="Mark voting site as completed">
                    <i class="fas fa-circle"></i>
                </button>
            </div>
        `;

        card
            .querySelector(
                ".vote-v2-open"
            )
            .addEventListener(
                "click",
                () => openVoteSite(index)
            );

        card
            .querySelector(
                ".vote-v2-complete"
            )
            .addEventListener(
                "click",
                () => {
                    if (
                        completed.has(index)
                    ) {
                        completed.delete(index);
                    } else {
                        completed.add(index);
                    }

                    saveCompleted();
                    updateProgress();
                }
            );

        return card;
    }

    voteSites.forEach(
        (site, index) => {
            grid?.appendChild(
                createCard(site, index)
            );
        }
    );

    const savedUsername =
        localStorage.getItem(
            STORAGE_USERNAME
        ) || "";

    if (usernameInput) {
        usernameInput.value =
            savedUsername;
    }

    usernameLabel?.classList.toggle(
        "has-value",
        Boolean(savedUsername)
    );

    usernameInput?.addEventListener(
        "input",
        saveUsername
    );

    usernameClear?.addEventListener(
        "click",
        () => {
            usernameInput.value = "";
            saveUsername();
            usernameInput.focus();
        }
    );

    resetProgress?.addEventListener(
        "click",
        () => {
            completed.clear();
            saveCompleted();
            updateProgress();
        }
    );

    const copyButton =
        document.getElementById(
            "voteCopyIP"
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

    const faqModal =
        document.getElementById(
            "voteFaqModal"
        );

    const faqClose =
        document.getElementById(
            "voteFaqClose"
        );

    const faqTitle =
        document.getElementById(
            "voteFaqTitle"
        );

    const faqAnswer =
        document.getElementById(
            "voteFaqAnswer"
        );

    function openFaq(button) {
        faqTitle.textContent =
            button.dataset.voteQuestion ||
            "Question";

        faqAnswer.textContent =
            button.dataset.voteAnswer || "";

        faqModal.classList.add("open");

        faqModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";
    }

    function closeFaq() {
        faqModal?.classList.remove(
            "open"
        );

        faqModal?.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";
    }

    document
        .querySelectorAll(
            "[data-vote-question]"
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
            if (event.key === "Escape") {
                closeFaq();
            }
        }
    );

    updateProgress();
});
