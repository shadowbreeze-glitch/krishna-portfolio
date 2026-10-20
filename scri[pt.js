const texts = [
    "Computer Science Student",
    "Web Developer",
    "AI Enthusiast",
    "Problem Solver"
];

let index = 0;
let charIndex = 0;
let deleting = false;

const typingText = document.getElementById("typing-text");

function typeEffect() {

    const currentText = texts[index];

    if (!deleting) {
        typingText.textContent =
            currentText.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentText.length) {
            deleting = true;

            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingText.textContent =
            currentText.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            index = (index + 1) % texts.length;
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();