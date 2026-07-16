/*
==================================================
MAGBUNGKAL MC
particles.js
Minecraft Inspired Background
==================================================
*/

/*==========================================
    Floating Minecraft Pixels
==========================================*/

function floatingPixel(){

    const pixel=document.createElement("div");

    pixel.className="pixel";

    pixel.style.left=Math.random()*100+"vw";

    pixel.style.animationDuration=

        8+Math.random()*10+"s";

    pixel.style.opacity=

        .2+Math.random()*.5;

    document.body.appendChild(pixel);

    pixel.addEventListener("animationend",()=>{

        pixel.remove();

    });

}

let floatingPixelTimer = null;
function startFloatingPixels(){
    if (floatingPixelTimer || document.hidden) return;
    floatingPixelTimer = window.setInterval(floatingPixel, 900);
}
function stopFloatingPixels(){
    if (!floatingPixelTimer) return;
    window.clearInterval(floatingPixelTimer);
    floatingPixelTimer = null;
}
document.addEventListener("visibilitychange", () => document.hidden ? stopFloatingPixels() : startFloatingPixels());
startFloatingPixels();

class ParticleManager{

    constructor(){

        this.container="particles-js";

        this.init();

    }

    async init(){

        if(!document.getElementById(this.container))
            return;

        await tsParticles.load({

            id:this.container,

            options:{

                fullScreen:{
                    enable:false
                },

                background:{
                    color:"transparent"
                },

                fpsLimit:120,

                detectRetina:true,

                particles:{

                    number:{
                        value:48,
                        density:{
                            enable:true,
                            area:900
                        }
                    },

                    color:{
                        value:[
                            "#3fa9ff",
                            "#66c2ff",
                            "#ffffff",
                            "#8ec5ff"
                        ]
                    },

                    shape:{
                        type:"square"
                    },

                    opacity:{
                        value:.35
                    },

                    size:{
                        value:{
                            min:2,
                            max:5
                        }
                    },

                    move:{

                        enable:true,

                        speed:.8,

                        direction:"top",

                        random:true,

                        straight:false,

                        outModes:{
                            default:"out"
                        }

                    },

                    links:{

                        enable:false

                    }

                },

                interactivity:{

                    detectsOn:"window",

                    events:{

                        onHover:{

                            enable:true,

                            mode:"repulse"

                        },

                        onClick:{

                            enable:true,

                            mode:"push"

                        }

                    },

                    modes:{

                        repulse:{

                            distance:120,

                            duration:.4

                        },

                        push:{

                            quantity:8

                        }

                    }

                }

            }

        });

    }

}

new ParticleManager();