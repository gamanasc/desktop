// VERIFICAR SE É CELULAR
function check_mobile() {
  return ( ( window.innerWidth <= 800 ) );
}

// NÃO PERMITIR MENU DE BOTÃO DIREITO
document.addEventListener('contextmenu', event => event.preventDefault());

// MENU DE BOTÃO DIREITO PERSONALIZADO
if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {

    // console.log(e.target);  // to get the element
    // console.log(e.target.tagName);  // to get the element tag name alone
    
    // if(!e.target.classList.contains('desktop')){
    //   return false;
    // }

    var left  = e.clientX  + "px";
    var top  = e.clientY  + "px";

    let element = e.target;

    // Loop para verificar o elemento e seus pais
    if (element.classList && element.classList.contains('atalho__imagem-salva') || (element.parentElement.classList && element.parentElement.classList.contains('atalho__imagem-salva') )) {
      var div = document.getElementById('menu_personalizado_arquivo');
    }else{
      var div = document.getElementById('menu_personalizado');
    }
    
    // // Exibe as classes do elemento clicado
    // console.log('Classes do elemento clicado:', e.target.classList.value);

    // // Exibe as classes do pai do elemento clicado
    // if (e.target.parentElement) {
    //     console.log('Classes do pai:', e.target.parentElement.classList.value);
    // }

  // Verifica se o elemento clicado está dentro de uma div 'atalho'
  const atalhoDiv = element.closest('.atalho');
  if (atalhoDiv) {
      // Captura o botão 'remover-imagem' dentro da div 'atalho'
      const elementoRemover = atalhoDiv.querySelector('.remover-imagem');

      // Verifica se o elemento encontrado é válido
      if (elementoRemover) {
          document.getElementById('apagar_arquivo').setAttribute('data-index', elementoRemover.dataset.index); // Adiciona o atributo data-tipo
      }
  }

    div.style.left = left;
    div.style.top = top;

    div.classList.remove("hidden");

    e.preventDefault();
    return false;

  }, false);
} else {
  document.attachEvent('oncontextmenu', function() {
    alert("You've tried to open context menu else");
    window.event.returnValue = false;
  });
}

window.addEventListener('click', function(e) {   
  fecharMenuDeContexto(e.target);
});

function fecharMenuDeContexto(target){
  const menus = document.getElementsByClassName('menu_personalizado');

  let clickedInsideMenu = false;
  for (let i = 0; i < menus.length; i++) {
      if (menus[i].contains(target)) {
          clickedInsideMenu = true;
          break;
      }
  }

  if (!clickedInsideMenu) {
      for (let i = 0; i < menus.length; i++) {
          menus[i].classList.add("hidden");
      }
  }
}

// DATA E HORA
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


// ================================
// Adicionar classe active on click
// ================================

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

// ================================
// Adicionar classe active on click
// ================================

// Basado no código presente em: https://www.w3schools.com/howto/howto_css_text_selection.asp

  //Make the DIV element draggagle:
dragElement(document.getElementById("notas"));
dragElement(document.getElementById("explorer"));
dragElement(document.getElementById("painter"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "__dragabble")) {
    document.getElementById(elmnt.id + "__dragabble").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    if(e.clientY > 10){
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }

    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

abrir('explorer');
abrir('notas');


// ABRIR EXPLORADOR DE ARQUIVOS
function abrir(target){
  document.addEventListener('DOMContentLoaded', () => {
      // Seleciona todos os elementos com a classe 'menu-item'
      const abrir = document.querySelectorAll('.abrir_'+target);
  
      // Adiciona um ouvinte de evento de clique a cada item de menu
      abrir.forEach(item => {
          item.addEventListener('click', (event) => {
  
            // ABRIR PELO ÍCONE COM CLIQUE DUPLO, E PELA BARRA DE TAREFAS COM UM CLIQUE SÓ
            if (event.detail === 2 || (event.detail === 1 && item.classList.contains('nav-item')) || check_mobile() ) {
              document.getElementById(target).classList.remove("hidden");
              document.getElementById(target).classList.remove("min");
              document.getElementById("nav-"+target).classList.add("nav-item__active");
            }
  
          });
      });
  });
}

maximizar('explorer');
maximizar('painter');

// MAXIMIZAR / DESMAXIMIZAR EXPLORADOR DE ARQUIVOS
function maximizar(target){
  document.addEventListener('DOMContentLoaded', () => {
    const max = document.getElementById("max_"+target);
  
    max.addEventListener('click', () => {
  
      if(max.getElementsByTagName("span")[0].classList.contains('max')){
        document.getElementById(target).classList.add("max");
        max.getElementsByTagName("span")[0].classList.remove("max");
        max.getElementsByTagName("span")[0].classList.add("unmax");
        resizeCanvas();

      }else{
        document.getElementById(target).classList.remove("max");
        max.getElementsByTagName("span")[0].classList.add("max");
        max.getElementsByTagName("span")[0].classList.remove("unmax");
        resizeCanvas();
      }
  
    });
  });

}

minimizar('explorer');
minimizar('painter');

// MINIMIZAR / DESMINIMIZAR EXPLORADOR DE ARQUIVOS
function minimizar(target){
  document.addEventListener('DOMContentLoaded', () => {
    const min = document.getElementById("min_"+target);
  
    min.addEventListener('click', () => {
      document.getElementById(target).style.removeProperty("top");
      document.getElementById(target).style.removeProperty("left");
      document.getElementById(target).classList.remove("max");
      document.getElementById(target).classList.add("min");
    });
  });
}

fechar('explorer');
fechar('painter');

// FECHAR EXPLORADOR DE ARQUIVOS
function fechar(target){
  document.addEventListener('DOMContentLoaded', () => {
      // Seleciona todos os elementos com a classe 'menu-item'
      const fechar = document.querySelectorAll('.fechar_'+target);
  
      // Adiciona um ouvinte de evento de clique a cada item de menu
      fechar.forEach(item => {
          item.addEventListener('click', () => {
              document.getElementById(target).classList.add("hidden");
              document.getElementById("nav-"+target).classList.remove("nav-item__active");
          });
      });
  });
}

// FECHAR NOTAS AUTOADESIVAS
document.addEventListener('DOMContentLoaded', () => {
  const fechar_notas = document.getElementById("fechar_notas");

  fechar_notas.addEventListener('click', () => {
      document.getElementById("notas").classList.add("hidden");
      document.getElementById("nav-notas").classList.remove("nav-item__active");
  });
});

// MINIMIZAR TUDO
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os elementos com a classe 'voltar_desktop'
  const btn_voltar = document.getElementById("voltar_desktop");

  // Adiciona um ouvinte de evento de clique a cada item de menu
  btn_voltar.addEventListener('click', () => {
      document.getElementById("explorer").classList.add("hidden");
      document.getElementById("notas").classList.add("hidden");
  });

});

// APAGAR IMAGEM
document.getElementById('apagar_arquivo').addEventListener('click', function(e) {
    removeImage(e.target.dataset.index);
    fecharMenuDeContexto();
});