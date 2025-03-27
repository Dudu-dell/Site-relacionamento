// Configuração do Firebase
const firebaseConfig = {
    apiKey: "sua-api-key",
    authDomain: "seu-app.firebaseapp.com",
    databaseURL: "https://seu-app.firebaseio.com", // Certifique-se de adicionar seu databaseURL
    projectId: "seu-id-projeto",
    storageBucket: "seu-storage-bucket",
    messagingSenderId: "seu-id-mensagem",
    appId: "seu-id-app"
};

// Inicializando Firebase
firebase.initializeApp(firebaseConfig);

// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault(); // Evita envio padrão
            alert('Formulário enviado com sucesso!');
        });
    });
});

// Cadastro de Usuário
const signupForm = document.querySelector('#signup form');
if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita envio padrão
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        try {
            // Criar usuário no Firebase Authentication
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Salvar dados do usuário no Realtime Database
            await firebase.database().ref('users/' + user.uid).set({
                name: name,
                email: email
            });

            alert('Cadastro realizado com sucesso!');
        } catch (error) {
            console.error('Erro no cadastro:', error);
            alert('Erro ao cadastrar: ' + error.message);
        }
    });
}

// Login de Usuário
const loginForm = document.querySelector('#login form');
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita envio padrão
        const email = document.querySelector('#loginEmail').value;
        const password = document.querySelector('#loginPassword').value;

        try {
            // Login no Firebase Authentication
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            alert('Login realizado com sucesso!');
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Erro ao fazer login: ' + error.message);
        }
    });
}

// Exibir dados do perfil do usuário
firebase.auth().onAuthStateChanged(async (user) => {
    const profileSection = document.querySelector('#profile');
    if (user && profileSection) {
        try {
            // Recuperar dados do Realtime Database
            const userDataSnapshot = await firebase.database().ref('users/' + user.uid).once('value');
            const userData = userDataSnapshot.val();

            if (userData) {
                profileSection.innerHTML = `
                    <h2>Perfil</h2>
                    <p>Bem-vindo, ${userData.name}!</p>
                    <p>Email: ${userData.email}</p>
                `;
            } else {
                profileSection.innerHTML = `<p>Dados do usuário não encontrados!</p>`;
            }
        } catch (error) {
            console.error('Erro ao carregar dados do perfil:', error);
            alert('Erro ao carregar perfil do usuário!');
        }
    } else if (profileSection) {
        profileSection.innerHTML = `
            <h2>Perfil</h2>
            <p>Você precisa fazer login para acessar seu perfil.</p>
        `;
    }
});

// Botão Voltar ao Topo
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Alternar Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
}
