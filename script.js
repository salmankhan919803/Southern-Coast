/* ========================================
   PAGE LOADER
======================================== */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {
        loader.classList.add("hide");
    }

});

/* ========================================
   NAVBAR
======================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ========================================
   MOBILE MENU
======================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("open");

});


/* Close menu after clicking link */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("open");

    });

});


/* ========================================
   ACTIVE NAVIGATION
======================================== */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 160;

        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

}


window.addEventListener("scroll", updateActiveNav);


/* ========================================
   SCROLL REVEAL
======================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );


const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* ========================================
   GALLERY FILTER
======================================== */

const galleryTabs =
    document.querySelectorAll(".gallery-tab");

const galleryItems =
    document.querySelectorAll(".gallery-item");


galleryTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        /* Remove active */

        galleryTabs.forEach(function (item) {
            item.classList.remove("active");
        });

        /* Add active */

        tab.classList.add("active");

        const filter =
            tab.getAttribute("data-filter");


        galleryItems.forEach(function (item) {

            const category =
                item.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

                item.classList.remove("hidden");

            } else {

                item.classList.add("hidden");

            }

        });

    });

});


/* ========================================
   VIDEO MODAL
======================================== */

const videoModal =
    document.getElementById("videoModal");

const playVideo =
    document.getElementById("playVideo");

const closeVideo =
    document.getElementById("closeVideo");


playVideo.addEventListener("click", function () {

    videoModal.classList.add("open");

    document.body.classList.add("no-scroll");

});


closeVideo.addEventListener("click", function () {

    videoModal.classList.remove("open");

    document.body.classList.remove("no-scroll");

});


videoModal.addEventListener("click", function (event) {

    if (event.target === videoModal) {

        videoModal.classList.remove("open");

        document.body.classList.remove("no-scroll");

    }

});


/* ========================================
   ESC KEY CLOSE
======================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        videoModal.classList.remove("open");

        document.body.classList.remove("no-scroll");

        navMenu.classList.remove("open");

    }

});




/* ========================================
   CONTACT FORM
======================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();


    if (name === "") {
        alert("Please enter your name.");
        return;
    }


    alert(
        "Thank you, " +
        name +
        "! Your message has been received."
    );


    contactForm.reset();

});
const heroSlides = document.querySelectorAll(".hero-slide");

let currentSlide = 0;

function changeHeroSlide() {
    heroSlides[currentSlide].classList.remove("active");

    currentSlide++;

    if (currentSlide >= heroSlides.length) {
        currentSlide = 0;
    }

    heroSlides[currentSlide].classList.add("active");
}

setInterval(changeHeroSlide, 5000);
/* ========================================
   FEATURE SLIDESHOW
   SAME AS HOME SLIDESHOW
======================================== */

const featureSlideshows =
    document.querySelectorAll(".feature-slideshow");

let featureSlideIndex = 0;


function changeFeatureSlides() {

    featureSlideshows.forEach(function (slideshow) {

        const slides =
            slideshow.querySelectorAll(".feature-slide");

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        slides[featureSlideIndex].classList.add("active");

    });


    featureSlideIndex++;

    if (featureSlideIndex >= 3) {
        featureSlideIndex = 0;
    }

}

setInterval(changeFeatureSlides, 5000);


/* ========================================
   GALLERY SLIDESHOW
======================================== */

/* ========================================
   GALLERY SYNCHRONIZED SLIDESHOW
======================================== */

/* ========================================
   GALLERY SMOOTH SYNCHRONIZED SLIDESHOW
======================================== */

/* ========================================
   GALLERY SYNCHRONIZED PHOTO SLIDESHOW
======================================== */

/* ========================================
   GALLERY SYNCHRONIZED SLIDESHOW
   SMOOTH - NO BLANK SCREEN
======================================== */

const galleryBoxes =
    document.querySelectorAll(".gallery-slideshow");

let gallerySlideIndex = 0;


/* Preload Gallery images */

galleryBoxes.forEach(function (box) {

    const images = box
        .getAttribute("data-images")
        .split(",");

    images.forEach(function (src) {

        const img = new Image();

        img.src = src.trim();

    });

});


function changeGalleryImages() {

    /* Calculate NEXT image ONCE */

    gallerySlideIndex++;

    if (gallerySlideIndex >= 4) {
        gallerySlideIndex = 0;
    }


    /*
       First prepare ALL new images.
       Nothing becomes blank.
    */

    galleryBoxes.forEach(function (box) {

        const images =
            box.getAttribute("data-images")
               .split(",");

        const image =
            box.querySelector("img");

        image.src =
            images[gallerySlideIndex].trim();

    });

}


/* Change ALL gallery images together */

setInterval(changeGalleryImages, 3500);
