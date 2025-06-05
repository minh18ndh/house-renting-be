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

        const category2 = await prisma.category.findFirst({
            where: { name: 'Apartment' }
        });

        await prisma.post.create({
            data: {
                userId: user1.id,
                categoryId: category1.id,
                price: 3000,
                area: 60,
                address: '47 W 13th St, New York',
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

        await prisma.post.create({
            data: {
                userId: user2.id,
                categoryId: category2.id,
                price: 1900,
                area: 200,
                address: '125 Lac Long Quan, Tay Ho, Hanoi',
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

        const hanoiPosts = [
            {
                userId: user1.id,
                categoryId: category1.id,
                price: 2500,
                area: 75,
                address: '89 Pho Hue, Hai Ba Trung, Hanoi',
                location: '21.015278,105.852222',
                bedroom: 3,
                content: 'Shophouse with great street view and convenient access to downtown Hanoi.',
                images: ['uploads/pho-hue1.jpg']
            },
            {
                userId: user2.id,
                categoryId: category2.id,
                price: 1800,
                area: 60,
                address: '23 Tran Duy Hung, Cau Giay, Hanoi',
                location: '21.007641,105.800206',
                bedroom: 2,
                content: 'Modern apartment near Big C and Grand Plaza.',
                images: ['uploads/tran-duy-hung1.jpg']
            },
            {
                userId: user1.id,
                categoryId: category2.id,
                price: 1500,
                area: 50,
                address: '12 Pham Hung, Nam Tu Liem, Hanoi',
                location: '21.030833,105.781944',
                bedroom: 1,
                content: 'Compact apartment ideal for working professionals.',
                images: ['uploads/pham-hung1.jpg']
            },
            {
                userId: user2.id,
                categoryId: category1.id,
                price: 3200,
                area: 90,
                address: '45 Le Van Luong, Thanh Xuan, Hanoi',
                location: '21.003056,105.803056',
                bedroom: 4,
                content: 'Shophouse near high-traffic area with great business potential.',
                images: ['uploads/le-van-luong1.jpg']
            },
            {
                userId: user1.id,
                categoryId: category2.id,
                price: 2000,
                area: 70,
                address: '58 Kim Ma, Ba Dinh, Hanoi',
                location: '21.034285,105.818144',
                bedroom: 2,
                content: 'Bright apartment with balcony, close to Lotte Tower.',
                images: ['uploads/kim-ma1.jpg']
            },
            {
                userId: user2.id,
                categoryId: category1.id,
                price: 2700,
                area: 65,
                address: '33 Xuan Thuy, Cau Giay, Hanoi',
                location: '21.038759,105.781267',
                bedroom: 3,
                content: 'Shophouse near university district, ideal for student businesses.',
                images: ['uploads/xuan-thuy1.jpg']
            },
            {
                userId: user1.id,
                categoryId: category2.id,
                price: 1750,
                area: 55,
                address: '16 Doi Can, Ba Dinh, Hanoi',
                location: '21.035667,105.819694',
                bedroom: 2,
                content: 'Fully furnished apartment, ready to move in.',
                images: ['uploads/doi-can1.jpg']
            },
            {
                userId: user2.id,
                categoryId: category1.id,
                price: 3500,
                area: 95,
                address: '78 Lang Ha, Dong Da, Hanoi',
                location: '21.013472,105.818167',
                bedroom: 5,
                content: 'Large corner shophouse perfect for showroom or office.',
                images: ['uploads/lang-ha1.jpg']
            },
            {
                userId: user1.id,
                categoryId: category2.id,
                price: 2200,
                area: 80,
                address: '101 Nguyen Chi Thanh, Dong Da, Hanoi',
                location: '21.017435,105.806884',
                bedroom: 3,
                content: 'Spacious apartment next to Vincom and public transport.',
                images: ['uploads/nguyen-chi-thanh1.jpg']
            },
            {
                userId: user2.id,
                categoryId: category2.id,
                price: 1600,
                area: 45,
                address: '6 Tran Thai Tong, Cau Giay, Hanoi',
                location: '21.040152,105.787701',
                bedroom: 1,
                content: 'Cozy apartment perfect for singles or couples.',
                images: ['uploads/tran-thai-tong1.jpg']
            }
        ];

        for (const post of hanoiPosts) {
            await prisma.post.create({
                data: {
                    userId: post.userId,
                    categoryId: post.categoryId,
                    price: post.price,
                    area: post.area,
                    address: post.address,
                    location: post.location,
                    bedroom: post.bedroom,
                    content: post.content,
                    isRented: false,
                    images: {
                        create: post.images.map((baseUrl) => ({ baseUrl }))
                    }
                }
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