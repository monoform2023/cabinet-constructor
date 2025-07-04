// Основная логика конструктора шкафов
class CabinetConstructor {
    constructor() {
        this.layouts = null;
        this.currentLayout = '3-sections';
        this.activeSection = null;
        this.sections = new Map();
        this.currentColor = 'c1'; // Текущий выбранный цвет (по умолчанию c1)
        
        // Глобальные настройки высоты и глубины (не зависят от секций)
        this.globalSettings = {
            sectionHeight: 2620,
            sectionDepth: 582,
            hasCustomDepth: false
        };
        
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
            console.log('Загружаем встроенную конфигурацию со всеми макетами...');
            
            // Встроенная конфигурация со всеми макетами (работает без HTTP сервера)
            this.layouts = {
                "layouts": {
                    "1-section": {
                        "name": "Однодверный шкаф",
                        "background": "images/layouts/1-section/background.jpg",
                        "cssClass": "layout-1-section",
                        "container": {
                            "width": 3200,
                            "height": 1919
                        },
                        "sections": [
                            {
                                "id": "section-1",
                                "name": "Секция 1",
                                "position": { "left": 1340, "top": 305 },
                                "defaultSize": { "width": 520, "height": 1314 },
                                "minWidth": 400,
                                "maxWidth": 800,
                                "transformOrigin": "center",
                                "imagePath": "images/layouts/1-section/sections/section-1/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "1_s1_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "1_s1_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "1_s1_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "1_s1_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "1_s1_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "1_s1_k6_c1_1000.jpg" }
                                ]
                            }
                        ]
                    },
                    "2-sections": {
                        "name": "Двухдверный шкаф", 
                        "background": "images/layouts/2-sections/background.jpg",
                        "cssClass": "layout-2-sections",
                        "container": {
                            "width": 3200,
                            "height": 1919
                        },
                        "sections": [
                            {
                                "id": "section-1",
                                "name": "Секция 1",
                                "position": { "left": 746, "top": 305 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "right",
                                "imagePath": "images/layouts/2-sections/sections/section-1/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "2_s1_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "2_s1_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "2_s1_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "2_s1_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "2_s1_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "2_s1_k6_c1_1000.jpg" }
                                ]
                            },
                            {
                                "id": "section-2", 
                                "name": "Секция 2",
                                "position": { "left": 1326, "top": 305 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "left",
                                "imagePath": "images/layouts/2-sections/sections/section-2/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "2_s2_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "2_s2_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "2_s2_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "2_s2_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "2_s2_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "2_s2_k6_c1_1000.jpg" }
                                ]
                            }
                        ]
                    },
                    "3-sections": {
                        "name": "Трехдверный шкаф",
                        "background": "images/layouts/3-sections/background.jpg",
                        "cssClass": "layout-3-sections",
                        "container": {
                            "width": 3200,
                            "height": 1919
                        },
                        "sections": [
                            {
                                "id": "section-1",
                                "name": "Секция 1",
                                "position": { "left": 428, "top": 305 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "right",
                                "imagePath": "images/layouts/3-sections/sections/section-1/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "3_s1_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "3_s1_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "3_s1_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "3_s1_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "3_s1_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "3_s1_k6_c1_1000.jpg" }
                                ]
                            },
                            {
                                "id": "section-2",
                                "name": "Секция 2",
                                "position": { "left": 956, "top": 305 },
                                "defaultSize": { "width": 520, "height": 1314 },
                                "minWidth": 208,
                                "maxWidth": 520,
                                "transformOrigin": "center",
                                "imagePath": "images/layouts/3-sections/sections/section-2/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "3_s2_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "3_s2_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "3_s2_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "3_s2_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "3_s2_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "3_s2_k6_c1_1000.jpg" }
                                ]
                            },
                            {
                                "id": "section-3",
                                "name": "Секция 3",
                                "position": { "left": 1476, "top": 305 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "left",
                                "imagePath": "images/layouts/3-sections/sections/section-3/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "3_s3_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "3_s3_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "3_s3_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "3_s3_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "3_s3_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "3_s3_k6_c1_1000.jpg" }
                                ]
                            }
                        ]
                    },
                    "4-sections": {
                        "name": "Четырехдверный шкаф",
                        "background": "images/layouts/4-sections/background.jpg",
                        "cssClass": "layout-4-sections",
                        "container": {
                            "width": 3200,
                            "height": 1919
                        },
                        "sections": [
                            {
                                "id": "section-1",
                                "name": "Секция 1",
                                "position": { "left": 138, "top": 305 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "right",
                                "imagePath": "images/layouts/4-sections/sections/section-1/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "4_s1_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "4_s1_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "4_s1_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "4_s1_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "4_s1_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "4_s1_k6_c1_1000.jpg" }
                                ]
                            },
                            {
                                "id": "section-2",
                                "name": "Секция 2",
                                "position": { "left": 666, "top": 305 },
                                "defaultSize": { "width": 520, "height": 1314 },
                                "minWidth": 208,
                                "maxWidth": 520,
                                "transformOrigin": "center",
                                "imagePath": "images/layouts/4-sections/sections/section-2/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "4_s2_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "4_s2_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "4_s2_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "4_s2_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "4_s2_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "4_s2_k6_c1_1000.jpg" }
                                ]
                            },
                            {
                                "id": "section-3",
                                "name": "Секция 3",
                                "position": { "left": 1186, "top": 305 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "left",
                                "imagePath": "images/layouts/4-sections/sections/section-3/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "4_s3_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "4_s3_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "4_s3_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "4_s3_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "4_s3_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "4_s3_k6_c1_1000.jpg" }
                                ]
                            },
                            {
                                "id": "section-4",
                                "name": "Секция 4",
                                "position": { "left": 1714, "top": 305 },
                                "defaultSize": { "width": 520, "height": 1314 },
                                "minWidth": 208,
                                "maxWidth": 520,
                                "transformOrigin": "left",
                                "imagePath": "images/layouts/4-sections/sections/section-4/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "4_s4_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "4_s4_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "4_s4_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "4_s4_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "4_s4_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "4_s4_k6_c1_1000.jpg" }
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
            
            console.log('Встроенная конфигурация загружена');
            console.log('Доступные макеты:', Object.keys(this.layouts.layouts));
        } catch (error) {
            console.error('Ошибка инициализации конфигурации:', error);
        }
    }

    initEventListeners() {
        // Селектор компоновки
        const layoutSelect = document.getElementById('layout-select');
        if (layoutSelect) {
            layoutSelect.addEventListener('change', (e) => {
                console.log('Переключаем макет на:', e.target.value);
                this.currentLayout = e.target.value;
                this.loadLayout(this.currentLayout);
            });
        } else {
            console.error('layout-select элемент не найден!');
        }
    }

    loadLayout(layoutId) {
        console.log('loadLayout вызвана для:', layoutId);
        console.log('Доступные макеты:', this.layouts ? Object.keys(this.layouts.layouts) : 'layouts не загружены');
        
        const layout = this.layouts.layouts[layoutId];
        if (!layout) {
            console.error('Компоновка не найдена:', layoutId);
            console.log('Содержимое this.layouts:', this.layouts);
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

        // Инициализируем фоновые слои с стандартными размерами
        setTimeout(() => {
            this.initializeBackgroundLayers();
            this.adjustSectionsAlignment(); // Выравниваем секции сразу после загрузки
        }, 100); // Небольшая задержка для полной загрузки DOM
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
            sectionElement.style.top = `${(sectionConfig.position.top / 1919) * 100}%`;
            sectionElement.style.width = `${(sectionConfig.defaultSize.width / 3200) * 100}%`;
            sectionElement.style.height = `${(sectionConfig.defaultSize.height / 1919) * 100}%`;
            
            // Устанавливаем transform-origin из конфигурации
            sectionElement.style.transformOrigin = sectionConfig.transformOrigin;

            // Добавляем обработчик клика
            sectionElement.addEventListener('click', () => {
                this.setActiveSection(sectionConfig.id);
            });

            sectionsContainer.appendChild(sectionElement);
            
            // Сохраняем данные секции
            const sectionData = {
                element: sectionElement,
                config: sectionConfig,
                currentVariant: sectionConfig.variants[0],
                currentWidth: sectionConfig.defaultSize.width
            };
            this.sections.set(sectionConfig.id, sectionData);

            // Устанавливаем первый вариант изображения с учетом размера
            if (sectionConfig.variants && sectionConfig.variants.length > 0) {
                this.updateSectionImage(sectionData);
            }
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
                    <input type="text" 
                           class="width-display" 
                           id="width-display"
                           value="${this.pixelsToMillimeters(sectionData.currentWidth)}"
                           data-min="${this.pixelsToMillimeters(sectionData.config.minWidth)}" 
                           data-max="${this.pixelsToMillimeters(sectionData.config.maxWidth)}">
                    <span style="font-size: 12px; color: #495057;">мм</span>
                </div>
            </div>

            <div class="color-selector">
                <label>Цвет:</label>
                <div class="color-buttons" id="color-buttons">
                    <button class="color-button ${this.currentColor === 'c1' ? 'active' : ''}" data-color="c1" title="Цвет 1"></button>
                    <button class="color-button ${this.currentColor === 'c2' ? 'active' : ''}" data-color="c2" title="Цвет 2"></button>
                    <button class="color-button ${this.currentColor === 'c3' ? 'active' : ''}" data-color="c3" title="Цвет 3"></button>
                    <button class="color-button ${this.currentColor === 'c4' ? 'active' : ''}" data-color="c4" title="Цвет 4"></button>
                    <button class="color-button ${this.currentColor === 'c5' ? 'active' : ''}" data-color="c5" title="Цвет 5"></button>
                </div>
            </div>

            <div class="height-control">
                <label>Высота шкафа:</label>
                <div class="height-slider-container">
                    <input type="range" 
                           class="height-slider" 
                           id="height-slider"
                           min="2400" 
                           max="2800" 
                           value="${this.globalSettings.sectionHeight}">
                    <input type="text" 
                           class="height-display" 
                           id="height-display"
                           value="${this.globalSettings.sectionHeight}"
                           data-min="2400" 
                           data-max="2800">
                    <span style="font-size: 12px; color: #495057;">мм</span>
                </div>
            </div>

            <div class="depth-control">
                <div class="custom-depth-checkbox">
                    <input type="checkbox" id="custom-depth-checkbox" ${this.globalSettings.hasCustomDepth ? 'checked' : ''}>
                    <label for="custom-depth-checkbox">Нестандартная глубина</label>
                    <span class="price-note">+20%</span>
                </div>
                <div class="depth-slider-container" id="depth-slider-container" style="display: ${this.globalSettings.hasCustomDepth ? 'block' : 'none'};">
                    <input type="range" 
                           class="depth-slider ${this.globalSettings.hasCustomDepth ? 'active' : ''}" 
                           id="depth-slider"
                           min="410" 
                           max="640" 
                           value="${this.globalSettings.sectionDepth}">
                    <input type="text" 
                           class="depth-display" 
                           id="depth-display"
                           value="${this.globalSettings.sectionDepth}"
                           data-min="410" 
                           data-max="640">
                    <span style="font-size: 12px; color: #495057;">мм</span>
                </div>
            </div>
        `;

        // Добавляем обработчики событий
        this.initSectionControlsEvents();
    }

    initSectionControlsEvents() {
        const variantSelect = document.getElementById('variant-select');
        const widthSlider = document.getElementById('width-slider');
        const widthDisplay = document.getElementById('width-display');
        const heightSlider = document.getElementById('height-slider');
        const heightDisplay = document.getElementById('height-display');
        const customDepthCheckbox = document.getElementById('custom-depth-checkbox');
        const depthSlider = document.getElementById('depth-slider');
        const depthDisplay = document.getElementById('depth-display');

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

        if (widthDisplay) {
            this.initInputField(widthDisplay, (value) => {
                const pixels = this.millimetersToPixels(value);
                this.changeWidth(pixels);
                if (widthSlider) widthSlider.value = pixels;
            });
        }

        if (heightSlider) {
            // Активируем слайдер при первом взаимодействии
            heightSlider.addEventListener('mousedown', () => {
                this.activateSlider(heightSlider);
            });
            
            heightSlider.addEventListener('input', (e) => {
                this.activateSlider(heightSlider);
                this.changeHeight(parseInt(e.target.value));
            });
        }

        if (heightDisplay) {
            this.initInputField(heightDisplay, (value) => {
                this.changeHeight(value);
                if (heightSlider) {
                    heightSlider.value = value;
                    this.activateSlider(heightSlider);
                }
            });
        }

        if (customDepthCheckbox) {
            customDepthCheckbox.addEventListener('change', (e) => {
                this.toggleCustomDepth(e.target.checked);
            });
        }

        if (depthSlider) {
            // Активируем слайдер при первом взаимодействии
            depthSlider.addEventListener('mousedown', () => {
                this.activateSlider(depthSlider);
            });
            
            depthSlider.addEventListener('input', (e) => {
                this.activateSlider(depthSlider);
                this.changeDepth(parseInt(e.target.value));
            });
        }

        if (depthDisplay) {
            this.initInputField(depthDisplay, (value) => {
                this.changeDepth(value);
                if (depthSlider) {
                    depthSlider.value = value;
                    this.activateSlider(depthSlider);
                }
            });
        }

        // Инициализируем цветовые кнопки
        this.initColorButtons();
    }

    // Инициализация цветовых кнопок
    initColorButtons() {
        const colorButtons = document.querySelectorAll('.color-button');
        colorButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const newColor = e.target.dataset.color;
                if (newColor) {
                    this.changeColor(newColor);
                }
            });
        });
    }

    changeVariant(variantId) {
        if (!this.activeSection) return;

        const sectionData = this.sections.get(this.activeSection);
        if (!sectionData) return;

        const variant = sectionData.config.variants.find(v => v.id === variantId);
        if (!variant) return;
        
        // Сохраняем выбранный вариант
        sectionData.currentVariant = variant;

        // Обновляем изображение с учетом текущего размера секции
        this.updateSectionImage(sectionData);

        console.log(`Изменен вариант секции ${this.activeSection} на ${variant.name}`);
    }

    changeColor(newColor) {
        if (this.currentColor === newColor) return;

        console.log('Смена цвета с', this.currentColor, 'на', newColor);
        
        // Обновляем текущий цвет
        this.currentColor = newColor;
        
        // Обновляем активную кнопку цвета
        document.querySelectorAll('.color-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`[data-color="${newColor}"]`).classList.add('active');
        
        // Обновляем изображения всех секций с сохранением выбранных вариантов
        this.sections.forEach((sectionData, sectionId) => {
            this.updateSectionImage(sectionData);
        });
        
        console.log('Цвет изменен на:', newColor);
    }

    // Обновление изображения секции с учетом её размера
    updateSectionImage(sectionData) {
        if (!sectionData || !sectionData.currentVariant) return;

        // Определяем размер секции в миллиметрах
        const sectionWidthMm = this.pixelsToMillimeters(sectionData.currentWidth);
        
        // Получаем оптимальный размер изображения
        const optimalSize = ConfigUtils.getOptimalImageSize(sectionWidthMm);
        
        // Заменяем цвет в названии изображения на текущий выбранный цвет
        const imageNameWithColor = sectionData.currentVariant.image.replace(/c\d+/, this.currentColor);
        
        // Генерируем путь к изображению нужного размера
        const optimizedImageName = ConfigUtils.getImagePath(imageNameWithColor, optimalSize);
        const imagePath = `${sectionData.config.imagePath}${optimizedImageName}`;
        
        // Применяем изображение
        sectionData.element.style.backgroundImage = `url('${imagePath}')`;
        
        // Устанавливаем подходящий background-size в зависимости от размера изображения
        if (optimalSize === CONFIG.IMAGES.SMALL_SIZE) {
            // Для изображений 700: растягиваем точно по размерам блока (ширина и высота)
            sectionData.element.style.backgroundSize = '100% 100%';
        } else {
            // Для изображений 1000: вписываем в контейнер с сохранением пропорций
            sectionData.element.style.backgroundSize = 'contain';
        }
        
        ConfigUtils.log('debug', `Секция ${sectionData.config.id}: размер ${sectionWidthMm}мм, цвет ${this.currentColor}, используется изображение ${optimalSize} (${optimizedImageName}), background-size: ${sectionData.element.style.backgroundSize}`);
    }

    changeWidth(newWidth) {
        if (!this.activeSection) return;

        const sectionData = this.sections.get(this.activeSection);
        if (!sectionData) return;

        // Вычисляем масштаб
        const scale = newWidth / sectionData.config.defaultSize.width;
        
        // Применяем трансформацию в зависимости от transform-origin
        const transformOrigin = sectionData.config.transformOrigin;
        sectionData.element.style.transformOrigin = transformOrigin;
        sectionData.element.style.transform = `scaleX(${scale})`;
        
        // Сохраняем новую ширину
        sectionData.currentWidth = newWidth;

        // Обновляем изображение с учетом нового размера
        this.updateSectionImage(sectionData);

        // Применяем систему прилипания секций
        this.adjustSectionsAlignment();

        // Обновляем отображение размера
        const widthDisplay = document.getElementById('width-display');
        if (widthDisplay) {
            widthDisplay.value = this.pixelsToMillimeters(newWidth);
        }
    }

    changeHeight(newHeight) {
        // Сохраняем высоту в глобальных настройках
        this.globalSettings.sectionHeight = newHeight;

        // Обновляем отображение высоты
        const heightDisplay = document.getElementById('height-display');
        if (heightDisplay) {
            heightDisplay.value = newHeight;
        }

        console.log(`Высота шкафа изменена на ${newHeight}мм`);
    }

    toggleCustomDepth(isEnabled) {
        const depthSliderContainer = document.getElementById('depth-slider-container');
        if (depthSliderContainer) {
            depthSliderContainer.style.display = isEnabled ? 'block' : 'none';
        }

        // Сохраняем в глобальных настройках
        this.globalSettings.hasCustomDepth = isEnabled;

        console.log(`Нестандартная глубина: ${isEnabled ? 'включена' : 'выключена'}`);
    }



    changeDepth(newDepth) {
        // Сохраняем глубину в глобальных настройках
        this.globalSettings.sectionDepth = newDepth;

        // Обновляем отображение глубины
        const depthDisplay = document.getElementById('depth-display');
        if (depthDisplay) {
            depthDisplay.value = newDepth;
        }

        console.log(`Глубина секции изменена на ${newDepth}мм`);
    }

    // Активация слайдера (делает его визуально активным)
    activateSlider(slider) {
        if (slider && !slider.classList.contains('active')) {
            slider.classList.add('active');
        }
    }

    // Инициализация интерактивного поля ввода
    initInputField(inputElement, onChangeCallback) {
        const minValue = parseInt(inputElement.dataset.min);
        const maxValue = parseInt(inputElement.dataset.max);
        
        // Обработчик изменения значения
        const handleChange = () => {
            const value = parseInt(inputElement.value);
            
            // Убираем предыдущий tooltip если есть
            this.removeTooltip(inputElement);
            
            if (isNaN(value) || value < minValue || value > maxValue) {
                this.showTooltip(inputElement, `Диапазон: ${minValue}-${maxValue}мм`);
                return;
            }
            
            onChangeCallback(value);
        };

        // Валидация при потере фокуса
        inputElement.addEventListener('blur', handleChange);
        
        // Валидация при нажатии Enter
        inputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleChange();
                inputElement.blur();
            }
        });

        // Убираем tooltip при фокусе
        inputElement.addEventListener('focus', () => {
            this.removeTooltip(inputElement);
        });
    }

    // Показать tooltip с подсказкой
    showTooltip(inputElement, message) {
        // Убираем предыдущий tooltip
        this.removeTooltip(inputElement);
        
        const tooltip = document.createElement('div');
        tooltip.className = 'input-tooltip show';
        tooltip.textContent = message;
        tooltip.dataset.tooltip = 'true';
        
        inputElement.parentElement.appendChild(tooltip);
        
        // Автоматически убираем tooltip через 3 секунды
        setTimeout(() => {
            this.removeTooltip(inputElement);
        }, 3000);
    }

    // Убрать tooltip
    removeTooltip(inputElement) {
        const existingTooltip = inputElement.parentElement.querySelector('[data-tooltip="true"]');
        if (existingTooltip) {
            existingTooltip.remove();
        }
    }

    // Универсальная система выравнивания секций
    adjustSectionsAlignment() {
        if (this.currentLayout === '2-sections') {
            this.adjustTwoSectionsAlignment();
        } else if (this.currentLayout === '3-sections') {
            this.adjustThreeSectionsAlignment();
        } else if (this.currentLayout === '4-sections') {
            this.adjustFourSectionsAlignment();
        } else {
            console.log('Система выравнивания пропущена для макета:', this.currentLayout);
        }
    }

    // Система выравнивания для 2-х секций
    adjustTwoSectionsAlignment() {
        const section1Data = this.sections.get('section-1');
        const section2Data = this.sections.get('section-2');

        if (!section1Data || !section2Data) return;

        // Для 2-секций: секции должны стоять вплотную друг к другу
        // section-1 (transform-origin: right): правый край фиксирован
        // section-2 (transform-origin: left): левый край прилегает к правому краю section-1

        // Исходные позиции и размеры из конфигурации
        const section1OriginalLeft = section1Data.config.position.left; // 746
        const section1OriginalWidth = section1Data.config.defaultSize.width; // 528
        const section1OriginalRight = section1OriginalLeft + section1OriginalWidth; // 1274

        // Вычисляем реальную ширину после масштабирования
        const section1Scale = section1Data.currentWidth / section1OriginalWidth;
        const section1RealWidth = section1OriginalWidth * section1Scale;

        // Левый край section-1 после масштабирования (при transform-origin: right)
        const section1RealLeft = section1OriginalRight - section1RealWidth;

        // section-2 должна начинаться сразу после section-1
        const section2NewLeft = section1OriginalRight; // Правый край исходной section-1

        // Применяем новую позицию для section-2
        const section2NewLeftPercent = (section2NewLeft / 3200) * 100;
        section2Data.element.style.left = `${section2NewLeftPercent}%`;
        section2Data.config.position.left = section2NewLeft;

        // Обновляем фоновые слои для 2-секций
        this.adjustTwoSectionsBackgrounds(section1RealLeft, section1RealWidth, section2Data.currentWidth, section2NewLeft);

        console.log('Выравнивание 2-секций:', {
            'Секция 1': `${section1RealLeft.toFixed(0)}px - ${section1OriginalRight}px (ширина: ${section1RealWidth.toFixed(0)}px)`,
            'Секция 2': `${section2NewLeft}px начало, ширина: ${section2Data.currentWidth}px`
        });
    }

    // Система выравнивания для 3-х секций (исходная логика)
    adjustThreeSectionsAlignment() {
        const section1Data = this.sections.get('section-1');
        const section2Data = this.sections.get('section-2');
        const section3Data = this.sections.get('section-3');

        if (!section1Data || !section2Data || !section3Data) return;

        // Получаем исходные позиции и размеры из конфигурации (только для 3-секций)
        const originalSection2Left = 956; // Исходная позиция центральной секции в 3-секционном макете
        const originalSection2Width = 520; // Исходная ширина центральной секции в 3-секционном макете
        
        // Центр центральной секции всегда зафиксирован
        const section2Center = originalSection2Left + (originalSection2Width / 2);
        
        // Рассчитываем реальные края центральной секции
        const section2HalfWidth = section2Data.currentWidth / 2;
        const section2LeftEdge = section2Center - section2HalfWidth;
        const section2RightEdge = section2Center + section2HalfWidth;

        // Левая секция: её правый край должен плотно прилегать к левому краю центральной
        // При transform-origin: right правый край остается неподвижным при масштабировании
        const section1RightEdge = section2LeftEdge;
        const section1OriginalWidth = section1Data.config.defaultSize.width;
        const section1Scale = section1Data.currentWidth / section1OriginalWidth;
        const section1RealWidth = section1OriginalWidth * section1Scale;
        
        // Для transform-origin: right позиционируем по правому краю
        // Левый край элемента = правый край - исходная ширина (DOM позиция не меняется при scale)
        const section1LeftEdge = section1RightEdge - section1OriginalWidth;
        
        // Правая секция: её левый край должен плотно прилегать к правому краю центральной  
        // При transform-origin: left левый край остается на месте, поэтому позиционируем по левому краю
        const section3LeftEdge = section2RightEdge;

        // Функция для мгновенного перемещения секции (без анимации)
        const animateSection = (sectionData, newLeftPx) => {
            const newLeftPercent = (newLeftPx / 3200) * 100;
            sectionData.element.style.left = `${newLeftPercent}%`;
            
            // Обновляем позицию в конфигурации
            sectionData.config.position.left = newLeftPx;
        };

        // Применяем новые позиции
        animateSection(section1Data, section1LeftEdge);
        animateSection(section3Data, section3LeftEdge);

        // Вычисляем реальную позицию левой секции после масштабирования
        const section1RealLeftEdge = section1RightEdge - section1RealWidth;
        
        // Обновляем фоновые слои
        this.adjustBackgroundLayers(section1RealLeftEdge, section1RealWidth, section2Data.currentWidth, section3Data.currentWidth, section3LeftEdge);
    }

    // Система выравнивания для 4-х секций
    adjustFourSectionsAlignment() {
        const section1Data = this.sections.get('section-1');
        const section2Data = this.sections.get('section-2');
        const section3Data = this.sections.get('section-3');
        const section4Data = this.sections.get('section-4');

        if (!section1Data || !section2Data || !section3Data || !section4Data) return;

        // Фиксированный центр ТОЛЬКО для section-2 (как в 3-секционном макете)
        const originalSection2Left = 666; // Исходная позиция второй секции
        const originalSection2Width = 520; // Исходная ширина второй секции
        const section2Center = originalSection2Left + (originalSection2Width / 2); // Центр второй секции
        
        // Вычисляем реальные края секции 2 (с фиксированным центром)
        const section2HalfWidth = section2Data.currentWidth / 2;
        const section2LeftEdge = section2Center - section2HalfWidth;
        const section2RightEdge = section2Center + section2HalfWidth;

        // Секция 1: её правый край должен плотно прилегать к левому краю секции 2
        const section1RightEdge = section2LeftEdge;
        const section1OriginalWidth = section1Data.config.defaultSize.width;
        const section1Scale = section1Data.currentWidth / section1OriginalWidth;
        const section1RealWidth = section1OriginalWidth * section1Scale;
        
        // Для transform-origin: right позиционируем по правому краю
        const section1NewLeftEdge = section1RightEdge - section1OriginalWidth;
        
        // Секция 3: её левый край должен плотно прилегать к правому краю секции 2
        // При transform-origin: left левый край остается на месте
        const section3NewLeftEdge = section2RightEdge;
        
        // Секция 4: её левый край должен плотно прилегать к правому краю секции 3
        const section3OriginalWidth = section3Data.config.defaultSize.width;
        const section3Scale = section3Data.currentWidth / section3OriginalWidth;
        const section3RealWidth = section3OriginalWidth * section3Scale;
        const section4NewLeftEdge = section3NewLeftEdge + section3RealWidth;

        // Функция для мгновенного перемещения секции
        const animateSection = (sectionData, newLeftPx) => {
            const newLeftPercent = (newLeftPx / 3200) * 100;
            sectionData.element.style.left = `${newLeftPercent}%`;
            sectionData.config.position.left = newLeftPx;
        };

        // Применяем новые позиции (только section-2 не двигается, у неё центр зафиксирован)
        animateSection(section1Data, section1NewLeftEdge);
        animateSection(section3Data, section3NewLeftEdge);
        animateSection(section4Data, section4NewLeftEdge);

        // Вычисляем реальную позицию левой секции после масштабирования
        const section1RealLeftEdge = section1RightEdge - section1RealWidth;
        
        // Обновляем фоновые слои для 4-секций
        this.adjustFourSectionsBackgrounds(section1RealLeftEdge, section1RealWidth, section2Data.currentWidth, section3Data.currentWidth, section4Data.currentWidth, section3NewLeftEdge, section4NewLeftEdge);

        console.log('Выравнивание 4-секций:', {
            'Секция 1': `${section1RealLeftEdge.toFixed(0)}px - ${section1RightEdge}px (ширина: ${section1RealWidth.toFixed(0)}px)`,
            'Секция 2': `Центр: ${section2Center}px, ${section2LeftEdge.toFixed(0)}px - ${section2RightEdge.toFixed(0)}px (ширина: ${section2Data.currentWidth}px)`,
            'Секция 3': `${section3NewLeftEdge}px - ${(section3NewLeftEdge + section3RealWidth).toFixed(0)}px (ширина: ${section3RealWidth.toFixed(0)}px)`,
            'Секция 4': `${section4NewLeftEdge}px начало, ширина: ${section4Data.currentWidth}px`
        });
    }

    // Система динамического масштабирования и позиционирования фоновых слоев
    adjustBackgroundLayers(section1LeftEdge, section1RealWidth, section2Width, section3Width, section3LeftEdge) {
        const backgroundLeft = document.getElementById('background-left');
        const backgroundCenter = document.getElementById('background-center');
        const backgroundRight = document.getElementById('background-right');

        if (!backgroundLeft || !backgroundCenter || !backgroundRight) return;

        // Вычисляем реальные края секций (только для 3-секционного макета)
        const section2Scale = section2Width / 520; // Масштаб центральной секции в 3-секционном макете
        const section3Scale = section3Width / 528; // Масштаб правой секции

        // Реальные размеры секций после масштабирования (section1RealWidth уже передана)
        const section2RealWidth = 520 * section2Scale;
        const section3RealWidth = 528 * section3Scale;

        // Позиции краев секций
        const section1RightEdge = section1LeftEdge + section1RealWidth;
        const section3RightEdge = section3LeftEdge + section3RealWidth;

        // 1. ЛЕВЫЙ ФОН: привязывается к левому краю левой секции
        const leftBgLeftEdge = 0; // Левый край левого фона всегда в позиции 0
        const leftBgRightEdge = section1LeftEdge; // Правый край левого фона = левый край секции 1
        const leftBgWidth = leftBgRightEdge - leftBgLeftEdge; // Ширина = от 0 до левого края секции 1
        const leftBgLeftPercent = (leftBgLeftEdge / 3200) * 100;
        const leftBgWidthPercent = (leftBgWidth / 3200) * 100;
        
        backgroundLeft.style.left = `${leftBgLeftPercent}%`;
        backgroundLeft.style.width = `${leftBgWidthPercent}%`;

        // 2. ЦЕНТРАЛЬНЫЙ ФОН: привязывается к внешним краям крайних секций
        const centerBgLeftEdge = section1LeftEdge; // Левый край = левый край секции 1
        const centerBgRightEdge = section3RightEdge; // Правый край = правый край секции 3
        const centerBgWidth = centerBgRightEdge - centerBgLeftEdge; // Общая ширина всех секций
        const centerBgLeftPercent = (centerBgLeftEdge / 3200) * 100;
        const centerBgWidthPercent = (centerBgWidth / 3200) * 100;

        // Просто меняем размер и позицию контейнера, фон растянется автоматически
        backgroundCenter.style.left = `${centerBgLeftPercent}%`;
        backgroundCenter.style.width = `${centerBgWidthPercent}%`;
        backgroundCenter.style.transform = 'none'; // Убираем масштабирование

        // 3. ПРАВЫЙ ФОН: привязывается к правому краю правой секции
        const rightBgLeftEdge = section3RightEdge; // Левый край правого фона = правый край секции 3
        const rightBgWidth = 3200 - rightBgLeftEdge; // Ширина = от правого края секции 3 до края (3200px)
        const rightBgLeftPercent = (rightBgLeftEdge / 3200) * 100;
        const rightBgWidthPercent = (rightBgWidth / 3200) * 100;
        
        backgroundRight.style.left = `${rightBgLeftPercent}%`;
        backgroundRight.style.width = `${rightBgWidthPercent}%`;

        // Убираем переходы для мгновенного обновления фоновых слоев
        [backgroundLeft, backgroundCenter, backgroundRight].forEach(bg => {
            bg.style.transition = 'none';
        });

        console.log('Фоновые слои обновлены:', {
            'Секция 1': `${section1LeftEdge.toFixed(0)}px - ${(section1LeftEdge + section1RealWidth).toFixed(0)}px (ширина: ${section1RealWidth.toFixed(0)}px)`,
            'Левый фон': `${leftBgLeftPercent.toFixed(2)}% ширина: ${leftBgWidthPercent.toFixed(2)}%`,
            'Центр фон': `${centerBgLeftPercent.toFixed(2)}% ширина: ${centerBgWidthPercent.toFixed(2)}%`,
            'Правый фон': `${rightBgLeftPercent.toFixed(2)}% ширина: ${rightBgWidthPercent.toFixed(2)}%`
        });
    }

    // Система фоновых слоев для 2-х секций
    adjustTwoSectionsBackgrounds(section1RealLeft, section1RealWidth, section2Width, section2Left) {
        const backgroundLeft = document.getElementById('background-left');
        const backgroundCenter = document.getElementById('background-center');
        const backgroundRight = document.getElementById('background-right');

        if (!backgroundLeft || !backgroundCenter || !backgroundRight) return;

        // Вычисляем реальные размеры и позиции
        const section2OriginalWidth = 528; // Исходная ширина section-2 в 2-секционном макете
        const section2Scale = section2Width / section2OriginalWidth;
        const section2RealWidth = section2OriginalWidth * section2Scale;
        const section2RealRight = section2Left + section2RealWidth;

        // 1. ЛЕВЫЙ ФОН: от левого края (0) до левого края section-1
        const leftBgLeftEdge = 0;
        const leftBgRightEdge = section1RealLeft;
        const leftBgWidth = leftBgRightEdge - leftBgLeftEdge;
        const leftBgLeftPercent = (leftBgLeftEdge / 3200) * 100;
        const leftBgWidthPercent = (leftBgWidth / 3200) * 100;
        
        backgroundLeft.style.left = `${leftBgLeftPercent}%`;
        backgroundLeft.style.width = `${leftBgWidthPercent}%`;

        // 2. ЦЕНТРАЛЬНЫЙ ФОН: от левого края section-1 до правого края section-2
        const centerBgLeftEdge = section1RealLeft;
        const centerBgRightEdge = section2RealRight;
        const centerBgWidth = centerBgRightEdge - centerBgLeftEdge;
        const centerBgLeftPercent = (centerBgLeftEdge / 3200) * 100;
        const centerBgWidthPercent = (centerBgWidth / 3200) * 100;

        backgroundCenter.style.left = `${centerBgLeftPercent}%`;
        backgroundCenter.style.width = `${centerBgWidthPercent}%`;
        backgroundCenter.style.transform = 'none';

        // 3. ПРАВЫЙ ФОН: от правого края section-2 до правого края экрана (3200px)
        const rightBgLeftEdge = section2RealRight;
        const rightBgWidth = 3200 - rightBgLeftEdge;
        const rightBgLeftPercent = (rightBgLeftEdge / 3200) * 100;
        const rightBgWidthPercent = (rightBgWidth / 3200) * 100;
        
        backgroundRight.style.left = `${rightBgLeftPercent}%`;
        backgroundRight.style.width = `${rightBgWidthPercent}%`;

        // Убираем переходы для мгновенного обновления
        [backgroundLeft, backgroundCenter, backgroundRight].forEach(bg => {
            bg.style.transition = 'none';
        });

        console.log('Фоны 2-секций обновлены:', {
            'Секция 1': `${section1RealLeft.toFixed(0)}px - ${(section1RealLeft + section1RealWidth).toFixed(0)}px`,
            'Секция 2': `${section2Left}px - ${section2RealRight.toFixed(0)}px`,
            'Левый фон': `${leftBgLeftPercent.toFixed(2)}% ширина: ${leftBgWidthPercent.toFixed(2)}%`,
            'Центр фон': `${centerBgLeftPercent.toFixed(2)}% ширина: ${centerBgWidthPercent.toFixed(2)}%`,
            'Правый фон': `${rightBgLeftPercent.toFixed(2)}% ширина: ${rightBgWidthPercent.toFixed(2)}%`
        });
    }

    // Система фоновых слоев для 4-х секций
    adjustFourSectionsBackgrounds(section1LeftEdge, section1RealWidth, section2Width, section3Width, section4Width, section3LeftEdge, section4LeftEdge) {
        const backgroundLeft = document.getElementById('background-left');
        const backgroundCenter = document.getElementById('background-center');
        const backgroundRight = document.getElementById('background-right');

        if (!backgroundLeft || !backgroundCenter || !backgroundRight) return;

        // Вычисляем реальные размеры секций после масштабирования
        const section2Scale = section2Width / 520; // Масштаб центральной секции
        const section3Scale = section3Width / 528; // Масштаб третьей секции
        const section4Scale = section4Width / 520; // Масштаб четвертой секции

        const section2RealWidth = 520 * section2Scale;
        const section3RealWidth = 528 * section3Scale;
        const section4RealWidth = 520 * section4Scale;

        // Позиции краев секций
        const section1RightEdge = section1LeftEdge + section1RealWidth;
        const section4RightEdge = section4LeftEdge + section4RealWidth;

        // 1. ЛЕВЫЙ ФОН: привязывается к левому краю левой секции
        const leftBgLeftEdge = 0; // Левый край левого фона всегда в позиции 0
        const leftBgRightEdge = section1LeftEdge; // Правый край левого фона = левый край секции 1
        const leftBgWidth = leftBgRightEdge - leftBgLeftEdge; // Ширина = от 0 до левого края секции 1
        const leftBgLeftPercent = (leftBgLeftEdge / 3200) * 100;
        const leftBgWidthPercent = (leftBgWidth / 3200) * 100;
        
        backgroundLeft.style.left = `${leftBgLeftPercent}%`;
        backgroundLeft.style.width = `${leftBgWidthPercent}%`;

        // 2. ЦЕНТРАЛЬНЫЙ ФОН: привязывается к внешним краям крайних секций (от секции 1 до секции 4)
        const centerBgLeftEdge = section1LeftEdge; // Левый край = левый край секции 1
        const centerBgRightEdge = section4RightEdge; // Правый край = правый край секции 4
        const centerBgWidth = centerBgRightEdge - centerBgLeftEdge; // Общая ширина всех секций
        const centerBgLeftPercent = (centerBgLeftEdge / 3200) * 100;
        const centerBgWidthPercent = (centerBgWidth / 3200) * 100;

        // Просто меняем размер и позицию контейнера, фон растянется автоматически
        backgroundCenter.style.left = `${centerBgLeftPercent}%`;
        backgroundCenter.style.width = `${centerBgWidthPercent}%`;
        backgroundCenter.style.transform = 'none'; // Убираем масштабирование

        // 3. ПРАВЫЙ ФОН: привязывается к правому краю правой секции (секции 4)
        const rightBgLeftEdge = section4RightEdge; // Левый край правого фона = правый край секции 4
        const rightBgWidth = 3200 - rightBgLeftEdge; // Ширина = от правого края секции 4 до края (3200px)
        const rightBgLeftPercent = (rightBgLeftEdge / 3200) * 100;
        const rightBgWidthPercent = (rightBgWidth / 3200) * 100;
        
        backgroundRight.style.left = `${rightBgLeftPercent}%`;
        backgroundRight.style.width = `${rightBgWidthPercent}%`;

        // Убираем переходы для мгновенного обновления фоновых слоев
        [backgroundLeft, backgroundCenter, backgroundRight].forEach(bg => {
            bg.style.transition = 'none';
        });

        console.log('Фоновые слои обновлены для 4-секций:', {
            'Секция 1': `${section1LeftEdge.toFixed(0)}px - ${(section1LeftEdge + section1RealWidth).toFixed(0)}px (ширина: ${section1RealWidth.toFixed(0)}px)`,
            'Секция 4': `${section4LeftEdge}px - ${section4RightEdge.toFixed(0)}px (ширина: ${section4RealWidth.toFixed(0)}px)`,
            'Левый фон': `${leftBgLeftPercent.toFixed(2)}% ширина: ${leftBgWidthPercent.toFixed(2)}%`,
            'Центр фон': `${centerBgLeftPercent.toFixed(2)}% ширина: ${centerBgWidthPercent.toFixed(2)}%`,
            'Правый фон': `${rightBgLeftPercent.toFixed(2)}% ширина: ${rightBgWidthPercent.toFixed(2)}%`
        });
    }

    // Инициализация фоновых слоев при загрузке компоновки
    initializeBackgroundLayers() {
        console.log('Инициализация фоновых слоев для макета:', this.currentLayout);
        console.log('Загруженные секции:', Array.from(this.sections.keys()));
        
        if (this.currentLayout === '2-sections') {
            const section1Data = this.sections.get('section-1');
            const section2Data = this.sections.get('section-2');

            if (!section1Data || !section2Data) return;

            // Инициализируем фоны для 2-секций с базовыми размерами
            const section1OriginalLeft = section1Data.config.position.left; // 746
            const section1OriginalWidth = section1Data.config.defaultSize.width; // 528
            const section1OriginalRight = section1OriginalLeft + section1OriginalWidth; // 1274
            
            // При инициализации секции имеют стандартные размеры
            const section1RealLeft = section1OriginalLeft; // Без масштабирования
            
            this.adjustTwoSectionsBackgrounds(
                section1RealLeft,
                section1Data.currentWidth,
                section2Data.currentWidth,
                section2Data.config.position.left
            );

            console.log('Фоновые слои инициализированы для 2-секций');
            
        } else if (this.currentLayout === '3-sections') {
            const section1Data = this.sections.get('section-1');
            const section2Data = this.sections.get('section-2');
            const section3Data = this.sections.get('section-3');

            if (!section1Data || !section2Data || !section3Data) return;

            // Используем стандартные размеры и позиции из конфигурации
            const section1LeftEdge = section1Data.config.position.left;
            this.adjustBackgroundLayers(
                section1LeftEdge,
                section1Data.currentWidth,
                section2Data.currentWidth,
                section3Data.currentWidth,
                section3Data.config.position.left
            );

            console.log('Фоновые слои инициализированы для 3-секций');
            
        } else if (this.currentLayout === '4-sections') {
            const section1Data = this.sections.get('section-1');
            const section2Data = this.sections.get('section-2');
            const section3Data = this.sections.get('section-3');
            const section4Data = this.sections.get('section-4');

            if (!section1Data || !section2Data || !section3Data || !section4Data) return;

            // Используем стандартные размеры и позиции из конфигурации
            const section1LeftEdge = section1Data.config.position.left;
            this.adjustFourSectionsBackgrounds(
                section1LeftEdge,
                section1Data.currentWidth,
                section2Data.currentWidth,
                section3Data.currentWidth,
                section4Data.currentWidth,
                section3Data.config.position.left,
                section4Data.config.position.left
            );

            console.log('Фоновые слои инициализированы для 4-секций');
        } else {
            console.log('Фоновые слои для', this.currentLayout, 'будут использовать базовое позиционирование');
        }
    }

    initColorSelector() {
        // Инициализируем обработчики событий для кнопок цвета
        const colorButtons = document.querySelectorAll('.color-button');
        colorButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const newColor = e.target.dataset.color;
                this.changeColor(newColor);
            });
        });

        // Устанавливаем активную кнопку по умолчанию
        document.querySelectorAll('.color-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`[data-color="${this.currentColor}"]`).classList.add('active');

        console.log('Селектор цвета инициализирован');
    }

    pixelsToMillimeters(pixels) {
        // Специальный коэффициент ТОЛЬКО для центральной секции (section-2) в 3-секционном и 4-секционном макетах (520px = 1000мм)
        if ((this.currentLayout === '3-sections' || this.currentLayout === '4-sections') && this.activeSection === 'section-2') {
            const ratio = 1000 / 520; // 1.923
            return Math.round(pixels * ratio);
        }
        
        // Стандартный коэффициент для всех остальных секций
        const ratio = this.layouts?.settings?.pixelsToMillimeters || 1.893939;
        return Math.round(pixels * ratio);
    }

    millimetersToPixels(millimeters) {
        // Специальный коэффициент ТОЛЬКО для центральной секции (section-2) в 3-секционном и 4-секционном макетах (1000мм = 520px)
        if ((this.currentLayout === '3-sections' || this.currentLayout === '4-sections') && this.activeSection === 'section-2') {
            const ratio = 520 / 1000; // 0.52
            return Math.round(millimeters * ratio);
        }
        
        // Стандартный коэффициент для всех остальных секций
        const ratio = this.layouts?.settings?.millimetersToPixels || 0.528;
        return Math.round(millimeters * ratio);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.cabinetConstructor = new CabinetConstructor();
}); 