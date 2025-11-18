// Redirecionar card para agendamento
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    window.location.href = "agendamento.html";
  });
});

// Exibir QR Code quando PIX for selecionado
const paySelect = document.getElementById("payment");
const pixArea = document.querySelector(".pix-area");

if (paySelect) {
  paySelect.addEventListener("change", () => {
    pixArea.style.display = paySelect.value === "pix" ? "block" : "none";
  });
}
