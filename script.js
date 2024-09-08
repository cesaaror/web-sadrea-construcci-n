// Variables globales
var chatIndex = 0;

// Mensajes predefinidos del chat simulado
var chatMessages = [
    {
        message: "¿Deseas recibir información?",
        options: [
            { text: "Sí", nextMessages: [{ message: "¡Genial! ¿Qué tipo de información te interesa?", options: [
                { text: "Sobre nosotros", redirectTo: "nosotros.html" },
                { text: "Nuestros servicios", redirectTo: "servicios.html" },
                { text: "Contacto", redirectTo: "contacto.html" }
            ]}] },
            { text: "No", nextMessages: [{ message: "¡Gracias por visitarnos!" }] }
        ]
    }
];



function showNextMessage() {
    var chatBody = document.getElementById('chatBody');

    // Verifica si el elemento chatBody está presente
    if (!chatBody) {
        console.error('Elemento #chatBody no encontrado en el chat.');
        return;
    }

    var messageElement = document.createElement('div');
    messageElement.className = 'message';

    // Verifica si chatIndex es un índice válido en chatMessages
    if (chatIndex < chatMessages.length) {
        // Verifica si message está definido en el objeto chatMessages[chatIndex]
        if (chatMessages[chatIndex].message) {
            messageElement.textContent = chatMessages[chatIndex].message;
            messageElement.style.backgroundColor = '#404040'; // Fondo gris oscuro
            messageElement.style.color = '#ffffff'; // Texto blanco
            messageElement.style.padding = '10px'; // Espaciado interno
            messageElement.style.borderRadius = '8px'; // Bordes redondeados
            messageElement.style.marginBottom = '10px'; // Margen inferior
            messageElement.style.textAlign = 'center'; // Texto centrado
        } else {
            console.error('El mensaje en chatMessages[' + chatIndex + '] no está definido.');
            return;
        }

        chatBody.appendChild(messageElement);

        // Si hay opciones, muestra los botones correspondientes
        if (chatMessages[chatIndex].options) {
            showOptions(chatMessages[chatIndex].options);
        }

        chatIndex++;
    } else {
        console.error('Índice de chatMessages fuera de rango.');
    }
}



// Función para mostrar las opciones
function showOptions(options) {
    var optionsContainer = document.createElement('div');
    optionsContainer.className = 'options';

    options.forEach(function (option) {
        var button = document.createElement('button');
        button.textContent = option.text;
        button.onclick = function () {
            selectOption(option);
            optionsContainer.remove();
        };
        optionsContainer.appendChild(button);
    });

    var chatbox = document.getElementById('chat');
    chatbox.querySelector('.chat-body').appendChild(optionsContainer);
}

// Función para manejar la selección de una opción
function selectOption(option) {
    // Realiza acciones específicas según la opción seleccionada
    // Puedes redirigir al usuario a otra página o mostrar más opciones, etc.
    var chatbox = document.getElementById('chat');
    var messageElement = document.createElement('div');
    messageElement.className = 'message sent';
    messageElement.textContent = option.text;
    chatbox.querySelector('.chat-body').appendChild(messageElement);

    // Lógica específica para cada opción
    if (option.redirectTo) {
        // Redirige al usuario a otra página
        window.location.href = option.redirectTo;
    } else if (option.nextMessages) {
        // Muestra los mensajes siguientes
        chatMessages = chatMessages.concat(option.nextMessages);
        showNextMessage();
    }
}

// Función para enviar mensajes del usuario
function sendMessage() {
    // Lógica de envío de mensajes del usuario
}

// ... (código posterior)

// Ejecuta acciones cuando el usuario hace scroll
$(window).scroll(function () {
    // Obtén la posición actual del scroll
    var scrollPosition = $(window).scrollTop();

    // Muestra el div circular emergente cuando el usuario está por la mitad de la página
    if (scrollPosition > ($(document).height() / 2)) {
        showChat(); // Muestra la caja de chat cuando el usuario hace scroll
    } else {
        hideChat(); // Oculta la caja de chat si el usuario retrocede hacia arriba
    }
});

// Muestra la caja de chat
function showChat() {
    var chatbox = document.getElementById('chat');
    chatbox.style.display = 'block';
}

// Oculta la caja de chat
function hideChat() {
    var chatbox = document.getElementById('chat');
    chatbox.style.display = 'none';
}

// Iniciar la conversación mostrando el primer mensaje
showNextMessage();
// Iniciar la conversación mostrando el primer mensaje
showNextMessage();

// Ejecuta acciones cuando el usuario hace scroll
$(window).scroll(function () {
    // Obtén la posición actual del scroll
    var scrollPosition = $(window).scrollTop();

    // Muestra el div circular emergente cuando el usuario está por la mitad de la página
    if (scrollPosition > ($(document).height() / 2)) {
        showChat(); // Muestra la caja de chat cuando el usuario hace scroll
    } else {
        hideChat(); // Oculta la caja de chat si el usuario retrocede hacia arriba
    }
});

// Muestra la caja de chat
function showChat() {
    var chatbox = document.getElementById('chat');
    chatbox.style.display = 'block';
}

// Oculta la caja de chat
function hideChat() {
    var chatbox = document.getElementById('chat');
    chatbox.style.display = 'none';
}

// Iniciar la conversación mostrando el primer mensaje
showNextMessage();




// Función para manejar la selección de una opción
function selectOption(option) {
    // Realiza acciones específicas según la opción seleccionada
    // Puedes redirigir al usuario a otra página o mostrar más opciones, etc.
    var chatbox = document.getElementById('chat');
    var messageElement = document.createElement('div');
    messageElement.className = 'message sent';
    messageElement.textContent = option.text;
    chatbox.querySelector('.chat-body').appendChild(messageElement);

    // Lógica específica para cada opción
    if (option.redirectTo) {
        // Redirige al usuario a otra página
        window.location.href = option.redirectTo;
    } else if (option.nextMessages) {
        // Muestra los mensajes siguientes
        chatMessages = chatMessages.concat(option.nextMessages);
        showNextMessage();
    }

    // Enviar mensaje del usuario al servidor y obtener respuesta de OpenAI
    sendMessageToServer(option.text);
}

// Función para enviar mensajes del usuario al servidor y obtener respuestas de OpenAI
function sendMessageToServer(userMessage) {
    // Envía la solicitud al servidor con el mensaje del usuario
    $.ajax({
        type: 'POST',
        url: 'openai_endpoint.php', // Reemplaza con la URL de tu servidor
        data: { message: userMessage },
        success: function (response) {
            // Procesa la respuesta de OpenAI y muestra la respuesta en la caja de chat
            var chatbox = document.getElementById('chat');
            var messageElement = document.createElement('div');
            messageElement.className = 'message received';
            messageElement.textContent = response;
            chatbox.querySelector('.chat-body').appendChild(messageElement);

            // Luego, puedes realizar acciones adicionales según la respuesta de OpenAI
        },
        error: function (error) {
            console.log(error);
        }
    });
}