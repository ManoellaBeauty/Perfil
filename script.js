/* ==================================
   SLIDER DE VÍDEOS
================================== */

let videoIndex = 0;
const videos = document.querySelectorAll(".video-slider video");

function switchVideo() {
    videos.forEach(v => v.classList.remove("active"));

    videoIndex++;
    if (videoIndex >= videos.length) videoIndex = 0;

    videos[videoIndex].classList.add("active");
}

videos[0].classList.add("active");
setInterval(switchVideo, 5000);


/* ==================================
   AÇÃO DOS CARDS → IR PARA AGENDA
================================== */

document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => {
        const service = card.getAttribute("data-service");
        window.location.href = `agendamento.html?servico=${service}`;
    });
});

