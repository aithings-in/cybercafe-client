# CyberCafe

A professional Next.js application built with App Router, TypeScript, and Tailwind CSS. This project follows modern best practices with a scalable folder structure.

## 🚀 Features

- **Next.js 16** with Pages Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Professional folder structure** for scalability
- **Pages Router** for file-based routing
- **API routes** for backend functionality
- **Middleware** for request handling
- **Custom hooks** and utilities
- **Component library** structure

## 📁 Project Structure

```
cybercafe/
├── src/                          # Source code directory
│   ├── pages/                    # Next.js Pages Router directory
│   │   ├── _app.tsx             # App component (layout wrapper)
│   │   ├── index.tsx            # Home page (/)
│   │   ├── about.tsx            # About page (/about)
│   │   ├── contact.tsx          # Contact page (/contact)
│   │   └── api/                 # API routes
│   │       └── health.ts        # Health check endpoint
│   ├── components/              # All components
│   │   ├── header.tsx           # Header component
│   │   ├── footer.tsx           # Footer component
│   │   ├── hero-section.tsx     # Hero section with carousel
│   │   ├── content-section.tsx # Content wrapper
│   │   └── button.tsx          # Button UI component
│   ├── styles/                  # Global styles
│   │   └── globals.css         # Global CSS with animations
│   ├── lib/                     # Utility libraries
│   │   └── utils.ts            # Common utilities (cn, formatDate, etc.)
│   ├── hooks/                   # Custom React hooks
│   │   └── use-debounce.ts
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                   # Utility functions
│   │   └── validation.ts
│   ├── config/                  # Configuration files
│   │   └── site.ts             # Site configuration
│   └── constants/               # Application constants
│       └── index.ts
├── public/                       # Static assets
├── middleware.ts                 # Next.js middleware (must be at root)
└── .env.example                  # Environment variables example
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cybercafe
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Styling

This project uses Tailwind CSS v4 with a custom theme configuration. The design system includes:

- Custom color variables for light/dark mode
- Typography system with Geist fonts
- Responsive design utilities
- Component variants and sizes

## 📦 Key Dependencies

- **next** - React framework
- **react** - UI library
- **tailwindcss** - CSS framework
- **typescript** - Type safety
- **clsx** - Conditional class names
- **tailwind-merge** - Merge Tailwind classes

## 🏗️ Architecture

### Pages Router
The `pages` directory uses file-based routing. Each file in `src/pages/` becomes a route:
- `index.tsx` → `/`
- `about.tsx` → `/about`
- `contact.tsx` → `/contact`
- `api/health.ts` → `/api/health`

### Components
- All components are in `src/components/` for easy reuse across pages

### Utilities
- **lib/utils.ts** - Core utility functions like `cn()` for class merging
- **utils/** - Domain-specific utilities like validation

### Configuration
- **config/site.ts** - Site-wide configuration
- **constants/** - Application constants and enums

## 🔧 Customization

### Adding New Routes
Create new files in `src/pages/` directory. The filename becomes the route:
- `src/pages/services.tsx` → `/services`
- `src/pages/blog/index.tsx` → `/blog`

### Adding Components
- All components: Add to `src/components/`
- Import using `@/components/component-name`

### Environment Variables
Add new variables to `.env.local` and update `.env.example` for documentation.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📄 License

This project is open source and available under the MIT License.
