<?php

//Ronny Abreu

session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

// Verificar que el usuario esté autenticado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->getConnection();
    
    $user_id = $_SESSION['user_id'];
    $nombre = trim($_POST['nombre']);
    $apellido = trim($_POST['apellido']);
    $telefono = trim($_POST['telefono']);
    $email = trim($_POST['email']);
    $sobre_mi = trim($_POST['sobre_mi']);
    
    // Validaciones
    if (empty($nombre) || empty($apellido) || empty($telefono) || empty($email) || empty($sobre_mi)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
        exit;
    }
    
    if (strlen($sobre_mi) > 55) {
        echo json_encode(['success' => false, 'message' => 'El campo "Sobre mí" no puede exceder 55 caracteres']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email inválido']);
        exit;
    }
    
    try {
        // Verificar si el email ya existe (excluyendo el usuario actual)
        $checkQuery = "SELECT id FROM visitors WHERE email = :email AND id != :user_id";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bindParam(':email', $email);
        $checkStmt->bindParam(':user_id', $user_id);
        $checkStmt->execute();
        
        if ($checkStmt->rowCount() > 0) {
            echo json_encode(['success' => false, 'message' => 'Este email ya está siendo usado por otro usuario']);
            exit;
        }
        
        // Actualizar datos del usuario
        $query = "UPDATE visitors SET nombre = :nombre, apellido = :apellido, telefono = :telefono, email = :email, sobre_mi = :sobre_mi WHERE id = :user_id";
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellido', $apellido);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':sobre_mi', $sobre_mi);
        $stmt->bindParam(':user_id', $user_id);
        
        if ($stmt->execute()) {
            // Actualizar datos de sesión
            $_SESSION['user_name'] = $nombre . ' ' . $apellido;
            $_SESSION['user_email'] = $email;
            
            echo json_encode([
                'success' => true,
                'message' => 'Datos actualizados correctamente',
                'user' => [
                    'name' => $nombre . ' ' . $apellido,
                    'email' => $email,
                    'phone' => $telefono,
                    'about' => $sobre_mi
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al actualizar los datos']);
        }
        
    } catch(PDOException $exception) {
        echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $exception->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>