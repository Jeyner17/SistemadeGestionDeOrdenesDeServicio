# Sistema de Gestión de Reservas de Eventos

Este proyecto implementa un sistema de gestión de reservas de eventos desarrollado como parte del examen final. Consiste en una API REST basada en microservicios que integra dos tablas relacionadas (Eventos y Reservas) en una base de datos PostgreSQL, siguiendo los principios de arquitectura limpia.

## Características

- Arquitectura de microservicios
- API REST con Express
- Base de datos PostgreSQL con Sequelize ORM
- Validación de datos con Joi
- Variables de entorno configurables

## Estructura del Proyecto

```
/src
 ├── config/               # Configuración de la base de datos
 ├── models/               # Modelos Sequelize
 ├── migrations/           # Migraciones de la BD
 ├── seeders/              # Datos de prueba
 ├── routes/               # Definición de rutas
 ├── controllers/          # Controladores de lógica
 ├── services/             # Lógica de negocio
 ├── middlewares/          # Validaciones
 ├── app.js                # Configuración Express
 ├── server.js             # Servidor principal
 ├── .env                  # Variables de entorno
```

## Modelo Entidad-Relación

- **Eventos**: Representa un evento disponible para reservar.
- **Reservas**: Representa una reserva realizada por un usuario para un evento.

![alt text](/public/assets/images/DiagramaERD.png)

### Relación:
- Un evento puede tener muchas reservas (one-to-many).
- Una reserva pertenece a un solo evento.

## Requisitos

- Node.js (v14 o superior)
- PostgreSQL
- npm o yarn

## Instalación

1. Clonar el repositorio:
   ```
   git clone https://github.com/Jeyner17/SistemadeGestionDeOrdenesDeServicio.git
   cd sistema-reservas-eventos
   ```

2. Instalar dependencias:
   ```
   npm install
   ```

3. Configurar variables de entorno:
   - Renombrar `.env.example` a `.env`
   - Configurar las credenciales de la base de datos

4. Crear la base de datos:
   ```
   npx sequelize-cli db:create
   ```

5. Ejecutar las migraciones:
   ```
   npx sequelize-cli db:migrate
   ```

6. Iniciar el servidor:
   ```
   npm start ó node server.js
   ```

## Endpoints API

**http://localhost:3000/api**

### Microservicio de Eventos (`/eventos`)

- **GET /eventos**: Obtener todos los eventos
- **GET /eventos/:id**: Obtener un evento por ID
- **POST /eventos**: Crear un nuevo evento
- **PUT /eventos/:id**: Actualizar un evento existente
- **DELETE /eventos/:id**: Eliminar un evento

### Microservicio de Reservas (`/reservas`)

- **GET /reservas**: Obtener todas las reservas
- **GET /reservas/:id**: Obtener una reserva por ID
- **GET /reservas/evento/:eventoId**: Obtener reservas por evento
- **POST /reservas**: Crear una nueva reserva
- **PUT /reservas/:id**: Actualizar una reserva existente
- **DELETE /reservas/:id**: Eliminar una reserva

## Ejemplos de uso con Postman

### Crear un evento

```
POST /eventos
Content-Type: application/json

{
  "nombre": "Conferencia de Desarrollo Web",
  "descripcion": "Una conferencia sobre las últimas tendencias en desarrollo web",
  "fecha": "2023-12-15T10:00:00.000Z",
  "capacidad": 100
}
```

### Crear una reserva

```
POST /reservas
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "numero_tickets": 2,
  "eventoId": 1
}
```

## Características implementadas

- **Validación de datos**: Cada endpoint incluye validaciones para asegurar la integridad de los datos.
- **Relaciones**: Implementación de relaciones entre Eventos y Reservas.
- **Control de capacidad**: Verificación automática para evitar sobreventa de eventos.
- **Estructura modular**: Separación clara de responsabilidades siguiendo arquitectura limpia.

## Tecnologías utilizadas

- Express.js - Framework de API
- Sequelize - ORM para PostgreSQL
- Joi - Validación de datos
- dotenv - Manejo de variables de entorno

## Capturas de pantalla

## Microservicio de eventos (/api/eventos)
# Crear un evento
![crear un evento](/public/assets/images/CrearUnEvento.png)
# Obtener la lista de eventos
![alt text](/public/assets/images/ObtenerLaListaDeEventos.png)
# Obtener un evento por ID
![alt text](/public/assets/images/ObtenerUnEventoPorID.png)
## Microservicio de reservas (/api/reservas)
# Crear una reserva asociada a un evento
![alt text](/public/assets/images/CrearUnaReservaAsociadaAUnEvento.png)
# Obtener la lista de reservas
![alt text](/public/assets/images/ObtenerLaListaDeReservas.png)
# Obtener las reservas de un evento específico
![alt text](/public/assets/images/ObtenerLasReservasDeUnEventoEspecífico.png)
