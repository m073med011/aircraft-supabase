# Quick Start Guide

Get your Global Military Database up and running in 5 minutes!

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

## Step 2: Set Up Database (2 minutes)

1. Open [supabase.com](https://supabase.com) and sign in
2. Your project is already created with these credentials:
   - URL: `https://ifccchhscligcvoocidx.supabase.co`
   - Anon Key: Already in `.env.local`

3. Go to **SQL Editor** in your Supabase dashboard
4. Click **"New Query"**
5. Copy ALL contents from `supabase/schema.sql`
6. Paste into the editor
7. Click **"Run"** (wait 10-20 seconds for completion)

✅ Your database is now ready!

## Step 3: Start Development Server (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

✅ Your app is now running!

## Step 4: Create Your Admin Account (1 minute)

1. Click **"Sign Up"** in the navbar
2. Enter your email, name, and password
3. Check your email for verification (if required)
4. Make yourself an admin:
   - Go to Supabase Dashboard → **Table Editor** → **profiles**
   - Find your user row
   - Change `role` from `user` to `admin`
   - Click **Save**
5. Refresh the page and you'll see "Dashboard" in your profile menu

✅ You're now an admin!

## Step 5: Add Sample Data (Optional)

### Quick Method: Via Supabase Dashboard

#### Add a Country
1. Go to **Table Editor** → **countries**
2. Click **"Insert row"**
3. Fill in:
   - name: `United States`
   - code: `US`
   - description: `Military superpower with global reach`
   - population: `331000000`
   - military_budget: `801000000000`
   - active_personnel: `1400000`
4. Click **"Save"**

#### Add a Weapon
1. Go to **Table Editor** → **weapons**
2. Click **"Insert row"**
3. Fill in:
   - name: `F-35 Lightning II`
   - category: `Aircraft`
   - type: `Stealth Fighter`
   - manufacturer: `Lockheed Martin`
   - description: `Fifth-generation multirole stealth fighter`
   - first_deployed: `2015`
   - unit_cost: `80000000`
4. Click **"Save"**

#### Add an Army
1. First, copy the UUID of the United States from the countries table
2. Go to **Table Editor** → **armies**
3. Click **"Insert row"**
4. Fill in:
   - country_id: `[paste the UUID from step 1]`
   - name: `United States Air Force`
   - branch: `Air Force`
   - description: `Aerial warfare service branch`
   - personnel_count: `329000`
   - headquarters: `Pentagon, Arlington, Virginia`
   - founded_year: `1947`
5. Click **"Save"**

✅ Sample data added! Refresh your app to see it.

## Common First Steps

### As a User
- Browse countries, weapons, and armies
- Click on items to see details
- React with 👍 👎 ❤️ to items you like/dislike
- Visit your profile to see your activity

### As an Admin
- Go to **Dashboard** from your profile menu
- See statistics and management guides
- Add more content via Supabase Table Editor
- Upload images to Storage buckets

## Adding Images

1. Go to Supabase Dashboard → **Storage**
2. Select the appropriate bucket:
   - `countries` - for flags
   - `weapons` - for weapon images
   - `armies` - for logos
3. Click **"Upload file"**
4. After upload, click the file → **"Get URL"** → Copy
5. Paste URL in the table field:
   - Countries: `flag_url`
   - Weapons: `image_url`
   - Armies: `logo_url`

## Enabling Google OAuth

1. Go to Supabase Dashboard → **Authentication** → **Providers**
2. Enable **Google**
3. Enter credentials:
   - Client ID: `443717095749-m7g3afp8gfn2olo36hvdk33boc6o94hn.apps.googleusercontent.com`
   - Client Secret: Contact admin or generate your own
4. Click **"Save"**

Users can now sign in with Google!

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database errors
- Make sure you ran the entire `schema.sql` file
- Check for any error messages in the SQL editor
- Re-run the schema if needed (it's safe to run multiple times)

### Can't see Dashboard
- Make sure you changed your role to `admin` in the profiles table
- Log out and log back in
- Clear your browser cookies

### Images not loading
- Check that you're using the public URL from Storage
- Verify the bucket has public access
- Make sure the URL is complete (starts with https://)

## Next Steps

1. **Read the full README.md** for detailed information
2. **Add more content** to your database
3. **Customize the theme** in `src/app/globals.css`
4. **Deploy to production** following `DEPLOYMENT.md`

## Project Structure Cheat Sheet

```
src/
├── app/              # Pages (countries, weapons, armies, etc.)
├── components/       # Reusable UI components
├── features/         # Feature-specific code
└── lib/              # Utilities and helpers

supabase/
└── schema.sql        # Complete database schema
```

## Key Files

- `src/app/layout.tsx` - Main layout with navbar
- `src/middleware.ts` - Route protection
- `src/lib/supabase/` - Database clients
- `.env.local` - Environment variables (already configured)

## Getting Help

- Check **README.md** for detailed documentation
- Check **DEPLOYMENT.md** for deployment guide
- Open an issue on GitHub
- Review Supabase dashboard for database issues

---

**You're all set! Start building! 🚀**

Questions? Check the README.md or create an issue.

