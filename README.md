# 📊 Student Performance System

A professional academic management tool designed to streamline student evaluation, grading, and performance tracking using a modern web-stack and containerized deployment.

---

### 📺 Project Presentation
[![Watch the Demo](https://img.shields.io/badge/YouTube-Watch%20Demo%20on%20YouTube-red?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/Og_I6VPN6b0)

---

### 🚀 Core Features
*   **Unified Dashboard**: Intuitive interface for batch student entry.
*   **Dynamic Grading Engine**: Automated subject-wise grade assignment (S, A, B, C, D, E, F).
*   **Performance Analytics**: Automated CGPA calculation and distribution rankings.
*   **Secure Archives**: Searchable database to retrieve records by unique Roll Numbers.

### 🛠️ Technology Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Infrastructure** | Docker, Kubernetes (Minikube) |

---

### 📦 Deployment & Setup

Ensure you have **Minikube** and **Docker Desktop** running before starting:

1. **Deploy Kubernetes Cluster:**
   ```powershell
   kubectl apply -f k8s/
   ```
2. **Access the Application:**
   ```powershell
   minikube service study-planner-service
   ```

---

*Developed for Academic Performance Evaluation.*
