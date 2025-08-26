# Safe Tours and Travels Admin Panel

## Default Admin Credentials
- **Username:** admin
- **Password:** admin123

## Setup Instructions

1. Run the application with `npm run dev`
2. Create the default admin user by running `npm run create-admin`
3. Access the admin panel at `/admin` or `/admin/lead`
4. Login with the default credentials
5. Change the password immediately after first login

## Admin Panel Features

### Login Page
- Secure authentication with username/password
- Automatic redirect to login page when accessing protected routes without a valid token

### Dashboard
- Total leads count
- Recent leads display
- Filter leads by type (Airport Transfer, Luxury Rental, etc.)

### Leads Management
- View all leads in a table format
- Update lead status (New, Contacted, Converted, Closed)
- Delete leads
- View detailed lead information

### Security
- All admin routes are protected by middleware
- Automatic redirect to login page when accessing protected routes without a valid token
