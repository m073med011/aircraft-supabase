# Deployment Guide

This guide covers deploying your Global Military Database application to production.

## Prerequisites

- Completed local setup (see README.md)
- Git repository with your code
- Supabase project configured
- Domain name (optional but recommended)

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform as it's built by the Next.js team and offers:
- Zero-config deployments
- Automatic SSL certificates
- Global CDN
- Serverless functions
- Built-in CI/CD

#### Step-by-Step Deployment to Vercel

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import Project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   
   Add these in Vercel dashboard → Project Settings → Environment Variables:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   JWT_SECRET=your-production-jwt-secret-key
   ```

   **Important**: Use a strong, unique JWT_SECRET for production!

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `your-project.vercel.app`

5. **Configure Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions
   - SSL certificate will be automatically provisioned

#### Update Supabase Settings

After deployment, update these settings in Supabase:

1. **Authentication URLs**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Site URL: `https://your-domain.vercel.app`
   - Add Redirect URL: `https://your-domain.vercel.app/auth/callback`

2. **Google OAuth (if using)**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Update Authorized redirect URIs:
     - Add: `https://your-project.supabase.co/auth/v1/callback`
     - Add: `https://your-domain.vercel.app/auth/callback`

3. **CORS Settings** (if needed)
   - Go to Supabase Dashboard → Settings → API
   - Add your production domain to allowed origins

### Option 2: Netlify

Netlify is another excellent option with similar features to Vercel.

#### Deployment Steps

1. **Push Code to Git**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Install command: `npm install`

4. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add the same variables as Vercel (see above)

5. **Deploy**
   - Click "Deploy site"
   - Site will be live at `random-name.netlify.app`
   - Configure custom domain in Domain settings

### Option 3: Self-Hosted (Docker)

For more control, you can self-host using Docker.

#### Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
      - JWT_SECRET=${JWT_SECRET}
    restart: unless-stopped
```

#### Deploy with Docker

```bash
# Build image
docker build -t military-db .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your-url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key \
  -e JWT_SECRET=your-secret \
  military-db

# Or use docker-compose
docker-compose up -d
```

## Post-Deployment Checklist

### 1. Test Core Functionality
- [ ] Homepage loads correctly
- [ ] Authentication works (login/register/OAuth)
- [ ] Protected routes redirect properly
- [ ] Countries, weapons, armies, relations pages load
- [ ] Reactions work correctly
- [ ] Admin dashboard accessible (for admin users)
- [ ] Profile page loads

### 2. Security Checks
- [ ] HTTPS enabled (SSL certificate active)
- [ ] Environment variables not exposed
- [ ] RLS policies working correctly
- [ ] Admin routes protected
- [ ] CORS configured properly

### 3. Performance Optimization
- [ ] Enable ISR (already configured with 60s revalidation)
- [ ] Verify images loading from Supabase Storage
- [ ] Check Lighthouse scores
- [ ] Enable compression (automatic in Vercel/Netlify)

### 4. Monitoring Setup
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Enable analytics (e.g., Vercel Analytics, Google Analytics)
- [ ] Monitor Supabase usage and quotas
- [ ] Set up uptime monitoring

### 5. Database Maintenance
- [ ] Regular backups enabled in Supabase
- [ ] Database statistics reviewed
- [ ] Indexes optimized
- [ ] Storage usage monitored

## Environment Variables Reference

### Required Variables
```
NEXT_PUBLIC_SUPABASE_URL          # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Supabase anonymous key
NEXT_PUBLIC_APP_URL               # Your production URL
JWT_SECRET                         # Strong secret for JWT signing
```

### Optional Variables
```
NEXT_PUBLIC_GA_ID                 # Google Analytics ID
SENTRY_DSN                        # Sentry error tracking
```

## Scaling Considerations

### Database
- **Free Tier**: Up to 500MB database, 1GB file storage
- **Pro Tier**: $25/month - 8GB database, 100GB storage
- **Monitor**: Track database size and queries in Supabase dashboard

### Bandwidth
- Vercel Free: 100GB/month
- Vercel Pro: 1TB/month
- Monitor usage in Vercel dashboard

### Optimization Tips
1. **Images**: Use Next.js Image component for automatic optimization
2. **Caching**: ISR already configured (60s revalidation)
3. **API Routes**: Keep them lightweight and fast
4. **Database**: Use database views for complex queries
5. **CDN**: Leverage Vercel's global CDN automatically

## Troubleshooting Production Issues

### Issue: 404 on Refresh
**Solution**: Configure rewrites in `next.config.ts` (already done)

### Issue: Authentication Loop
**Solutions**:
- Check callback URLs match exactly
- Verify environment variables
- Clear cookies and try again
- Check Supabase Auth settings

### Issue: Images Not Loading
**Solutions**:
- Verify public access on storage buckets
- Check CORS settings in Supabase
- Ensure image URLs are correct
- Verify domain in `next.config.ts` image remotePatterns

### Issue: Slow Performance
**Solutions**:
- Enable ISR (already configured)
- Optimize database queries
- Use database indexes
- Enable caching
- Optimize images

### Issue: Database Connection Errors
**Solutions**:
- Check Supabase status
- Verify environment variables
- Check quota limits
- Review connection pooling

## Rollback Strategy

If deployment fails or has critical issues:

1. **Vercel/Netlify**: Use deployment history to rollback
   - Go to Deployments → Select previous working version → Promote to Production

2. **Docker**: Keep previous image versions
   ```bash
   # List images
   docker images
   
   # Run previous version
   docker run -p 3000:3000 military-db:previous-tag
   ```

3. **Database**: Restore from Supabase backup
   - Go to Database → Backups
   - Select backup point
   - Click "Restore"

## Monitoring & Maintenance

### Weekly Tasks
- Check error logs
- Review analytics
- Monitor storage usage
- Check for security updates

### Monthly Tasks
- Review and optimize database
- Update dependencies
- Check performance metrics
- Review user feedback

### Quarterly Tasks
- Security audit
- Performance review
- Cost optimization
- Feature planning

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Community**: GitHub Discussions

## Next Steps After Deployment

1. **Add Sample Data**: Populate database with initial content
2. **Create Admin Account**: Make your first user an admin
3. **Set Up Monitoring**: Enable error tracking and analytics
4. **Configure Backups**: Set up automated database backups
5. **Document**: Create internal documentation for content management
6. **Train Users**: Provide guides for admin users

---

**Congratulations! Your application is now live! 🎉**

For issues or questions, refer to the README.md or open an issue on GitHub.

