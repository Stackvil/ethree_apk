// Local asset mapping for ride images
export const RIDE_IMAGES = {
    '2D THEATRE': require('../../assets/e3_rides/2D THEATRE.webp'),
    '360 ride': require('../../assets/e3_rides/360 ride.avif'),
    'BASKET BALL': require('../../assets/e3_rides/BASKET BALL.webp'),
    'BOUNCY': require('../../assets/e3_rides/BOUNCY.webp'),
    'GUN SHOOT': require('../../assets/e3_rides/GUN SHOOT.webp'),
    'M. COLUMBUS': require('../../assets/e3_rides/M. COLUMBUS.png'),
    'ROCKET EJECTOR': require('../../assets/e3_rides/ROCKET EJECTOR.jpg'),
    'ROPE COURSE': require('../../assets/e3_rides/ROPE COURSE.jpg'),
    'SAMBA BALLOON': require('../../assets/e3_rides/SAMBA BALLOON.jpg'),
    'SUN @ MOON ride': require('../../assets/e3_rides/SUN @ MOON ride.webp'),
    'SURFER RIDE': require('../../assets/e3_rides/SURFER RIDE.jpg'),
    'TL train': require('../../assets/e3_rides/TL train.jpg'),
    'TRAMPOLINE': require('../../assets/e3_rides/TRAMPOLINE.avif'),
    'ZIP BIKE': require('../../assets/e3_rides/ZIP BIKE.jpg'),
    'bUMPING CARS double': require('../../assets/e3_rides/bUMPING CARS double.webp'),
    'bUMPING CARS single': require('../../assets/e3_rides/bUMPING CARS single.webp'),
    'battery car ride': require('../../assets/e3_rides/battery car ride.jpg'),
    'break-dance-ride-': require('../../assets/e3_rides/break-dance-ride-.webp'),
    'bull ride': require('../../assets/e3_rides/bull ride.webp'),
    'e three bus ride': require('../../assets/e3_rides/e three bus ride.webp'),
    'melt down': require('../../assets/e3_rides/melt down.webp'),
};

export const RIDE_DATA = Object.keys(RIDE_IMAGES).map((key, i) => ({
    id: i.toString(),
    title: key.toUpperCase(),
    time: '12m',
    price: '₹100',
    unit: '1 Unit',
    imageSource: RIDE_IMAGES[key],
}));
