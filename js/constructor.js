// Основная логика конструктора шкафов
class CabinetConstructor {
    constructor() {
        this.layouts = null;
        this.currentLayout = '3-sections';
        this.activeSection = null;
        this.sections = new Map();
        
        this.init();
    }

    async init() {
        try {
            // Загружаем конфигурацию
            await this.loadLayouts();
            
            // Инициализируем интерфейс
            this.initEventListeners();
            
            // Загружаем стартовую компоновку
            this.loadLayout(this.currentLayout);
            
            console.log('Конструктор инициализирован');
        } catch (error) {
            console.error('Ошибка инициализации конструктора:', error);
        }
    }

    async loadLayouts() {
        try {
            // Встроенная тестовая конфигурация для обхода CORS
            this.layouts = {
                "layouts": {
                    "3-sections": {
                        "name": "Трехдверный шкаф",
                        "background": "images/layouts/3-sections/background.jpg",
                        "cssClass": "layout-3-sections",
                        "container": {
                            "width": 3200,
                            "height": 1460
                        },
                        "sections": [
                            {
                                "id": "section-1",
                                "name": "Секция 1",
                                "position": { "left": 812, "top": 72 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "right",
                                "imagePath": "images/layouts/3-sections/sections/section-1/",
                                "variants": [
                                    { "id": "variant-1", "name": "Тест вариант 1", "image": "section-1variant-1.jpg" }
                                ]
                            },
                            {
                                "id": "section-2",
                                "name": "Секция 2",
                                "position": { "left": 1340, "top": 72 },
                                "defaultSize": { "width": 520, "height": 1314 },
                                "minWidth": 208,
                                "maxWidth": 520,
                                "transformOrigin": "center",
                                "imagePath": "images/layouts/3-sections/sections/section-2/",
                                "variants": [
                                    { "id": "variant-1", "name": "Тест вариант 1", "image": "section-2variant-1.jpg" }
                                ]
                            },
                            {
                                "id": "section-3",
                                "name": "Секция 3",
                                "position": { "left": 1860, "top": 72 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "left",
                                "imagePath": "images/layouts/3-sections/sections/section-3/",
                                "variants": [
                                    { "id": "variant-1", "name": "Тест вариант 1", "image": "section-3variant-1.jpg.jpg" }
                                ]
                            }
                        ]
                    }
                },
                "settings": {
                    "millimetersToPixels": 0.528,
                    "pixelsToMillimeters": 1.893939
                }
            };
            console.log('Тестовая конфигурация загружена встроенно');
        } catch (error) {
            console.error('Ошибка загрузки конфигурации:', error);
            // Заглушка для тестирования без файла
            this.layouts = { layouts: {}, settings: { millimetersToPixels: 0.528 } };
        }
    }

    initEventListeners() {
        // Селектор компоновки
        const layoutSelect = document.getElementById('layout-select');
        if (layoutSelect) {
            layoutSelect.addEventListener('change', (e) => {
                this.currentLayout = e.target.value;
                this.loadLayout(this.currentLayout);
            });
        }
    }

    loadLayout(layoutId) {
        const layout = this.layouts.layouts[layoutId];
        if (!layout) {
            console.error('Компоновка не найдена:', layoutId);
            return;
        }

        console.log('Загружаем компоновку:', layout.name);

        // Обновляем CSS класс
        this.updateLayoutClass(layout.cssClass);
        
        // Очищаем текущие секции
        this.clearSections();
        
        // Создаем новые секции
        this.createSections(layout.sections);
        
        // Создаем табы
        this.createSectionTabs(layout.sections);
        
        // Активируем первую секцию
        if (layout.sections.length > 0) {
            this.setActiveSection(layout.sections[0].id);
        }
    }

    updateLayoutClass(cssClass) {
        const container = document.getElementById('constructor-container');
        if (container) {
            // Удаляем все layout классы
            container.className = container.className.replace(/layout-\d+-section[s]?/g, '');
            // Добавляем новый класс
            container.classList.add(cssClass);
        }

        // Обновляем CSS файл
        const layoutStyles = document.getElementById('layout-styles');
        if (layoutStyles) {
            layoutStyles.href = `css/layouts/${cssClass}.css`;
        }
    }

    clearSections() {
        const sectionsContainer = document.getElementById('sections-container');
        if (sectionsContainer) {
            sectionsContainer.innerHTML = '';
        }
        this.sections.clear();
    }

    createSections(sectionsConfig) {
        const sectionsContainer = document.getElementById('sections-container');
        if (!sectionsContainer) return;

        sectionsConfig.forEach(sectionConfig => {
            // Создаем DOM элемент секции
            const sectionElement = document.createElement('div');
            sectionElement.className = `section ${sectionConfig.id}`;
            sectionElement.id = sectionConfig.id;
            
            // Устанавливаем позицию и размер в процентах для адаптивности
            sectionElement.style.left = `${(sectionConfig.position.left / 3200) * 100}%`;
            sectionElement.style.top = `${(sectionConfig.position.top / 1460) * 100}%`;
            sectionElement.style.width = `${(sectionConfig.defaultSize.width / 3200) * 100}%`;
            sectionElement.style.height = `${(sectionConfig.defaultSize.height / 1460) * 100}%`;
            
            // Устанавливаем первый вариант изображения по умолчанию
            if (sectionConfig.variants && sectionConfig.variants.length > 0) {
                const defaultVariant = sectionConfig.variants[0];
                const imagePath = `${sectionConfig.imagePath}${defaultVariant.image}`;
                sectionElement.style.backgroundImage = `url('${imagePath}')`;
            }

            // Добавляем обработчик клика
            sectionElement.addEventListener('click', () => {
                this.setActiveSection(sectionConfig.id);
            });

            sectionsContainer.appendChild(sectionElement);
            
            // Сохраняем данные секции
            this.sections.set(sectionConfig.id, {
                element: sectionElement,
                config: sectionConfig,
                currentVariant: sectionConfig.variants[0],
                currentWidth: sectionConfig.defaultSize.width
            });
        });
    }

    createSectionTabs(sectionsConfig) {
        const tabsContainer = document.getElementById('sections-tabs');
        if (!tabsContainer) return;

        tabsContainer.innerHTML = '';

        sectionsConfig.forEach(sectionConfig => {
            const tab = document.createElement('div');
            tab.className = 'section-tab';
            tab.textContent = sectionConfig.name;
            tab.dataset.sectionId = sectionConfig.id;
            
            tab.addEventListener('click', () => {
                this.setActiveSection(sectionConfig.id);
            });

            tabsContainer.appendChild(tab);
        });
    }

    setActiveSection(sectionId) {
        // Снимаем активность с всех секций
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelectorAll('.section-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Активируем выбранную секцию
        const sectionElement = document.getElementById(sectionId);
        const sectionTab = document.querySelector(`[data-section-id="${sectionId}"]`);
        
        if (sectionElement) sectionElement.classList.add('active');
        if (sectionTab) sectionTab.classList.add('active');

        this.activeSection = sectionId;
        
        // Обновляем контролы
        this.updateSectionControls();
    }

    updateSectionControls() {
        if (!this.activeSection) return;

        const sectionData = this.sections.get(this.activeSection);
        if (!sectionData) return;

        const controlsContainer = document.getElementById('section-controls');
        if (!controlsContainer) return;

        controlsContainer.innerHTML = `
            <div class="variants-dropdown">
                <label>Вариант секции:</label>
                <select id="variant-select">
                    ${sectionData.config.variants.map(variant => 
                        `<option value="${variant.id}" ${variant.id === sectionData.currentVariant.id ? 'selected' : ''}>
                            ${variant.name}
                        </option>`
                    ).join('')}
                </select>
            </div>

            <div class="width-control">
                <label>Ширина секции:</label>
                <div class="width-slider-container">
                    <input type="range" 
                           class="width-slider" 
                           id="width-slider"
                           min="${sectionData.config.minWidth}" 
                           max="${sectionData.config.maxWidth}" 
                           value="${sectionData.currentWidth}">
                    <div class="width-display" id="width-display">
                        ${this.pixelsToMillimeters(sectionData.currentWidth)}мм
                    </div>
                </div>
            </div>
        `;

        // Добавляем обработчики событий
        this.initSectionControlsEvents();
    }

    initSectionControlsEvents() {
        const variantSelect = document.getElementById('variant-select');
        const widthSlider = document.getElementById('width-slider');

        if (variantSelect) {
            variantSelect.addEventListener('change', (e) => {
                this.changeVariant(e.target.value);
            });
        }

        if (widthSlider) {
            widthSlider.addEventListener('input', (e) => {
                this.changeWidth(parseInt(e.target.value));
            });
        }
    }

    changeVariant(variantId) {
        if (!this.activeSection) return;

        const sectionData = this.sections.get(this.activeSection);
        if (!sectionData) return;

        const variant = sectionData.config.variants.find(v => v.id === variantId);
        if (!variant) return;

        // Обновляем изображение
        const imagePath = `${sectionData.config.imagePath}${variant.image}`;
        sectionData.element.style.backgroundImage = `url('${imagePath}')`;
        
        // Сохраняем выбранный вариант
        sectionData.currentVariant = variant;

        console.log(`Изменен вариант секции ${this.activeSection} на ${variant.name}`);
    }

    changeWidth(newWidth) {
        if (!this.activeSection) return;

        const sectionData = this.sections.get(this.activeSection);
        if (!sectionData) return;

        // Вычисляем масштаб
        const scale = newWidth / sectionData.config.defaultSize.width;
        
        // Применяем трансформацию в зависимости от transform-origin
        const transformOrigin = sectionData.config.transformOrigin;
        sectionData.element.style.transform = `scaleX(${scale})`;
        
        // Сохраняем новую ширину
        sectionData.currentWidth = newWidth;

        // Обновляем отображение размера
        const widthDisplay = document.getElementById('width-display');
        if (widthDisplay) {
            widthDisplay.textContent = `${this.pixelsToMillimeters(newWidth)}мм`;
        }

        console.log(`Изменена ширина секции ${this.activeSection} на ${newWidth}px (${this.pixelsToMillimeters(newWidth)}мм)`);
    }

    pixelsToMillimeters(pixels) {
        // Специальный коэффициент для центральной секции (520px = 1000мм)
        if (this.activeSection === 'section-2') {
            const ratio = 1000 / 520; // 1.923
            return Math.round(pixels * ratio);
        }
        
        // Стандартный коэффициент для остальных секций
        const ratio = this.layouts?.settings?.pixelsToMillimeters || 1.893939;
        return Math.round(pixels * ratio);
    }

    millimetersToPixels(millimeters) {
        // Специальный коэффициент для центральной секции (1000мм = 520px)
        if (this.activeSection === 'section-2') {
            const ratio = 520 / 1000; // 0.52
            return Math.round(millimeters * ratio);
        }
        
        // Стандартный коэффициент для остальных секций
        const ratio = this.layouts?.settings?.millimetersToPixels || 0.528;
        return Math.round(millimeters * ratio);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.cabinetConstructor = new CabinetConstructor();
}); 