const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
    },
    description:{
        type: String,
        required: [true, 'Please add a description']
    },
    weeks:{
        type: String,
        required: [true, 'Please add number of weeks']
    },
    tuition:{
        type: Number,
        required: [true, 'Please add a tution cost']
    },
    minimumSkill:{
        type: String,
        required: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scholarshipsAvailable:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    bootcamp:{
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true  //every course needs to have a bootcamp
    }
});


module.exports = mongoose.model('Course', CourseSchema);