export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const getPriceFilter = (range) => {
    switch (range) {
        case '0-500':
            return { price: { gte: 0, lt: 500 } };
        case '500-1000':
            return { price: { gte: 500, lt: 1000 } };
        case '1000-2000':
            return { price: { gte: 1000, lt: 2000 } };
        case '2000-3500':
            return { price: { gte: 2000, lt: 3500 } };
        case '3500+':
            return { price: { gte: 3500 } };
        default:
            return {}; // no filter
    }
};