document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-copy]");

  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      const original = button.innerHTML;

      try {
        await navigator.clipboard.writeText(value);
        button.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        button.classList.add("copied");
      } catch {
        window.prompt("Copy the server address:", value);
      }

      window.setTimeout(() => {
        button.innerHTML = original;
        button.classList.remove("copied");
      }, 1700);
    });
  });
});
