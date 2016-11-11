import Food from '../models/food_model';

export const addFood = (req, res) => {
  const food = new Food();
  food.name = req.body.name;
  food.calories = req.body.calories;

  food.save()
  .then(result => {
    res.json({ message: 'Food created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

// export const deleteFood = (req, res) => {
//   res.send('delete a food');
// };

export const getCalories = (req, res) => {
  // Limits the response to 1 post
  console.log(`Finding ${req.body.name}`);
  Food.find({ name: req.body.name }).limit(1).exec((error, foods) => {
    // Retrieve first element in array
    console.log('Found one');
    console.log(foods);
    console.log(error);
    const food = foods[0];
    if (error === null && food && food.name && food.calories) {
      res.json({ name: food.name, calories: food.calories });
    } else {
      res.json({ error: 'invalid_food' });
    }
  });
};

// export const setCalories = (req, res) => {
//   res.send('sets number of calories');
// };
