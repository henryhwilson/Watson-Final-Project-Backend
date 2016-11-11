import { Router } from 'express';
import * as Food from './controllers/food_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our food api!' });
});

router.route('/food')
  .post(Food.addFood);

// router.route('/food/:foodName')
//   .delete(Food.deleteFood);

router.route('/food/calories')
  // .post(Food.setCalories)
  .get(Food.getCalories);

export default router;
