// Глобальные настройки конструктора
const CONFIG = {
    // Настройки пропорций
    PROPORTIONS: {
        DEFAULT_CABINET_WIDTH_MM: 1000,
        DEFAULT_SECTION_WIDTH_PX: 520,
        MM_TO_PX_RATIO: 0.528,
        PX_TO_MM_RATIO: 1.893939
    },

    // Размеры основного окна
    MAIN_WINDOW: {
        WIDTH: 3200,
        HEIGHT: 1460
    },

    // Настройки анимаций
    ANIMATION: {
        TRANSITION_DURATION: '0.3s',
        RESIZE_TRANSITION_DURATION: '0.1s'
    },

    // Путь к изображениям
    PATHS: {
        IMAGES: 'images/',
        LAYOUTS: 'images/layouts/',
        DATA: 'data/'
    },

    // Настройки для различных компоновок
    LAYOUT_DEFAULTS: {
        '1-section': {
            SECTION_MIN_WIDTH: 400,
            SECTION_MAX_WIDTH: 800
        },
        '2-sections': {
            SECTION_MIN_WIDTH: 400,
            SECTION_MAX_WIDTH: 700
        },
        '3-sections': {
            SECTION_MIN_WIDTH: 400,
            SECTION_MAX_WIDTH: 600
        },
        '4-sections': {
            SECTION_MIN_WIDTH: 300,
            SECTION_MAX_WIDTH: 500
        }
    },

    // Настройки изображений
    IMAGES: {
        SIZE_THRESHOLD_MM: 700, // Порог переключения на малый размер (в мм)
        LARGE_SIZE: '1000',     // Суффикс для больших изображений
        SMALL_SIZE: '700'       // Суффикс для малых изображений
    },

    // Отладка
    DEBUG: {
        ENABLED: true,
        LOG_LEVEL: 'info' // 'debug', 'info', 'warn', 'error'
    }
};

// Утилиты для работы с конфигурацией
window.ConfigUtils = {
    // Конвертация пикселей в миллиметры
    pxToMm(pixels) {
        return Math.round(pixels * CONFIG.PROPORTIONS.PX_TO_MM_RATIO);
    },

    // Конвертация миллиметров в пиксели
    mmToPx(millimeters) {
        return Math.round(millimeters * CONFIG.PROPORTIONS.MM_TO_PX_RATIO);
    },

    // Логирование с учетом уровня отладки
    log(level, message, data = null) {
        if (!CONFIG.DEBUG.ENABLED) return;

        const levels = ['debug', 'info', 'warn', 'error'];
        const currentLevelIndex = levels.indexOf(CONFIG.DEBUG.LOG_LEVEL);
        const messageLevelIndex = levels.indexOf(level);

        if (messageLevelIndex >= currentLevelIndex) {
            const timestamp = new Date().toISOString();
            const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
            
            if (data) {
                console[level](logMessage, data);
            } else {
                console[level](logMessage);
            }
        }
    },

    // Получение пути к изображению нужного размера
    getImagePath(originalImageName, size = null) {
        if (!originalImageName) return '';
        
        // Если размер не указан, определяем по умолчанию как большой
        if (!size) {
            size = CONFIG.IMAGES.LARGE_SIZE;
        }
        
        // Заменяем размер в названии файла
        const largeSizePattern = new RegExp(`_${CONFIG.IMAGES.LARGE_SIZE}(\\.[^.]+)$`);
        const smallSizePattern = new RegExp(`_${CONFIG.IMAGES.SMALL_SIZE}(\\.[^.]+)$`);
        
        if (largeSizePattern.test(originalImageName) || smallSizePattern.test(originalImageName)) {
            // Заменяем существующий размер на нужный
            return originalImageName
                .replace(largeSizePattern, `_${size}$1`)
                .replace(smallSizePattern, `_${size}$1`);
        }
        
        // Если размер не найден в названии, возвращаем оригинал
        return originalImageName;
    },

    // Получение оптимального размера изображения на основе размера секции в мм
    getOptimalImageSize(sectionWidthMm) {
        return sectionWidthMm < CONFIG.IMAGES.SIZE_THRESHOLD_MM 
            ? CONFIG.IMAGES.SMALL_SIZE 
            : CONFIG.IMAGES.LARGE_SIZE;
    },

    // Генерация путей для предзагрузки (обе версии)
    generatePreloadPaths(imagePath, imageName) {
        return [
            imagePath + this.getImagePath(imageName, CONFIG.IMAGES.LARGE_SIZE),
            imagePath + this.getImagePath(imageName, CONFIG.IMAGES.SMALL_SIZE)
        ];
    }
}; 