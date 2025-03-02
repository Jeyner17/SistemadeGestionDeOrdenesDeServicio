#  Sistema de Gestión de Órdenes de Servicio

Este proyecto es una API REST desarrollada con Node.js, PostgreSQL y Sequelize, diseñada para gestionar órdenes de servicio en una empresa de reparaciones. Implementa una arquitectura basada en capas, relaciones en la base de datos y validaciones.

#  Modelo Entidad-Relación (ERD)
 - Cliente (id, nombre, email, teléfono)
 - Orden de Servicio (id, fecha, estado, clienteId (FK))
 - Técnico (id, nombre, especialidad)
 - Orden_Técnico (ordenId (FK), técnicoId (FK)) (Relación muchos a muchos: una orden puede ser  atendida por varios técnicos y un técnico puede atender varias órdenes)

![Diagrama Entidad-Relación](Diagrama-ERD.png)

#  Características del Proyecto
 - Arquitectura modular con separación en capas (Routes, Controllers, Services, Models).
 - Uso de Sequelize como ORM para gestionar la base de datos.
 - Relaciones correctamente definidas (uno a muchos y muchos a muchos).
 - Implementación de migraciones y validaciones con Joi.
 - Endpoints funcionales documentados.
 - Pruebas exitosas con Postman.

📂 Estructura del Proyecto

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

# 🗄️ Configuración de la Base de Datos

1. Instalación de Dependencias

npm install express sequelize pg pg-hstore dotenv cors joi
npm install --save-dev nodemon sequelize-cli

2. Configuración del Archivo .env

DB_NAME=gestion_servicio
DB_USER=usuario
DB_PASSWORD=contraseña
DB_HOST=localhost
DB_DIALECT=postgres

3. Inicialización de Sequelize

npx sequelize-cli init

4. Generación de Modelos y Migraciones

npx sequelize-cli model:generate --name Cliente --attributes nombre:string,email:string,telefono:string
npx sequelize-cli model:generate --name OrdenServicio --attributes fecha:date,estado:string,clienteId:integer
npx sequelize-cli model:generate --name Tecnico --attributes nombre:string,especialidad:string
npx sequelize-cli model:generate --name OrdenTecnico --attributes ordenId:integer,tecnicoId:integer

5. Ejecutar las Migraciones

npx sequelize-cli db:migrate

🔗 Relaciones en la Base de Datos

Cliente.hasMany(OrdenServicio, { foreignKey: 'clienteId' });
OrdenServicio.belongsTo(Cliente, { foreignKey: 'clienteId' });
OrdenServicio.belongsToMany(Tecnico, { through: 'OrdenTecnico', foreignKey: 'ordenId' });
Tecnico.belongsToMany(OrdenServicio, { through: 'OrdenTecnico', foreignKey: 'tecnicoId' });


# 📌 Endpoints Disponibles

## Cliente
- **Listar todos los clientes**
  - Método: `GET`
  - Endpoint: `/api/clientes`
  - Descripción: Obtener todos los clientes registrados

- **Obtener un cliente por ID**
  - Método: `GET`
  - Endpoint: `/api/clientes/:id`
  - Descripción: Obtener información detallada de un cliente específico

- **Crear un nuevo cliente**
  - Método: `POST`
  - Endpoint: `/api/clientes`
  - Descripción: Registrar un nuevo cliente
  - Datos requeridos:
    ```json
    {
      "nombre": "Jeyner Manzaba",
      "email": "jomanzaba@espe.edu.ec",
      "telefono": "0969696969"
    }
    ```

- **Actualizar un cliente**
  - Método: `PUT`
  - Endpoint: `/api/clientes/:id`
  - Descripción: Modificar datos de un cliente existente
  - Datos requeridos: Similar a crear cliente

- **Eliminar un cliente**
  - Método: `DELETE`
  - Endpoint: `/api/clientes/:id`
  - Descripción: Eliminar un cliente del sistema

- **Obtener órdenes de un cliente**
  - Método: `GET`
  - Endpoint: `/api/clientes/:id/ordenes`
  - Descripción: Listar todas las órdenes de servicio asociadas a un cliente

## Orden de Servicio
- **Listar todas las órdenes**
  - Método: `GET`
  - Endpoint: `/api/ordenes`
  - Descripción: Obtener todas las órdenes de servicio

- **Obtener una orden por ID**
  - Método: `GET`
  - Endpoint: `/api/ordenes/:id`
  - Descripción: Obtener información detallada de una orden específica

- **Crear una nueva orden**
  - Método: `POST`
  - Endpoint: `/api/ordenes`
  - Descripción: Registrar una nueva orden de servicio
  - Datos requeridos:
    ```json
    {
      "fecha": "2025-03-02",
      "estado": "Pendiente",
      "clienteId": 1,
      "descripcion": "Reparación de equipo"
    }
    ```

