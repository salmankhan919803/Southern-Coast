/* ========================================
   SOUTHERN COAST - FIXED SCRIPT
======================================== */

(() => {
    "use strict";

    /* ========================================
       PAGE LOADER
    ======================================== */

    window.addEventListener("load", () => {
        const loader = document.getElementById("loader");
        if (loader) loader.classList.add("hide");
    });

    /* ========================================
       NAVBAR
    ======================================== */

    const navbar = document.getElementById("navbar");

    const updateNavbar = () => {
        if (!navbar) return;
        navbar.classList.toggle("scrolled", window.scrollY > 60);
    };

    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();

    /* ========================================
       MOBILE MENU
    ======================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navMenu) navMenu.classList.remove("open");
            if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    /* ========================================
       ACTIVE NAVIGATION
    ======================================== */

    const sections = document.querySelectorAll("section[id]");

    const updateActiveNav = () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 160;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentSection}`
            );
        });
    };

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();

    /* ========================================
       SCROLL REVEAL
    ======================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("show"));
    }

    /* ========================================
       GALLERY FILTER
    ======================================== */

    const galleryGrid = document.querySelector(".gallery-grid");
    const galleryTabs = document.querySelectorAll(".gallery-tab");
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const filter = tab.dataset.filter || "all";

            galleryTabs.forEach((item) => {
                item.classList.toggle("active", item === tab);
            });

            galleryItems.forEach((item) => {
                const categories = (item.dataset.category || "")
                    .split(/\s+/)
                    .filter(Boolean);

                const shouldShow =
                    filter === "all" || categories.includes(filter);

                item.classList.toggle("hidden", !shouldShow);
                item.setAttribute("aria-hidden", String(!shouldShow));
            });

            if (galleryGrid) {
                galleryGrid.classList.toggle("is-filtered", filter !== "all");
            }
        });
    });

    /* ========================================
       OPTIONAL VIDEO MODAL
       Safe even when #playVideo is not present.
    ======================================== */

    const videoModal = document.getElementById("videoModal");
    const closeVideo = document.getElementById("closeVideo");
    const videoTriggers = document.querySelectorAll("#playVideo, [data-open-video]");

    const openVideoModal = () => {
        if (!videoModal) return;
        videoModal.classList.add("open");
        document.body.classList.add("no-scroll");
    };

    const closeVideoModal = () => {
        if (!videoModal) return;
        videoModal.classList.remove("open");
        document.body.classList.remove("no-scroll");
    };

    videoTriggers.forEach((trigger) => {
        trigger.addEventListener("click", openVideoModal);
    });

    if (closeVideo) closeVideo.addEventListener("click", closeVideoModal);

    if (videoModal) {
        videoModal.addEventListener("click", (event) => {
            if (event.target === videoModal) closeVideoModal();
        });
    }

    /* ========================================
       ESC KEY CLOSE
    ======================================== */

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        closeVideoModal();
        if (navMenu) navMenu.classList.remove("open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    });

    /* ========================================
       CONTACT FORM
    ======================================== */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nameInput = document.getElementById("name");
            const name = nameInput ? nameInput.value.trim() : "";

            if (!name) {
                alert("Please enter your name.");
                if (nameInput) nameInput.focus();
                return;
            }

            alert(`Thank you, ${name}! Your message has been received.`);
            contactForm.reset();
        });
    }

    /* ========================================
       HERO SLIDESHOW
    ======================================== */

    const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));

    if (heroSlides.length > 1) {
        let currentSlide = heroSlides.findIndex((slide) =>
            slide.classList.contains("active")
        );

        if (currentSlide < 0) currentSlide = 0;

        setInterval(() => {
            heroSlides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add("active");
        }, 5000);
    }

    /* ========================================
       FEATURE SLIDESHOW
    ======================================== */

    const featureSlideshows = Array.from(
        document.querySelectorAll(".feature-slideshow")
    );

    if (featureSlideshows.length) {
        let featureSlideIndex = 0;
        const maxFeatureSlides = Math.max(
            ...featureSlideshows.map(
                (slideshow) => slideshow.querySelectorAll(".feature-slide").length
            )
        );

        if (maxFeatureSlides > 1) {
            setInterval(() => {
                featureSlideIndex = (featureSlideIndex + 1) % maxFeatureSlides;

                featureSlideshows.forEach((slideshow) => {
                    const slides = Array.from(
                        slideshow.querySelectorAll(".feature-slide")
                    );

                    if (!slides.length) return;

                    slides.forEach((slide) => slide.classList.remove("active"));
                    slides[featureSlideIndex % slides.length].classList.add("active");
                });
            }, 5000);
        }
    }

    /* ========================================
       GALLERY SMOOTH SYNCHRONIZED SLIDESHOW
       - no hard-coded image count
       - preloads images
       - double-buffered crossfade, so no blank frame
    ======================================== */

    const galleryBoxes = Array.from(
        document.querySelectorAll(".gallery-slideshow[data-images]")
    );

    const galleryStates = galleryBoxes
        .map((box) => {
            const images = (box.dataset.images || "")
                .split(",")
                .map((src) => src.trim())
                .filter(Boolean);

            const firstLayer = box.querySelector("img");
            if (!images.length || !firstLayer) return null;

            images.forEach((src) => {
                const preloadedImage = new Image();
                preloadedImage.src = src;
            });

            box.classList.add("is-ready");
            firstLayer.classList.add("gallery-layer", "is-visible");

            const secondLayer = firstLayer.cloneNode(true);
            secondLayer.removeAttribute("id");
            secondLayer.classList.remove("is-visible");
            box.appendChild(secondLayer);

            return {
                images,
                visibleLayer: firstLayer,
                hiddenLayer: secondLayer
            };
        })
        .filter(Boolean);

    if (galleryStates.length) {
        const maxGallerySlides = Math.max(
            ...galleryStates.map((state) => state.images.length)
        );

        let gallerySlideIndex = 0;

        const changeGalleryImages = async () => {
            gallerySlideIndex = (gallerySlideIndex + 1) % maxGallerySlides;

            await Promise.all(
                galleryStates.map(async (state) => {
                    const nextSrc =
                        state.images[gallerySlideIndex % state.images.length];

                    state.hiddenLayer.src = nextSrc;

                    if (typeof state.hiddenLayer.decode === "function") {
                        try {
                            await state.hiddenLayer.decode();
                        } catch (_) {
                            // Keep current image visible if decode is not supported/ready.
                        }
                    }
                })
            );

            requestAnimationFrame(() => {
                galleryStates.forEach((state) => {
                    state.visibleLayer.classList.remove("is-visible");
                    state.hiddenLayer.classList.add("is-visible");

                    const oldVisible = state.visibleLayer;
                    state.visibleLayer = state.hiddenLayer;
                    state.hiddenLayer = oldVisible;
                });
            });
        };

        if (maxGallerySlides > 1) {
            setInterval(changeGalleryImages, 3500);
        }
    }
})();
