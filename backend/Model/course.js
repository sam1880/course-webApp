const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true,
    unique:true
  },
  description:{
    type:String,
    required:true
  },
price:{
    type:Number,
    require:true
},
published:Boolean
},{

      timestamps:true
    }
);

const Course =mongoose.model('Course',courseSchema);
module.exports = Course;