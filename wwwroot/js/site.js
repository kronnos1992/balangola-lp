document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section, .hero");
    const dots = document.querySelectorAll(".side-dots .dot");
    const faders = document.querySelectorAll(".fade-in");
    const navHeight = document.querySelector(".navbar")?.offsetHeight || 80;

    // === Scroll Spy (destacar bolhas) ===
    const spyOptions = {
        root: null,
        rootMargin: `-${navHeight}px 0px 0px 0px`,
        threshold: 0.6 // 60% da section precisa estar visível
    };

    const spyObserver = new IntersectionObserver((entries) => {
        let mostVisible = null;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) {
                    mostVisible = entry;
                }
            }
        });

        if (mostVisible) {
            const id = "#" + mostVisible.target.id; // 🔥 correção aqui
            dots.forEach(dot => dot.classList.remove("active"));
            const correspondingDot = document.querySelector(`.side-dots .dot[href="${id}"]`);
            if (correspondingDot) {
                correspondingDot.classList.add("active");
            }
        }
    }, spyOptions);

    // Observar todas as seções com ID
    sections.forEach(section => {
        if (section.id) spyObserver.observe(section);
    });

    // === Fade In das seções ===
    const fadeOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);

    faders.forEach(fader => fadeObserver.observe(fader));

    // === Scroll suave ao clicar na bolha (compensa navbar) ===
    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            e.preventDefault();
            const id = dot.getAttribute("href");
            const target = document.querySelector(id);
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top, behavior: "smooth" });
            }
        });
    });
});
