# Social Media Backend Platform

A production-grade backend for a modern social media platform built with Node.js, Express, TypeScript, and MongoDB. Features comprehensive authentication (email/OAuth), user management, cloud storage integration, and real-time notifications.

**Assignment:** Social Media Project (Part Four) | ASSIGNMENT 15  
**Author:** Mohamed Mahmoud Abo Al Magd  
**Group:** Node_C45_Mon&Thurs_9:00pm (Online)

---

## 🎯 Core Features

### Authentication & Authorization
- **Multi-Provider Support**
  - Traditional email/password authentication with bcrypt hashing
  - Google OAuth 2.0 integration via Google Auth Library
  - Email verification with OTP flow and time-based rate limiting
  - Secure password reset functionality
- **JWT Token Management**
  - Dual-token system (access & refresh tokens)
  - Automatic token rotation
  - Secure logout with token invalidation
  - Role-based access control (RBAC)

### User Management
- **Profile Operations**
  - User registration and account management
  - Profile viewing with authentication
  - Soft delete and restore capabilities
  - Phone number encryption for privacy
- **Session Management**
  - JWT-based secure sessions
  - Token refresh without re-authentication
  - Multi-device session tracking with FCM support
  - Login alerts and security notifications

### Cloud Storage & Media Handling
- **Flexible Storage Options**
  - AWS S3 with presigned URLs for secure uploads
  - Cloudinary integration for image optimization
  - File streaming and download with content-type detection
  - Configurable TTL for presigned URLs
- **Media Management**
  - Profile image and cover image uploads
  - Automatic content-type detection
  - Direct download with optional attachment headers

### Real-Time Notifications
- **Multi-Channel Support**
  - Firebase Cloud Messaging (FCM) for push notifications
  - MongoDB notification persistence
  - Email notifications via Nodemailer
  - In-app notification system

### Data Protection
- **Soft Delete Pattern**
  - Non-destructive user deletion
  - Automatic paranoid filtering (excludes soft-deleted records)
  - Restore functionality for deleted accounts
  - Force-delete capability for permanent removal
- **Data Encryption**
  - AES encryption for sensitive fields (phone numbers)
  - Secure password hashing with bcrypt
  - Token signature verification

### Posts & Comments (Extensible)
- Foundation modules for social features
- Ready for extension with feed algorithms

---

## 🏗️ Architecture

### Modular Design
```
src/
├── main.ts                 # Application entry point
├── app.bootstrap.ts        # Express & service initialization
├── modules/                # Feature-based modules
│   ├── auth/              # Authentication logic
│   ├── user/              # User management
│   └── post/              # Post functionality (extensible)
├── middleware/            # Request processing
├── common/                # Shared utilities
├── config/                # Environment configuration
└── DB/                    # Database & repositories
```

### Key Design Patterns
- **Repository Pattern** – Abstracted data access layer for testability
- **Service Layer** – Business logic separation from routes
- **Middleware Pipeline** – Authentication → Authorization → Validation → Handler
- **Factory Services** – Lazy-loaded cloud storage adapters (S3, Cloudinary)
- **Exception Handling** – Centralized error responses with standard formats
- **Data Transfer Objects (DTOs)** – Schema validation at API boundaries

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js (ES2023, CommonJS) |
| **Language** | TypeScript (strict mode, isolated modules) |
| **Web Framework** | Express.js v5 |
| **Database** | MongoDB with Mongoose ODM |
| **Cache & Queue** | Redis |
| **Authentication** | JWT, bcrypt, Google Auth Library, OAuth2Client |
| **Cloud Storage** | AWS S3 SDK, Cloudinary |
| **Notifications** | Firebase Admin SDK |
| **File Processing** | Multer (file uploads), Streamifier |
| **Validation** | Zod schema validation |
| **Email** | Nodemailer |
| **Utilities** | dotenv, cross-env, concurrently |

---

