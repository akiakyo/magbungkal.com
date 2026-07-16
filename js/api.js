/*
==================================================
MAGBUNGKAL MC
api.js
Live Server API
==================================================
*/

class ServerAPI {

    constructor() {

        this.server = "play.magbungkal.com";

        this.discordWidget =
            "https://discord.com/api/guilds/1441484696432152747/widget.json";

        this.minecraftAPI =
            `https://api.mcsrvstat.us/3/${this.server}`;

        this.init();

    }

    init() {

        document.addEventListener("DOMContentLoaded", () => {

            this.loadMinecraft();

            this.loadDiscord();

            setInterval(() => {

                this.loadMinecraft();

                this.loadDiscord();

            },60000);

        });

    }

    /*=========================================
        MINECRAFT SERVER
    =========================================*/

    async loadMinecraft(){

        try{

            const response=
                await fetch(this.minecraftAPI);

            const data=
                await response.json();

            this.updateMinecraft(data);

        }

        catch(error){

            console.error(error);

        }

    }

    updateMinecraft(data){

        const players=document.getElementById("mcPlayers");

        const status=document.getElementById("serverStatus");

        const motd=document.getElementById("serverMotd");

        const ping=document.getElementById("serverPing");

        if(status){

            status.textContent=
                data.online ? "ONLINE" : "OFFLINE";

            status.className=
                data.online
                ? "online"
                : "offline";

        }

        if(players){

            players.textContent=

                data.players?.online ?? 0;

        }

        if(motd){

            if(data.motd?.clean){

                motd.textContent=
                    data.motd.clean.join(" ");

            }

        }

        if(ping){

            ping.textContent=
                data.debug?.ping
                ? data.debug.ping+" ms"
                : "--";

        }

    }

    /*=========================================
        DISCORD
    =========================================*/

    async loadDiscord(){

        try{

            const response=

                await fetch(this.discordWidget);

            const data=

                await response.json();

            this.updateDiscord(data);

        }

        catch(error){

            console.error(error);

        }

    }

    updateDiscord(data){

        const members=

            document.getElementById("discordMembers");

        const online=

            document.getElementById("discordOnline");

        const invite=

            document.getElementById("discordInvite");

        if(members){

            members.textContent=

                data.members.length;

        }

        if(online){

            online.textContent=

                data.presence_count;

        }

        if(invite){

            invite.href=data.instant_invite;

        }

    }

}

new ServerAPI();