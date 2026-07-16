/*
==================================================
MAGBUNGKAL MC
Staff Page V2
==================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    const staff = [
        {
            name: "Eyjeey",
            rank: "OWNER",
            color: "#369876",
            department: "management"
        },
        {
            name: "xXPathrickXx",
            rank: "CO OWNER",
            color: "#6ba0ff",
            department: "management"
        },
        {
            name: "Aky0_",
            rank: "LEAD DEVELOPER",
            color: "#aa3b3b",
            department: "developer"
        },
        {
            name: "sieccc",
            rank: "DEVELOPER",
            color: "#e43e3e",
            department: "developer"
        },
        {
            name: "Ein_YATA",
            rank: "SERVER MANAGER",
            color: "#ffaa6b",
            department: "management"
        },
        {
            name: "Kizuno",
            rank: "HEAD ADMIN",
            color: "#ffde6b",
            department: "admin"
        },
        {
            name: "YciGareth",
            rank: "HEAD ADMIN",
            color: "#ffde6b",
            department: "admin"
        },
        {
            name: "ExtremeKnight",
            rank: "ADMIN",
            color: "#534cc8",
            department: "admin"
        },
        {
            name: "ellyieee",
            rank: "ADMIN",
            color: "#534cc8",
            department: "admin"
        },
        {
            name: "Prophecy",
            rank: "HEAD MOD",
            color: "#ff5dd6",
            department: "moderator"
        },
        {
            name: "Ace_Cypher",
            rank: "MODERATOR",
            color: "#85d687",
            department: "moderator"
        },
        {
            name: "wiwi_XT",
            rank: "MODERATOR",
            color: "#85d687",
            department: "moderator"
        },
        {
            name: "notnali",
            rank: "MODERATOR",
            color: "#85d687",
            department: "moderator"
        },
        {
            name: "Mei_Yukinoshita",
            rank: "MODERATOR",
            color: "#85d687",
            department: "moderator"
        },
        {
            name: "UrbanVenom",
            rank: "MODERATOR",
            color: "#85d687",
            department: "moderator"
        },
        {
            name: "blitzers3302",
            rank: "MODERATOR",
            color: "#85d687",
            department: "moderator"
        }
    ];

    const grid =
        document.getElementById("staffV2Grid");

    const emptyState =
        document.getElementById("staffEmptyState");

    const searchInput =
        document.getElementById("staffSearch");

    const searchLabel =
        searchInput?.closest(".staff-v2-search");

    const searchClear =
        document.getElementById("staffSearchClear");

    const filters =
        Array.from(
            document.querySelectorAll(
                "[data-staff-filter]"
            )
        );

    const resetButton =
        document.getElementById("staffResetFilters");

    const resultText =
        document.getElementById("staffResultText");

    let activeFilter = "all";
    let searchTerm = "";

    const departmentNames = {
        management: "Management",
        developer: "Development",
        admin: "Administration",
        moderator: "Moderation"
    };

    function createStaffCard(member) {
        const card =
            document.createElement("article");

        card.className =
            "staff-v2-card";

        card.style.setProperty(
            "--staff-color",
            member.color
        );

        const avatar =
            `https://minotar.net/bust/${encodeURIComponent(
                member.name
            )}/220.png`;

        card.innerHTML = `
            <div class="staff-v2-card-glow"></div>

            <div class="staff-v2-skin">
                <img
                    class="staff-v2-avatar"
                    src="${avatar}"
                    alt="${member.name} Minecraft skin"
                    loading="lazy"
                    draggable="false">
            </div>

            <div class="staff-v2-card-body">
                <span class="staff-v2-rank">
                    ${member.rank}
                </span>

                <h3>${member.name}</h3>

                <span class="staff-v2-department">
                    ${departmentNames[member.department]}
                </span>
            </div>
        `;

        const image =
            card.querySelector(
                ".staff-v2-avatar"
            );

        image.addEventListener(
            "error",
            () => {
                image.src =
                    "https://minotar.net/bust/Steve/220.png";
            },
            { once: true }
        );

        card.addEventListener(
            "mousemove",
            event => {
                tiltCard(card, event);
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.style.transform = "";
            }
        );

        return card;
    }

    function tiltCard(card, event) {
        if (
            window.matchMedia(
                "(hover: none)"
            ).matches ||
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {
            return;
        }

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

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

    function filteredStaff() {
        return staff.filter(member => {
            const matchesFilter =
                activeFilter === "all" ||
                member.department === activeFilter;

            const normalizedTerm =
                searchTerm.trim().toLowerCase();

            const matchesSearch =
                !normalizedTerm ||
                member.name
                    .toLowerCase()
                    .includes(normalizedTerm) ||
                member.rank
                    .toLowerCase()
                    .includes(normalizedTerm) ||
                departmentNames[
                    member.department
                ]
                    .toLowerCase()
                    .includes(normalizedTerm);

            return matchesFilter && matchesSearch;
        });
    }

    function updateResultsText(count) {
        const filterLabel =
            activeFilter === "all"
                ? "all departments"
                : departmentNames[activeFilter];

        const staffWord =
            count === 1
                ? "staff member"
                : "staff members";

        if (searchTerm.trim()) {
            resultText.textContent =
                `Showing ${count} ${staffWord} for “${searchTerm.trim()}” in ${filterLabel}`;
            return;
        }

        resultText.textContent =
            `Showing ${count} ${staffWord} in ${filterLabel}`;
    }

    function render() {
        const results =
            filteredStaff();

        grid.innerHTML = "";

        results.forEach(member => {
            grid.appendChild(
                createStaffCard(member)
            );
        });

        emptyState.hidden =
            results.length > 0;

        grid.hidden =
            results.length === 0;

        updateResultsText(
            results.length
        );
    }

    function setFilter(filter) {
        activeFilter = filter;

        filters.forEach(button => {
            const active =
                button.dataset.staffFilter ===
                activeFilter;

            button.classList.toggle(
                "active",
                active
            );

            button.setAttribute(
                "aria-pressed",
                String(active)
            );
        });

        render();
    }

    filters.forEach(button => {
        button.addEventListener(
            "click",
            () => {
                setFilter(
                    button.dataset.staffFilter
                );
            }
        );
    });

    searchInput?.addEventListener(
        "input",
        () => {
            searchTerm =
                searchInput.value;

            searchLabel?.classList.toggle(
                "has-value",
                Boolean(searchTerm)
            );

            render();
        }
    );

    searchClear?.addEventListener(
        "click",
        () => {
            searchInput.value = "";
            searchTerm = "";
            searchLabel?.classList.remove(
                "has-value"
            );
            searchInput.focus();
            render();
        }
    );

    resetButton?.addEventListener(
        "click",
        () => {
            searchTerm = "";
            activeFilter = "all";

            if (searchInput) {
                searchInput.value = "";
            }

            searchLabel?.classList.remove(
                "has-value"
            );

            setFilter("all");
        }
    );

    const countByDepartment =
        department =>
            staff.filter(
                member =>
                    member.department === department
            ).length;

    const setCount =
        (id, value) => {
            const element =
                document.getElementById(id);

            if (element) {
                element.textContent =
                    value.toLocaleString();
            }
        };

    setCount(
        "staffTotalCount",
        staff.length
    );

    setCount(
        "staffManagementCount",
        countByDepartment("management")
    );

    setCount(
        "staffDeveloperCount",
        countByDepartment("developer")
    );

    setCount(
        "staffModerationCount",
        countByDepartment("admin") +
        countByDepartment("moderator")
    );

    render();
});
