# Quiz Creator AI - Frontend 🎨

React-based frontend application for Quiz Creator AI, built with modern web technologies and designed for optimal user experience.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - API communication

## 🛠️ Development

This project was initially created using [Lovable](https://lovable.dev) - an AI-powered development platform that helped scaffold the initial structure and components.

## 📋 Prerequisites

- Node.js 18+
- npm
- Backend API running

## 🔧 Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp .env.example .env
   ```

4. Configure environment variables:

   ```
   VITE_API_URL=http://localhost:3000
   ```

   > 📝 Refer to `.env.example` for all available environment variables

5. Start development server:
   ```bash
   npm run dev
   ```

## 🏗️ Build

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── api/           # API services
│   ├── hooks/         # Custom React hooks
├── public/            # Static assets
└── .env.example       # Environment variables template
```

## 🎨 Features

- Responsive design with Tailwind CSS
- Type-safe development with TypeScript
- Fast refresh with Vite

## 📱 Components




## 🚀 Deployment

### Vercel Deployment

1. Connect github to vercel and deploy and configure env


## 📈 Performance Optimization

- Lazy loading of route components
- Memoization of expensive computations

