import mongoose, { Schema } from 'mongoose';

// new schema, Meals w/ field
const MealSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  food: { type: Schema.Types.ObjectId, ref: 'Food' },
  date: { type: Date, default: Date.now },
});

// create a class for the model
const MealModel = mongoose.model('Meal', MealSchema);

export default MealModel;
