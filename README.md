# Global Military Database

A comprehensive, scalable Next.js platform for exploring and managing global military information, weapons systems, and defense data. Built with TypeScript, Supabase, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Countries**: Detailed information about military capabilities and defense systems worldwide
- **Weapons**: Comprehensive database of military weapons, equipment, and technology
- **Armies**: Military branches, divisions, and organizational structures by country
- **Relations**: Track weapon ownership, usage, export, and import relationships

### User Features
- **Authentication**: OAuth (Google) and email/password login via Supabase Auth
- **Reactions System**: Users can like, dislike, or love any entity (countries, weapons, armies, relations)
- **Interactive UI**: Modern, responsive interface with real-time reaction updates
- **Profile Management**: View personal profile and activity statistics

### Admin Features
- **Role-Based Access Control**: Admin users can manage all data
- **Dashboard**: Centralized admin panel with statistics and management guides
- **Content Management**: Add, edit, and delete countries, weapons, armies, and relations
- **Media Storage**: Upload and manage images/videos via Supabase Storage

### Technical Features
- **Next.js 15+ with App Router**: Modern React server components
- **TypeScript**: Full type safety across the application
- **Incremental Static Regeneration (ISR)**: Optimal performance with 60-second revalidation
- **Row Level Security (RLS)**: Database-level security policies
- **Secure Authentication**: JWT stored in httpOnly cookies
- **Feature-Based Architecture**: Scalable and maintainable code structure

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account ([sign up here](https://supabase.com))
- Google OAuth credentials (optional, for Google login)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd aircraft-supabase
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### Create a New Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details and wait for setup to complete

#### Run the Database Schema
1. Copy the entire contents of `supabase/schema.sql`
2. Go to your Supabase dashboard → SQL Editor
3. Create a new query and paste the schema
4. Click "Run" to execute

This will create:
- All necessary tables (countries, weapons, armies, relations, profiles, reactions)
- Row Level Security (RLS) policies
- Helper functions and triggers
- Storage buckets for media files
- Database views for optimized queries

### 4. Configure Environment Variables

The `.env.local` file is already configured with your Supabase credentials. If you need to change them:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=your-secret-key
```

### 5. Configure Google OAuth (Optional)

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Client ID: `443717095749-m7g3afp8gfn2olo36hvdk33boc6o94hn.apps.googleusercontent.com`
   - Client Secret: Contact admin for secret
4. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://your-domain.com/auth/callback` (production)

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
aircraft-supabase/
├── src/
│   ├── app/                      # Next.js app router pages
│   │   ├── api/                  # API routes
│   │   │   └── reactions/        # Reactions API
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── callback/
│   │   ├── countries/            # Countries pages
│   │   ├── weapons/              # Weapons pages
│   │   ├── armies/               # Armies pages
│   │   ├── relations/            # Relations pages
│   │   ├── profile/              # User profile page
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   ├── components/               # Shared components
│   │   ├── layout/               # Layout components
│   │   ├── reactions/            # Reaction system
│   │   └── ui/                   # shadcn/ui components
│   ├── features/                 # Feature modules
│   │   ├── auth/                 # Auth components
│   │   ├── countries/            # Country components
│   │   ├── weapons/              # Weapon components
│   │   └── armies/               # Army components
│   ├── lib/                      # Utilities and libraries
│   │   ├── supabase/             # Supabase clients
│   │   └── utils.ts              # Helper functions
│   ├── types/                    # TypeScript types
│   │   └── database.types.ts     # Database types
│   └── middleware.ts             # Next.js middleware
├── supabase/
│   └── schema.sql                # Complete database schema
├── public/                       # Static assets
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

## 👥 User Roles & Permissions

### Regular Users
- View all countries, weapons, armies, and relations
- React to entities (like, dislike, love)
- Access their profile page
- Cannot add, edit, or delete data

### Admin Users
- All user permissions
- Add, edit, and delete all data
- Access admin dashboard
- Upload media to storage
- View statistics

### Making a User an Admin
1. Go to Supabase Dashboard → Table Editor → profiles
2. Find the user's profile
3. Change `role` from `user` to `admin`
4. The user will have admin access on next login

## 📊 Adding Content

### Method 1: Via Supabase Dashboard (Recommended)

#### Adding Countries
1. Go to Table Editor → countries
2. Click "Insert row"
3. Fill in required fields:
   - `name`: Country name (unique)
   - `code`: ISO code like "US", "RU"
   - Optional: population, gdp, military_budget, etc.
4. Click "Save"

#### Adding Weapons
1. Go to Table Editor → weapons
2. Click "Insert row"
3. Fill in required fields:
   - `name`: Weapon name
   - `category`: "Aircraft", "Tank", "Naval", "Missile", etc.
   - Optional: manufacturer, specifications, image_url, etc.
4. Click "Save"

#### Adding Armies
1. Go to Table Editor → armies
2. Click "Insert row"
3. Fill in required fields:
   - `country_id`: UUID of the country
   - `name`: Force name
   - `branch`: "Air Force", "Navy", "Army", etc.
4. Click "Save"

#### Adding Relations
1. Go to Table Editor → country_weapon_relations
2. Click "Insert row"
3. Fill in required fields:
   - `country_id`: UUID of country
   - `weapon_id`: UUID of weapon
   - `relation_type`: "ownership", "usage", "export", or "import"
4. Click "Save"

### Method 2: Uploading Media Files

1. Go to Storage in Supabase Dashboard
2. Select bucket (weapons, armies, or countries)
3. Click "Upload file"
4. After upload, click file → "Get URL" → Copy public URL
5. Paste URL in corresponding table field (image_url, flag_url, logo_url, etc.)

## 🔒 Security Features

- **Row Level Security (RLS)**: All tables have RLS policies
- **JWT Authentication**: Secure token storage in httpOnly cookies
- **Role-Based Access**: Admins and users have different permissions
- **Input Validation**: Server-side validation on all inputs
- **Protected Routes**: Middleware handles authentication and authorization
- **Secure Storage**: Admin-only upload permissions

## 🎨 Customization

### Changing Theme Colors
Edit `src/app/globals.css` to modify the color scheme:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... other colors */
}
```

### Adding New Features
Follow the feature-based architecture:
1. Create a new folder in `src/features/`
2. Add components, hooks, and utilities
3. Create corresponding pages in `src/app/`
4. Update database schema if needed

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   JWT_SECRET=your-secret
   ```
6. Click "Deploy"

### Update OAuth Callback URLs
After deployment, update your OAuth settings:
1. Supabase Dashboard → Authentication → URL Configuration
2. Add your production URL: `https://your-domain.vercel.app/auth/callback`
3. Update Google OAuth redirect URIs to match

## 📝 Database Schema Overview

### Tables
- **profiles**: User profiles with role information
- **countries**: Country data with military information
- **weapons**: Weapons and equipment database
- **armies**: Military forces and branches
- **country_weapon_relations**: Relations between countries and weapons
- **reactions**: User reactions to entities

### Views
- **countries_with_reactions**: Countries with reaction counts
- **weapons_with_reactions**: Weapons with reaction counts
- **armies_with_reactions**: Armies with reaction counts

### Functions
- `is_admin(user_id)`: Check if user is admin
- `get_reaction_counts(entity_type, entity_id)`: Get reaction counts
- `handle_new_user()`: Trigger for new user creation

## 🐛 Troubleshooting

### Authentication Issues
- Check that Supabase URL and keys are correct
- Verify OAuth redirect URLs match your deployment
- Clear browser cookies and try again

### Database Errors
- Ensure schema.sql was run successfully
- Check RLS policies are enabled
- Verify user has correct role in profiles table

### Images Not Loading
- Verify images are uploaded to correct bucket
- Check public access is enabled on storage bucket
- Ensure URLs are correctly formatted

## 📚 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check documentation in the `/docs` folder
- Contact the development team

---

**Happy coding! 🚀**

