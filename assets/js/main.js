// JavaScript para manejar la logica del frontend, algunos modales y transiciones

document.addEventListener('DOMContentLoaded', function() {
    // Liberia AOS para animaciones
    AOS.init({
        duration: 800,
        easing: 'ease-in-out'
    });

    // Modal con animación
    setTimeout(() => {
        const modalContent = document.getElementById('modalContent');
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 100);

    const continueBtn = document.getElementById('continueBtn');
    continueBtn.addEventListener('click', handleUserTypeSelection);
});

function handleUserTypeSelection() {
    const selectedType = document.querySelector('input[name="value-radio"]:checked').value;
    
    switch(selectedType) {
        case 'visitante':
            showVisitorForm();
            break;
        case 'admin':
            showAdminDashboard();
            break;
        case 'ingresar':
            showLoginForm();
            break;
    }
    
    closeModal();
}

function showVisitorForm() {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-8" data-aos="fade-up">
            <h2 class="text-3xl font-bold text-center mb-8" style="color: #419bfc;">Registro de Visitante</h2>
            <form id="visitorForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                        <input type="text" name="nombre" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                        <input type="text" name="apellido" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                        <input type="tel" name="telefono" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Sobre mí (máximo 55 caracteres)</label>
                    <textarea name="sobre_mi" maxlength="55" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" rows="3"></textarea>
                    <p class="text-sm text-gray-500 mt-1">Caracteres restantes: <span id="charCount">55</span></p>
                </div>
                <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors transform hover:scale-105">
                    <i class="fas fa-user-plus mr-2"></i>Registrar Visita
                </button>
            </form>
        </div>
    `;
    
    setupFormHandlers();
}

function closeModal() {
    const modal = document.getElementById('authModal');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function scrollToNext() {
    document.getElementById('mainSection').scrollIntoView({
        behavior: 'smooth'
    });
}