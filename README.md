# AIdea Digital - AI-Powered Business Solutions

A modern, responsive website for AIdea Digital featuring a comprehensive community platform with user authentication, admin management, and content management capabilities.

## 🚀 Live Demo

- **Website**: [https://aidea.digital](https://aidea.digital)
- **Community**: [https://aidea.digital/community](https://aidea.digital/community)
- **Admin**: [https://aidea.digital/admin](https://aidea.digital/admin)

## ✨ Features

### 🌐 Main Website
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Clean, professional design with gradient accents
- **Performance Optimized**: Fast loading times and smooth animations
- **SEO Ready**: Optimized for search engines

### 👥 Community Platform
- **User Authentication**: Secure registration and login system
- **User Profiles**: Complete user management with profile data
- **Community Dashboard**: Access to exclusive resources and events
- **Forgot Password**: Complete password reset functionality with email

### 🔐 Admin System
- **Secure Admin Login**: Database-driven authentication
- **Content Management**: CRUD operations for events and resources
- **User Management**: View and manage community members
- **Real-time Updates**: Immediate UI updates for all operations

### 📧 Email System
- **Password Reset**: Professional email templates
- **Custom Branding**: Branded email design
- **SMTP Integration**: Configurable email delivery

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Deployment**: Netlify
- **Version Control**: Git & GitHub

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Main navigation
│   └── Footer.tsx       # Site footer
├── pages/              # Page components
│   ├── Index.tsx       # Homepage
│   ├── Community.tsx   # Community platform
│   ├── Admin.tsx       # Admin dashboard
│   ├── ResetPassword.tsx # Password reset page
│   └── Contact.tsx     # Contact page
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── integrations/       # External integrations
│   └── supabase/       # Supabase configuration
└── App.tsx            # Main app component
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HASHTECHVENTURES/aidea-digital-canvas.git
   cd aidea-digital-canvas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Update the environment variables with your Supabase credentials.

4. **Database Setup**
   - See `docs/sql/README.md` for database setup instructions
   - Run the SQL scripts in the `docs/sql/` directory

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the database setup scripts from `docs/sql/`
3. Configure authentication settings
4. Set up email templates

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Pages & Features

### Homepage (`/`)
- Hero section with company introduction
- Services overview
- Call-to-action sections
- Responsive design

### Community (`/community`)
- User registration and login
- Community dashboard
- Events and resources display
- Forgot password functionality

### Admin (`/admin`)
- Secure admin authentication
- User management
- Content management (events/resources)
- Real-time data updates

### Contact (`/contact`)
- Contact form
- Company information
- Professional contact details

## 🗄️ Database Schema

### Core Tables
- **user_profiles**: Extended user information
- **community_events**: Community events and workshops
- **community_resources**: Resources and tools
- **admins**: Admin user management

### Security Features
- **Row Level Security (RLS)**: Database-level security
- **Authentication**: Supabase Auth integration
- **Data Protection**: Encrypted data transmission
- **Input Validation**: Client and server-side validation

## 🚀 Deployment

### Netlify Deployment
1. Connect your GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy automatically

### Custom Domain
- Configure DNS settings
- Set up SSL certificates
- Update Supabase redirect URLs

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**AIdea Digital** - Strategic AI consulting for businesses
- Website: [aidea-digital.com](https://aidea-digital.com)
- Email: [aideadigitalagency@gmail.com](mailto:aideadigitalagency@gmail.com)

## 📞 Support

For support and inquiries:
- Email: aideadigitalagency@gmail.com
- Website: https://aidea-digital.com

---

**Built with ❤️ by AIdea Digital Team**