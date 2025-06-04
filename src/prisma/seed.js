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
            'Villa, townhouse',
            'Apartment',
            'Shophouse, street-facing house'
        ];

        for (const name of categories) {
            await prisma.category.upsert({
                where: { name },
                update: {},
                create: { name }
            });
        }

        const category1 = await prisma.category.findFirst({
            where: { name: 'Shophouse, street-facing house' }
        });

        await prisma.post.create({
            data: {
                userId: user1.id,
                categoryId: category1.id,
                price: 3000,
                area: 60,
                location: '40.83390793277206,-73.92704004289733',
                bedroom: 2,
                content: 'A cozy house right in the heart of NYC.',
                isRented: false,
                images: {
                    create: [
                        {
                            baseUrl: 'uploads/newyork1.jpg'
                        }
                    ]
                }
            }
        });

        const category2 = await prisma.category.findFirst({
            where: { name: 'Apartment' }
        });

        await prisma.post.create({
            data: {
                userId: user2.id,
                categoryId: category2.id,
                price: 1900,
                area: 200,
                location: '21.0669199595017,105.81994743611324',
                bedroom: 4,
                content: 'Luxury apartment next to the famous West Lake of Hanoi.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/hanoi1.jpg' },
                        { baseUrl: 'uploads/hanoi2.jpg' }
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