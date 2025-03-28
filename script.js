// script.js

// Controle do Menu
document.getElementById("menuToggle").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
});

// Função para "Voltar ao Topo"
const backToTopButton = document.getElementById("backToTop");

backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

// Validação de Formulário de Cadastro
document.querySelector("#signup form").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (name === "" || email === "" || password === "") {
        alert("Por favor, preencha todos os campos.");
    } else if (password.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
    } else {
        alert("Cadastro realizado com sucesso!");
        exibirPerfil({ nome: name, email });
    }
});

// Exibição Dinâmica de Perfis de Usuários
const profileSection = document.getElementById("profile");

function exibirPerfil(usuario) {
    profileSection.innerHTML = `
        <h2>Perfil</h2>
        <p><strong>Nome:</strong> ${usuario.nome}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
    `;
}

// Simulação de Carregamento Inicial do Perfil
function carregarPerfil() {
    profileSection.innerHTML = `
        <h2>Perfil</h2>
        <p>Bem-vindo ao seu perfil! Cadastre-se para mais informações.</p>
    `;
}
carregarPerfil();

// Melhorar Navegação entre as Seções
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
});

// Efeito de Fade-In ao Rolagem
const fadeInElements = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    fadeInElements.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
        } else {
            section.style.opacity = 0;
            section.style.transform = "translateY(20px)";
        }
    });
});
