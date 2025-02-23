# **🚀 Project Overview**  

This project is a powerful **React TypeScript frontend** and a **Java Spring Boot backend** designed to manage the **Alten E-commerce Website**, featuring secure JWT authentication.  

---

## **🎨 Front-end**  

The frontend is built using **React, TypeScript, Vite, and Ant Design** to provide a smooth and responsive user experience.  

### **📌 Setup Instructions**  
1. **Install dependencies:**  
   ```sh
   npm install
   ```
2. **Start the development server:**  
   ```sh
   npm run dev
   ```
3. **⚠️ Critical Step: Configure the backend URL!**  
   This step is crucial to ensure the frontend can communicate with the backend.  
   - Open the `.env` file and set your backend URL:  
     ```env
     VITE_BACKEND_URL=your_backend_url
     ```
   **Example:**  
     ```env
     VITE_BACKEND_URL=http://localhost:8080
     ```
   ✅ **Without this, the app won’t work properly!**

---

## **🛠️ Back-end**  

The backend is powered by **Java Spring Boot**, ensuring a scalable and robust architecture.  

### **✨ Key Features**  
- 🔑 **JWT Authentication & Authorization** – Secure access with role-based control.  
- 📖 **API Documentation** – Test and explore APIs effortlessly with Swagger UI.  
- 🗄️ **H2 Database** – In-memory database for seamless development & testing.  

### **🔗 Endpoints**  
- **Swagger API Documentation:** [your_backend_url/swagger-ui/index.html](your_backend_url/swagger-ui/index.html)  
- **H2 Database Console:** [your_backend_url/h2-console/login.jsp](your_backend_url/h2-console/login.jsp)  

#### **🛠 Example URLs:**
  - 🔍 [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)  
  - 🗄️ [http://localhost:8080/h2-console/login.jsp](http://localhost:8080/h2-console/login.jsp)  


---