- **Actualizar una orden**
  - Método: `PUT`
  - Endpoint: `/api/ordenes/:id`
  - Descripción: Modificar datos de una orden existente
  - Datos requeridos: Similar a crear orden

- **Eliminar una orden**
  - Método: `DELETE`
  - Endpoint: `/api/ordenes/:id`
  - Descripción: Eliminar una orden del sistema

- **Obtener técnicos asignados a una orden**
  - Método: `GET`
  - Endpoint: `/api/ordenes/:id/tecnicos`
  - Descripción: Listar todos los técnicos asignados a una orden

- **Asignar técnico a una orden**
  - Método: `POST`
  - Endpoint: `/api/ordenes/:ordenId/tecnicos/:tecnicoId`
  - Descripción: Asignar un técnico a una orden específica

- **Remover técnico de una orden**
  - Método: `DELETE`
  - Endpoint: `/api/ordenes/:ordenId/tecnicos/:tecnicoId`
  - Descripción: Eliminar la asignación de un técnico a una orden

- **Filtrar órdenes por estado**
  - Método: `GET`
  - Endpoint: `/api/ordenes/estado/:estado`
  - Descripción: Obtener todas las órdenes que tengan un estado específico (Pendiente, En Proceso, Completada, Cancelada)

## Técnico
- **Listar todos los técnicos**
  - Método: `GET`
  - Endpoint: `/api/tecnicos`
  - Descripción: Obtener todos los técnicos registrados

- **Obtener un técnico por ID**
  - Método: `GET`
  - Endpoint: `/api/tecnicos/:id`
  - Descripción: Obtener información detallada de un técnico específico

- **Crear un nuevo técnico**
  - Método: `POST`
  - Endpoint: `/api/tecnicos`
  - Descripción: Registrar un nuevo técnico
  - Datos requeridos:
    ```json
    {
      "nombre": "Luis Torres",
      "especialidad": "Electrónica"
    }
    ```

- **Actualizar un técnico**
  - Método: `PUT`
  - Endpoint: `/api/tecnicos/:id`
  - Descripción: Modificar datos de un técnico existente
  - Datos requeridos: Similar a crear técnico

- **Eliminar un técnico**
  - Método: `DELETE`
  - Endpoint: `/api/tecnicos/:id`
  - Descripción: Eliminar un técnico del sistema

- **Obtener órdenes asignadas a un técnico**
  - Método: `GET`
  - Endpoint: `/api/tecnicos/:id/ordenes`
  - Descripción: Listar todas las órdenes de servicio asignadas a un técnico

- **Filtrar técnicos por especialidad**
  - Método: `GET`
  - Endpoint: `/api/tecnicos/especialidad/:especialidad`
  - Descripción: Obtener todos los técnicos de una especialidad específica

## Asignaciones (Orden-Técnico)
- **Listar todas las asignaciones**
  - Método: `GET`
  - Endpoint: `/api/asignaciones`
  - Descripción: Obtener todas las asignaciones de técnicos a órdenes

- **Obtener una asignación específica**
  - Método: `GET`
  - Endpoint: `/api/asignaciones/:ordenId/:tecnicoId`
  - Descripción: Obtener detalles de una asignación específica

- **Crear una nueva asignación**
  - Método: `POST`
  - Endpoint: `/api/asignaciones`
  - Descripción: Crear una nueva asignación de técnico a una orden
  - Datos requeridos:
    ```json
    {
      "ordenId": 1,
      "tecnicoId": 2
    }
    ```

- **Eliminar una asignación**
  - Método: `DELETE`
  - Endpoint: `/api/asignaciones/:ordenId/:tecnicoId`
  - Descripción: Eliminar una asignación existente

#  ✅ Validaciones con Joi
Ejemplo de validación en middlewares/validaciones.js:

const Joi = require('joi');

const validarCliente = (req, res, next) => {
    const schema = Joi.object({
        nombre: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        telefono: Joi.string().min(7).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    next();
};

🚀 Ejecución del Proyecto

1. Iniciar el Servidor

npm run dev

2. Probar en Postman

Ejemplo de solicitud GET:

GET http://localhost:3000/api/clientes

Ejemplo de solicitud POST:

{
  "nombre": "Jeyner Manzaba",
  "email": "jomanzaba@espe.edu.ec",
  "telefono": "0969696969"
}

🔎 Pruebas y Resultados

Se probaron los endpoints en Postman y funcionan correctamente.

Se validaron datos erróneos y los middlewares rechazaron entradas inválidas.

Las migraciones y relaciones se ejecutaron sin errores.

📢 Conclusión

Este sistema implementa una API REST modular y organizada, con buenas prácticas de arquitectura y validaciones. La correcta definición de relaciones en la base de datos asegura la integridad de los datos y la eficiencia en la gestión de órdenes de servicio.

