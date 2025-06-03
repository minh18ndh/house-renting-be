import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const seed = async () => {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin1 = await prisma.user.upsert({
            where: { email: 'admin1@gmail.com' },
            update: {},
            create: {
                fullName: 'Thomas Nguyen',
                email: 'admin1@gmail.com',
                password: hashedPassword,
                phone: '0386666666',
                role: 'Admin'
            }
        });

        const admin2 = await prisma.user.upsert({
            where: { email: 'admin2@gmail.com' },
            update: {},
            create: {
                fullName: 'Lana Tran',
                email: 'admin2@gmail.com',
                password: hashedPassword,
                phone: '0388888888',
                role: 'Admin'
            }
        });

        const categories = [
            'Nhà biệt thự, liền kề',
            'Nhà chung cư',
            'Shophouse, nhà mặt phố'
        ];

        for (const name of categories) {
            await prisma.category.upsert({
                where: { name },
                update: {},
                create: { name }
            });
        }

        console.log('Seed complete!');
    } catch (err) {
        console.error('Seed failed:', err);
    } finally {
        await prisma.$disconnect();
    }
};

seed();