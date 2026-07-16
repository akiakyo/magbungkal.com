document.addEventListener("DOMContentLoaded", () => {
    const rules = {
        chat: {
            title: "Chat Rules", icon: "fa-comments",
            intro: "Keep public and private communication respectful, readable, and safe for the community.",
            items: [
                "Do not harass, threaten, discriminate against, or personally attack another player.",
                "Do not spam messages, commands, characters, advertisements, or repeated requests.",
                "Do not advertise unrelated servers, communities, products, or services without permission.",
                "Avoid excessive profanity, inappropriate sexual content, and intentionally disruptive conversations.",
                "Do not impersonate staff members, other players, or official Magbungkal MC accounts.",
                "Do not share private or personally identifying information belonging to another person."
            ],
            enforcement: "Chat violations may result in message removal, warnings, temporary mutes, kicks, or bans depending on severity and repetition."
        },
        gameplay: {
            title: "Gameplay Rules", icon: "fa-gamepad",
            intro: "All gameplay must remain fair. External tools and unintended mechanics must not provide an unfair advantage.",
            items: [
                "Do not use hacked clients, x-ray, kill aura, autoclickers, macros, bots, or unauthorized automation.",
                "Do not intentionally exploit bugs, glitches, packet behavior, duplication methods, or broken features.",
                "Report major exploits privately through a Discord ticket instead of sharing them publicly.",
                "Do not evade AFK restrictions, anti-cheat systems, punishments, cooldowns, or gameplay limits.",
                "Resource packs, shaders, and client-side quality-of-life modifications must not reveal hidden information or automate gameplay.",
                "Do not intentionally cause server lag through entities, redstone, chunk loading, commands, or repeated actions."
            ],
            enforcement: "Cheating and exploit abuse may result in immediate temporary or permanent bans, item removal, balance resets, or account restrictions."
        },
        survival: {
            title: "Survival Rules", icon: "fa-earth-asia",
            intro: "Build responsibly and respect player claims, shared spaces, and server infrastructure.",
            items: [
                "Do not grief, raid, steal from, or damage builds protected by another player or community.",
                "Do not claim land solely to block, trap, surround, or harass another player's build.",
                "Avoid offensive, inappropriate, misleading, or intentionally disruptive builds and signs.",
                "Do not create traps near spawn, warps, portals, public pathways, or protected community areas.",
                "Farms and machines must follow server limits and should be disabled when they cause performance problems.",
                "Use the Resource World for large-scale resource gathering whenever required by server guidelines."
            ],
            enforcement: "Staff may rollback damage, remove builds, transfer or delete claims, confiscate items, and punish responsible accounts."
        },
        skyblock: {
            title: "SkyBlock-Economy Rules", icon: "fa-cloud",
            intro: "Protect island progress, respect co-op ownership, and keep automation fair and server-friendly.",
            items: [
                "Do not grief, steal from, sabotage, or intentionally damage another player's island or island storage.",
                "Do not join a co-op with the intention of taking items, removing members, destroying builds, or transferring island wealth.",
                "Island owners are responsible for assigning trusted permissions and reviewing who can build, open containers, or manage members.",
                "Do not use alternate accounts, abandoned islands, or repeated resets to bypass progression limits, generate rewards, or manipulate the economy.",
                "Automated farms, redstone systems, minions, hoppers, and entity setups must follow server limits and must not intentionally cause lag.",
                "Do not exploit island missions, generators, upgrades, visitors, auctions, shops, or other SkyBlock systems for unintended rewards.",
                "Scamming through island trades, co-op invitations, false upgrade offers, or misleading island deals is prohibited.",
                "Keep island names, holograms, signs, builds, and public warps appropriate for the community."
            ],
            enforcement: "SkyBlock violations may result in item removal, island rollback, island or co-op restrictions, balance resets, temporary bans, or permanent bans depending on impact and intent."
        },
        economy: {
            title: "Economy Rules", icon: "fa-coins",
            intro: "Trade honestly and never manipulate the economy through abuse, deception, or unauthorized duplication.",
            items: [
                "Do not scam players through misleading trades, false listings, impersonation, or intentionally unclear agreements.",
                "Do not duplicate currency, items, crate rewards, shop goods, or any economic resource.",
                "Do not exploit shop pricing, auction behavior, refund systems, jobs, rewards, or payment processes.",
                "Real-money trading involving server items, currency, accounts, or services is prohibited unless officially authorized.",
                "Do not use alternate accounts to bypass limits, multiply rewards, manipulate markets, or evade economy restrictions.",
                "Staff are not responsible for informal trades without clear evidence, so document valuable agreements."
            ],
            enforcement: "Economy abuse may result in item confiscation, balance correction, shop restrictions, account resets, or bans."
        },
        pvp: {
            title: "PvP Rules", icon: "fa-swords",
            intro: "PvP is allowed only where enabled and must not involve cheating, trapping, or harassment.",
            items: [
                "Do not use combat cheats, macros, illegal modifications, or exploit-based advantages.",
                "Do not repeatedly target or harass players outside normal competitive gameplay.",
                "Do not use teleport requests, misleading agreements, or protected areas to create unfair traps.",
                "Do not combat-log, exploit safe zones, or abuse commands to avoid legitimate combat consequences.",
                "Follow additional event, duel, tournament, or arena rules announced by staff.",
                "Do not involve uninvolved players in disputes or use alternate accounts to gain an unfair advantage."
            ],
            enforcement: "PvP violations may result in item restoration or removal, event disqualification, temporary bans, or permanent bans."
        },
        staff: {
            title: "Staff, Reports & Appeals", icon: "fa-user-shield",
            intro: "Cooperate with staff, use official ticket channels, and communicate honestly during investigations.",
            items: [
                "Follow reasonable staff instructions during investigations, events, maintenance, and moderation actions.",
                "Do not knowingly submit false reports, edited evidence, misleading claims, or duplicate tickets.",
                "Do not publicly argue about punishments or harass staff members; use the appeal process instead.",
                "Do not attempt to evade punishments using alternate accounts, VPNs, name changes, or other methods.",
                "Keep report and appeal information private unless staff explicitly permits public discussion.",
                "Staff decisions may be reviewed by higher staff or ownership when a respectful appeal includes relevant evidence."
            ],
            enforcement: "Abusing reports, appeals, or staff communication may lead to ticket restrictions and additional moderation action."
        }
    };

    const modal = document.getElementById("ruleModal");
    const close = document.getElementById("ruleModalClose");
    const title = document.getElementById("ruleModalTitle");
    const intro = document.getElementById("ruleModalIntro");
    const list = document.getElementById("ruleModalList");
    const enforcement = document.getElementById("ruleModalEnforcement");
    const icon = document.getElementById("ruleModalIcon");

    function openRule(key) {
        const data = rules[key];
        if (!data || !modal) return;
        title.textContent = data.title;
        intro.textContent = data.intro;
        enforcement.textContent = data.enforcement;
        icon.innerHTML = `<i class="fas ${data.icon}"></i>`;
        list.innerHTML = data.items.map(item => `<li>${item}</li>`).join("");
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        close?.focus();
    }

    function closeRule() {
        modal?.classList.remove("open");
        modal?.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-rule-category]").forEach(button => {
        button.addEventListener("click", () => openRule(button.dataset.ruleCategory));
    });
    close?.addEventListener("click", closeRule);
    modal?.addEventListener("click", event => { if (event.target === modal) closeRule(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape" && modal?.classList.contains("open")) closeRule(); });
});
