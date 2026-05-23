# MercadoTech - Gestión de Inventario 🚀

Aplicación web para gestionar productos tecnológicos utilizando JavaScript Vanilla, Vite, Tailwind CSS y JSON Server.

---

## 📌 Características

✅ Listar productos  
✅ Agregar productos  
✅ Editar productos  
✅ Eliminar productos  
✅ Estadísticas dinámicas  
✅ Consumo de API REST  

---

## 🛠️ Tecnologías

- HTML5
- JavaScript ES6+
- Tailwind CSS
- Vite
- JSON Server

---

## 📂 Estructura del Proyecto

```bash
MERCADOTECH/
│
├── api/
│   ├── database.json
│   ├── package.json
│   └── node_modules/
│
├── client/
│   ├── src/
│   │   ├── services/
│   │   │   └── products.service.js
│   │   │
│   │   ├── styles/
│   │   │   └── globals.css
│   │   │
│   │   ├── utils/
│   │   │   └── alert.js
│   │   │
│   │   ├── ui/
│   │   │   ├── estadisticas.js
│   │   │   └── renderProductos.js
│   │   │
│   │   └── main.js
│   │
│   ├── index.html
│   ├── login.html
│   ├── vite.config.ts
│   └── package.json
│
└── README.md
```

---

## ⚙️ Instalación

### 1️⃣ Clonar repositorio

```bash
git clone https://github.com/tu-usuario/mercadotech.git
```

---

### 2️⃣ Instalar dependencias Frontend

```bash
cd client
npm install
```

---

### 3️⃣ Ejecutar Vite

```bash
npm run dev
```

---

## ⚡ Configurar JSON Server

Entrar a la carpeta API:

```bash
cd ../api
```

Instalar json-server:

```bash
npm install json-server
```

---

## 🗂️ Ejemplo database.json

```json
{
  "productos": [
    {
      "id": 1,
      "nombre": "Laptop Lenovo",
      "precio": 3500,
      "stock": 8,
      "descripcion": "Laptop para desarrollo"
    }
  ]
}
```

---

## ▶️ Ejecutar API

```bash
npx json-server --watch database.json --port 3000
```

Servidor:

```bash
http://localhost:3000/productos
```

---

## 📚 Funcionalidades CRUD

### 📋 Obtener productos

```js
GET /productos
```

### ➕ Crear producto

```js
POST /productos
```

### ✏️ Editar producto

```js
PUT /productos/:id
```

### ❌ Eliminar producto

```js
DELETE /productos/:id
```

---

## 👩‍💻 Autor

Desarrollado por Marielsa Parra 💙