gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("section").forEach((section) => {
    gsap.fromTo(
        section,
        { opacity: 0, scale: 0.9 },
        {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
});

function exibirNotificacao(mensagem, sucesso = true) {
    const box = document.getElementById('notificacao');
    box.textContent = mensagem;
    box.style.borderColor = sucesso ? 'cyan' : 'red';
    box.style.boxShadow = sucesso ? '0 0 12px cyan' : '0 0 12px red';
    box.style.display = 'block';

    setTimeout(() => {
        box.style.display = 'none';
    }, 4000);
}

(function () {
    emailjs.init('lI8NxUlevxm66K-Rh');
})();

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_3p5jigi', 'template_kku9axo', this)
        .then(() => {
            exibirNotificacao('Mensagem enviada com sucesso!');
            this.reset();
        }, (error) => {
            exibirNotificacao('Erro ao enviar. Tente novamente mais tarde.', false);
            console.error(error);
        });
});
