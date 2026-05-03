import { ShopImages } from './ShopImages';

export const DINING_DATA = [
    {
        id: '18',
        name: 'KFC',
        description: 'Finger Lickin Good fried chicken and burgers.',
        about: 'Its the worlds most famous fried chicken.',
        image: ShopImages.kfc,
        menu: [
            { id: 'm21', name: 'Zinger Burger', price: '₹199', description: 'Crispy chicken fillet with lettuce.', image: ShopImages.kfc, isVeg: false },
        ]
    },
    {
        id: '11',
        name: 'Wow Momo',
        description: 'Indias favorite momo destination with innovative flavors.',
        about: 'From steamed to chocolate momos, we have it all.',
        image: ShopImages.wow_momo,
        menu: [
            { id: 'm14', name: 'Pan Fried Momo', price: '₹180', description: 'Spicy schezwan fried momos.', image: ShopImages.wow_momo, isVeg: true },
        ]
    },
    {
        id: '6',
        name: 'Dumont',
        description: 'Premium ice creams and desserts to satisfy your sweet cravings.',
        about: 'Artisanal ice creams made with natural ingredients.',
        image: ShopImages.dumont,
        menu: [
            { id: 'm9', name: 'Belgian Chocolate', price: '₹150', description: 'Rich dark chocolate scoop.', image: ShopImages.dumont, isVeg: true },
        ]
    },
    {
        id: '13',
        name: 'Punjabi Tadka',
        description: 'Hearty and robust flavors from the heart of Punjab.',
        about: 'Butter chicken, Naan and everything North Indian.',
        image: ShopImages.punjabi_tadka,
        menu: [
            { id: 'm16', name: 'Dal Makhani', price: '₹280', description: 'Overnight cooked black lentils with cream.', image: ShopImages.punjabi_tadka, isVeg: true },
        ]
    },
    {
        id: '8',
        name: "PubG's",
        description: 'A vibrant sports bar and restaurant with great music and food.',
        about: 'The perfect spot to hang out with friends and enjoy live sports.',
        image: ShopImages.pub_g,
        menu: [
            { id: 'm11', name: 'Chicken Wings', price: '₹280', description: 'Spicy buffalo wings with blue cheese dip.', image: ShopImages.pub_g, isVeg: false },
        ]
    },
    {
        id: '17',
        name: 'Grills and Rolls',
        description: 'Perfectly grilled kebabs and mouth-watering rolls.',
        about: 'Quick bites that never compromise on taste.',
        image: ShopImages.grills_n_rolls,
        menu: [
            { id: 'm20', name: 'Chicken Egg Roll', price: '₹120', description: 'Double egg double chicken roll.', image: ShopImages.grills_n_rolls, isVeg: false },
        ]
    },
    {
        id: '2',
        name: 'Fruit Me Up',
        description: 'Fresh fruit juices, shakes, and healthy salads for a refreshing meal.',
        about: 'Fruit Me focuses on health and freshness, providing the best fruit-based snacks and drinks in the city.',
        image: ShopImages.fruit_me,
        menu: [
            { id: 'm4', name: 'Exotic Fruit Platter', price: '₹150', description: 'Seasonal fresh fruits with honey drizzle.', image: ShopImages.fruit_me, isVeg: true },
            { id: 'm5', name: 'Mango Blast', price: '₹120', description: 'Pure mango pulp smoothie.', image: ShopImages.fruit_me, isVeg: true },
        ]
    },
    {
        id: '3',
        name: 'House of Pulaos',
        description: 'The ultimate destination for aromatic and flavorful pulav varieties.',
        about: 'Authentic spices and traditional cooking methods make our pulav the talk of the town.',
        image: ShopImages.house_of_pulav,
        menu: [
            { id: 'm6', name: 'Hyderabadi Pulav', price: '₹300', description: 'Fragrant basmati rice with spicy chicken.', image: ShopImages.house_of_pulav, isVeg: false },
        ]
    },
    {
        id: '4',
        name: 'Planet Pizza',
        description: 'Authentic American-style pizzas with a variety of crusts and toppings.',
        about: 'Bringing the classic taste of USA to your plate with cheesy delights.',
        image: ShopImages.us_pizza,
        menu: [
            { id: 'm7', name: 'Cheesy Pepperoni', price: '₹499', description: 'Classic pepperoni with extra mozzarella.', image: ShopImages.us_pizza, isVeg: false },
        ]
    },
    {
        id: '5',
        name: 'Burma Food Junction',
        description: 'Experience the rich and unique flavors of Burmese cuisine.',
        about: 'A hidden gem serving traditional Burmese dishes like Khao Suey.',
        image: ShopImages.burma_food,
        menu: [
            { id: 'm8', name: 'Khao Suey', price: '₹350', description: 'Coconut milk noodles with assorted toppings.', image: ShopImages.burma_food, isVeg: false },
        ]
    },
    // Remaining Items
    {
        id: '1',
        name: 'The Food Jail',
        description: 'A unique prison-themed restaurant offering a wide range of global cuisines in a quirky setting.',
        about: 'Food Jail offers a one-of-a-kind dining experience with its creative prison-themed decor. Enjoy "solitary confinement" with delicious food from around the world.',
        image: ShopImages.food_jail,
        menu: [
            { id: 'm1', name: 'Lockup Burger', price: '₹250', description: 'Double patty with secret jail sauce.', image: ShopImages.food_jail, isVeg: false },
            { id: 'm2', name: 'Prison Pizza', price: '₹450', description: 'Thin crust with smoky toppings.', image: ShopImages.food_jail, isVeg: true },
            { id: 'm3', name: 'Bail Shakes', price: '₹180', description: 'Creamy chocolate and hazelnut blend.', image: ShopImages.food_jail, isVeg: true },
        ]
    },
    {
        id: '7',
        name: 'Aa Ruchulu',
        description: 'Traditional South Indian flavors served with love.',
        about: 'Home-style Andhra and Telangana delicacies.',
        image: ShopImages.aa_ruchulu,
        menu: [
            { id: 'm10', name: 'Gongura Mutton', price: '₹450', description: 'Spicy mutton cooked with gongura leaves.', image: ShopImages.aa_ruchulu, isVeg: false },
        ]
    },
    {
        id: '9',
        name: 'Red Chillis',
        description: 'Spicy Indian and Chinese fusion dishes that will tingle your taste buds.',
        about: 'Specializing in fiery dishes for spice lovers.',
        image: ShopImages.red_chillis,
        menu: [
            { id: 'm12', name: 'Chilli Chicken', price: '₹320', description: 'Indo-Chinese style spicy chicken.', image: ShopImages.red_chillis, isVeg: false },
        ]
    },
    {
        id: '10',
        name: 'Alpha Arabian Food',
        description: 'A classic city diner known for its legendary Biryani and chai.',
        about: 'A historical landmark serving the best budget meals in town.',
        image: ShopImages.alpha,
        menu: [
            { id: 'm13', name: 'Classic Biryani', price: '₹220', description: 'Authentic Hyderabadi mutton biryani.', image: ShopImages.alpha, isVeg: false },
        ]
    },
    {
        id: '12',
        name: 'Darbar',
        description: 'Royal Indian cuisine with a majestic ambiance.',
        about: 'Dine like royalty with our rich gravies and kebabs.',
        image: ShopImages.darbar,
        menu: [
            { id: 'm15', name: 'Reshmi Kebab', price: '₹380', description: 'Creamy and tender chicken kebabs.', image: ShopImages.darbar, isVeg: false },
        ]
    },
    {
        id: '14',
        name: 'Varsha Cool Drinks',
        description: 'Iconic spot for sodas, lassis, and summer coolers.',
        about: 'Refreshing the city for over three decades.',
        image: ShopImages.varsha_cool_drinks,
        menu: [
            { id: 'm17', name: 'Special Lassi', price: '₹80', description: 'Thick sweet yogurt drink with malai.', image: ShopImages.varsha_cool_drinks, isVeg: true },
        ]
    },
    {
        id: '15',
        name: 'The Red Bucket Biryani',
        description: 'Grab a bucket of the most flavorful biryani in town.',
        about: 'Quality biryani in convenient bucket sizes for families.',
        image: ShopImages.red_bucket,
        menu: [
            { id: 'm18', name: 'Family Bucket Biryani', price: '₹750', description: 'Serves 4 people with extra salan.', image: ShopImages.red_bucket, isVeg: false },
        ]
    },
    {
        id: '16',
        name: 'Bawarchi',
        description: 'The legends of Hyderabadi Biryani.',
        about: 'Accept no substitutes. The original flavor of Hyderabad.',
        image: ShopImages.bawarchi,
        menu: [
            { id: 'm19', name: 'Mutton Dum Biryani', price: '₹350', description: 'Award winning traditional biryani.', image: ShopImages.bawarchi, isVeg: false },
        ]
    },
    {
        id: '19',
        name: 'Punjabi Falooda Kulfi',
        description: 'Healthy and delicious frozen yogurt with customizable toppings.',
        about: 'Low fat, guilt-free desserts for everyone.',
        image: ShopImages.falooda,
        menu: [
            { id: 'm22', name: 'Wildberry Yogurt', price: '₹180', description: 'Tangy berry flavored froyo.', image: ShopImages.falooda, isVeg: true },
        ]
    },
    {
        id: '20',
        name: 'Waffle Cafe',
        description: 'Freshly baked waffles with a variety of sweet and savory toppings.',
        about: 'Start your day or end your meal with a perfect waffle.',
        image: ShopImages.waffle_cafe,
        menu: [
            { id: 'm23', name: 'Nutella Waffle', price: '₹220', description: 'Warm waffle loaded with Nutella.', image: ShopImages.waffle_cafe, isVeg: true },
        ]
    },
];
