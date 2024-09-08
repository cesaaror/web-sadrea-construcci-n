
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recopila los datos del formulario
    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $mensaje = $_POST["message"]; // Cambiado a "message"

    // Dirección de correo electrónico a la que enviar el formulario
    $destinatario = "managerjs64@gmail.com";

    // Asunto del correo
    $asunto = "Nuevo mensaje desde el formulario de contacto";

    // Cuerpo del correo
    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Email: $email\n";
    $cuerpo .= "Mensaje:\n$mensaje";

    // Configuración del servidor SMTP
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'managerjs64@gmail.com'; // Reemplaza con tu dirección de correo
        $mail->Password   = 'Danaelsa2'; // Reemplaza con tu contraseña de Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Configuración de destinatario, asunto, cuerpo y remitente
        $mail->setFrom($email, $nombre);
        $mail->addAddress($destinatario);
        $mail->Subject = $asunto;
        $mail->Body    = $cuerpo;

        // Envío del correo
        $mail->send();
        echo json_encode(["success" => true, "message" => "Mensaje enviado con éxito"]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Error al enviar el mensaje: {$mail->ErrorInfo}"]);
    }
} else {
    // Si no es una solicitud POST, redirige a la página principal u otra página de tu elección
    header("Location: index.html");
    exit();
}
// Intenta enviar el correo
if ($mail->send()) {
    echo json_encode(["success" => true, "message" => "Mensaje enviado con éxito"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al enviar el mensaje: {$mail->ErrorInfo}"]);
}
?>