// Менеджер компоновок - управляет переключением между различными вариантами шкафов
class LayoutManager {
    constructor() {
        this.layouts = null;
        this.currentLayoutId = null;
        this.preloadedImages = new Map();
        this.loadingQueue = [];
    }

    // Инициализация менеджера
    async init(layouts) {
        this.layouts = layouts;
        ConfigUtils.log('info', 'LayoutManager инициализирован');
        
        // Предзагрузка критических изображений
        await this.preloadCriticalImages();
    }

    // Предзагрузка изображений для быстрого переключения
    async preloadCriticalImages() {
        if (!this.layouts) return;

        const criticalImages = [];
        
        // Собираем фоновые изображения всех компоновок
        Object.values(this.layouts.layouts).forEach(layout => {
            if (layout.background) {
                criticalImages.push(layout.background);
            }
            
            // Первые варианты каждой секции для быстрого отображения (обе версии)
            layout.sections.forEach(section => {
                if (section.variants && section.variants[0]) {
                    const imagePaths = ConfigUtils.generatePreloadPaths(section.imagePath, section.variants[0].image);
                    criticalImages.push(...imagePaths);
                }
            });
        });

        ConfigUtils.log('info', `Предзагружаем ${criticalImages.length} критических изображений (включая версии 700 и 1000)`);
        
        // Асинхронная предзагрузка
        const preloadPromises = criticalImages.map(imagePath => this.preloadImage(imagePath));
        
        try {
            await Promise.allSettled(preloadPromises);
            ConfigUtils.log('info', 'Предзагрузка критических изображений завершена');
        } catch (error) {
            ConfigUtils.log('warn', 'Ошибка предзагрузки изображений', error);
        }
    }

    // Предзагрузка отдельного изображения
    async preloadImage(imagePath) {
        return new Promise((resolve, reject) => {
            if (this.preloadedImages.has(imagePath)) {
                resolve(imagePath);
                return;
            }

            const img = new Image();
            img.onload = () => {
                this.preloadedImages.set(imagePath, img);
                ConfigUtils.log('debug', `Изображение предзагружено: ${imagePath}`);
                resolve(imagePath);
            };
            img.onerror = () => {
                ConfigUtils.log('warn', `Ошибка загрузки изображения: ${imagePath}`);
                reject(new Error(`Failed to load image: ${imagePath}`));
            };
            img.src = imagePath;
        });
    }

    // Переключение компоновки
    async switchLayout(layoutId) {
        if (!this.layouts || !this.layouts.layouts[layoutId]) {
            ConfigUtils.log('error', `Компоновка не найдена: ${layoutId}`);
            return false;
        }

        const oldLayoutId = this.currentLayoutId;
        this.currentLayoutId = layoutId;
        
        const layout = this.layouts.layouts[layoutId];
        
        ConfigUtils.log('info', `Переключение с "${oldLayoutId}" на "${layoutId}"`);

        try {
            // Применяем новую компоновку
            await this.applyLayout(layout);
            
            // Запускаем предзагрузку изображений новой компоновки
            this.preloadLayoutImages(layout);
            
            return true;
        } catch (error) {
            ConfigUtils.log('error', 'Ошибка переключения компоновки', error);
            return false;
        }
    }

    // Применение компоновки
    async applyLayout(layout) {
        // Обновляем CSS класс контейнера
        this.updateContainerClass(layout.cssClass);
        
        // Обновляем CSS файл компоновки
        this.updateLayoutStylesheet(layout.cssClass);
        
        // Устанавливаем фоновое изображение
        this.setBackgroundImage(layout.background);
    }

    // Обновление CSS класса основного контейнера
    updateContainerClass(newCssClass) {
        const container = document.getElementById('constructor-container');
        if (!container) return;

        // Удаляем все предыдущие layout классы
        const layoutClasses = Array.from(container.classList).filter(cls => cls.startsWith('layout-'));
        layoutClasses.forEach(cls => container.classList.remove(cls));
        
        // Добавляем новый класс
        container.classList.add(newCssClass);
        
        ConfigUtils.log('debug', `CSS класс обновлен на: ${newCssClass}`);
    }

