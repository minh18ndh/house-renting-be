import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const seed = async () => {
    try {
        const hashedAdminPassword = await bcrypt.hash('admin123', 10);
        const hashedUserPassword = await bcrypt.hash('string123', 10);

        const user1 = await prisma.user.upsert({
            where: { email: 'minh@gmail.com' },
            update: {},
            create: {
                fullName: 'Minh Nguyen',
                email: 'minh@gmail.com',
                password: hashedUserPassword,
                phone: '0386691313',
                role: 'User'
            }
        });

        const user2 = await prisma.user.upsert({
            where: { email: 'phong@gmail.com' },
            update: {},
            create: {
                fullName: 'Phong Nguyen',
                email: 'phong@gmail.com',
                password: hashedUserPassword,
                phone: '0386690668',
                role: 'User'
            }
        });

        const admin1 = await prisma.user.upsert({
            where: { email: 'admin1@gmail.com' },
            update: {},
            create: {
                fullName: 'Thomas Nguyen',
                email: 'admin1@gmail.com',
                password: hashedAdminPassword,
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
                password: hashedAdminPassword,
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

        const category = await prisma.category.findFirst({
            where: { name: 'Nhà chung cư' }
        });

        await prisma.post.create({
            data: {
                userId: user1.id,
                categoryId: category.id,
                price: 2000,
                area: 60,
                location: 'New York City',
                bedroom: 2,
                content: 'Luxury apartment in the heart of NYC.',
                isApproved: true,
                isRented: false,
                images: {
                    create: [
                        {
                            url: 'uploads/newyork1.jpg'
                        }
                    ]
                }
            }
        });

        console.log('Seed complete!');
    } catch (err) {
        console.error('Seed failed:', err);
    } finally {
        await prisma.$disconnect();
    }
};

seed();