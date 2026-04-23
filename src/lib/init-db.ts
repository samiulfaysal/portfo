import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

async function initDB() {
  try {
    // Create admin user if it doesn't exist
    const adminEmail = 'admin@portfolio.com';
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminEmail }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      await prisma.admin.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: 'Portfolio Admin',
          role: 'admin'
        }
      });

      console.log('✅ Admin user created successfully');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    console.log('🚀 Database initialization complete');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Only run if called directly
if (require.main === module) {
  initDB().catch(console.error);
}

export default initDB;