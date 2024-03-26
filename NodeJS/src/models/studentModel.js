import mongoose from 'mongoose';
const { Schema } = mongoose;

const studentSchema = new Schema({
    mssv: {
        type: String,
        require: true,
        unique: true
    },
    nameDesc:{
        type: String,
        require: true
    },
    birthday:{
        type: Date,
        require: true
    },
    class:{
        type: String,
        require: true
    }
});

export const Student = mongoose.model('Student', studentSchema);