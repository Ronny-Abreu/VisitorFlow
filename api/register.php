<?php

// API PARA REGISTRO DE VISITANTES
// Ronny Abreu

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->getConnection();
    
    //Obtener todos los datos del POST
    $nombre = trim($_POST['nombre']);
    $apellido = trim($_POST['apellido']);
    $telefono = trim($_POST['telefono']);
    $email = trim($_POST['email']);
    $sobre_mi = trim($_POST['sobre_mi']);
    
    if (empty($nombre) || empty($apellido) || empty($telefono) || empty($email) || empty($sobre_mi)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
        exit;
    }

    // Parametro de caracteres para el sobre mi
    if (strlen($sobre_mi) > 55) {
        echo json_encode(['success' => false, 'message' => 'El campo "Sobre mí" no puede exceder 55 caracteres']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email inválido']);
        exit;
    }
    
    try {

        // validacion email
        $checkQuery = "SELECT id FROM visitors WHERE email = :email";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bindParam(':email', $email);
        $checkStmt->execute();
        
        if ($checkStmt->rowCount() > 0) {
            echo json_encode(['success' => false, 'message' => 'Este email ya está registrado']);
            exit;
        }
        
        //NUEVO VISITANTE
        $query = "INSERT INTO visitors (nombre, apellido, telefono, email, sobre_mi) VALUES (:nombre, :apellido, :telefono, :email, :sobre_mi)";
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellido', $apellido);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':sobre_mi', $sobre_mi);
        
        if ($stmt->execute()) {
            session_start();
            $_SESSION['user_id'] = $db->lastInsertId();
            $_SESSION['user_name'] = $nombre . ' ' . $apellido;
            $_SESSION['user_type'] = 'visitor';
            
            echo json_encode([
                'success' => true, 
                'message' => 'Registro exitoso',
                'user' => [
                    'name' => $nombre . ' ' . $apellido,
                    'email' => $email
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al registrar visitante']);
        }
        
    } catch(PDOException $exception) {
        echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $exception->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>