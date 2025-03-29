// Menu Toggle
document.getElementById("menuToggle").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
});

// Substituir Imagem do Perfil ao Cadastrar
document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Impede envio do formulário para manipulação
    const fileInput = document.getElementById("userImage");
    const uploadedImage = document.getElementById("uploadedImage");

    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (event) => {
            uploadedImage.src = event.target.result; // Atualiza a imagem do perfil
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert("Por favor, selecione uma imagem para o cadastro.");
    }
});
