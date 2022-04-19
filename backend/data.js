import bcrypt from "bcrypt";

const data = {
  users: [
    {
      name: "James",
      email: "admin@outlook.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: true,
    },
    {
      name: "Kali",
      email: "Kali@outlook.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: false,
    },
    {
      name: "Jennifer",
      email: "Jennifer@outlook.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: false,
    },
    {
      name: "Peter",
      email: "Peter@outlook.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "SoundPEATS Smart Watch Fitness Tracker with All Day Heart Rate Monitor Sleep Quality Tracker IP68 Waterproof 1.4 Large Touch Screen Call & Message Reminder 12 Sports Modes for iPhone Android Phones ",
      abbr: "SoundPEATS Smart Watch Fitness Tracker",
      category: "smart watch",
      image: "/imgs/product1.jpg",
      price: 10,
      brand: "SoundPEATS",
      description: [
        "【Accurate Fitness Tracker Watch】SoundPEATS fitness watch accurately records your steps, distance walked, calories burned and heart rate at your wrist all day, motivating you to reach your exercise goal with real-time statistics on the watch. It also supports extra 12 sports modes to help you track your other exercise patterns and connects to your smartphone's GPS to draw the route map in the SOUNDPEATS SPORTS app.",
        "【Smart Watch for iPhone Android Phones】This smartwatch is compatible with Android 4.4 & ios 8.0 and above smartphones. You can get incoming calls, text messages, and social media notifications, such as Facebook, WhatsApp, Twitter, Instagram, and more on your wrist. You can also read them diredctly on the watch, staying connected with the world.",
        "【Sleep Quality Tracker& More Practical Tools】This fitness watch automatically records your sleep activity, recording your deep sleep, light sleep and awake duration. You can get a comprehensive sleep quality analysis and healthy insights in SOUNDPEATS SPORTS app. It can also wake you up with silent vibrating alarms. This multi-functional watch also has many practical tools, like weather/ music controller/ breath training/ stopwatch/ countdown/ alarm clocks/ find your phone/ sedentary reminder.",
        "【Swimming Waterproof& 10+ Days Battery】Don't bother yourself to take off the fitness watch frequently as this sports watch is rated IP68 waterproof and has super long battery life. You can feel free to sweat it out during exercise, shower, wash hands, play in the rain or swim with it. With the built-in 260mAh battery, this digital watch can work up to 10 days with one single full charge of 2 hours.",
        "【Touch Screen & Comfortable Wearing】This smartwatch is equipped with a 1.4-inch color touch screen and 5 watch faces to choose from, making it easy to operate and read the data. The adjustable wristband of this light-weight watch fits a wrist between 6.1 to 9.3 inches (perimeter), suitable for men, women, and teens. Perfect for Thanksgiving, Christmas and Birthday gifts.",
      ],
      stock: "23",
      maxQty: "5",
    },
    {
      name: "Wireless Earbuds SoundPEATS TrueAir2 Earphones Bluetooth V5.2 with 4 Mic, CVC Noise Cancellation for Clear Calls Headphones Qualcomm 3040, aptX Codec, USB C, 25 Hours Playtime",
      abbr: "Wireless Earbuds SoundPEATS TrueAir2",
      category: "earbuds",
      image: "/imgs/product2.jpg",
      price: 35,
      brand: "SoundPEATS",

      description: [
        "ADVANCED BLUETOOTH TECNOLOGY: The SOUNDPEATS TrueAir2 wireless headphones incorporate the latest Qualcomm QCC3040 5.2 Bluetooth technology. This latest generation Bluetooth technology is 75% more stable than previous generations giving you flawless connection and unrivalled sound quality.",
        "PERFECT CALL QUAILTY: The dual mic technology used by the TrueAir 2 Bluetooth headphones combine crystal clear voice recognition with superb back ground noise cancelation. These qualities make the TrueAir 2 wireless headphones ideal for making calls on the go or conference/video calls, so you can hear and be heard with any directions.",
        "CRISP AND HARMONISED SOUND: Unique 14.2mm bio-compound diaphragm drivers work effortlessly with the aptX technology to provide a realistic and crisp sound. The combination of these innovative technologies give you a truly real feel when listening to your favourite music. With improved true wireless capabilities the TreuAir 2 Bluetooth ear buds play in perfect harmony and without lag, even when poor internet connection is an issue.",
        "LISTEN FOR HOURS:Your headphones should last as long as you need them to. With 5 hours of play time per full charge enjoy your music for longer and only stop listening when you want to. If your ear buds should run out of charge, don’t panic as the accompanying charger case contains 4 full charges giving you a total of 25 hours of play time.",
        "ULTRA LIGHTWEIGHT: Listen in comfort, the SOUNDPEATS wireless headphones have been designed for comfort and ease of use. Ultra-lightweight material and a slick in ear design make the ear buds supremely comfortable to wear, especially for long periods of time.",
      ],
      stock: "0",
      maxQty: "5",
    },
    {
      name: "AquaOasis™ Cool Mist Humidifier {2.2L Water Tank} Quiet Ultrasonic Humidifiers for Bedroom & Large room - Adjustable -360° Rotation Nozzle, Auto-Shut Off, Humidifiers for Babies Nursery & Whole House ",
      abbr: "AquaOasis™ Cool Mist Humidifier",
      category: "Home Appliances",
      image: "/imgs/product3.jpg",
      price: 26,
      brand: "AquaOasis",

      description: [
        "DRY AIR RELIEF! LOOK NO FURTHER FOR THE MOST EFFECTIVE COOL MIST HUMIDEFIER ON THE MARKET!",
        "Want to eliminate the suffering from the terrible effects of dry air? No need to struggle with cheap flimsy and leaky desk humidifiers. This quality ultrasonic humidifier is the one you’re looking for. It pumps relief immediately and effectively! – Feel better in minutes! ",
        "OPERATES IN TOTAL SILENCE – SLEEP LIKE A BABY! No humming, whistling, or crackling as this durable Whole-House Humidifier steadily and efficiently dispenses the soothing cool mist you crave. SLEEP better, BREATHE better, LIVE better! You’ll wish you found this years ago! ",
        "MULTIPLE MIST SETTINGS + 360 DEGREE ROTATING NOZZLE – This Humidifier was created with YOU in mind. Your environment, your needs, and your preferences! Designed with a super simple control dial and 360° rotating nozzle so that you can fully control and customize the mist output and mist flow direction. AUTOMATIC SHUT OFF- No need to babysit this Humidifier. We know you’ll want to shut this off before the tank runs out... Rest assured you can SET IT AND FORGET IT! ",
        "2.2L EXTRA LARGE WATER TANK – FILTER FREE- FEATURES A LIFTIME WARRENTY! Made with an impressive 2.2L super large water tank that keeps your Room-Humidifier right on chugging for over 24 hours on a single fill! Designed ",
      ],
      stock: "72",
      maxQty: "15",
    },
    {
      name: "TIRO CRG PNT WR",
      abbr: "TIRO CRG PNT WR",
      category: "apparels",
      image: "/imgs/product4.jpg",
      price: 20,
      brand: "Adidas",

      description: [
        "Lightweight woven fabric delivers superior comfort & durability.",
        "Material wicks sweat & dries really fast.",
        "Super-breathable mesh panels dump excess heat.",
        "Built-in brief for enhanced coverage.",
        "Ultra comfortable, soft knit waistband with internal drawcord.",
      ],
      stock: "36",
      maxQty: "20",
    },
    {
      name: "TYR Big Mesh Mummy Backpack",
      abbr: "TYR Big Mesh Mummy Backpack",
      category: "apparels",
      image: "/imgs/product5.jpg",
      price: 60,
      brand: "TYR",

      description: [
        "Lightweight woven fabric delivers superior comfort & durability.",
        "Material wicks sweat & dries really fast.",
        "Super-breathable mesh panels dump excess heat.",
        "Built-in brief for enhanced coverage.",
        "Ultra comfortable, soft knit waistband with internal drawcord.",
      ],
      stock: "50",
      maxQty: "20",
    },
    {
      name: "2021 Apple 12.9-inch iPad Pro (Wi-Fi, 128GB) - Silver",
      abbr: "Apple 12.9-inch iPad Pro",
      category: "smartphone",
      image: "/imgs/product6.jpg",
      price: 1000,
      brand: "Apple iPad Pro",

      description: [
        "10.9-inch Liquid Retina display with True Tone, P3 wide color, and an antireflective coating",
        "Apple M1 chip with Neural Engine",
        "12MP Wide camera",
        "12MP Ultra Wide front camera with Center Stage",
        "Stereo landscape speakers",
        "Touch ID for secure authentication and Apple Pay",
        "All-day battery life",
        "Wi-Fi 6",
        "USB-C connector for charging and accessories",
      ],
      stock: "0",
      maxQty: "3",
    },
  ],
};

export default data;
