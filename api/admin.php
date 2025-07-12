<?php

//Ronny Abreu
// Panel para ver todos los visitantes que se han registrado


session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $database = new Database();
    $db = $database->getConnection();
    
    try {
        // Obtener todos los visitantes registrados
        $query = "SELECT id, nombre, apellido, telefono, email, sobre_mi, fecha_registro 
                  FROM visitors 
                  WHERE activo = 1 AND email != 'admin@visitorflow.com'
                  ORDER BY fecha_registro DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $visitors = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $fecha = new DateTime($row['fecha_registro']);
            $visitors[] = [
                'id' => $row['id'],
                'nombre' => $row['nombre'],
                'apellido' => $row['apellido'],
                'telefono' => $row['telefono'],
                'email' => $row['email'],
                'sobre_mi' => $row['sobre_mi'],
                'fecha_registro' => $row['fecha_registro'],
                'dia_nombre' => $fecha->format('l'),
                'dia_numero' => $fecha->format('d'),
                'mes_nombre' => $fecha->format('M'),
                'fecha_formateada' => $fecha->format('d/m/Y H:i')
            ];
        }
        
        $statsQuery = "SELECT 
                        COUNT(*) as total_visitors,
                        COUNT(CASE WHEN DATE(fecha_registro) = CURDATE() THEN 1 END) as today_visitors,
                        COUNT(CASE WHEN WEEK(fecha_registro) = WEEK(CURDATE()) THEN 1 END) as week_visitors
                       FROM visitors WHERE activo = 1 AND email != 'admin@visitorflow.com'";
        $statsStmt = $db->prepare($statsQuery);
        $statsStmt->execute();
        $stats = $statsStmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'visitors' => $visitors,
            'stats' => $stats
        ]);
        
    } catch(PDOException $exception) {
        echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $exception->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>