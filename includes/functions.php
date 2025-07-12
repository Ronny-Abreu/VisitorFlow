<?php
// Ronny Abreu
// // Funciones reutilizables para validación y utilidades

// Función para validar email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Función para limpiar datos de entrada
function cleanInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function jsonResponse($success, $message, $data = null) {
    $response = [
        'success' => $success,
        'message' => $message
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Función para verificar sesión activa
function checkSession() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    
    return isset($_SESSION['user_id']);
}

// Función para formatear fecha en español
function formatDateSpanish($date) {
    $months = [
        1 => 'Ene', 2 => 'Feb', 3 => 'Mar', 4 => 'Abr',
        5 => 'May', 6 => 'Jun', 7 => 'Jul', 8 => 'Ago',
        9 => 'Sep', 10 => 'Oct', 11 => 'Nov', 12 => 'Dic'
    ];
    
    $days = [
        'Monday' => 'Lun', 'Tuesday' => 'Mar', 'Wednesday' => 'Mié',
        'Thursday' => 'Jue', 'Friday' => 'Vie', 'Saturday' => 'Sáb', 'Sunday' => 'Dom'
    ];
    
    $dateObj = new DateTime($date);
    $dayName = $days[$dateObj->format('l')];
    $monthName = $months[(int)$dateObj->format('n')];
    
    return [
        'day_name' => $dayName,
        'day_number' => $dateObj->format('d'),
        'month_name' => $monthName,
        'formatted' => $dateObj->format('d/m/Y H:i')
    ];
}

// Función para log de errores
function logError($message, $file = 'error.log') {
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] $message" . PHP_EOL;
    file_put_contents($file, $logMessage, FILE_APPEND | LOCK_EX);
}
?>