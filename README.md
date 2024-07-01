# PH-UNIVERSITY-SERVER

The University Management System is a robust backend application designed to streamline university operations. Key functionalities include:

- Developed a robust backend for a University Management System using Node.js, Express, TypeScript, and Mongoose.
- Implemented role-based authentication for Admin, Super Admin, Faculty, and Students.
- Ensured secure access with JWT, allowing only original users to access their data.
- Created password reset functionality with email notifications using Nodemailer.
- Integrated profile picture upload and management using Multer and Cloudinary.
- Designed and implemented a global error handling system covering Zod, Mongoose, and other errors.
- Managed multiple data write operations with transaction and rollback mechanisms.
- Developed course and faculty management systems, including department-specific course creation and faculty assignments.
- Enabled academic semester registration and comprehensive student result management.
- Implemented seasonal enrollment systems for Summer, Autumn, and Fall sessions.
- Created a user ID generation system with unique session IDs for each enrollment period.
- Built a secure and scalable server architecture with advanced search, sort, and filter capabilities for students, courses, departments, and faculty.

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- Yarn (v1.22 or higher)
- MongoDB (v4.4 or higher)

### Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/jishan1019/Car-Rental-Shop-Assignment-3.git
   cd ph-university-server
   ```

2. **Install Necessary Dependency via command**

   ```
   yarn
   ```

3. **Run Project via below command**

   ```
   yarn start:dev
   Project Running Port : http://localhost:4000
   ```

4. ** CREDENTIAL **

   ```
   user:

    {
    "email": "user@gmail.com",
    "password": "1234"
    }

   admin:

   {
    "email": "admin@gmail.com",
    "password": "1234"
   }

   ```

<!-- 6. **Manually Install Dependency**:You can manually install all the dependency via below commands.

   ```
   yarn add express mongoose cors dotenv zod argon2 cookie-parser
   yarn add -D typescript @types/node @types/express @types/cors ts-node-dev
   yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
   yarn add -D prettier eslint-config-prettier @types/cookie-parser

   ```

7. **Full Project Basic To create**: You can manually create this full project config via below commands.

   ```
   yarn init -y
   tsc --init
   npx eslint --init
   tsc
   tsc -w

   ``` -->
