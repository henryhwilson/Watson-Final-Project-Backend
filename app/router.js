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

// TODO: Remove this route, or require some sort of key
router.route('/food')
  .post(FoodController.addFood);

router.route('/food/:name')
  .get(FoodController.getNutrition);

router.route('/meal')
  .post(MealController.addMeal);

export default router;
