let translations = {};

async function loadTranslations(lang) {
    try {
        const response = await fetch(`/locales/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Could not load translation file for ${lang}`);
        }
        translations = await response.json();
        updateContent(); // Обновить контент после загрузки переводов
    } catch (error) {
        console.error("Error loading translations:", error);
    }
}

function updateContent() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[key];
    });
}

// Инициализация с языком по умолчанию
loadTranslations('ru');

// Переключение языка
document.addEventListener('DOMContentLoaded', () => {
    const defaultLang = localStorage.getItem('lang') || 'ru';
    loadTranslations(defaultLang);
    document.querySelector('#lang-select').addEventListener('change', () => {
        const newLang = document.querySelector('#lang-select').value;
        localStorage.setItem('lang', newLang);
        loadTranslations(newLang);
    });
});
