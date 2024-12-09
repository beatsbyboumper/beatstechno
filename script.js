document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".buy-button");
  const playButtons = document.querySelectorAll(".play-button");
  let currentAudio = null;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const paymentMethod = button.dataset.payment;

      if (paymentMethod === "mercado-pago") {
        alert("Reserva tu beat por MP monto: $500. Y segui las instrucciones");
        window.open("https://mpago.la/25hyFZG", "_blank");
      } else if (paymentMethod === "paypal") {
        alert("Redirigiendo a PayPal...");
        window.open("https://www.paypal.me/boumperx/", "_blank");
      }
    });
  });

  playButtons.forEach(button => {
    button.addEventListener("click", () => {
      const audioId = button.dataset.audio;
      const audioElement = document.getElementById(audioId);

      if (currentAudio && currentAudio !== audioElement) {
        currentAudio.pause();
        document.querySelector(`button[data-audio="${currentAudio.id}"]`).textContent = "▶";
      }

      if (audioElement.paused) {
        audioElement.play();
        button.textContent = "⏸";
        currentAudio = audioElement;
      } else {
        audioElement.pause();
        button.textContent = "▶";
        currentAudio = null;
      }
    });
  });
});
