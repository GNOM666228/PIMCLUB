// Функция для плавного скроллинга к любой секции
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Добавляем префикс +7 при фокусе на поле телефона
document.getElementById('phone').addEventListener('focus', function() {
    if (this.value === '') {
        this.value = '+7 ';
    }
});

// Валидация номера телефона (10 цифр после +7)
function validatePhone(phone) {
    const phonePattern = /^\+7 \d{10}$/; // Шаблон для 10 цифр после +7
    return phonePattern.test(phone);
}

// Обработка отправки формы и отправка данных админу через Телеграм-бота
document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;
    const phone = document.getElementById('phone').value.trim();

    // Проверка номера телефона
    if (!validatePhone(phone)) {
        alert("Некорректный номер телефона. Пожалуйста, введите номер в формате: +7 XXXXXXXXXX (10 цифр после +7)");
        return;
    }

    // Формируем сообщение
    let message = `Кто-то зарегистрировался на тренировку!\nДень: ${day}\nВремя: ${time}\nТелефон: ${phone}`;
    
    if (name) {
        message += `\nИмя: ${name}`;
    }

    // Отправляем уведомление админу в Телеграм
    const botToken = '7393071539:AAHCJiGEs4RgJ-9FAvmCadzzJObSUaXAIWA';  // Токен вашего бота
    const chatId = '1150051187'; // Вставьте ваш Chat ID

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert("Вы успешно зарегистрировались! Ожидайте подтверждение.");
        } else {
            alert("Произошла ошибка при отправке данных. Попробуйте снова.");
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert("Произошла ошибка при отправке данных.");
    });
});

// Lightbox для просмотра изображений
let currentImageIndex = 0;
let images = [];

// Открыть lightbox
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    images = Array.from(document.querySelectorAll('.clickable-photo'));
    currentImageIndex = images.indexOf(element);
    lightbox.style.display = 'block';
    lightboxImg.src = element.src;
}

// Закрыть lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Листать изображения
function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    document.getElementById('lightbox-img').src = images[currentImageIndex].src;
}
