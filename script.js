// QUIZ
function corrigirQuiz() {
  const respostas = {
    q1: "b",
    q2: "c",
    q3: "a",
    q4: "b",
    q5: "c"
  };

  let pontos = 0;
  let respondidas = 0;

  for (const [questao, resposta] of Object.entries(respostas)) {
    const marcada = document.querySelector(
      `input[name="${questao}"]:checked`
    );

    if (marcada) {
      respondidas++;

      if (marcada.value === resposta) {
        pontos++;
      }
    }
  }

  const resultado = document.getElementById("resultadoQuiz");

  if (respondidas < 5) {
    resultado.textContent =
      `Você respondeu ${respondidas} de 5 questões. Complete todas.`;
    return;
  }

  resultado.textContent =
    `Você acertou ${pontos} de 5 questões. ` +
    (pontos === 5
      ? "Excelente! Você domina os conceitos principais."
      : pontos >= 3
        ? "Muito bem! Revise e tente novamente."
        : "Continue estudando e tente mais uma vez.");
}

function limparQuiz() {
  document.querySelectorAll('#quiz input[type="radio"]')
    .forEach(campo => campo.checked = false);

  document.getElementById("resultadoQuiz").textContent = "";
}


// PALAVRAS CRUZADAS
const palavras = [
  { word: "CAATINGA", row: 0, col: 0 },
  { word: "CISTERNA", row: 2, col: 0 },
  { word: "ESTIAGEM", row: 4, col: 0 }
];

function montarCruzadas() {
  const grade = document.getElementById("crossword");
  grade.innerHTML = "";

  const linhas = 6;
  const colunas = 8;

  for (let linha = 0; linha < linhas; linha++) {
    for (let coluna = 0; coluna < colunas; coluna++) {
      const campo = document.createElement("input");

      campo.maxLength = 1;
      campo.autocomplete = "off";

      const pertence = palavras.some(p =>
        p.row === linha &&
        coluna >= p.col &&
        coluna < p.col + p.word.length
      );

      if (!pertence) {
        campo.className = "blocked";
        campo.disabled = true;
      } else {
        campo.dataset.row = linha;
        campo.dataset.col = coluna;
        campo.setAttribute("aria-label",
          `Linha ${linha + 1}, coluna ${coluna + 1}`);
      }

      grade.appendChild(campo);
    }
  }
}

function verificarCruzadas() {
  let acertos = 0;

  palavras.forEach(palavra => {
    let atual = "";

    for (let i = 0; i < palavra.word.length; i++) {
      const campo = document.querySelector(
        `#crossword input[data-row="${palavra.row}"][data-col="${palavra.col + i}"]`
      );

      atual += (campo.value || "").toUpperCase();
    }

    if (atual === palavra.word) {
      acertos++;
    }
  });

  document.getElementById("resultadoCruzadas").textContent =
    `Você completou corretamente ${acertos} de 3 palavras.`;
}

function mostrarCruzadas() {
  palavras.forEach(palavra => {
    for (let i = 0; i < palavra.word.length; i++) {
      const campo = document.querySelector(
        `#crossword input[data-row="${palavra.row}"][data-col="${palavra.col + i}"]`
      );

      campo.value = palavra.word[i];
    }
  });

  document.getElementById("resultadoCruzadas").textContent =
    "Respostas: CAATINGA, CISTERNA e ESTIAGEM.";
}


// JOGO DA MEMÓRIA
const paresMemoria = [
  "🌵", "🌵",
  "💧", "💧",
  "🐐", "🐐",
  "☀️", "☀️",
  "🌱", "🌱",
  "🏺", "🏺"
];

let primeira = null;
let bloqueado = false;
let jogadas = 0;
let paresEncontrados = 0;

function iniciarMemoria() {
  const tabuleiro = document.getElementById("memoryBoard");

  tabuleiro.innerHTML = "";
  primeira = null;
  bloqueado = false;
  jogadas = 0;
  paresEncontrados = 0;

  document.getElementById("jogadas").textContent = "0";
  document.getElementById("pares").textContent = "0";
  document.getElementById("memoryMessage").textContent = "";

  const embaralhadas = [...paresMemoria]
    .sort(() => Math.random() - 0.5);

  embaralhadas.forEach(emoji => {
    const carta = document.createElement("button");

    carta.className = "memory-card";
    carta.textContent = "?";
    carta.dataset.emoji = emoji;
    carta.setAttribute("aria-label", "Carta fechada");

    carta.onclick = () => virarCarta(carta);

    tabuleiro.appendChild(carta);
  });
}

function virarCarta(carta) {
  if (
    bloqueado ||
    carta.classList.contains("matched") ||
    carta === primeira
  ) {
    return;
  }

  carta.textContent = carta.dataset.emoji;
  carta.classList.add("revealed");
  carta.setAttribute("aria-label", carta.dataset.emoji);

  if (!primeira) {
    primeira = carta;
    return;
  }

  jogadas++;

  document.getElementById("jogadas").textContent = jogadas;

  if (primeira.dataset.emoji === carta.dataset.emoji) {
    primeira.classList.add("matched");
    carta.classList.add("matched");

    primeira.disabled = true;
    carta.disabled = true;

    paresEncontrados++;

    document.getElementById("pares").textContent = paresEncontrados;

    primeira = null;

    if (paresEncontrados === 6) {
      document.getElementById("memoryMessage").textContent =
        `Parabéns! Você encontrou todos os pares em ${jogadas} jogadas.`;
    }
  } else {
    bloqueado = true;

    const anterior = primeira;

    setTimeout(() => {
      anterior.textContent = "?";
      carta.textContent = "?";

      anterior.classList.remove("revealed");
      carta.classList.remove("revealed");

      anterior.setAttribute("aria-label", "Carta fechada");
      carta.setAttribute("aria-label", "Carta fechada");

      primeira = null;
      bloqueado = false;
    }, 850);
  }
}


// MISSÃO AMBIENTAL
function corrigirMissao() {
  let pontos = 0;
  let marcados = 0;

  document.querySelectorAll("#missionOptions input")
    .forEach(campo => {
      if (campo.checked) {
        marcados++;

        if (campo.value === "1") {
          pontos++;
        }
      }
    });

  const resultado = document.getElementById("resultadoMissao");

  if (marcados === 0) {
    resultado.textContent =
      "Selecione pelo menos uma atitude para conferir sua missão.";
    return;
  }

  resultado.textContent =
    `Você selecionou ${pontos} atitude(s) sustentável(is) correta(s). ` +
    (pontos === 4 && marcados === 4
      ? "Missão cumprida!"
      : "Revise as opções e tente novamente.");
}


// DOWNLOAD DAS ANOTAÇÕES
function baixarAnotacoes() {
  const texto =
    `Cariri Paraibano Interativo\n` +
    `Município: ${document.getElementById("municipio").value}\n` +
    `Observação: ${document.getElementById("observacao").value}\n\n` +
    `Anotações:\n${document.getElementById("notas").value}\n`;

  const arquivo = new Blob(
    [texto],
    { type: "text/plain;charset=utf-8" }
  );

  const url = URL.createObjectURL(arquivo);
  const link = document.createElement("a");

  link.href = url;
  link.download = "anotacoes_cariri_paraibano.txt";

  link.click();

  URL.revokeObjectURL(url);
}


// INICIALIZA OS JOGOS AO ABRIR O SITE
montarCruzadas();
iniciarMemoria();
