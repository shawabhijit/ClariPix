# 🌟 ClariPix


<p align="center">
  <img src="https://res.cloudinary.com/dvkvr88db/image/upload/v1757960430/WhatsApp_Image_2025-09-15_at_23.49.39_43f7b4b0_ux3qna.jpg" alt="Homepage" width="1000"/>
</p>


<p align="center">
  <img src="https://skillicons.dev/icons?i=java,spring,react,tailwind,postgres" />
</p>

<p align="center">
  <b>ClariPix</b> is a full-stack <b>AI-powered image management & editing platform</b>.<br/>
  Upload, manage, and transform images with ease — from <b>background removal</b> and <b>AI generation</b> to <b>format conversion</b> and <b>upscaling</b>.
</p>


---

## 🚀 Features

ClariPix brings together **AI-powered tools** and **basic editing features** to make image editing simple yet powerful:

- 🖼 **Background Editing**
  - ✂️ Remove the background of any image instantly  
  - 🎨 Replace background using **AI prompts** (describe the scene, and ClariPix generates it)  

- 🔍 **AI-Powered Enhancements**
  - 📈 **Upscale image resolution** for sharper, high-quality results  
  - ❌ Remove unwanted **text, watermarks, or logos** with precision  

- 🎨 **Basic Editing Tools**
  - 📐 Crop, rotate, and resize images  
  - 🪄 Apply filters and effects  
  - 🖊 Add stickers, overlays, and custom text  

- 🔄 **Format & Quality Control**
  - 🔀 Convert between formats (PNG, JPG, WebP, etc.)  
  - 📏 Resize while **maintaining aspect ratio**  
  - ⚡ Control image quality with adjustable compression  

- 🤖 **AI Image Generation**
  - 🧠 Create brand-new images from **text prompts**  
  - 🏞 Generate **custom AI backgrounds** for your photos  

- 📤 **Smart Storage & Management**
  - ☁️ Upload & store images securely with **Cloudinary**  
  - 🗂 Extract metadata (dimensions, format, size) automatically  
  - 📑 Manage and organize your edited images easily  


---

## 🧰 Tech Stack

### 🖥️ Frontend:
- [React.js](https://reactjs.org/) (with [Vite](https://vitejs.dev/) + **TypeScript**)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [React Router DOM](https://reactrouter.com/en/main)
- [Motion](https://motion.dev/docs/react)
- [Clerk Authentication](https://clerk.com/)

### 🛠️ Backend:
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Clerk Authorization (Webhook)](https://dashboard.clerk.com/apps/app_31aIBGB5FtuncfvRKnjKuwyHRqk/instances/ins_31aIBGw3UGmmzs9Y1266hPouVV3/webhooks)
- [JWT Authentication](https://jwt.io/)
- [Spring cloude (Open Feign)](https://spring.io/projects/spring-cloud-openfeign)
- [ImageMagick (https://spring.io/projects/spring-cloud-openfeign)]
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

### 💳 Payment:
- [Razorpay](https://razorpay.com/)

### ☁️ Deployment:
- Frontend: **Netlify**
- Backend: **Render (Docker image)**
- Database: **Neon db**

---

## 📁 Project Structure

```
ClariPix/
│
├── backend/                        # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/claripix/  # Root package
│   │   │   │   ├── controller/     # REST controllers (API endpoints)
│   │   │   │   ├── service/        # Business logic (image handling, auth, etc.)
│   │   │   │   ├── model/          # JPA entities (User, Image, etc.)
│   │   │   │   ├── repository/     # Spring Data JPA repositories
│   │   │   │   ├── config/         # Config files (CORS, Security, etc.)
│   │   │   │   └── ClariPixApp.java# Main application class
│   │   │   └── resources/
│   │   │       ├── application.properties (or application.yml)
│   │   │       ├── static/         # Static assets if needed
│   │   │       └── templates/      # For Thymeleaf (if ever used)
│   │   └── test/java/...           # Unit & integration tests
│   │
│   ├── pom.xml                     # Maven config (or build.gradle if Gradle)
│   └── .env.example                # Example backend env file
│
├── frontend/                       # React frontend
│   ├── public/                     # Static assets (favicon, index.html)
│   ├── src/
│   │   ├── assets/                 # Images, logos, icons
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ui/                 # shadcn UI-based components
│   │   │   ├── layout/             # Navbar, Footer, Sidebar, etc.
│   │   │   └── common/             # Buttons, Inputs, Modals
│   │   ├── pages/                  # Page-level components (Home, Dashboard, Upload, Login, etc.)
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── context/                # Context API / Redux setup
│   │   ├── services/               # API calls (axios/fetch to backend)
│   │   ├── utils/                  # Helper functions
│   │   ├── App.tsx                 # Root React component
│   │   └── main.tsx / index.tsx    # Entry point
│   │
│   ├── tailwind.config.js          # TailwindCSS config
│   ├── shadcn.config.json          # shadcn UI config (if used)
│   ├── package.json
│   └── .env.example                # Example frontend env file
│
├── database/                       # SQL or migration scripts
│   └── schema.sql
│
├── docs/                           # Documentation (diagrams, extra info)
│   └── screenshots/                # Images for README
│
├── .gitignore
├── README.md                       # Main project documentation
└── LICENSE


```


---

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/shawabhijit/ClariPix.git
cd ClariPix
```

### Backend Setup (Spring Boot)
```bash
cd backend
```
### update application.properties with:
```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/claripix
SPRING_DATASOURCE_USERNAME=your_db_user
SPRING_DATASOURCE_PASSWORD=your_db_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

JWT_SECRET=your_secret_key
```

### Run backend:
```
./mvnw spring-boot:run
# or if Gradle:
./gradlew bootRun
```

### 3. Frontend Setup (React + Tailwind + shadcn)
```
cd frontend
npm install
npm start
```

### Frontend .env:
```
VITE_CLERK_PUBLISHABLE_KEY=your_published_key
VITE_BACKEND_URL=http://localhost:8081/api

VITE_CESDK_LICENSE_KEY=your_cesdk_license_key
NEXT_PUBLIC_URL_HOSTNAME=http://localhost:5173/

VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_secret_id
```
### Make sure PostgreSQL is running and credentials match your .env.
