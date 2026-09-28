<img width="1897" height="877" alt="image" src="https://github.com/user-attachments/assets/2900c95d-5ab6-45a2-8e04-f79146381177" /># 🍽️ Restaurant Management System

A full-stack restaurant management web application built to provide a modern and user-friendly platform for browsing menus, making table reservations, managing restaurant data, and interacting with customers.

## 🚀 Live Demo

🔗 **Live Website:** https://restaurant-management-system-pink-sigma.vercel.app/

## 📌 Project Overview

The **Restaurant Management System** is a full-stack web application developed using **React.js** for the frontend and **Django REST Framework** for the backend.

The application allows customers to explore restaurant menu items, view food details, make table reservations, submit reviews, and contact the restaurant. The backend provides RESTful APIs for handling restaurant data and customer requests.

The project demonstrates practical implementation of **frontend development, REST APIs, database integration, responsive UI design, and full-stack application architecture**.

## ✨ Features

### 👨‍🍳 Customer Features

* 🏠 Attractive restaurant home page
* 🍴 Browse restaurant menu
* 🔎 View menu item details
* 📅 Table reservation system
* ⭐ Customer reviews and ratings
* 📞 Contact form
* 📱 Responsive design for mobile, tablet, and desktop
* 🖼️ Food images and detailed descriptions

### 🔐 Backend Features

* RESTful API architecture
* Menu item management
* Reservation management
* Customer contact management
* Review management
* Database integration using Django ORM
* Django Admin Panel for data management
* API testing using Postman

### 👨‍💼 Admin Features

* Manage menu items
* Manage reservations
* Manage customer queries
* Manage customer reviews
* Add, update, and delete restaurant data through Django Admin

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript (ES6+)
* HTML5
* CSS3
* Tailwind CSS
* Vite

### Backend

* Python
* Django
* Django REST Framework

### Database

* SQLite

### Tools

* Git
* GitHub
* VS Code
* Postman
* Vercel
* render

## 🏗️ Project Architecture

```text
Restaurant Management System
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── manage.py
│   ├── api/
|   ├── config/
│   ├── db.sqlite3
│   ├── requirements.txt
│   └── ...
│
└── README.md
```

## 🔄 How It Works

```text
User
  ↓
React Frontend
  ↓
REST API
  ↓
Django REST Framework
  ↓
Django ORM
  ↓
SQLite Database
```

The React frontend communicates with the Django REST API to retrieve and submit restaurant-related data.

## 📋 Main Modules

### 1. Home Module

Provides an overview of the restaurant along with featured food items and restaurant information.

### 2. Menu Module

Displays restaurant menu items with:

* Food name
* Category
* Description
* Price
* Food image

### 3. Reservation Module

Customers can submit table reservation details such as:

* Customer name
* Phone number
* Reservation date
* Reservation time
* Number of guests

### 4. Review Module

Customers can submit ratings and reviews for the restaurant.

### 5. Contact Module

Customers can submit their queries through the contact form.

### 6. Admin Module

Restaurant administrators can manage menu items, reservations, reviews, and customer queries using the Django Admin Panel.

## ⚙️ Installation & Setup

### Prerequisites

Make sure the following are installed:

* Python 3.x
* Node.js
* npm
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/chandan9546/restaurant-management-system.git
cd restaurant-management-system
```

## 🐍 Backend Setup

Go to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

Create an admin user:

```bash
python manage.py createsuperuser
```

Start the Django server:

```bash
python manage.py runserver
```

Backend will run at:

```text
http://127.0.0.1:8000/
```

## ⚛️ Frontend Setup

Open a new terminal and go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend will normally run at:

```text
http://localhost:5173/
```

## 🔌 API

The frontend communicates with the Django REST API to perform operations such as:

```text
GET     /api/menu/
POST    /api/reservations/
POST    /api/contact/
GET     /api/reviews/
POST    /api/reviews/
```

> API endpoints may vary depending on the current backend implementation.

## 📸 Screenshots

<img width="1897" height="877" alt="image" src="https://github.com/user-attachments/assets/8f443b0c-ea85-412c-9d44-7d9183c8ce6f" />


```text
Home Page
Menu Page
Reservation Page
Review Section
Contact Page
Admin Panel
```

Example:

```markdown
![Home Page](screenshots/home.png)
```

## 🎯 Learning Outcomes

Through this project, I gained practical experience in:

* Building full-stack web applications
* React component development
* REST API development
* Django REST Framework
* Django ORM
* Database integration
* CRUD operations
* API testing with Postman
* Responsive web design
* Git and GitHub
* Frontend-backend integration
* Deployment of web applications

## 🔮 Future Improvements

Possible future enhancements include:

* 💳 Online payment integration
* 📊 Real-time analytics dashboard
* 🤖 AI chatbot
* 📧 Email confirmation for reservations
* 📱 SMS notifications
* 📱 QR-code based digital menu
* 💬 Live chat functionality
* 🔐 User authentication and authorization
* 🛒 Online food ordering and cart
* 📦 Order tracking

## 👨‍💻 Developer

**Chandan Kumar**

BCA Graduate | Python Full Stack Developer

### Skills

Python • Django • Django REST Framework • React.js • JavaScript • HTML • CSS • Tailwind CSS • SQL • Git • GitHub

## 📄 License

This project is created for educational and portfolio purposes.

---

⭐ If you find this project useful, consider giving it a star!