    // Обновление CSS файла компоновки
    updateLayoutStylesheet(cssClass) {
        const layoutStyles = document.getElementById('layout-styles');
        if (!layoutStyles) return;

        const newHref = `css/layouts/${cssClass}.css`;
        
        // Создаем новый link элемент для плавного переключения
        const newStylesheet = document.createElement('link');
        newStylesheet.rel = 'stylesheet';
        newStylesheet.href = newHref;
        newStylesheet.id = 'layout-styles-new';
        
        // Добавляем новый стиль
        document.head.appendChild(newStylesheet);
        
        // После загрузки удаляем старый и переименовываем новый
        newStylesheet.onload = () => {
            if (layoutStyles) {
                layoutStyles.remove();
            }
            newStylesheet.id = 'layout-styles';
            ConfigUtils.log('debug', `CSS файл обновлен: ${newHref}`);
        };
    }

    // Установка фонового изображения
    setBackgroundImage(imagePath) {
        const mainWindow = document.getElementById('main-window');
        if (!mainWindow) return;

        // Проверяем, предзагружено ли изображение
        if (this.preloadedImages.has(imagePath)) {
            mainWindow.style.backgroundImage = `url('${imagePath}')`;
            ConfigUtils.log('debug', `Фон установлен (предзагружен): ${imagePath}`);
        } else {
            // Загружаем изображение и устанавливаем после загрузки
            this.preloadImage(imagePath).then(() => {
                mainWindow.style.backgroundImage = `url('${imagePath}')`;
                ConfigUtils.log('debug', `Фон установлен: ${imagePath}`);
            }).catch(error => {
                ConfigUtils.log('warn', `Ошибка установки фона: ${imagePath}`, error);
            });
        }
    }

    // Предзагрузка всех изображений компоновки
    async preloadLayoutImages(layout) {
        const imagesToPreload = [];
        
        // Собираем все варианты изображений секций (обе версии - 700 и 1000)
        layout.sections.forEach(section => {
            if (section.variants) {
                section.variants.forEach(variant => {
                    // Получаем пути для обеих версий изображения
                    const imagePaths = ConfigUtils.generatePreloadPaths(section.imagePath, variant.image);
                    
                    imagePaths.forEach(imagePath => {
                        if (!this.preloadedImages.has(imagePath)) {
                            imagesToPreload.push(imagePath);
                        }
                    });
                });
            }
        });

        if (imagesToPreload.length === 0) {
            ConfigUtils.log('debug', 'Все изображения компоновки уже предзагружены');
            return;
        }

        ConfigUtils.log('info', `Предзагружаем ${imagesToPreload.length} изображений компоновки "${layout.name}" (включая версии 700 и 1000)`);
        
        // Асинхронная предзагрузка пакетами для избежания перегрузки
        const batchSize = 5;
        for (let i = 0; i < imagesToPreload.length; i += batchSize) {
            const batch = imagesToPreload.slice(i, i + batchSize);
            const batchPromises = batch.map(imagePath => this.preloadImage(imagePath));
            
            try {
                await Promise.allSettled(batchPromises);
                ConfigUtils.log('debug', `Пакет ${Math.floor(i/batchSize) + 1} предзагружен`);
            } catch (error) {
                ConfigUtils.log('warn', 'Ошибка предзагрузки пакета', error);
            }
        }
    }

    // Получение текущей компоновки
    getCurrentLayout() {
        if (!this.currentLayoutId || !this.layouts) return null;
        return this.layouts.layouts[this.currentLayoutId];
    }

    // Получение информации о компоновке
    getLayoutInfo(layoutId) {
        if (!this.layouts || !this.layouts.layouts[layoutId]) return null;
        
        const layout = this.layouts.layouts[layoutId];
        return {
            id: layoutId,
            name: layout.name,
            sectionsCount: layout.sections.length,
            cssClass: layout.cssClass,
            hasBackground: !!layout.background
        };
    }

    // Получение списка всех доступных компоновок
    getAvailableLayouts() {
        if (!this.layouts) return [];
        
        return Object.keys(this.layouts.layouts).map(layoutId => {
            return this.getLayoutInfo(layoutId);
        });
    }

    // Очистка предзагруженных изображений (для экономии памяти)
    clearPreloadedImages() {
        this.preloadedImages.clear();
        ConfigUtils.log('info', 'Предзагруженные изображения очищены');
    }

    // Статистика предзагрузки
    getPreloadStats() {
        return {
            preloadedCount: this.preloadedImages.size,
            currentLayout: this.currentLayoutId,
            availableLayouts: this.getAvailableLayouts().length
        };
    }
}