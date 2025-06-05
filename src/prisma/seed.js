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

        const user3 = await prisma.user.upsert({
            where: { email: 'huy@gmail.com' },
            update: {},
            create: {
                fullName: 'Huy Nguyen',
                email: 'huy@gmail.com',
                password: hashedUserPassword,
                phone: '0386690123',
                role: 'User'
            }
        });

        const user4 = await prisma.user.upsert({
            where: { email: 'qanh@gmail.com' },
            update: {},
            create: {
                fullName: 'Quang Anh Nguyen',
                email: 'qanh@gmail.com',
                password: hashedUserPassword,
                phone: '0386699876',
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

        const category3 = await prisma.category.findFirst({
            where: { name: 'Villa, townhouse' }
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
                            baseUrl: 'uploads/ny1.jpg'
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
                        { baseUrl: 'uploads/hn1.jpg' },
                        { baseUrl: 'uploads/hn2.jpg' }
                    ]
                }
            }
        });

        await prisma.post.create({
            data: {
                userId: user2.id,
                categoryId: category2.id,
                price: 4080,
                area: 59,
                address: '58 Le Duan, Hoan Kiem, Hanoi',
                location: '21.0307,105.8544',
                bedroom: 4,
                content: 'Peaceful and secure area, ideal for families.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha2.jpg' },
                        { baseUrl: 'uploads/ha3.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user3.id,
                categoryId: category1.id,
                price: 2495,
                area: 224,
                address: '12 Giai Phong, Dong Da, Hanoi',
                location: '21.0022,105.8419',
                bedroom: 3,
                content: 'Spacious, modern, and ideally located.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha11.jpg' },
                        { baseUrl: 'uploads/ha12.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user1.id,
                categoryId: category1.id,
                price: 3464,
                area: 278,
                address: '35 Tran Phu, Ngo Quyen, Hai Phong',
                location: '20.8449,106.6881',
                bedroom: 2,
                content: 'Live in luxury with nearby cafes and parks.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha1.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user4.id,
                categoryId: category2.id,
                price: 3104,
                area: 187,
                address: '78 Le Thanh Tong, Ha Long, Quang Ninh',
                location: '21.0219,107.2925',
                bedroom: 3,
                content: 'Classic design meets modern comfort.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha7.jpg' },
                        { baseUrl: 'uploads/ha8.jpg' },
                        { baseUrl: 'uploads/ha9.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user2.id,
                categoryId: category3.id,
                price: 4364,
                area: 295,
                address: '22 Dien Bien Phu, Lao Cai City, Lao Cai',
                location: '22.4856,103.9706',
                bedroom: 1,
                content: 'Enjoy panoramic city views and a vibrant neighborhood.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha4.jpg' },
                        { baseUrl: 'uploads/ha5.jpg' },
                        { baseUrl: 'uploads/ha6.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user1.id,
                categoryId: category1.id,
                price: 3450,
                area: 113,
                address: '15 Bac Son, Lang Son City, Lang Son',
                location: '21.8537,106.7615',
                bedroom: 5,
                content: 'Affordable and central — best of both worlds.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha1.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user3.id,
                categoryId: category3.id,
                price: 2843,
                area: 232,
                address: '150 Le Duan, Hai Chau, Da Nang',
                location: '16.0544,108.2022',
                bedroom: 2,
                content: 'Stylish interior and beautiful surroundings.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha4.jpg' },
                        { baseUrl: 'uploads/ha5.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user1.id,
                categoryId: category2.id,
                price: 4253,
                area: 105,
                address: '98 Nguyen Van Linh, Thanh Khe, Da Nang',
                location: '16.0719,108.2230',
                bedroom: 3,
                content: 'Well-equipped and move-in ready.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha11.jpg' },
                        { baseUrl: 'uploads/ha12.jpg' },
                        { baseUrl: 'uploads/ha13.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user2.id,
                categoryId: category3.id,
                price: 4317,
                area: 64,
                address: '25 Nguyen Thi Minh Khai, District 1, HCMC',
                location: '10.762622,106.660172',
                bedroom: 1,
                content: 'Close to local attractions and transit points.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha2.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user3.id,
                categoryId: category1.id,
                price: 3692,
                area: 270,
                address: '145 Le Loi, District 1, HCMC',
                location: '10.7769,106.7009',
                bedroom: 2,
                content: 'Stylish interior and beautiful surroundings.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha3.jpg' },
                        { baseUrl: 'uploads/ha4.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user4.id,
                categoryId: category2.id,
                price: 2016,
                area: 288,
                address: '64 Phan Dang Luu, Phu Nhuan, HCMC',
                location: '10.8231,106.6297',
                bedroom: 4,
                content: 'Newly furnished home near cafes and schools.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha7.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user4.id,
                categoryId: category2.id,
                price: 3928,
                area: 190,
                address: '22 Hoa Binh Blvd, Ninh Kieu, Can Tho',
                location: '10.0452,105.7469',
                bedroom: 3,
                content: 'Peaceful and secure area, ideal for families.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha8.jpg' },
                        { baseUrl: 'uploads/ha9.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user1.id,
                categoryId: category3.id,
                price: 1701,
                area: 267,
                address: '17 Thuy Van, Vung Tau',
                location: '10.3460,107.0843',
                bedroom: 5,
                content: 'Enjoy panoramic city views and a vibrant neighborhood.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha10.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user2.id,
                categoryId: category1.id,
                price: 2984,
                area: 160,
                address: '80 Tran Phu, Bac Lieu City',
                location: '9.2941,105.7278',
                bedroom: 2,
                content: 'Live in luxury with nearby cafes and parks.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha11.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user3.id,
                categoryId: category1.id,
                price: 4139,
                area: 215,
                address: '10 Downing St, Westminster, London',
                location: '51.5074,-0.1278',
                bedroom: 2,
                content: 'Classic design meets modern comfort.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha12.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user3.id,
                categoryId: category3.id,
                price: 3328,
                area: 121,
                address: '5 Rue de Rivoli, Paris',
                location: '48.8566,2.3522',
                bedroom: 1,
                content: 'Bright, airy, and ready for you to move in today.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha13.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user4.id,
                categoryId: category2.id,
                price: 3217,
                area: 270,
                address: '2-4-1 Marunouchi, Chiyoda City, Tokyo',
                location: '35.6762,139.6503',
                bedroom: 3,
                content: 'Well-equipped and move-in ready.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha14.jpg' },
                        { baseUrl: 'uploads/ha15.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user1.id,
                categoryId: category3.id,
                price: 2986,
                area: 204,
                address: '250 George St, Sydney',
                location: '-33.8688,151.2093',
                bedroom: 2,
                content: 'Stylish interior and beautiful surroundings.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha11.jpg' },
                        { baseUrl: 'uploads/ha13.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user4.id,
                categoryId: category2.id,
                price: 4049,
                area: 137,
                address: '100 Queen St W, Toronto',
                location: '43.651070,-79.347015',
                bedroom: 1,
                content: 'Spacious, modern, and ideally located.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha1.jpg' },
                        { baseUrl: 'uploads/ha2.jpg' }
                    ]
                }
            }
        });

        await prisma.post.create({
            data: {
                userId: user2.id,
                categoryId: category3.id,
                price: 2890,
                area: 180,
                address: '45 Le Loi, Hue City, Thua Thien Hue',
                location: '16.4637,107.5909',
                bedroom: 3,
                content: 'Classic home near the Perfume River with a peaceful atmosphere.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/hue1.jpg' },
                        { baseUrl: 'uploads/hue2.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user3.id,
                categoryId: category1.id,
                price: 2320,
                area: 150,
                address: '12 Quang Trung, Quang Ngai City, Quang Ngai',
                location: '15.1200,108.7922',
                bedroom: 2,
                content: 'A cozy property in the heart of Quang Ngai, close to local markets.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/quangngai1.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user4.id,
                categoryId: category2.id,
                price: 3180,
                area: 210,
                address: '22 Tran Phu, Nha Trang, Khanh Hoa',
                location: '12.2388,109.1967',
                bedroom: 4,
                content: 'Modern beachfront apartment with stunning ocean views.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/nhatrang1.jpg' },
                        { baseUrl: 'uploads/nhatrang2.jpg' },
                        { baseUrl: 'uploads/nhatrang3.jpg' }
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