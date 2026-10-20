const header = document.querySelector("#site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = document.querySelector(".submit-button");
const submitLabel = document.querySelector("#submit-label");

const setHeaderState = () => {
    header?.classList.toggle("scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    navLinks.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        menuToggle?.classList.remove("is-open");
        navLinks?.classList.remove("is-open");
        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Open navigation");
    });
});

const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navItems.forEach((item) => item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`));
    });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => activeSectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
    });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    submitLabel.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.classList.remove("error");

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" }
        });

        if (!response.ok) throw new Error("Form submission failed");
        form.reset();
        formStatus.textContent = "Transmission received. I’ll be in touch soon.";
    } catch (error) {
        formStatus.textContent = "Something went wrong. Please email me directly instead.";
        formStatus.classList.add("error");
    } finally {
        submitButton.disabled = false;
        submitLabel.textContent = "Send transmission";
    }
});
