import { Router } from 'express';
import { requireAuth, requireSignin } from './services/passport';

import * as FoodController from './controllers/food_controller';
import * as MealController from './controllers/meal_controller';
import * as UserController from './controllers/user_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our food api!' });
});

router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);

router.route('/food')
  .get(FoodController.getFoods)   // open access
  .post(FoodController.addFood);  // requires adminKey

router.route('/food/:name')
  .get(FoodController.getNutrition);  // open access

router.route('/smsMeal')
  .post(MealController.addMeal)
  .get(MealController.getMeals);

export default router;
