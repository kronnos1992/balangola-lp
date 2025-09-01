document.addEventListener("DOMContentLoaded", () => {
    const dots = document.querySelectorAll(".side-dots .dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentIndex = 0;
    const slideWidth = 600; // mesmo valor do CSS
    const totalSlides = 6;

    // === Scroll suave ao clicar na bolha ===
    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            e.preventDefault();
            const id = dot.getAttribute("href");
            const target = document.querySelector(id);
            if (target) {
                const top = target.offsetTop;
                window.scrollTo({ top, behavior: "smooth" });
            }
        });
    });

    /* */
});
