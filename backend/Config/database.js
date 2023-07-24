const mongoose =require('mongoose');

mongoose.connect('mongodb+srv://jd:Rahul1234@cluster0.kulsjf5.mongodb.net/');

const db =mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to database'));
db.once('open',()=>{
    console.log('successfully connect to db');
})