# Artelier — Fullstack Art E-Commerce Platform

Artelier is a fullstack art e-commerce platform designed to showcase and sell paintings through a clean and user-friendly interface. The application provides a public gallery for browsing artwork and an admin dashboard for managing painting collections.

The project uses a decoupled architecture, separating the frontend application from the backend REST API.

## Features

### Customer
- Browse available paintings.
- View painting information and prices.
- Search paintings by title or artist.
- Filter paintings by category.
- Navigate through paginated results.
- Add paintings to the shopping cart.
- Register and log in to an account.

### Administrator
- Secure admin authentication.
- Create new painting records.
- Edit existing painting information.
- Delete paintings.
- Upload painting images.
- Manage painting categories, prices, and stock.

## Tech Stack

### Frontend
- React
- Vite
- React Router
- TanStack React Query
- Axios
- CSS

### Backend
- PHP 8.4
- Laravel 13
- Laravel Sanctum
- MySQL
- RESTful API

## Project Structure

```text
artelier/
├── backend/
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/
│   ├── routes/
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   └── services/
│   └── ...
│
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites
- PHP 8.4 or higher
- Composer
- Node.js and npm
- MySQL

### 1. Clone the Repository

```bash
git clone https://github.com/BLUE3BLACK2/artelier.git
cd artelier
```

### 2. Backend Setup

```bash
cd backend
composer install
```

Create your environment file:

```bash
copy .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure your database connection in the `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=artelier_db
DB_USERNAME=root
DB_PASSWORD=
```

Run database migrations:

```bash
php artisan migrate
```

Create the public storage link:

```bash
php artisan storage:link
```

Start the Laravel development server:

```bash
php artisan serve
```

The backend API will be available at:

`http://127.0.0.1:8000`

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at:

`http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Authenticate a user |
| POST | `/api/logout` | Log out the authenticated user |
| GET | `/api/paintings` | Retrieve painting collections |
| GET | `/api/paintings/{id}` | Retrieve painting details |
| POST | `/api/paintings` | Create a painting (Admin) |
| PUT | `/api/paintings/{id}` | Update a painting (Admin) |
| PATCH | `/api/paintings/{id}` | Partially update a painting (Admin) |
| DELETE | `/api/paintings/{id}` | Delete a painting (Admin) |

Protected endpoints require a valid Laravel Sanctum Bearer token. Painting creation, update, and deletion require administrator privileges.

## Architecture

Artelier follows a decoupled client-server architecture:

- **Frontend:** Handles the user interface and communicates with the backend through HTTP requests.
- **Backend:** Provides RESTful API endpoints, authentication, authorization, and business logic.
- **Database:** Stores user accounts and painting information.

The frontend and backend operate independently and communicate through the REST API.

## License

This project was developed for educational purposes.