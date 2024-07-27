// Cria uma data com a hora atual
const now = new Date();

// Obtém o fuso horário de Brasília (UTC-3 ou UTC-2 no horário de verão)
const options = {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
};

// Formata a data e hora conforme as opções acima
const dateFormatter = new Intl.DateTimeFormat('pt-BR', options);
const [
    { value: day },,
    { value: month },,
    { value: year },,
    { value: hour },,
    { value: minute }
] = dateFormatter.formatToParts(now);

// Formata a data e hora no padrão desejado
const formattedDate = `${day}/${month}/${year}`;
const formattedTime = `${hour}:${minute}`;


document.getElementById("hora_atual").innerHTML = formattedTime;
document.getElementById("data_atual").innerHTML = formattedDate;
