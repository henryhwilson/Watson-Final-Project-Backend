import Food from '../models/food_model';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

export const addFood = (req, res) => {
  const adminKey = req.body.adminKey;

  if (adminKey !== process.env.ADMIN_KEY) {
    res.json({ error: 'Invalid adminKey, ask the developer for access' });
  }

  const food = new Food();
  food.name = req.body.name;
  food.calories = req.body.calories;
  food.totalFat = req.body.totalFat;
  food.protein = req.body.protein;
  food.totalCarb = req.body.totalCarb;
  food.sugar = req.body.sugar;

  food.save()
  .then(result => {
    res.json({ message: 'Food created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getNutrition = (req, res) => {
  // Limits the response to 1 post
  Food.find({ name: req.params.name }).limit(1).exec((error, foods) => {
    const food = foods[0];
    if (error === null && food && food.name) {
      res.json({
        name: food.name,
        calories: food.calories,
        totalFat: food.totalFat,
        protein: food.protein,
        totalCarb: food.totalCarb,
        sugar: food.sugar,
      });
    } else {
      res.json({ error: 'invalid_food' });
    }
  });
};
