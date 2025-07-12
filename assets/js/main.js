//Ronny Abreu

class VisitorFlowApp {
    constructor() {
        this.currentUser = null;
        this.userType = null;
        this.originalUserData = {};
        this.init();
    }

    init() {
        // AOS para animaciones
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });

        this.setupEventListeners();        
        this.showInitialModal();        
        this.createBackgroundParticles();
    }

    setupEventListeners() {
        // Event listener para el botón continuar del modal inicial
        document.getElementById('continueBtn').addEventListener('click', () => {
            this.handleUserTypeSelection();
        });

        // Event listener para scroll suave
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Event listener para redimensionar ventana
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    showInitialModal() {
        setTimeout(() => {
            const modalContent = document.getElementById('modalContent');
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 300);
    }

    handleUserTypeSelection() {
        const selectedType = document.querySelector('input[name="value-radio"]:checked').value;
        
        switch(selectedType) {
            case 'visitante':
                this.userType = 'visitor';
                this.showVisitorForm();
                break;
            case 'admin':
                this.userType = 'admin';
                this.showAdminDashboard();
                break;
            case 'ingresar':
                this.showLoginForm();
                break;
        }
        
        this.closeModal();
    }

    showVisitorForm() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto" data-aos="fade-up">
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <i class="fas fa-user-plus text-2xl" style="color: #419bfc;"></i>
                    </div>
                    <h2 class="text-3xl font-bold mb-2" style="color: #419bfc;">Registro de Visitante</h2>
                    <p class="text-gray-600">Complete sus datos para registrar su visita</p>
                </div>
                
                <form id="visitorForm" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-user mr-2"></i>Nombre *
                            </label>
                            <input type="text" name="nombre" required 
                                   class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                   placeholder="Ingrese su nombre">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-user mr-2"></i>Apellido *
                            </label>
                            <input type="text" name="apellido" required 
                                   class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                   placeholder="Ingrese su apellido">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-phone mr-2"></i>Teléfono *
                            </label>
                            <input type="tel" name="telefono" required 
                                   class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                   placeholder="Ingrese su teléfono">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-envelope mr-2"></i>Email *
                            </label>
                            <input type="email" name="email" required 
                                   class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                   placeholder="Ingrese su email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-comment mr-2"></i>Sobre mí (máximo 55 caracteres) *
                        </label>
                        <textarea name="sobre_mi" maxlength="55" required 
                                  class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                                  rows="3" placeholder="Cuéntenos brevemente sobre usted"></textarea>
                        <div class="flex justify-between items-center mt-2">
                            <p class="text-sm text-gray-500">Caracteres restantes: <span id="charCount" class="font-semibold">55</span></p>
                            <div class="text-xs text-gray-400">* Campos obligatorios</div>
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-4 pt-4">
                        <button type="submit" 
                                class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                            <i class="fas fa-user-plus mr-2"></i>Registrar Visita
                        </button>
                        <button type="button" onclick="location.reload()" 
                                class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                            <i class="fas fa-times mr-2"></i>Cancelar
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        this.setupFormHandlers();
    }

    setupFormHandlers() {
        // Contador de caracteres para "sobre_mi"
        const sobreMiTextarea = document.querySelector('textarea[name="sobre_mi"]');
        const charCount = document.getElementById('charCount');
        
        if (sobreMiTextarea && charCount) {
            sobreMiTextarea.addEventListener('input', (e) => {
                const remaining = 55 - e.target.value.length;
                charCount.textContent = remaining;
                charCount.style.color = remaining < 10 ? '#ef4444' : '#6b7280';
            });
        }

        // Manejar envío del formulario
        const visitorForm = document.getElementById('visitorForm');
        if (visitorForm) {
            visitorForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleVisitorRegistration(e.target);
            });
        }

        // Efectos de focus en inputs
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', (e) => {
                e.target.parentElement.classList.remove('focused');
            });
        });
    }

    async handleVisitorRegistration(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Mostrar loading
        this.showLoading(submitBtn, 'Registrando...');
        
        try {
            const response = await fetch('api/register.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.currentUser = result.user;
                this.showSuccessMessage('¡Registro exitoso! Bienvenido a VisitorFlow');
                this.updateNavbar();
                this.showUserProfile();
            } else {
                this.showErrorMessage(result.message);
            }
        } catch (error) {
            this.showErrorMessage('Error de conexión. Intente nuevamente.');
        } finally {
            this.hideLoading(submitBtn, '<i class="fas fa-user-plus mr-2"></i>Registrar Visita');
        }
    }

    showLoginForm() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="flex items-center justify-center min-h-96">
                <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl font-mono" data-aos="zoom-in">
                    <div class="text-center mb-6">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <i class="fas fa-sign-in-alt text-2xl text-green-600"></i>
                        </div>
                        <label class="block text-gray-700 text-lg font-bold mb-2">¡HAS VUELTO!</label>
                        <p class="text-gray-600 text-sm">Ingresa tu email para continuar</p>
                    </div>
                    
                    <form id="loginForm">
                        <input
                            class="text-sm custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                            placeholder="Ingresa email registrado"
                            type="email"
                            name="email"
                            id="loginEmail"
                            required
                        />
                        <button type="submit" 
                                class="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                            <i class="fas fa-sign-in-alt mr-2"></i>Ingresar
                        </button>
                        <button type="button" onclick="location.reload()" 
                                class="w-full mt-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                            Volver
                        </button>
                    </form>
                </div>
            </div>
        `;

        // Manejar envío del formulario de login
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(e.target);
        });
    }

    async handleLogin(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        this.showLoading(submitBtn, 'Verificando...');
        
        try {
            const response = await fetch('api/login.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.currentUser = result.user;
                this.userType = 'visitor';
                this.showSuccessMessage(`¡Bienvenido de nuevo, ${result.user.name}!`);
                this.updateNavbar();
                this.showUserProfile();
            } else {
                this.showErrorMessage(result.message);
            }
        } catch (error) {
            this.showErrorMessage('Error de conexión. Intente nuevamente.');
        } finally {
            this.hideLoading(submitBtn, '<i class="fas fa-sign-in-alt mr-2"></i>Ingresar');
        }
    }

    async showAdminDashboard() {
        this.userType = 'admin';
        this.updateNavbar();
        
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="space-y-8">
                <div class="text-center" data-aos="fade-up">
                    <div class="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
                        <i class="fas fa-users-cog text-3xl text-purple-600"></i>
                    </div>
                    <h2 class="text-4xl font-bold mb-2" style="color: #419bfc;">Panel Administrativo</h2>
                    <p class="text-gray-600">Gestión de visitantes registrados</p>
                </div>
                
                <div id="adminStats" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="text-center">
                        <div class="spinner mx-auto"></div>
                        <p class="mt-2 text-gray-500">Cargando estadísticas...</p>
                    </div>
                </div>
                
                <div id="visitorsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="col-span-full text-center">
                        <div class="spinner mx-auto"></div>
                        <p class="mt-4 text-gray-500">Cargando visitantes...</p>
                    </div>
                </div>
            </div>
        `;
        
        await this.loadAdminData();
    }

    async loadAdminData() {
        try {
            const response = await fetch('api/admin.php');
            const result = await response.json();
            
            if (result.success) {
                this.renderAdminStats(result.stats);
                this.renderVisitorCards(result.visitors);
                
                // Animar las cards después de cargar
                setTimeout(() => {
                    animationManager.animateCards();
                }, 100);
            } else {
                this.showErrorMessage('Error al cargar datos administrativos');
            }
        } catch (error) {
            this.showErrorMessage('Error de conexión al cargar datos');
        }
    }

    renderAdminStats(stats) {
        const statsContainer = document.getElementById('adminStats');
        statsContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6 text-center" data-aos="fade-up" data-aos-delay="100">
                <div class="text-3xl font-bold text-blue-600 mb-2">${stats.total_visitors}</div>
                <div class="text-gray-600">Total Visitantes</div>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-6 text-center" data-aos="fade-up" data-aos-delay="200">
                <div class="text-3xl font-bold text-green-600 mb-2">${stats.today_visitors}</div>
                <div class="text-gray-600">Hoy</div>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-6 text-center" data-aos="fade-up" data-aos-delay="300">
                <div class="text-3xl font-bold text-purple-600 mb-2">${stats.week_visitors}</div>
                <div class="text-gray-600">Esta Semana</div>
            </div>
        `;
    }

    renderVisitorCards(visitors) {
        const visitorsGrid = document.getElementById('visitorsGrid');
        
        if (visitors.length === 0) {
            visitorsGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-users text-6xl text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-500">No hay visitantes registrados</h3>
                </div>
            `;
            return;
        }

        visitorsGrid.innerHTML = visitors.map((visitor, index) => `
            <div class="parent" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="card">
                    <div class="content-box">
                        <span class="card-title">${visitor.nombre} ${visitor.apellido}</span>
                        <p class="card-content">${visitor.sobre_mi}</p>
                        <span class="see-more" onclick="app.shareVisitor('${visitor.email}')">
                            <i class="fas fa-share mr-1"></i>Compartir
                        </span>
                    </div>
                    <div class="date-box">
                        <span class="month">${visitor.dia_nombre.substring(0, 3)}</span>
                        <span class="date">${visitor.dia_numero}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    shareVisitor(email) {
        if (navigator.share) {
            navigator.share({
                title: 'Contacto VisitorFlow',
                text: `Contacto registrado en VisitorFlow`,
                url: `mailto:${email}`
            });
        } else {
            window.open(`mailto:${email}`, '_blank');
        }
    }

    updateNavbar() {
        const userMenu = document.getElementById('userMenu');
        
        if (this.currentUser || this.userType === 'admin') {
            const userName = this.userType === 'admin' ? 'Administrador' : this.currentUser.name;
            userMenu.innerHTML = `
                <div class="relative">
                    <button id="userMenuBtn" class="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
                        <i class="fas fa-user-circle text-xl"></i>
                        <span class="font-semibold">${userName}</span>
                        <i class="fas fa-chevron-down text-sm"></i>
                    </button>
                    <div id="dropdownMenu" class="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        ${this.userType !== 'admin' ? `
                            <a href="#" id="updateDataBtn" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                                <i class="fas fa-edit mr-2"></i>Actualizar datos
                            </a>
                        ` : ''}
                        <a href="#" id="logoutBtn" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                            <i class="fas fa-sign-out-alt mr-2"></i>Cerrar sesión
                        </a>
                    </div>
                </div>
            `;
            
            userMenu.classList.remove('hidden');
            this.setupUserMenuEvents();
        }
    }

    setupUserMenuEvents() {
        const userMenuBtn = document.getElementById('userMenuBtn');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const updateDataBtn = document.getElementById('updateDataBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
        });

        // Actualizar datos
        if (updateDataBtn) {
            updateDataBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showUpdateForm();
            });
        }

        // Cerrar sesión
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogout();
        });
    }

    showUpdateForm() {
        // Primero obtener los datos actuales del usuario
        this.loadCurrentUserData().then(() => {
            const contentArea = document.getElementById('contentArea');
            contentArea.innerHTML = `
                <div class="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto" data-aos="fade-up">
                    <div class="text-center mb-8">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                            <i class="fas fa-user-edit text-2xl text-orange-600"></i>
                        </div>
                        <h2 class="text-3xl font-bold mb-2 text-orange-600">Actualizar Datos</h2>
                        <p class="text-gray-600">Modifique los campos que desee actualizar</p>
                    </div>
                    
                    <form id="updateForm" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="form-group">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-user mr-2"></i>Nombre *
                                </label>
                                <input type="text" name="nombre" required 
                                       value="${this.originalUserData.nombre || ''}"
                                       class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300">
                            </div>
                            <div class="form-group">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-user mr-2"></i>Apellido *
                                </label>
                                <input type="text" name="apellido" required 
                                       value="${this.originalUserData.apellido || ''}"
                                       class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300">
                            </div>
                            <div class="form-group">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-phone mr-2"></i>Teléfono *
                                </label>
                                <input type="tel" name="telefono" required 
                                       value="${this.originalUserData.telefono || ''}"
                                       class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300">
                            </div>
                            <div class="form-group">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-envelope mr-2"></i>Email *
                                </label>
                                <input type="email" name="email" required 
                                       value="${this.originalUserData.email || ''}"
                                       class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-comment mr-2"></i>Sobre mí (máximo 55 caracteres) *
                            </label>
                            <textarea name="sobre_mi" maxlength="55" required 
                                      class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
                                      rows="3">${this.originalUserData.sobre_mi || ''}</textarea>
                            <div class="flex justify-between items-center mt-2">
                                <p class="text-sm text-gray-500">Caracteres restantes: <span id="charCount" class="font-semibold">55</span></p>
                            </div>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-4 pt-4">
                            <button type="submit" 
                                    class="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                <i class="fas fa-save mr-2"></i>Guardar Cambios
                            </button>
                            <button type="button" onclick="app.showUserProfile()" 
                                    class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                                <i class="fas fa-times mr-2"></i>Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            `;
            
            this.setupUpdateFormHandlers();
        });
    }

    async loadCurrentUserData() {
        if (this.currentUser) {
            const nameParts = this.currentUser.name.split(' ');
            this.originalUserData = {
                nombre: nameParts[0] || '',
                apellido: nameParts.slice(1).join(' ') || '',
                telefono: this.currentUser.phone || '',
                email: this.currentUser.email || '',
                sobre_mi: this.currentUser.about || ''
            };
        }
    }

    setupUpdateFormHandlers() {
        // Manejar inputs que se limpian al hacer focus
        document.querySelectorAll('.form-input').forEach(input => {
            const originalValue = input.value;
            
            input.addEventListener('focus', () => {
                if (input.dataset.cleared !== 'true') {
                    input.dataset.originalValue = input.value;
                    input.value = '';
                    input.dataset.cleared = 'true';
                }
            });
            
            input.addEventListener('blur', () => {
                if (input.value.trim() === '' && input.dataset.originalValue) {
                    input.value = input.dataset.originalValue;
                    input.dataset.cleared = 'false';
                }
            });
        });

        // Contador de caracteres
        const sobreMiTextarea = document.querySelector('textarea[name="sobre_mi"]');
        const charCount = document.getElementById('charCount');
        
        if (sobreMiTextarea && charCount) {
            // Actualizar contador inicial
            const remaining = 55 - sobreMiTextarea.value.length;
            charCount.textContent = remaining;
            
            sobreMiTextarea.addEventListener('input', (e) => {
                const remaining = 55 - e.target.value.length;
                charCount.textContent = remaining;
                charCount.style.color = remaining < 10 ? '#ef4444' : '#6b7280';
            });
        }

        document.getElementById('updateForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUpdateUser(e.target);
        });
    }

    async handleUpdateUser(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        this.showLoading(submitBtn, 'Actualizando...');
        
        try {
            const response = await fetch('api/update.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.currentUser = result.user;
                this.showSuccessMessage('¡Datos actualizados correctamente!');
                this.updateNavbar();
                this.showUserProfile();
            } else {
                this.showErrorMessage(result.message);
            }
        } catch (error) {
            this.showErrorMessage('Error de conexión. Intente nuevamente.');
        } finally {
            this.hideLoading(submitBtn, '<i class="fas fa-save mr-2"></i>Guardar Cambios');
        }
    }

    showUserProfile() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="bg-white rounded-lg shadow-2xl p-8 max-w-2xl mx-auto" data-aos="fade-up">
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <i class="fas fa-user-check text-3xl text-green-600"></i>
                    </div>
                    <h2 class="text-3xl font-bold mb-2 text-green-600">¡Bienvenido!</h2>
                    <p class="text-gray-600">Su registro ha sido completado exitosamente</p>
                </div>
                
                <div class="space-y-4">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <h3 class="font-semibold text-gray-700 mb-2">Información Registrada:</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div><strong>Nombre:</strong> ${this.currentUser.name}</div>
                            <div><strong>Email:</strong> ${this.currentUser.email}</div>
                            ${this.currentUser.phone ? `<div><strong>Teléfono:</strong> ${this.currentUser.phone}</div>` : ''}
                            ${this.currentUser.about ? `<div class="md:col-span-2"><strong>Sobre mí:</strong> ${this.currentUser.about}</div>` : ''}
                        </div>
                    </div>
                    
                    <div class="text-center pt-4">
                        <p class="text-gray-600 mb-4">¿Necesita realizar algún cambio en su información?</p>
                        <button onclick="app.showUpdateForm()" 
                                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                            <i class="fas fa-edit mr-2"></i>Actualizar Datos
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    async handleLogout() {
        try {
            const response = await fetch('api/logout.php', {
                method: 'POST'
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.currentUser = null;
                this.userType = null;
                this.originalUserData = {};
                
                // Mostrar mensaje de despedida con efecto typewriter
                animationManager.showGoodbyeMessage(() => {
                    location.reload();
                });
            }
        } catch (error) {
            this.showErrorMessage('Error al cerrar sesión');
        }
    }

    // Métodos de utilidad
    showLoading(button, text) {
        button.disabled = true;
        button.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>${text}`;
    }

    hideLoading(button, originalText) {
        button.disabled = false;
        button.innerHTML = originalText;
    }

    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    createBackgroundParticles() {
        const heroSection = document.querySelector('section');
        if (heroSection) {
            animationManager.createParticles(heroSection);
        }
    }

    handleScroll() {
        // Efecto parallax suave en el hero
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    handleResize() {
        if (window.innerWidth < 768) {
            // Ajustes para móvil
            document.querySelectorAll('.card').forEach(card => {
                card.style.transform = 'none';
            });
        }
    }

    closeModal() {
        const modal = document.getElementById('authModal');
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Función global
function scrollToNext() {
    document.getElementById('mainSection').scrollIntoView({
        behavior: 'smooth'
    });
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.app = new VisitorFlowApp();
});