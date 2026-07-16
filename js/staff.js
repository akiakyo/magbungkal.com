/*
==================================================
MAGBUNGKAL MC
staff.js
Staff page + homepage renderer
==================================================
*/

class StaffManager {
    constructor() {
        this.staff = [
            { name: "Eyjeey", rank: "OWNER", color: "#369876" },
            { name: "xXPathrickXx", rank: "CO OWNER", color: "#6ba0ff" },
            { name: "Aky0_", rank: "LEAD DEVELOPER", color: "#aa3b3b" },
            { name: "sieccc", rank: "DEVELOPER", color: "#e43e3e" },
            { name: "Ein_YATA", rank: "SERVER MANAGER", color: "#ffaa6b" },
            { name: "Kizuno", rank: "HEAD ADMIN", color: "#ffde6b" },
            { name: "YciGareth", rank: "HEAD ADMIN", color: "#ffde6b" },
            { name: "ExtremeKnight", rank: "ADMIN", color: "#534cc8" },
            { name: "ellyieee", rank: "ADMIN", color: "#534cc8" },
            { name: "Prophecy", rank: "HEAD MOD", color: "#ff5dd6" },
            { name: "Ace_Cypher", rank: "MODERATOR", color: "#85d687" },
            { name: "wiwi_XT", rank: "MODERATOR", color: "#85d687" },
            { name: "notnali", rank: "MODERATOR", color: "#85d687" },
            { name: "Mei_Yukinoshita", rank: "MODERATOR", color: "#85d687" },
            { name: "UrbanVenom", rank: "MODERATOR", color: "#85d687" },
            { name: "blitzers3302", rank: "MODERATOR", color: "#85d687" }
        ];

        document.addEventListener("DOMContentLoaded", () => {
            this.renderStaffPage();
            this.renderHomePage();
        });
    }

    renderStaffPage() {
        const groups = {
            managementTeam: [
                "OWNER",
                "CO OWNER",
                "SERVER MANAGER"
            ],
            developerTeam: [
                "LEAD DEVELOPER",
                "DEVELOPER"
            ],
            adminTeam: [
                "HEAD ADMIN",
                "ADMIN"
            ],
            moderatorTeam: [
                "HEAD MOD",
                "MODERATOR"
            ]
        };

        Object.entries(groups).forEach(([containerId, ranks]) => {
            const container = document.getElementById(containerId);

            if (!container) {
                return;
            }

            container.innerHTML = "";

            const members = this.staff.filter(member =>
                ranks.includes(member.rank)
            );

            members.forEach(member => {
                container.appendChild(this.createCard(member));
            });
        });
    }

    renderHomePage() {
        const homeGrid = document.getElementById("homeStaffGrid");

        if (!homeGrid) {
            return;
        }

        homeGrid.innerHTML = "";

        this.staff.forEach(member => {
            homeGrid.appendChild(this.createCard(member));
        });
    }

    createCard(member) {
        const card = document.createElement("article");

        card.className = "staff-card";

        const avatarUrl =
            `https://minotar.net/bust/${encodeURIComponent(member.name)}/180.png`;

        card.innerHTML = `
            <div
                class="staff-glow"
                style="--staff-color: ${member.color};">
            </div>

            <div class="staff-skin">
                <img
                    class="staff-avatar"
                    src="${avatarUrl}"
                    alt="${member.name} Minecraft skin"
                    loading="lazy"
                    draggable="false">
            </div>

            <span
                class="staff-rank"
                style="background-color: ${member.color};">
                ${member.rank}
            </span>

            <h3 class="staff-name">
                ${member.name}
            </h3>
        `;

        const image = card.querySelector(".staff-avatar");

        image.addEventListener("error", () => {
            image.src =
                "https://minotar.net/bust/Steve/180.png";
        });

        card.addEventListener("mousemove", event => {
            this.tilt(card, event);
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });

        return card;
    }

    tilt(card, event) {
        if (
            window.matchMedia("(hover: none)").matches ||
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {
            return;
        }

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY =
            ((x / rect.width) - 0.5) * 10;

        const rotateX =
            ((y / rect.height) - 0.5) * -10;

        card.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;
    }
}

new StaffManager();