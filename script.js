/* ==================================
   SLIDER DE VÍDEOS (CORRIGIDO)
================================== */

let videoIndex = 0;
// Seleciona todos os vídeos dentro da seção
const videos = document.querySelectorAll(".video-slider video");

function switchVideo() {
    // 1. Pausa o vídeo ativo no momento (o vídeo anterior)
    if (videos[videoIndex]) {
        videos[videoIndex].pause();
        videos[videoIndex].classList.remove("active");
        videos[videoIndex].currentTime = 0; // Volta o vídeo para o início
    }

    // 2. Calcula o índice do próximo vídeo
    videoIndex++;
    if (videoIndex >= videos.length) {
        videoIndex = 0;
    }

    // 3. Ativa e Tenta Reproduzir o novo vídeo
    if (videos[videoIndex]) {
        videos[videoIndex].classList.add("active");
        // Tenta iniciar a reprodução. O .catch lida com bloqueios de autoplay.
        videos[videoIndex].play().catch(error => {
            console.log("Autoplay bloqueado pelo navegador.", error);
        });
    }
}

// Inicializa: Define o primeiro vídeo como ativo e tenta reproduzir
if (videos.length > 0) {
    videos[0].classList.add("active");
    videos[0].play().catch(error => {
        console.log("Autoplay inicial bloqueado:", error);
    });
}

// Inicia a troca de vídeos a cada 5 segundos
setInterval(switchVideo, 5000);


/* ==================================
   AÇÃO DOS CARDS → IR PARA AGENDA (Mantido)
================================== */

document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => {
        const service = card.getAttribute("data-service");
        window.location.href = `agendamento.html?servico=${service}`;
    });
});
