# Reservas de Canchas - Universidad Politécnica Salesiana (Campus Sur)

## Descripción
Esta es una aplicación web desarrollada con **MEAN Stack** (MongoDB, Express, Angular, Node.js) para gestionar las **reservas de una cancha** en la Universidad Politécnica Salesiana, campus sur.

### Funcionalidades principales
- Permite a los usuarios reservar la cancha mediante un formulario.
- Muestra los horarios ocupados en una vista semanal.
- Almacena las reservas en una base de datos MongoDB.
- Backend estructurado con el patrón **Modelo-Vista-Controlador (MVC)**.
- Utiliza **Bootstrap** para mejorar la apariencia del frontend.

---

## Instalación y Configuración del Backend
### 1️⃣ Clonar el repositorio
```bash
cd backend
```

### 2️⃣ Instalar dependencias

Instalar [Node](https://nodejs.org/es/download)

```bash
npm install -g npm@latest
npm install express mongoose cors
```
### 3️⃣ Instalar `nodemon` globalmente (para reinicio automático del servidor)
```bash
npm install -g nodemon
```

### 4️⃣ Configurar `package.json`
Abre el archivo `package.json` y asegúrate de que en la sección `scripts` tenga:
```json
"scripts": {
  "start": "node",
  "dev": "nodemon index.js"
}
```
```

### 5️⃣ Iniciar el servidor
#### Opción 1: Usando `nodemon`
```bash
nodemon index.js
```
#### Opción 2: Usando `npm run dev`
```bash
npm run dev
```

📌 **Si todo está bien configurado, se debe ver en la terminal:**
```
✅ MongoDB conectado a la base canchasUPS
🚀 Servidor corriendo en http://localhost:3773
```
✍️ **Nota:** Próximamente se agregará la documentación para el frontend con Angular y Bootstrap.

