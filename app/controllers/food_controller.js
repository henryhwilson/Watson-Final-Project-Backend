import Food from '../models/food_model';

export const addFood = (req, res) => {
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

export const getFoods = (req, res) => {
  console.log('Getting foods');
  Food.find()
  .sort('name')
  .exec((error, foods) => {
    if (!error && foods) {
      res.json(foods.map(food => {
        return {
          name: food.name,
          calories: food.calories,
          totalFat: food.totalFat,
          protein: food.protein,
          totalCarb: food.totalCarb,
          sugar: food.sugar,
        };
      }));
    }
  });
};

// export const deleteFood = (req, res) => {
//   res.send('delete a food');
// };

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

export const getCalories = (req, res) => {
  // Limits the response to 1 post
  Food.find({ name: req.params.name }).limit(1).exec((error, foods) => {
    const food = foods[0];
    if (error === null && food && food.name) {
      res.json({ name: food.name, calories: food.calories });
    } else {
      res.json({ error: 'invalid_food' });
    }
  });
};

export const getTotalFat = (req, res) => {
  // Limits the response to 1 post
  Food.find({ name: req.params.name }).limit(1).exec((error, foods) => {
    const food = foods[0];
    if (error === null && food && food.name) {
      res.json({ name: food.name, totalFat: food.totalFat });
    } else {
      res.json({ error: 'invalid_food' });
    }
  });
};

export const getProtein = (req, res) => {
  // Limits the response to 1 post
  Food.find({ name: req.params.name }).limit(1).exec((error, foods) => {
    const food = foods[0];
    if (error === null && food && food.name) {
      res.json({ name: food.name, protein: food.protein });
    } else {
      res.json({ error: 'invalid_food' });
    }
  });
};

export const getTotalCarb = (req, res) => {
  // Limits the response to 1 post
  Food.find({ name: req.params.name }).limit(1).exec((error, foods) => {
    const food = foods[0];
    if (error === null && food && food.name) {
      res.json({ name: food.name, totalCarb: food.totalCarb });
    } else {
      res.json({ error: 'invalid_food' });
    }
  });
};

export const getSugar = (req, res) => {
  // Limits the response to 1 post
  Food.find({ name: req.params.name }).limit(1).exec((error, foods) => {
    const food = foods[0];
    if (error === null && food && food.name) {
      res.json({ name: food.name, sugar: food.sugar });
    } else {
      res.json({ error: 'invalid_food' });
    }
  });
};

// export const setCalories = (req, res) => {
//   res.send('sets number of calories');
// };
