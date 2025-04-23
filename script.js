// script.js

// Importe as funções que você precisa dos SDKs do Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';

// Sua configuração do Firebase (cole aquele código do console aqui)
const firebaseConfig = {
  apiKey: "AIzaSyBz3ja0KHZHA9UP3XLnnIQhzRNyVlxZpxg",
  authDomain: "portfolio-8b205.firebaseapp.com",
  projectId: "portfolio-8b205",
  storageBucket: "portfolio-8b205.firebasestorage.app",
  messagingSenderId: "828825844044",
  appId: "1:828825844044:web:e41ead56833095bfd177e9",
  measurementId: "G-RTZEFC3147"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const contatosCollection = collection(db, 'contatos');

// ===============================
// 🌗 Alternar Tema Claro/Escuro
// ===============================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Aplica o tema salvo no localStorage ao carregar a página
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "🌜";
}

// Alterna o tema ao clicar no botão
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  const isDark = body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "🌜" : "🌞";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


// ===============================
// ✨ Animações de Seções ao Rolar
// ===============================
const secoes = document.querySelectorAll(".secao");

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
    }
  });
}, { threshold: 0.2 });

secoes.forEach(secao => observador.observe(secao));


// ===============================
// 📁 Projetos: Mostrar/Esconder Detalhes
// ===============================
const botoesVerDetalhes = document.querySelectorAll(".ver-detalhes-inicial");
const botoesVoltar = document.querySelectorAll(".voltar-resumo");
const detalhesProjetos = document.querySelectorAll(".projeto-detalhe");
const cardsWrapper = document.querySelectorAll(".projeto-card-wrapper");

// Mostra os detalhes do projeto ao clicar
botoesVerDetalhes.forEach(botao => {
  botao.addEventListener("click", () => {
    const idProjeto = botao.getAttribute("data-projeto");
    const detalhe = document.getElementById(`detalhe-projeto-${idProjeto}`);

    // Esconde os cards principais
    cardsWrapper.forEach(wrapper => wrapper.classList.add("invisivel"));

    // Mostra o detalhe do projeto
    detalhe.classList.add("ativo");
  });
});

// Volta para os cards de resumo
botoesVoltar.forEach(botao => {
  botao.addEventListener("click", () => {
    detalhesProjetos.forEach(detalhe => detalhe.classList.remove("ativo"));
    cardsWrapper.forEach(wrapper => wrapper.classList.remove("invisivel"));
  });
});


// ===============================
// 📬 Validação Simples do Formulário e Envio para Firebase
// ===============================
const formContato = document.getElementById("form-contato");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const mensagemInput = document.getElementById("mensagem");

formContato.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = nomeInput.value;
  const email = emailInput.value;
  const mensagem = mensagemInput.value;

  const contatoData = {
    nome: nome,
    email: email,
    mensagem: mensagem,
    dataEnvio: serverTimestamp()
  };

  addDoc(contatosCollection, contatoData)
    .then((docRef) => {
      console.log("Mensagem enviada com sucesso com ID: ", docRef.id);
      alert("Mensagem enviada com sucesso!");
      formContato.reset();
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem: ", error);
      alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
    });
});


// ===============================
// 🍔 Toggle Menu Responsivo
// ===============================
const menuToggle = document.getElementById('menu-toggle-icon');
const menu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('aberto');
  menuToggle.classList.toggle('aberto');
});


// ===============================
// 📏 Esconder/Mostrar Header ao Rolar
// ===============================
const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > header.offsetHeight) {
    header.classList.add('rolando-para-baixo');
    header.classList.remove('rolando-para-cima');
  } else if (currentScrollY < lastScrollY) {
    header.classList.add('rolando-para-cima');
    header.classList.remove('rolando-para-baixo');
  }

  lastScrollY = currentScrollY;
});

// Fecha o menu mobile ao clicar em um link
document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    menuToggle.classList.remove("aberto");
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const logoMenuToggle = document.getElementById('logo-menu-toggle');
  const contactMenu = document.getElementById('contact-menu');

  logoMenuToggle.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que o link da logo cause rolagem para o topo
    contactMenu.classList.toggle('active');
  });

  // Fechar o menu ao clicar fora dele (opcional)
  document.addEventListener('click', (event) => {
    if (contactMenu.classList.contains('active') && !event.target.closest('.header-top') && !event.target.closest('.contact-menu')) {
      contactMenu.classList.remove('active');
    }
  });
});

const textoElemento = document.querySelector('.texto-digitando');
const texto = "Olá! Me chamo Luiz e estou iniciando minha jornada no fascinante mundo da tecnologia como desenvolvedor full stack. Sou movido pela paixão de transformar ideias criativas em aplicações web modernas e funcionais. Tenho grande entusiasmo em aprender e crescer, buscando constantemente aprimorar minhas habilidades em front-end, back-end e tudo que envolve a construção de soluções digitais inovadoras, com foco em performance, design intuitivo e uma experiência de usuário agradável.";
const intervalo = 50; // Intervalo em milissegundos entre cada letra

function digitarTexto() {
  textoElemento.textContent = ''; // Limpa o texto inicial
  let i = 0;
  const timer = setInterval(() => {
    if (i < texto.length) {
      textoElemento.textContent += texto.charAt(i);
      i++;
    } else {
      clearInterval(timer); // Para a animação quando o texto estiver completo
    }
  }, intervalo);
}

// Inicia a animação quando a página carrega (ou quando você quiser)
window.onload = digitarTexto;

document.addEventListener('DOMContentLoaded', function() {
  const fotosPequenas = document.querySelectorAll('.foto-pequena');
  const projetoDetalhe = document.getElementById('detalhe-projeto-projeto-3'); // Ou outro container se necessário

  // Cria o container para a foto grande e o botão de fechar
  const fotoGrandeContainer = document.createElement('div');
  fotoGrandeContainer.classList.add('foto-grande-container');
  const fotoGrande = document.createElement('img');
  fotoGrande.classList.add('foto-grande');
  const botaoFechar = document.createElement('span');
  botaoFechar.classList.add('fechar-foto-grande');
  botaoFechar.innerHTML = '&times;'; // Símbolo de "X"

  fotoGrandeContainer.appendChild(fotoGrande);
  fotoGrandeContainer.appendChild(botaoFechar);
  document.body.appendChild(fotoGrandeContainer);

  // Adiciona o evento de clique a cada foto pequena
  fotosPequenas.forEach(foto => {
    foto.addEventListener('click', function() {
      const imgSrc = this.getAttribute('src');
      fotoGrande.setAttribute('src', imgSrc);
      fotoGrandeContainer.style.display = 'flex'; // Mostra o container da foto grande
    });
  });

  // Adiciona o evento de clique ao botão de fechar
  botaoFechar.addEventListener('click', function() {
    fotoGrandeContainer.style.display = 'none'; // Esconde o container da foto grande
  });

  // Adiciona funcionalidade para fechar ao clicar fora da imagem grande
  fotoGrandeContainer.addEventListener('click', function(event) {
    if (event.target === this) { // Verifica se o clique foi no fundo do container
      fotoGrandeContainer.style.display = 'none';
    }
  });
});