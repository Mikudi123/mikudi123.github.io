const header_contact_info = document.getElementById("contact-info-header");
const header_trigger = document.getElementById("header-trigger");
const header = document.getElementById("header");
const observed_content = document.getElementById("observe");
const arrow_down = document.getElementById("arrow-down");
const arrow_trigger = document.getElementById("arrow-down-trigger");

// Return true if given element is shown in viewport (minus the height of the element from the top)
function ElementIsInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.bottom <= 0 || rect.top >= (window.innerHeight || document.documentElement.clientHeight)
}


function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
        } // else {
        //     entry.target.classList.remove("fade-in");
        // }
    });
}

// Rework to classes at somepoint, inline styles are baaaad
function toggleHeaderContent() {
    const header_contact_info = document.getElementById("contact-info-header");
    const social_media_icons = document.getElementById("social-medias-container");

    if (header_contact_info.style.opacity == "0") {
        header_contact_info.style.opacity = "1";
        header_contact_info.style.display = "flex";
        social_media_icons.style.display = "flex";
        social_media_icons.style.opacity = "1";
    } else {
        header_contact_info.style.opacity = "0";
        header_contact_info.style.display = "none";
        social_media_icons.style.display = "none";
        social_media_icons.style.opacity = "0";
    }
}

const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.3
});

const observedElements = document.querySelectorAll(".article-gradient-bg, .content-small-titles");
observedElements.forEach(element => {
    observer.observe(element);
});

function checkWidthAndAddClass(element) {
    if (element.offsetWidth < 500) {
        element.classList.add("article-wrap-column");
    } else {
        element.classList.remove("article-wrap-column");
    }
}

const articleContainers = document.querySelectorAll(".article-with-img");
window.addEventListener("resize", function () {
    articleContainers.forEach(function (element) {
        checkWidthAndAddClass(element);
    });
});

document.addEventListener("scroll", function () {
    const headerTriggerVisible = ElementIsInViewport(header_trigger);

    // This is for the header to show, if "Mikko Kärki" is not visible -> header will show
    // Also this si the point when the arrow-down will trigger
    if (!headerTriggerVisible) {
        header.style.visibility = "hidden";
        header.style.opacity = "0";
        arrow_down.style.opacity = "1";
    } else {
        header.style.visibility = "visible";
        header.style.opacity = "1";
        arrow_down.style.opacity = "0";
    }
}, {
    passive: true
});

observer.observe(observed_content);
window.dispatchEvent(new Event("resize"));
