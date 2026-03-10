// 1. Функция для получения данных (GET)
const getData = async (url) => {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Ошибка при получении: ${response.status}`);
    }
    
    return await response.json();
};

// 2. Функция для отправки данных (POST)
const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (!response.ok) {
        throw new Error(`Ошибка при отправке: ${response.status}`);
    }

    return await response.json();
};

// Логика инициализации при загрузке страницы
const init = async () => {
    try {
        // 3. Получаем данные из локального JSON (укажите верный путь к файлу)
        console.log('Загрузка данных...');
        const data = await getData('db.json'); 
        console.log('Данные получены:', data);

        // 4. Отправляем полученные данные на сервер
        console.log('Отправка данных на сервер...');
        const result = await sendData('https://jsonplaceholder.typicode.com/posts', data);
        
        console.log('Успешный ответ сервера:', result);
        
    } catch (error) {
        // 5. Обработка ошибок
        console.error('Произошла ошибка в процессе:', error.message);
    }
};

// Запуск при загрузке DOM
document.addEventListener('DOMContentLoaded', init);