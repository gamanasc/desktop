const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

let isPainting = false;
let lineWidth = 2;
let startX;
let startY;

// Histórico de estados do canvas para implementar o desfazer
const undoStack = [];

// Função para salvar o estado atual do canvas no histórico
function saveState() {
    undoStack.push(canvas.toDataURL());
}

// Função para restaurar o último estado do histórico
function undo() {
    if (undoStack.length > 0) {
        const lastState = undoStack.pop();
        const img = new Image();
        img.src = lastState;
        img.onload = () => {
            // Limpa o canvas e restaura o último estado
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    }
}

// Função para redimensionar o canvas mantendo a proporção
function resizeCanvas() {
    const dataURL = canvas.toDataURL();
    const newWidth = canvas.offsetWidth;
    const newHeight = canvas.offsetHeight;

    canvas.width = newWidth;
    canvas.height = newHeight;

    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
    };
}

resizeCanvas();

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        undoStack.length = 0; // Limpa o histórico ao limpar o canvas
    }
});

toolbar.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if (!isPainting) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
};

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;

    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    ctx.moveTo(startX, startY);
});

canvas.addEventListener('mouseup', () => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();

    saveState(); // Salva o estado do canvas ao finalizar o desenho
});

canvas.addEventListener('mousemove', draw);

// Implementa o Ctrl+Z para desfazer
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') {
        undo();
    }
});

// Ajusta o tamanho do canvas ao redimensionar a janela
window.addEventListener('resize', resizeCanvas);


// SALVAR IMAGEM

// Função para salvar o desenho no localStorage
function saveToLocalStorage() {
    // Cria um canvas temporário para garantir o fundo branco
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    // Preenche o fundo com branco
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Copia o conteúdo do canvas original para o canvas temporário
    tempCtx.drawImage(canvas, 0, 0);

    // Converte o canvas temporário para uma imagem PNG
    const dataURL = tempCanvas.toDataURL('image/png');
    const images = JSON.parse(localStorage.getItem('canvasImages')) || [];

    images.push(dataURL); // Adiciona a nova imagem ao array
    localStorage.setItem('canvasImages', JSON.stringify(images)); // Salva o array atualizado no localStorage
    displayImages(); // Atualiza a exibição das imagens
}

// Função para exibir as imagens armazenadas no localStorage
function displayImages() {
    const imageGallery = document.getElementById('desktop');
    const images = JSON.parse(localStorage.getItem('canvasImages')) || [];

    // Limpa a galeria antes de atualizar
    document.querySelectorAll("[data-tipo='imagem']").forEach(e => e.remove());

    images.forEach((dataURL, index) => {
        // Cria uma nova div para cada imagem
        const imgContainer = document.createElement('div');
        imgContainer.className = 'atalho atalho__imagem-salva'; // Adiciona as classes desejadas
        imgContainer.setAttribute('data-tipo', 'imagem'); // Adiciona o atributo data-tipo

        const img = new Image();
        img.src = dataURL;
        img.alt = `Desenho ${index + 1}`;
        img.draggable = false; // Define o atributo draggable como false
        img.style.height = '42.5px'; // Ajusta a altura da imagem
        img.style.marginBottom = '5px'; // Ajusta a margem inferior da imagem

        const span = document.createElement('span'); // Cria um span para o nome do arquivo
        span.className = 'atalho__nome'; // Adiciona a classe ao span
        span.textContent = `imagem${index + 1}`; // Define o texto do span

        imgContainer.appendChild(img); // Adiciona a imagem à div
        imgContainer.appendChild(span); // Adiciona o span à div

        // Encontra a última div com a classe "atalho"
        const lastAtalho = imageGallery.querySelector('.atalho:last-of-type');

        // Se existir uma última div "atalho", insere a nova imagem após ela; caso contrário, adiciona no início
        if (lastAtalho) {
            lastAtalho.insertAdjacentElement('afterend', imgContainer);
        } else {
            imageGallery.appendChild(imgContainer); // Se não houver, adiciona normalmente
        }
    });
}

// Exemplo de botão para salvar e carregar o conteúdo
document.getElementById('painter__save').addEventListener('click', saveToLocalStorage);
document.getElementById('painter__load').addEventListener('click', loadFromLocalStorage);

// Carrega as imagens do localStorage quando a página for carregada
document.addEventListener('DOMContentLoaded', displayImages);