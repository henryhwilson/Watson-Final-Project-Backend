import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const FoodSchema = new Schema({
  name: String,
  calories: Number,
});

// create model class
const FoodModel = mongoose.model('Food', FoodSchema);

export default FoodModel;
