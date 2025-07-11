# QA Tracker

A comprehensive QA tracking application built with Next.js, featuring modern UI components and robust testing workflows.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM  
- **Backend**: Supabase (Auth + Database)
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Form Validation**: Zod
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## ✨ Features

- 🐛 Bug tracking and management
- 📊 Dashboard with comprehensive metrics
- 👥 User management with role-based access
- 🎨 Modern UI with dark/light theme support
- 📱 Responsive design
- 🔒 Authentication and authorization
- 🗄️ Real-time database with Supabase
- 📝 Type-safe API with Prisma

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Supabase account (for database and auth)

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd qa-tracker
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```

Configure your `.env.local` with:
```env
# Supabase Database
DATABASE_URL="your-supabase-database-url"
DIRECT_URL="your-supabase-direct-url"

# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

4. **Set up the database:**
```bash
# Push schema to database
npm run db:push

# Generate Prisma client
npm run db:generate
```

5. **Start the development server:**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📝 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

### Database
- `npm run db:push` - Push schema changes to database
- `npm run db:pull` - Pull schema from database
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:deploy` - Deploy migrations (production)
- `npm run db:reset` - Reset database
- `npm run db:studio` - Open Prisma Studio

### Utilities
- `npm run clean` - Clean build artifacts

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── bug-reports/   # Bug report endpoints
│   │   ├── sections/      # Section endpoints
│   │   └── users/         # User endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Base UI components (Radix + custom)
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard specific components
│   ├── issues/           # Issue/bug related components
│   ├── navbar/           # Navigation components
│   └── user-menu/        # User menu components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── prisma.ts         # Prisma client
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # General utilities
├── stores/               # Zustand state stores
├── types/                # TypeScript type definitions
└── mocks/                # Mock data for development
```

## 🗄️ Database Schema

Key models in the Prisma schema:

- **User** - User accounts with roles and profiles
- **BugReport** - Bug tracking with status, priority, and assignments
- **TestCase** - Test case definitions and documentation
- **TestResult** - Test execution results and outcomes
- **Section** - Organizational sections/departments

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `prisma/schema.prisma` - Database schema
- `.eslintrc.json` - ESLint rules

## 🚀 Deployment

This project is optimized for deployment on Vercel with Supabase:

1. **Deploy to Vercel:**
   - Connect your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

2. **Database migrations:**
   ```bash
   npm run db:deploy
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
