const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Review = require('../models/review');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/CampWithCare',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("CampWithCare database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async ()=>{
    await Campground.deleteMany({});
    await Review.deleteMany({});
    for(let i=0;i<300;i++){    
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:'60e29127011dbd3b9874b81e',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur nostrum commodi quas veritatis, odit quam molestiae perspiciatis tenetur illum? Voluptates delectus, nihil saepe deserunt sequi mollitia vel quasi corrupti odit!",
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url : "https://res.cloudinary.com/dilsqlwhn/image/upload/v1625579095/CampWithCare/zowop1spmuscqers74ld.jpg",
                    filename : "CampWithCare/zowop1spmuscqers74ld"
                },
                {
                    url : "https://res.cloudinary.com/dilsqlwhn/image/upload/v1625579101/CampWithCare/vzyiik3vpo5azyt3rohg.jpg",
                    filename : "CampWithCare/vzyiik3vpo5azyt3rohg"
                },
                {
                    url : "https://res.cloudinary.com/dilsqlwhn/image/upload/v1625579115/CampWithCare/edyytbamkno3nxjvztfm.jpg",
                    filename : "CampWithCare/edyytbamkno3nxjvztfm"
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})