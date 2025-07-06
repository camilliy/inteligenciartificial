const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Você chega à Mansão Vellamoor sob uma tempestade. A porta está entreaberta e há velas acesas no chão. O que faz?",
        alternativas: [
            {
                texto: "Entra com cautela, observando cada detalhe.",
                afirmacao: "Você é guiado pela prudência e atenção ao ambiente."
            },
            {
                texto: "Empurra a porta com força e entra chamando por alguém.",
                afirmacao: "Você prefere enfrentar o desconhecido de forma direta."
            }
        ]
    },
    {
        enunciado: "No hall de entrada, você vê um espelho antigo. Seu reflexo sorri antes de você. Como reage?",
        alternativas: [
            {
                texto: "Se aproxima, tentando entender o fenômeno.",
                afirmacao: "Você aceita o inexplicável com curiosidade e busca respostas."
            },
            {
                texto: "Vira o rosto e segue em frente sem encarar o espelho.",
                afirmacao: "Você evita confrontar o que não compreende."
            }
        ]
    },
    {
        enunciado: "Você encontra uma carta com seu nome, datada de 2013. Você não lembra de nada desse ano.",
        alternativas: [
            {
                texto: "Abre a carta e lê, mesmo com medo do que pode descobrir.",
                afirmacao: "Você enfrenta o passado, mesmo que ele seja doloroso."
            },
            {
                texto: "Guarda a carta para ler depois, quando se sentir mais preparado.",
                afirmacao: "Você respeita seu próprio tempo para lidar com verdades difíceis."
            }
        ]
    },
    {
        enunciado: "Há uma escada que leva ao porão. Um som metálico ecoa lá de baixo. O que faz?",
        alternativas: [
            {
                texto: "Desce lentamente, tentando identificar o som.",
                afirmacao: "Você é movido por uma necessidade de entender o que está escondido."
            },
            {
                texto: "Decide não descer agora e explora os andares superiores.",
                afirmacao: "Você escolhe o caminho mais seguro, esperando o momento certo."
            }
        ]
    },
    {
        enunciado: "Em uma sala escura, você encontra um dispositivo estranho preso a fios e memórias projetadas em uma tela.",
        alternativas: [
            {
                texto: "Toca o dispositivo para ver o que ele ativa.",
                afirmacao: "Você não teme arriscar quando há uma chance de descobrir a verdade."
            },
            {
                texto: "Evita tocar, sentindo que algo está muito errado.",
                afirmacao: "Você reconhece quando algo ultrapassa os limites do aceitável."
            }
        ]
    },
    {
        enunciado: "Outro convidado da mansão diz reconhecer você, mas com outro nome e outra vida. Como reage?",
        alternativas: [
            {
                texto: "Conversa com ele para entender mais sobre o que ele sabe.",
                afirmacao: "Você é receptivo a outras versões da sua história."
            },
            {
                texto: "Acha que ele está confuso ou mentindo e se afasta.",
                afirmacao: "Você prefere confiar na sua própria percepção da realidade."
            }
        ]
    },
    {
        enunciado: "Uma porta com símbolos estranhos se abre sozinha. Dentro, uma voz diz: 'Você está pronto para lembrar?'",
        alternativas: [
            {
                texto: "Entra sem hesitar. Precisa saber o que está por trás de tudo.",
                afirmacao: "Você aceita enfrentar seu passado, não importa o custo."
            },
            {
                texto: "Recua. Algumas verdades talvez devam permanecer esquecidas.",
                afirmacao: "Você acredita que há memórias que não devem ser despertadas."
            }
        ]
    }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

// Recuperar progresso salvo (opcional)
if (localStorage.getItem("progresso")) {
    atual = parseInt(localStorage.getItem("progresso"));
    historiaFinal = localStorage.getItem("historia") || "";
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    perguntaAtual = perguntas[atual];
    caixaPerguntas.innerHTML = `<strong>Pergunta ${atual + 1} de ${perguntas.length}</strong><br><br>${perguntaAtual.enunciado}`;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botao = criaBotaoAlternativa(alternativa.texto, () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botao);
    }
}

function criaBotaoAlternativa(texto, callback) {
    const botao = document.createElement("button");
    botao.textContent = texto;
    botao.setAttribute("aria-label", texto);
    botao.addEventListener("click", callback);
    return botao;
}

function respostaSelecionada(opcaoSelecionada) {
    historiaFinal += opcaoSelecionada.afirmacao + " ";
    atual++;

    // Salva progresso
    localStorage.setItem("progresso", atual);
    localStorage.setItem("historia", historiaFinal);

    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Resultado da sua jornada pelos mistérios históricos...";
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";

    const botaoReiniciar = criaBotaoAlternativa("Recomeçar", () => {
        localStorage.clear();
        location.reload();
    });

    caixaAlternativas.appendChild(botaoReiniciar);
}

mostraPergunta();

const canvas = document.getElementById('particulas');
const ctx = canvas.getContext('2d');

let particulas = [];
const quantidade = 100;

function redimensionar() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", redimensionar);
redimensionar();

class Particula {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tamanho = Math.random() * 2 + 1;
        this.velocidadeX = Math.random() * 0.4 - 0.2;
        this.velocidadeY = Math.random() * 0.4 - 0.2;
        this.alpha = Math.random() * 0.5 + 0.3;
    }

    desenhar() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);
        ctx.fill();
    }

    atualizar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }

        this.desenhar();
    }
}

function initParticulas() {
    particulas = [];
    for (let i = 0; i < quantidade; i++) {
        particulas.push(new Particula());
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i of particulas) {
        i.atualizar();
    }
    requestAnimationFrame(animar);
}

initParticulas();
animar();

