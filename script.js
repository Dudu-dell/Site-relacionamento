// Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

// Chat Functionality
const chatTextarea = document.querySelector(".chat textarea");
const chatButton = document.querySelector(".chat button");
const chatHistory = document.createElement("div");

chatButton.addEventListener("click", () => {
    const message = chatTextarea.value.trim();
    if (message) {
        const newMessage = document.createElement("p");
        newMessage.textContent = `Você: ${message}`;
        chatHistory.appendChild(newMessage);
        document.querySelector(".chat").appendChild(chatHistory);
        chatTextarea.value = ""; // Limpa o campo de texto após enviar a mensagem
    }
});
