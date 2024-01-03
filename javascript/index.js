const header_contact_info = document.getElementById("contact-info-header");
const header_trigger = document.getElementById("header-trigger");
const header = document.getElementById("header");
const observed_content = document.getElementById("observe");

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

    if (header_contact_info.style.opacity == "0") {
        header_contact_info.style.opacity = "1";
        header_contact_info.style.display = "flex";
    } else {
        header_contact_info.style.opacity = "0";
        header_contact_info.style.display = "none";
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

// This is for the header to show, if "Mikko Kärki" is not visible -> header will show
document.addEventListener("scroll", function () {
    const headerTriggerVisible = ElementIsInViewport(header_trigger);

    if (!headerTriggerVisible) {
        header.style.visibility = "hidden";
        header.style.opacity = "0";
    } else {
        header.style.visibility = "visible";
        header.style.opacity = "1";
    }
}, {
    passive: true
});

observer.observe(observed_content);
window.dispatchEvent(new Event("resize"));
