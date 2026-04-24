import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

async function initDB() {
  try {
    // Create admin user if it doesn't exist
    const adminUsername = 'aadmin';
    const adminEmail = 'admin@portfolio.com';
    const existingAdmin = await prisma.admin.findUnique({
      where: { username: adminUsername }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Faysal25524', 10);

      await prisma.admin.create({
        data: {
          username: adminUsername,
          email: adminEmail,
          password: hashedPassword,
          name: 'Portfolio Admin',
          role: 'admin'
        }
      });

      console.log('Admin user created successfully');
    } else {
      const hashedPassword = await bcrypt.hash('Faysal25524', 10);

      await prisma.admin.update({
        where: { username: adminUsername },
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: 'Portfolio Admin',
          role: 'admin',
        },
      });

      console.log('Admin user updated successfully');
    }

    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
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
