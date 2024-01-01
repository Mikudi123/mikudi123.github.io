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

const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.7
});

const contentChildElements = document.querySelectorAll(".article-gradient-bg");
const articleTitles = document.querySelectorAll(".content-small-titles");

contentChildElements.forEach(element => {
    observer.observe(element);
});

articleTitles.forEach(element => {
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
const header_trigger = document.getElementById("header-trigger");
const header = document.getElementById("header");
document.addEventListener("scroll", function () {
    const headerTriggerVisible = ElementIsInViewport(header_trigger);

    if (!headerTriggerVisible) {
        if (header.style.display === "none") return;
        header.style.opacity = "0";
    } else {
        if (header.style.display === "block") return;
        header.style.opacity = "1";
    }
}, {
    passive: true
});

const observed_content = document.getElementById("observe");
observer.observe(observed_content);
window.dispatchEvent(new Event("resize"));
