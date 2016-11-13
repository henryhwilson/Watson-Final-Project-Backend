import { Router } from 'express';
import { requireAuth, requireSignin } from './services/passport';

import * as Food from './controllers/food_controller';
import * as UserController from './controllers/user_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our food api!' });
});

router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);

router.route('/food')
  .post(Food.addFood);

router.route('/food/:name')
  .get(Food.getNutrition);

// router.route('/eat')
//   .post(requireAuth, Eaten.addFood);

// router.route('/food/:foodName')
//   .delete(Food.deleteFood);

router.route('/food/calories/:name')
  .get(Food.getCalories);

router.route('/food/totalFat/:name')
  .get(Food.getTotalFat);

router.route('/food/protein/:name')
  .get(Food.getProtein);

router.route('/food/totalCarb/:name')
  .get(Food.getTotalCarb);

router.route('/food/sugar/:name')
  .get(Food.getSugar);

export default router;
