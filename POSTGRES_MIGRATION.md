# PostgreSQL Migration Guide (Neon Setup)

## ✅ Changes Made

### 1. **Prisma Schema Updated**
   - Changed database provider from `sqlite` to `postgresql`
   - File: [prisma/schema.prisma](prisma/schema.prisma)

### 2. **.env File Updated**
   - Updated to use PostgreSQL connection format
   - Placeholder: `postgresql://user:password@ep-xxx-xxxxx.region.aws.neon.tech/portfolio_db?sslmode=require`
   - You must replace this with your actual Neon connection string

### 3. **Build Scripts Enhanced**
   - `build` now includes: `prisma migrate deploy && next build`
   - Added new scripts:
     - `npm run db:migrate` - Create dev migration
     - `npm run db:migrate:deploy` - Deploy migrations
     - `npm run db:generate` - Generate Prisma client
     - `npm run db:reset` - Reset database (dev only)
     - `npm run db:seed` - Seed database with admin user

### 4. **Initial Migration Created**
   - Location: [prisma/migrations/0_init/migration.sql](prisma/migrations/0_init/migration.sql)
   - Contains all tables: Project, ContactMessage, Admin

### 5. **Old SQLite Database Cleaned**
   - Removed: `prisma/dev.db`

### 6. **Environment Template Updated**
   - File: [.env.example](.env.example)
   - Shows PostgreSQL format

---

## 🚀 Next Steps

### Step 1: Get Your Neon Connection String
1. Go to [https://console.neon.tech/](https://console.neon.tech/)
2. Sign up or log in
3. Create a new project
4. Copy the connection string (looks like: `postgresql://user:password@ep-xxx-xxxxx.region.aws.neon.tech/dbname?sslmode=require`)

### Step 2: Update .env File
Replace the placeholder in `.env`:
```
DATABASE_URL="your-actual-neon-connection-string-here"
```

### Step 3: Install Dependencies (if not already done)
```bash
npm install
```

### Step 4: Deploy Initial Migration
```bash
npm run db:migrate:deploy
```

This will:
- Connect to your Neon database
- Create all tables (Project, ContactMessage, Admin)

### Step 5: Seed Initial Data
```bash
npm run db:seed
```

This will create your admin user with:
- Username: `aadmin`
- Email: `admin@portfolio.com`
- Password: `Faysal25524` (CHANGE THIS IN PRODUCTION!)

### Step 6: Start Development
```bash
npm run dev
```

---

## 📝 Important Notes

⚠️ **Security**:
- Change the default admin password immediately in production
- Generate a strong `NEXTAUTH_SECRET` and update `.env`
- Never commit `.env` to version control (already configured in `.gitignore`)

✅ **Database Verification**:
You can verify your database is working by:
1. Going to [https://console.neon.tech/](https://console.neon.tech/)
2. Viewing your database dashboard
3. Checking tables in the SQL editor

🔄 **Future Migrations**:
When you need to modify the schema:
```bash
# Make changes to prisma/schema.prisma
npm run db:migrate
# Name your migration when prompted
```

---

## 🆘 Troubleshooting

**Connection Error**: 
- Verify your DATABASE_URL is correct and copied fully
- Check that Neon project is active

**Migration Failed**:
- Ensure Node.js and npm are installed
- Run `npm install` to ensure all dependencies are installed
- Check .env file is in project root

**Admin User Creation Failed**:
- Verify migrations deployed successfully
- Check admin table exists: `SELECT * FROM "Admin";` in Neon dashboard

---

## 📚 Useful Commands

```bash
# View Prisma Studio (interactive database browser)
npx prisma studio

# Check migration status
npx prisma migrate status

# Rollback migration (dev only)
npx prisma migrate resolve --rolled-back

# Generate fresh Prisma client
npm run db:generate
```

---

**Migration Completed!** Your portfolio is now configured for PostgreSQL with Neon. 🎉
