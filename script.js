document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".buy-button");
  const playButtons = document.querySelectorAll(".play-button");
  const progressBars = document.querySelectorAll(".progress-bar");
  const currentTimeElems = document.querySelectorAll(".current-time");
  const totalTimeElems = document.querySelectorAll(".total-time");

  let currentAudio = null;

  // Funcionalidad de compra
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const paymentMethod = button.dataset.payment;

      if (paymentMethod === "mercado-pago") {
        
        window.open("https://beatsbyboumper.github.io/confirmacion/", "_blank");
      } else if (paymentMethod === "paypal") {
        alert("Redirigiendo a PayPal...");
        window.open("https://www.paypal.me/boumperx/", "_blank");
      }
    });
  });

  // Funcionalidad de reproducción
  playButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const audioId = button.dataset.audio;
      const audioElement = document.getElementById(audioId);
      const progressBar = progressBars[index];
      const currentTimeElem = currentTimeElems[index];
      const totalTimeElem = totalTimeElems[index];

      // Pausar el audio actual si se reproduce uno nuevo
      if (currentAudio && currentAudio !== audioElement) {
        currentAudio.pause();
        document.querySelector(`button[data-audio="${currentAudio.id}"]`).textContent = "▶";
      }

      // Reproducir o pausar el audio actual
      if (audioElement.paused) {
        audioElement.play();
        button.textContent = "⏸";
        currentAudio = audioElement;

        // Mostrar duración total
        audioElement.addEventListener("loadedmetadata", () => {
          progressBar.max = Math.floor(audioElement.duration);
          totalTimeElem.textContent = formatTime(audioElement.duration);
        });

        // Actualizar barra de progreso y tiempo
        audioElement.addEventListener("timeupdate", () => {
          progressBar.value = Math.floor(audioElement.currentTime);
          currentTimeElem.textContent = formatTime(audioElement.currentTime);
        });

        // Reiniciar botón y barra al terminar
        audioElement.addEventListener("ended", () => {
          button.textContent = "▶";
          progressBar.value = 0;
          currentTimeElem.textContent = "0:00";
          currentAudio = null;
        });
      } else {
        audioElement.pause();
        button.textContent = "▶";
        currentAudio = null;
      }
    });

    // Control de barra de progreso manual
    progressBars[index].addEventListener("input", function () {
      const audioElement = document.getElementById(playButtons[index].dataset.audio);
      audioElement.currentTime = this.value;
    });
  });

  // Formatear tiempo en minutos y segundos
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  }
});
