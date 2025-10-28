# Demo Blog Application

A full-stack blog application built with Node.js v22.21.0, Express.js, and MySQL 8.

## Features

- User registration and authentication
- Create, read, update, and delete blog posts
- User session management
- Responsive web design with Bootstrap
- Secure password hashing with bcryptjs

## Prerequisites

- Node.js v22.21.0 or higher
- MySQL 8.0 or higher
- npm (comes with Node.js)

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MySQL database:
   - Create a MySQL database named `blog_db` (or use your preferred name)
   - Make sure MySQL server is running

4. Configure environment variables:
   - Copy `.env` file and update the values:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=blog_db
   SESSION_SECRET=your_secret_key_here
   PORT=3000
   ```

5. Start the application:
   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Database Schema

The application automatically creates the following tables:

### Users Table
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password` (Hashed)
- `created_at`

### Posts Table
- `id` (Primary Key)
- `title`
- `content`
- `user_id` (Foreign Key to users.id)
- `created_at`
- `updated_at`

## Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in with your username and password
3. **Create Posts**: Write and publish new blog posts
4. **Edit Posts**: Modify your existing posts
5. **Delete Posts**: Remove posts you no longer want
6. **View Posts**: Browse all published posts on the homepage

## API Routes

### Authentication
- `GET /auth/login` - Login page
- `POST /auth/login` - Process login
- `GET /auth/register` - Registration page
- `POST /auth/register` - Process registration
- `POST /auth/logout` - Logout user

### Blog Posts
- `GET /` - Homepage with all posts
- `GET /post/:id` - View single post
- `GET /create` - Create new post page (requires auth)
- `POST /create` - Submit new post (requires auth)
- `GET /edit/:id` - Edit post page (requires auth & ownership)
- `POST /edit/:id` - Update post (requires auth & ownership)
- `POST /delete/:id` - Delete post (requires auth & ownership)
- `GET /my-posts` - User's posts page (requires auth)

## Security Features

- Password hashing with bcryptjs
- Session-based authentication
- CSRF protection through form submissions
- User authorization for post editing/deletion
- SQL injection prevention with parameterized queries

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL 8.0 with mysql2 driver
- **Templating**: Handlebars.js
- **Authentication**: bcryptjs, express-session
- **Frontend**: Bootstrap 5, vanilla JavaScript
- **Environment**: dotenv for configuration

## Development

To run in development mode:
```bash
npm run dev
```

## License

ISC