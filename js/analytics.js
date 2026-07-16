/*
==================================================
MAGBUNGKAL MC
analytics.js
Live Minecraft server information
==================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const SERVER_ADDRESS =
        "play.magbungkal.com";

    const API_URL =
        `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(
            SERVER_ADDRESS
        )}`;

    const elements = {
        status:
            document.getElementById("analyticsStatus"),

        players:
            document.getElementById("analyticsPlayers"),

        maxPlayers:
            document.getElementById("analyticsMaxPlayers"),

        version:
            document.getElementById("analyticsVersion"),

        latency:
            document.getElementById("analyticsLatency"),

        updated:
            document.getElementById("analyticsUpdated"),

        motd:
            document.getElementById("analyticsMotd"),

        headerPlayers:
            document.getElementById("mcPlayers")
    };

    function setText(element, value) {

        if (element) {
            element.textContent = value;
        }

    }

    function cleanMotd(data) {

        if (
            Array.isArray(data?.motd?.clean) &&
            data.motd.clean.length
        ) {
            return data.motd.clean
                .filter(Boolean)
                .join(" ");
        }

        if (typeof data?.motd?.clean === "string") {
            return data.motd.clean;
        }

        return "Welcome to Magbungkal MC!";
    }

    function updateTimestamp() {

        const formatted =
            new Intl.DateTimeFormat(
                "en-PH",
                {
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Manila"
                }
            ).format(new Date());

        setText(
            elements.updated,
            formatted
        );

    }

    function showOffline() {

        setText(
            elements.status,
            "Offline"
        );

        elements.status?.classList.remove(
            "online"
        );

        elements.status?.classList.add(
            "offline"
        );

        setText(elements.players, "0");
        setText(elements.maxPlayers, "0");
        setText(elements.version, "Unavailable");
        setText(elements.latency, "—");
        setText(elements.headerPlayers, "0");

        setText(
            elements.motd,
            "The server is currently unavailable or could not be reached."
        );

        updateTimestamp();

    }

    async function loadServerAnalytics() {

        try {

            const response =
                await fetch(
                    `${API_URL}?t=${Date.now()}`,
                    {
                        method: "GET",
                        cache: "no-store",
                        headers: {
                            Accept: "application/json"
                        }
                    }
                );

            if (!response.ok) {

                throw new Error(
                    `Minecraft API returned ${response.status}`
                );

            }

            const data =
                await response.json();

            if (!data.online) {

                showOffline();
                return;

            }

            const onlinePlayers =
                Number(data.players?.online) || 0;

            const maximumPlayers =
                Number(data.players?.max) || 0;

            const version =
                data.version?.name_clean ||
                data.version?.name_raw ||
                "Unknown";

            const latency =
                Number.isFinite(data.latency)
                    ? `${Math.round(data.latency)} ms`
                    : "Unavailable";

            setText(
                elements.status,
                "Online"
            );

            elements.status?.classList.remove(
                "offline"
            );

            elements.status?.classList.add(
                "online"
            );

            setText(
                elements.players,
                onlinePlayers.toLocaleString()
            );

            setText(
                elements.maxPlayers,
                maximumPlayers.toLocaleString()
            );

            setText(
                elements.version,
                version
            );

            setText(
                elements.latency,
                latency
            );

            setText(
                elements.headerPlayers,
                onlinePlayers.toLocaleString()
            );

            setText(
                elements.motd,
                cleanMotd(data)
            );

            updateTimestamp();

        } catch (error) {

            console.error(
                "Unable to retrieve Minecraft server analytics:",
                error
            );

            showOffline();

        }

    }

    loadServerAnalytics();

    /*
     * Refresh every 60 seconds.
     * Do not refresh too aggressively because
     * public status APIs may cache or rate-limit requests.
     */

    window.setInterval(
        loadServerAnalytics,
        60000
    );

});