# Profile Booster Backend

This is the NestJS backend for the **Profile Booster** application. It handles user authentication, CV parsing, job description analysis, and ATS-optimized CV generation via the Gemini API, alongside HTML-to-PDF rendering.

## Technology Stack
- **Framework**: NestJS (Node.js 20+)
- **Database**: PostgreSQL (via Prisma ORM)
- **Queues**: BullMQ + Redis for async job processing
- **AI Integration**: `@google/generative-ai` (Gemini Pro)
- **Validation**: Zod & class-validator
- **Security**: JWT Authentication, Helmet, CORS

---

## 🚀 Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- [Docker](https://www.docker.com/) & Docker Compose (for Postgres & Redis)

### 2. Install Dependencies
```bash
cd Backend
npm install
```

### 3. Environment Variables
Copy the `.env.example` file to create your local `.env`:
```bash
cp .env.example .env
```
Ensure you fill in the keys:
- `JWT_ACCESS_SECRET` & `JWT_REFRESH_SECRET`
- `GEMINI_API_KEY` (Your Google Gemini Developer Key)
- `GEMINI_MODEL` (Defaults to `gemini-3.1-pro-preview`)
- `DATABASE_URL` (Match your Postgres configuration)

### 4. Start Infrastructure (Docker)
Start the PostgreSQL and Redis containers:
```bash
docker-compose up -d
```

### 5. Database Setup (Prisma)
Run the initial Prisma migrations to create the tables:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

*(Optional) Explore the database using Prisma Studio:*
```bash
npx prisma studio
```

### 6. Run the Application
```bash
# Development mode with hot-reload
npm run start:dev

# Production build
npm run build
npm run start:prod
```
The server will be available at `http://localhost:3001`.

---

## 🔌 Connecting to the Frontend

### Frontend Configuration
Inside the `/Frontend` directory, a configuration file `/Frontend/config.js` exports the base backend URL:
```javascript
export const API_BASE_URL = "http://localhost:3001";
```

### Mini-Checklist para el Frontend Local:
1.  **Auth & Tokens**: Modifica tus scripts de login/registro (ej. en `aplicacion.js` o scripts de login) para usar `fetch(API_BASE_URL + '/auth/login', ...)` y guardar el token en `localStorage.setItem('accessToken', result.accessToken)`.
2.  **Bearer Headers**: Todas las llamadas protegidas deben incluir:
    ```javascript
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    }
    ```
3.  **Generación Async**: El botón "Generar CV" ahora debe llamar a `POST /applications/:id/generate`. Luego implementar un `setInterval` llamando a `GET /applications/:id/results` hasta que retorne `{ status: 'READY' }`.
4.  **PDF/Templates**: Si vas a subir el PDF Base explícitamente, usa un `FormData` y mándalo a `POST /profile/upload-cv-pdf`.

---

## 📡 Key API Endpoints

### Auth
- `POST /auth/register` - Create user
- `POST /auth/login` - Login, returns JWT

### Profile
- `GET /profile` - Retrieve profile
- `POST /profile/upload-cv-pdf` - Extract text from existing CV PDF (multipart/form-data)

### Applications
- `POST /applications` - Create tracking wrapper for a new Job Description
- `POST /applications/:id/generate` - **(Async)** Queues job to optimize CV using Gemini. Returns `{ jobId }`
- `GET /applications/:id/results` - Polling endpoint: `PENDING` | `READY` | `FAILED`

### Documents & ATS
- `GET /applications/:id/cv/export-pdf` - Triggers PDF render of the CV
- `GET /applications/:id/ats` - Fetch ATS Scoring breakdown
