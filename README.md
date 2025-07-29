# AIdea Digital Canvas

A modern, responsive website for AIdea Digital - a strategic AI consulting company that helps businesses implement AI solutions with a focus on strategy and measurable results.

## 🚀 Features

### Core Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Built with React, TypeScript, and Tailwind CSS
- **Interactive Components**: Smooth animations and hover effects
- **Blog System**: Complete blog with individual post pages and category filtering
- **Contact Forms**: Integrated contact page for client inquiries
- **SEO Optimized**: Clean URLs and meta tags for better search visibility

### Pages & Sections
- **Homepage**: Hero section, value propositions, strategic approach, and CTA
- **Blog**: Featured articles, category filtering, newsletter subscription
- **Contact**: Contact form and company information
- **Navigation**: Clean, minimal navigation with smooth transitions

### Technical Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Shadcn/ui component library
- **Routing**: React Router DOM
- **Build Tool**: Vite for fast development and building
- **Icons**: Lucide React icons

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/HASHTECHVENTURES/aidea-digital-canvas.git
   cd aidea-digital-canvas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
aidea-digital-canvas/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── Navigation.tsx  # Main navigation
│   │   └── Footer.tsx      # Footer component
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Homepage
│   │   ├── Blog.tsx        # Blog listing
│   │   ├── BlogPost.tsx    # Individual blog posts
│   │   ├── Contact.tsx     # Contact page
│   │   └── ...             # Other pages
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── main.tsx           # App entry point
├── public/                 # Static assets
├── tailwind.config.ts     # Tailwind configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) to Purple (#7c3aed) gradient
- **Secondary**: Pink (#ec4899) accents
- **Neutral**: Gray scale for text and backgrounds
- **Success**: Green (#10b981) for positive actions
- **Warning**: Amber (#f59e0b) for alerts

### Typography
- **Headings**: Bold, large text with gradient effects
- **Body**: Clean, readable font with proper line spacing
- **Links**: Blue with hover effects

### Components
- **Cards**: Rounded corners with subtle shadows and hover effects
- **Buttons**: Gradient backgrounds with scale animations
- **Forms**: Clean inputs with focus states
- **Navigation**: Fixed header with backdrop blur

## 📝 Content Management

### Blog Posts
Blog posts are managed in the `src/pages/Blog.tsx` file. Each post includes:
- Title and excerpt
- Category and read time
- Publication date
- Featured status
- Icon and color scheme

### Adding New Blog Posts
1. Add a new post object to the `blogPosts` array
2. Include all required fields (title, excerpt, category, etc.)
3. Add any new categories to the `categories` array
4. Create detailed content in `BlogPost.tsx` if needed

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **Custom Server**: Upload the `dist` folder to your web server

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for any environment-specific configurations.

### Tailwind Configuration
Customize colors, fonts, and other design tokens in `tailwind.config.ts`.

### Vite Configuration
Modify build settings and plugins in `vite.config.ts`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**AIdea Digital** - Strategic AI consulting for businesses
- Website: [aidea-digital.com](https://aidea-digital.com)
- Email: [contact@aidea-digital.com](mailto:contact@aidea-digital.com)

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons
- [Vite](https://vitejs.dev/) for fast build tooling

---

Built with ❤️ by AIdea Digital Team
