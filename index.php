<?php
session_start();
// Pagina principal
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisitorFlow - Sistema de Registro</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    
    <!-- Modal de Autenticación -->
    <div id="authModal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg shadow-2xl transform transition-all duration-300 scale-95 opacity-0" id="modalContent">
            <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Bienvenido a VisitorFlow</h2>
            <div class="radio-input">
                <label class="label">
                    <input type="radio" id="value-1" checked name="value-radio" value="visitante">
                    <p class="text">Visitante</p>
                </label>
                <label class="label">
                    <input type="radio" id="value-2" name="value-radio" value="admin">
                    <p class="text">Admin</p>
                </label>
                <label class="label">
                    <input type="radio" id="value-3" name="value-radio" value="ingresar">
                    <p class="text">Ingresar</p>
                </label>
            </div>
            <button id="continueBtn" class="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
                Continuar
            </button>
        </div>
    </div>

    <!-- Navbar -->
    <nav class="bg-white shadow-lg fixed w-full top-0 z-40" style="background-color: #419bfc;">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold text-white">VisitorFlow</h1>
                </div>
                <div id="userMenu" class="hidden">
                    <!-- Menú de usuario se carga dinámicamente -->
                </div>
            </div>
        </div>
    </nav>

    <!-- Sección Hero -->
    <section class="min-h-screen flex items-center justify-center pt-16" style="background: linear-gradient(135deg, #419bfc 0%, #64b5f6 100%);">
        <div class="text-center text-white" data-aos="fade-up">
            <h1 class="text-5xl font-bold mb-6">Bienvenido a VisitorFlow</h1>
            <p class="text-xl mb-8">Sistema profesional de registro de visitantes</p>
            <div class="animate-bounce">
                <i class="fas fa-chevron-down text-3xl cursor-pointer" onclick="scrollToNext()"></i>
            </div>
        </div>
    </section>

    <!-- Sección Principal -->
    <section id="mainSection" class="min-h-screen py-16">
        <div class="max-w-4xl mx-auto px-4">
            <div id="contentArea">
                <!-- El contenido se carga dinámicamente según el tipo de usuario -->
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2024 VisitorFlow. Desarrollado por Ronny Abreu</p>
        </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>