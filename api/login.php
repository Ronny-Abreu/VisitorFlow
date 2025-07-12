<?php

//API para autenticación usuarios existentes
//Ronny Abreu

session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->getConnection();
    
    $email = trim($_POST['email']);
    
    // Validación básica
    if (empty($email)) {
        echo json_encode(['success' => false, 'message' => 'Email es requerido']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email inválido']);
        exit;
    }
    
    try {
        // Buscar usuario por email
        $query = "SELECT id, nombre, apellido, telefono, email, sobre_mi, fecha_registro FROM visitors WHERE email = :email AND activo = 1";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Establecer sesión
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['nombre'] . ' ' . $user['apellido'];
            $_SESSION['user_type'] = 'visitor';
            $_SESSION['user_email'] = $user['email'];
            
            echo json_encode([
                'success' => true,
                'message' => 'Inicio de sesión exitoso',
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['nombre'] . ' ' . $user['apellido'],
                    'email' => $user['email'],
                    'phone' => $user['telefono'],
                    'about' => $user['sobre_mi'],
                    'registered' => $user['fecha_registro']
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Email no encontrado en nuestros registros']);
        }
        
    } catch(PDOException $exception) {
        echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $exception->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>