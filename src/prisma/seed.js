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
                userId: user3.id,
                categoryId: category1.id,
                price: 3103,
                area: 206,
                address: '12 Hang Bai, Hoan Kiem, Hanoi',
                location: '21.0245,105.8521',
                bedroom: 4,
                content: 'Beautiful shophouse, street-facing house located at 12 Hang Bai, Hoan Kiem, Hanoi.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha11.jpg' },
                        { baseUrl: 'uploads/ha12.jpg' },
                        { baseUrl: 'uploads/ha13.jpg' },
                        { baseUrl: 'uploads/ha14.jpg' },
                        { baseUrl: 'uploads/ha15.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user2.id,
                categoryId: category2.id,
                price: 4046,
                area: 268,
                address: '56 Nguyen Du, Hai Ba Trung, Hanoi',
                location: '21.0171,105.8486',
                bedroom: 5,
                content: 'Beautiful apartment located at 56 Nguyen Du, Hai Ba Trung, Hanoi.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha7.jpg' },
                        { baseUrl: 'uploads/ha8.jpg' },
                        { baseUrl: 'uploads/ha9.jpg' },
                        { baseUrl: 'uploads/ha10.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user1.id,
                categoryId: category1.id,
                price: 3479,
                area: 111,
                address: '3 Le Van Luong, Thanh Xuan, Hanoi',
                location: '21.0035,105.8038',
                bedroom: 3,
                content: 'Beautiful shophouse, street-facing house located at 3 Le Van Luong, Thanh Xuan, Hanoi.',
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
                categoryId: category3.id,
                price: 3968,
                area: 203,
                address: '89 Tay Son, Dong Da, Hanoi',
                location: '21.0083,105.8287',
                bedroom: 2,
                content: 'Beautiful villa, townhouse located at 89 Tay Son, Dong Da, Hanoi.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha11.jpg' },
                        { baseUrl: 'uploads/ha12.jpg' },
                        { baseUrl: 'uploads/ha13.jpg' },
                        { baseUrl: 'uploads/ha14.jpg' },
                        { baseUrl: 'uploads/ha15.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user4.id,
                categoryId: category1.id,
                price: 3986,
                area: 171,
                address: '77 Xuan Thuy, Cau Giay, Hanoi',
                location: '21.0384,105.7810',
                bedroom: 3,
                content: 'Beautiful shophouse, street-facing house located at 77 Xuan Thuy, Cau Giay, Hanoi.',
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
                userId: user4.id,
                categoryId: category3.id,
                price: 1787,
                area: 181,
                address: '41 Ngo Quyen, Hoan Kiem, Hanoi',
                location: '21.0256,105.8542',
                bedroom: 5,
                content: 'Beautiful villa, townhouse located at 41 Ngo Quyen, Hoan Kiem, Hanoi.',
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
                userId: user2.id,
                categoryId: category1.id,
                price: 3468,
                area: 184,
                address: '120 Kim Ma, Ba Dinh, Hanoi',
                location: '21.0323,105.8231',
                bedroom: 4,
                content: 'Beautiful shophouse, street-facing house located at 120 Kim Ma, Ba Dinh, Hanoi.',
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
                price: 2647,
                area: 161,
                address: '18 Tran Thai Tong, Cau Giay, Hanoi',
                location: '21.0365,105.7889',
                bedroom: 3,
                content: 'Beautiful villa, townhouse located at 18 Tran Thai Tong, Cau Giay, Hanoi.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha7.jpg' },
                        { baseUrl: 'uploads/ha8.jpg' },
                        { baseUrl: 'uploads/ha9.jpg' },
                        { baseUrl: 'uploads/ha10.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user3.id,
                categoryId: category1.id,
                price: 2288,
                area: 92,
                address: '22 Pham Ngoc Thach, Dong Da, Hanoi',
                location: '21.0122,105.8301',
                bedroom: 1,
                content: 'Beautiful shophouse, street-facing house located at 22 Pham Ngoc Thach, Dong Da, Hanoi.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha7.jpg' },
                        { baseUrl: 'uploads/ha8.jpg' },
                        { baseUrl: 'uploads/ha9.jpg' },
                        { baseUrl: 'uploads/ha10.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user2.id,
                categoryId: category1.id,
                price: 2603,
                area: 45,
                address: '5 Doi Can, Ba Dinh, Hanoi',
                location: '21.0358,105.8267',
                bedroom: 2,
                content: 'Beautiful shophouse, street-facing house located at 5 Doi Can, Ba Dinh, Hanoi.',
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
                userId: user2.id,
                categoryId: category2.id,
                price: 2469,
                area: 230,
                address: '9 Dao Tan, Ba Dinh, Hanoi',
                location: '21.0348,105.8175',
                bedroom: 4,
                content: 'Beautiful apartment located at 9 Dao Tan, Ba Dinh, Hanoi.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha11.jpg' },
                        { baseUrl: 'uploads/ha12.jpg' },
                        { baseUrl: 'uploads/ha13.jpg' },
                        { baseUrl: 'uploads/ha14.jpg' },
                        { baseUrl: 'uploads/ha15.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user4.id,
                categoryId: category2.id,
                price: 3743,
                area: 289,
                address: '35 Thai Ha, Dong Da, Hanoi',
                location: '21.0185,105.8202',
                bedroom: 5,
                content: 'Beautiful apartment located at 35 Thai Ha, Dong Da, Hanoi.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha7.jpg' },
                        { baseUrl: 'uploads/ha8.jpg' },
                        { baseUrl: 'uploads/ha9.jpg' },
                        { baseUrl: 'uploads/ha10.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user3.id,
                categoryId: category2.id,
                price: 3063,
                area: 128,
                address: '11 Pho Hue, Hai Ba Trung, Hanoi',
                location: '21.0147,105.8533',
                bedroom: 3,
                content: 'Beautiful apartment located at 11 Pho Hue, Hai Ba Trung, Hanoi.',
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
                userId: user4.id,
                categoryId: category3.id,
                price: 2463,
                area: 254,
                address: '64 Tran Duy Hung, Cau Giay, Hanoi',
                location: '21.0098,105.7985',
                bedroom: 1,
                content: 'Beautiful villa, townhouse located at 64 Tran Duy Hung, Cau Giay, Hanoi.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha11.jpg' },
                        { baseUrl: 'uploads/ha12.jpg' },
                        { baseUrl: 'uploads/ha13.jpg' },
                        { baseUrl: 'uploads/ha14.jpg' },
                        { baseUrl: 'uploads/ha15.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user3.id,
                categoryId: category2.id,
                price: 2692,
                area: 285,
                address: '25 Ly Thuong Kiet, Hoan Kiem, Hanoi',
                location: '21.0223,105.8510',
                bedroom: 2,
                content: 'Beautiful apartment located at 25 Ly Thuong Kiet, Hoan Kiem, Hanoi.',
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
                userId: user2.id,
                categoryId: category3.id,
                price: 3656,
                area: 69,
                address: '7 Nguyen Chi Thanh, Dong Da, Hanoi',
                location: '21.0249,105.8104',
                bedroom: 1,
                content: 'Beautiful villa, townhouse located at 7 Nguyen Chi Thanh, Dong Da, Hanoi.',
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
                categoryId: category1.id,
                price: 3382,
                area: 285,
                address: '14 Le Duan, Hoan Kiem, Hanoi',
                location: '21.0271,105.8399',
                bedroom: 3,
                content: 'Beautiful shophouse, street-facing house located at 14 Le Duan, Hoan Kiem, Hanoi.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha7.jpg' },
                        { baseUrl: 'uploads/ha8.jpg' },
                        { baseUrl: 'uploads/ha9.jpg' },
                        { baseUrl: 'uploads/ha10.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user3.id,
                categoryId: category2.id,
                price: 3757,
                area: 85,
                address: '90 Hoang Quoc Viet, Cau Giay, Hanoi',
                location: '21.0463,105.7887',
                bedroom: 3,
                content: 'Beautiful apartment located at 90 Hoang Quoc Viet, Cau Giay, Hanoi.',
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
                userId: user4.id,
                categoryId: category2.id,
                price: 2552,
                area: 155,
                address: '66 Vo Chi Cong, Tay Ho, Hanoi',
                location: '21.0708,105.8005',
                bedroom: 2,
                content: 'Beautiful apartment located at 66 Vo Chi Cong, Tay Ho, Hanoi.',
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
                userId: user3.id,
                categoryId: category2.id,
                price: 2943,
                area: 221,
                address: '32 Kim Dong, Hoang Mai, Hanoi',
                location: '20.9841,105.8463',
                bedroom: 2,
                content: 'Beautiful apartment located at 32 Kim Dong, Hoang Mai, Hanoi.',
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
                categoryId: category3.id,
                price: 3123,
                area: 246,
                address: '5A Phan Dinh Phung, Ba Dinh, Hanoi',
                location: '21.0360,105.8380',
                bedroom: 3,
                content: 'Enjoy scenic views and a relaxing atmosphere every day.',
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
                userId: user4.id,
                categoryId: category1.id,
                price: 2442,
                area: 243,
                address: '22 Lang Ha, Dong Da, Hanoi',
                location: '21.0182,105.8163',
                bedroom: 1,
                content: 'Affordable luxury in the heart of the capital.',
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
                userId: user4.id,
                categoryId: category2.id,
                price: 3462,
                area: 208,
                address: '91 Tran Quoc Hoan, Cau Giay, Hanoi',
                location: '21.0409,105.7902',
                bedroom: 5,
                content: 'A peaceful retreat amidst the bustle of Hanoi.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha7.jpg' },
                        { baseUrl: 'uploads/ha8.jpg' },
                        { baseUrl: 'uploads/ha9.jpg' },
                        { baseUrl: 'uploads/ha10.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user4.id,
                categoryId: category1.id,
                price: 3604,
                area: 243,
                address: '33 Phung Hung, Hoan Kiem, Hanoi',
                location: '21.0332,105.8431',
                bedroom: 3,
                content: 'Newly renovated with plenty of natural light and modern finishes.',
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
                price: 1976,
                area: 77,
                address: '18 Nguyen Du, Hai Ba Trung, Hanoi',
                location: '21.0175,105.8514',
                bedroom: 2,
                content: 'Modern design with a touch of elegance, fully furnished.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha11.jpg' },
                        { baseUrl: 'uploads/ha12.jpg' },
                        { baseUrl: 'uploads/ha13.jpg' },
                        { baseUrl: 'uploads/ha14.jpg' },
                        { baseUrl: 'uploads/ha15.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user2.id,
                categoryId: category2.id,
                price: 4125,
                area: 156,
                address: '60 Chua Boc, Dong Da, Hanoi',
                location: '21.0091,105.8240',
                bedroom: 3,
                content: 'Stylish interior, spacious layout, and easy access to city landmarks.',
                isRented: false,
                images: {
                    create: [
                        { baseUrl: 'uploads/ha7.jpg' },
                        { baseUrl: 'uploads/ha8.jpg' },
                        { baseUrl: 'uploads/ha9.jpg' },
                        { baseUrl: 'uploads/ha10.jpg' }
                    ]
                }
            }
        });
        
        await prisma.post.create({
            data: {
                userId: user2.id,
                categoryId: category1.id,
                price: 2020,
                area: 116,
                address: '45 Tran Khanh Du, Hoan Kiem, Hanoi',
                location: '21.0199,105.8647',
                bedroom: 5,
                content: 'Bright, airy, and ready for you to move in today.',
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
                userId: user2.id,
                categoryId: category3.id,
                price: 1753,
                area: 228,
                address: '88 Dinh Cong, Hoang Mai, Hanoi',
                location: '20.9855,105.8373',
                bedroom: 4,
                content: 'Ideal for families, close to schools, parks, and shopping centers.',
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
                userId: user1.id,
                categoryId: category1.id,
                price: 4314,
                area: 74,
                address: '12 Lo Duc, Hai Ba Trung, Hanoi',
                location: '21.0123,105.8590',
                bedroom: 1,
                content: 'Surrounded by delicious local eateries and great connectivity.',
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
                userId: user1.id,
                categoryId: category1.id,
                price: 2033,
                area: 225,
                address: '29 Le Van Huu, Hai Ba Trung, Hanoi',
                location: '21.0142,105.8566',
                bedroom: 2,
                content: 'Located in a vibrant neighborhood, perfect for young professionals.',
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

        console.log('Seed complete!');
    } catch (err) {
        console.error('Seed failed:', err);
    } finally {
        await prisma.$disconnect();
    }
};

seed();