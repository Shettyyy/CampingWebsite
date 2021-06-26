const mongoose = require('mongoose');
const Campground = require('../models/campground');
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
    for(let i=0;i<50;i++){    
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title : `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image : 'https://source.unsplash.com/collection/483251',
            description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur nostrum commodi quas veritatis, odit quam molestiae perspiciatis tenetur illum? Voluptates delectus, nihil saepe deserunt sequi mollitia vel quasi corrupti odit!",
            price  
        });
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})