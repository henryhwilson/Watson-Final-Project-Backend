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
  .get(Food.getCalories);

router.route('/food/totalFat')
  .get(Food.getTotalFat);

router.route('/food/protein')
  .get(Food.getProtein);

router.route('/food/totalCarb')
  .get(Food.getTotalCarb);

router.route('/food/sugar')
  .get(Food.getSugar);

export default router;
