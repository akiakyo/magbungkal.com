/*
==================================================
MAGBUNGKAL MC
Home Gallery Slideshow
==================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const slider =
        document.getElementById("homeGallerySlider");

    if (!slider) return;

    const slides =
        Array.from(
            slider.querySelectorAll(
                ".home-gallery-slide"
            )
        );

    const previousButton =
        document.getElementById("homeGalleryPrev");

    const nextButton =
        document.getElementById("homeGalleryNext");

    const dotsContainer =
        document.getElementById("homeGalleryDots");

    const progress =
        document.getElementById("homeGalleryProgress");

    if (!slides.length) return;

    const intervalDuration = 6000;

    let currentIndex = 0;

    let intervalId = null;

    const dots = slides.map((slide, index) => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "home-gallery-dot";

        button.setAttribute(
            "aria-label",
            `Show gallery image ${index + 1}`
        );

        button.addEventListener("click", () => {

            showSlide(index);

            restartAutoplay();

        });

        dotsContainer?.appendChild(button);

        return button;

    });

    function restartProgress() {

        if (!progress) return;

        progress.classList.remove("running");

        void progress.offsetWidth;

        progress.classList.add("running");

    }

    function showSlide(index) {

        currentIndex =
            (index + slides.length) %
            slides.length;

        slides.forEach((slide, slideIndex) => {

            slide.classList.toggle(
                "active",
                slideIndex === currentIndex
            );

            slide.setAttribute(
                "aria-hidden",
                String(slideIndex !== currentIndex)
            );

        });

        dots.forEach((dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === currentIndex
            );

            dot.setAttribute(
                "aria-current",
                dotIndex === currentIndex
                    ? "true"
                    : "false"
            );

        });

        restartProgress();

    }

    function nextSlide() {

        showSlide(currentIndex + 1);

    }

    function previousSlide() {

        showSlide(currentIndex - 1);

    }

    function startAutoplay() {

        window.clearInterval(intervalId);

        intervalId =
            window.setInterval(
                nextSlide,
                intervalDuration
            );

        restartProgress();

    }

    function stopAutoplay() {

        window.clearInterval(intervalId);

        intervalId = null;

        progress?.classList.remove("running");

    }

    function restartAutoplay() {

        startAutoplay();

    }

    previousButton?.addEventListener(
        "click",
        () => {

            previousSlide();

            restartAutoplay();

        }
    );

    nextButton?.addEventListener(
        "click",
        () => {

            nextSlide();

            restartAutoplay();

        }
    );

    slider.addEventListener(
        "mouseenter",
        stopAutoplay
    );

    slider.addEventListener(
        "mouseleave",
        startAutoplay
    );

    slider.addEventListener(
        "focusin",
        stopAutoplay
    );

    slider.addEventListener(
        "focusout",
        startAutoplay
    );

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stopAutoplay();

            } else {

                startAutoplay();

            }

        }
    );

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "ArrowLeft") {

                previousSlide();

                restartAutoplay();

            }

            if (event.key === "ArrowRight") {

                nextSlide();

                restartAutoplay();

            }

        }
    );

    showSlide(0);

    startAutoplay();

});