## 📋 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/signup` | Register with email/password |
| `POST` | `/auth/login` | Login with credentials |
| `PATCH` | `/auth/confirm-email` | Verify email with OTP |
| `PATCH` | `/auth/resend-confirm-email` | Resend verification email |
| `POST` | `/auth/signup/gmail` | Sign up via Google OAuth |
| `POST` | `/auth/login/gmail` | Login via Google OAuth |
| `POST` | `/auth/forget-password` | Request password reset OTP |
| `POST` | `/auth/reset-password` | Reset password with OTP |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/user` | Fetch authenticated user profile |
| `PATCH` | `/user/profile-image` | Get presigned URL for profile image |
| `PATCH` | `/user/profile-cover-images` | Upload cover images (max 2) |
| `POST` | `/user/rotate-token` | Refresh access token |
| `POST` | `/user/logout` | Logout and invalidate tokens |
| `DELETE` | `/user` | Soft delete user account |

### Cloud Storage & Media
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/uploads/*path` | Download/stream file |
| `GET` | `/presigned/*path` | Generate presigned URL |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ (ES2023 support)
- **MongoDB** (local or Atlas)
- **Redis** (local or cloud provider)
- **AWS S3 Bucket** or **Cloudinary** account
- **Firebase Project** (for notifications)
- **Google OAuth Credentials** (for Gmail authentication)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd assignment-15
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   # Copy example to development config
   cp .env.example .env.development
   ```

3. **Set required environment variables:**
   ```env
   # Core
   PORT=3000
   NODE_ENV=development
   
   # Database & Cache
   DB_URI=mongodb://localhost:27017/social-media
   REDIS_URL=redis://localhost:6379
   
   # Authentication & Security
   SALT_ROUND=12
   ENC_IV_LENGTH=16
   ENC_KEY=your-32-char-encryption-key
   
   USER_ACCESS_TOKEN_SIGNATURE=your-access-secret
   USER_REFRESH_TOKEN_SIGNATURE=your-refresh-secret
   SYSTEM_ACCESS_TOKEN_SIGNATURE=your-system-access-secret
   SYSTEM_REFRESH_TOKEN_SIGNATURE=your-system-refresh-secret
   
   ACCESS_TOKEN_EXPIRES_IN=1800
   REFRESH_TOKEN_EXPIRES_IN=31536000
   
   # Email Service
   APP_EMAIL=your-email@gmail.com
   APP_EMAIL_PASSWORD=your-app-password
   APPLICATION_NAME=Social Media
   
   # Cloud Storage (AWS S3)
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_KEY=your-secret-key
   AWS_BUCKET_NAME=your-bucket-name
   AWS_EXPIRES_IN=3600
   
   # Cloud Storage (Cloudinary)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   CLOUDINARY_EXPIRES_IN=120
   
   # Google OAuth
   CLIENT_IDS=your-google-client-id-1,your-google-client-id-2
   
   # CORS & Social Links
   ORIGINS=http://localhost:3000,https://yourdomain.com
   FACEBOOK=https://facebook.com/yourpage
   INSTAGRAM=https://instagram.com/yourpage
   TWITTER=https://twitter.com/yourpage
   ```

4. **Start development server:**
   ```bash
   npm run start:dev
   ```
   The app will compile TypeScript, watch for changes, and restart the server automatically.

5. **For production:**
   ```bash
   npm run start:prod
   ```

### Verify Installation
Once the server starts, you should see:
```
Server Is Running On Port <<<3000>>>
application bootstrapped successfully ⚡
```

The middleware testing phase (in `app.bootstrap.ts`) will:
- Create a test user
- Perform CRUD operations
- Test soft delete/restore functionality
- Validate repository pattern middleware

---

## 📁 Project Structure

### Core Application
- **`src/main.ts`** – Entry point, initializes bootstrap
- **`src/app.bootstrap.ts`** – Express app setup, service initialization, routing configuration

### Modules (Feature-Based)
- **`src/modules/auth/`**
  - `auth.controller.ts` – Route handlers
  - `auth.service.ts` – Business logic
  - `auth.dto.ts` – Input/output schemas
  - `auth.validation.ts` – Request validation rules
  - `auth.entity.ts` – TypeScript interfaces

- **`src/modules/user/`**
  - `user.controller.ts` – Profile route handlers
  - `user.service.ts` – Profile management logic
  - `user.authorization.ts` – RBAC definitions

- **`src/modules/post/`** – Foundation for post features

### Middleware Layer
- **`authentication.middleware.ts`** – JWT verification, token extraction
- **`authorization.middleware.ts`** – Role-based permission checking
- **`validation.middleware.ts`** – Zod schema validation
- **`error.middleware.ts`** – Centralized error handling

### Common Utilities
- **`src/common/services/`**
  - `token.service.ts` – JWT token generation & rotation
  - `cloudinary.service.ts` – Cloudinary integration
  - `redis.service.ts` – Redis caching & OTP management
  - `notification.service.ts` – Firebase notifications

- **`src/common/utils/`**
  - `security.ts` – Bcrypt hashing & AES encryption
  - `email.ts` – Email templates & sending
  - `otp.ts` – OTP generation & validation
  - `multer.ts` – File upload configuration

- **`src/common/exceptions/`** – Custom exception classes
- **`src/common/enums/`** – Type-safe enum definitions
- **`src/common/interfaces/`** – Shared TypeScript interfaces
- **`src/common/response/`** – Standardized response formatting

### Database & Configuration
- **`src/DB/connection.db.ts`** – MongoDB connection
- **`src/DB/models/`** – Mongoose schemas
- **`src/DB/repository/`** – Repository pattern implementations
- **`src/config/config.ts`** – Environment configuration loader

---

## 🔐 Security Features

### Authentication & Authorization
- **Strict JWT Validation** – Token signature, expiry, and issuer verification
- **Role-Based Access Control** – Endpoint-level permission enforcement
- **Password Security** – Bcrypt hashing with configurable salt rounds
- **Phone Number Encryption** – AES encryption for PII
- **Email Verification** – OTP-based confirmation flow

### Rate Limiting & Protection
- **OTP Rate Limiting** – 3 attempts per hour with exponential backoff
- **Brute Force Protection** – Account lockdown after failed attempts
- **CORS Configuration** – Whitelist-based cross-origin requests
- **Soft Delete Protection** – Paranoid filtering by default

### Data Integrity
- **Middleware Chain** – Authentication → Authorization → Validation
- **Input Sanitization** – Zod schema validation on all endpoints
- **Error Obfuscation** – Generic messages for security failures
- **Automatic Cleanup** – OTP expiry, token invalidation on logout

---

## 🧪 Testing & Middleware Validation

The application includes built-in middleware testing in `app.bootstrap.ts`:

```typescript
// Validates:
1. User creation with password hashing
2. User updates with encryption
3. Soft deletion with paranoid filtering
4. Restore functionality
5. Force deletion bypass
```

To see detailed logs, uncomment the `console.log` statements in `app.bootstrap.ts`.

---

## 🔄 Workflow Examples

### User Registration & Email Verification
```
1. POST /auth/signup → Create user (unverified)
2. OTP sent to email
3. PATCH /auth/confirm-email → Verify with OTP
4. User can now login
```

### Google OAuth Flow
```
1. Frontend sends idToken from Google
2. POST /auth/signup/gmail → Verify token → Create/Login user
3. Return access & refresh tokens
```

### Profile Image Upload
```
1. PATCH /user/profile-image → Get presigned URL from S3
2. Frontend uploads directly to S3 using presigned URL
3. Backend updates user record with image URL
```

### Token Refresh
```
1. POST /user/rotate-token (with refresh token) → Get new access token
2. Old access token becomes invalid
3. Refresh token can be rotated again
```

---

## 📊 Database Models

### User Schema
- Personal info (firstName, lastName, email, phone)
- Credentials (password, provider, confirmEmail)
- Profile media (profilePicture, coverImages)
- Soft delete fields (deletedAt, restoredAt)
- Security (changeCredentialsTime, lastLogin)

### Notification Schema
- Title, body, and metadata
- Sender and recipient references
- Creation timestamp

### Additional Models
- Posts (extensible)
- Comments (extensible)
- Relationships (followers, following)

---

## 🚦 Running Different Environments

### Development
```bash
npm run start:dev
```
- TypeScript watch mode
- Nodemon auto-restart
- Console logging enabled

### Production
```bash
npm run start:prod
```
- Optimized TypeScript compilation
- Production flag enabled
- Environment `.env.production` used

---

## 📝 Configuration Management

Environment-specific configs are loaded from:
- `.env.development` – Development settings
- `.env.production` – Production settings

Key features:
- Multi-signature token system (user vs. system tokens)
- Configurable token expiry times
- Flexible cloud storage provider selection
- Optional features (CORS origins, social links)

---

## 🐳 Deployment Considerations

### Infrastructure Requirements
- **MongoDB** – Document database
- **Redis** – Session & OTP storage
- **S3 Bucket or Cloudinary** – Media storage
- **Firebase Project** – Push notifications
- **SMTP Server** – Email delivery
- **Node.js Server** – Application runtime

### Environment Setup
1. Use production `.env.production` file
2. Set strong token signatures
3. Configure database backups
4. Enable Redis persistence
5. Set up S3 lifecycle policies
6. Monitor application logs

### Performance Optimization
- Redis caching for session tokens
- Presigned URLs for direct S3 uploads
- Cloudinary image optimization
- Soft delete instead of hard delete (archival strategy)
- Connection pooling for MongoDB

---

## 🤝 Contributing

This is an assignment project. For contributions:
1. Create a feature branch
2. Follow the modular structure
3. Add validation for new endpoints
4. Update this README

---

## 📄 License

ISC License

---

## 👤 Author

**Mohamed Mahmoud Abo Al Magd**  
Node.js Development | ASSIGNMENT 15  
Group: Node_C45_Mon&Thurs_9:00pm (Online)

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB/Mongoose Docs](https://mongoosejs.com/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [AWS S3 SDK](https://docs.aws.amazon.com/sdk-for-javascript/)
- [Google Auth Library](https://github.com/googleapis/google-auth-library-nodejs)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

---

> **Status:** Production-ready backend with comprehensive authentication, cloud storage, and notification systems.
