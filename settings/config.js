const port = process.env.port || 3001;
const title = 'EmployHaven';

const cookieOptions = {
  secure: false, // Solo se enviarán cookies sobre HTTPS en producción
  httpOnly: true, // Las cookies solo serán accesibles desde el servidor
  maxAge: 1000 * 60 * 60, // 1 hora
  sameSite: 'lax',
  // Otros atributos opcionales:
  // domain: 'example.com', // Especifica el dominio para el que se enviarán las cookies
  // path: '/', // Especifica la ruta para la que se enviarán las cookies
  // maxAge: 3600000, // Tiempo de vida de la cookie en milisegundos
  // sameSite: 'strict', // Controla las restricciones de envío de cookies para evitar ataques de CSRF
};

export default { port, title, cookieOptions };
