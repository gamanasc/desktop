function updateDateTime() {

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
}

// Atualiza a data e hora inicialmente
updateDateTime();

// Atualiza a data e hora a cada segundo
setInterval(updateDateTime, 1000);


// =====================
// =====================
// =====================

document.addEventListener('DOMContentLoaded', (event) => {
    const atalhoItems = document.querySelectorAll('.desktop .atalho');

    atalhoItems.forEach(item => {
      item.addEventListener('click', function(event) {
        // Remove 'active' class from all menu items
        atalhoItems.forEach(i => i.classList.remove('active'));
        // Add 'active' class to the clicked menu item
        this.classList.add('active');
        // Stop propagation to prevent triggering the document click event
        event.stopPropagation();
      });
    });

    document.addEventListener('click', function(event) {
      // Remove 'active' class from all menu items if clicked outside
      atalhoItems.forEach(item => item.classList.remove('active'));
    });
  });

  document.addEventListener('DOMContentLoaded', (event) => {
    const atalhoItems = document.querySelectorAll('.barra-tarefas .nav-item');

    atalhoItems.forEach(item => {
      item.addEventListener('click', function(event) {
        // Remove 'active' class from all menu items
        atalhoItems.forEach(i => i.classList.remove('active'));
        // Add 'active' class to the clicked menu item
        this.classList.add('active');
        // Stop propagation to prevent triggering the document click event
        event.stopPropagation();
      });
    });

    document.addEventListener('click', function(event) {
      // Remove 'active' class from all menu items if clicked outside
      atalhoItems.forEach(item => item.classList.remove('active'));
    });
  });