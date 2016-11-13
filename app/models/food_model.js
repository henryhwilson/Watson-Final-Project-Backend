import mongoose, { Schema } from 'mongoose';

// create a schema for foods with a field
const FoodSchema = new Schema({
  name: String,
  calories: Number,
  totalFat: Number,
  protein: Number,
  totalCarb: Number,
  sugar: Number,
});

// create model class
const FoodModel = mongoose.model('Food', FoodSchema);

export default FoodModel;
