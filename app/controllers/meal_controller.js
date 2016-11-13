import Meal from '../models/meal_model';
import Food from '../models/food_model';
import User from '../models/user_model';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

export const addMeal = (req, res) => {
  console.log('Creating a meal...');

  const smsKey = req.body.smsKey;

  if (smsKey !== process.env.SMS_KEY) {
    res.json({ error: 'Invalid smsKey. Please contact the developer.', smsKey, other: process.env.SMS_KEY });
  } else {
    // Make sure the user is valid
    const phone = req.body.phone;
    User.findOne({ phone }, (userError, user) => {
      if (!user) {
        res.json({ error: 'No user was found with that phone number' });
      } else if (userError !== null) {
        res.json({ userError });
      } else {
        // Make sure the food is valid
        const foodName = req.body.foodName;
        Food.findOne({ name: foodName }, (foodError, food) => {
          if (!food) {
            res.json({ error: 'No food was found with that name' });
          } else if (foodError !== null) {
            res.json({ error: foodError });
          } else {
            // Now we know there is a valid food. Create it!
            const meal = new Meal();
            meal.user = user._id;
            meal.food = food._id;
            meal.save()
            .then(result => {
              console.log(meal);
              res.json({ message: 'Meal added!' });
            })
            .catch(createMealError => {
              console.log(createMealError);
              res.json({ createMealError });
            });
          }
        });
      }
    });
  }
};

// Returns meals for the same calendar day
export const getMeals = (req, res) => {
  console.log('Getting meals');

  console.log('Creating a meal...');

  const smsKey = req.body.smsKey;

  if (smsKey !== process.env.SMS_KEY) {
    res.json({ error: 'Invalid smsKey. Please contact the developer.' });
  } else {
    // Make sure the user is valid
    const phone = req.body.phone;
    User.findOne({ phone }, (userError, user) => {
      if (!user) {
        res.json({ error: 'No user was found with that phone number' });
      } else if (userError !== null) {
        res.json({ userError });
      } else {
        // Filter by date
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        Meal.find({ user: user._id, date: { $gte: start, $lt: end } })
        .sort('-date')
        .populate('food')
        .exec((error, meals) => {
          if (error) {
            res.json({ error });
          } else {
            const allMeals = [];
            let calories = 0;
            let totalFat = 0;
            let protein = 0;
            let totalCarb = 0;
            let sugar = 0;
            meals.forEach((meal) => {
              allMeals.push({ id: meal._id, foodName: meal.food.name });
              calories += meal.food.calories;
              totalFat += meal.food.totalFat;
              protein += meal.food.protein;
              totalCarb += meal.food.totalCarb;
              sugar += meal.food.sugar;
            });
            res.json({
              meals: allMeals,
              calories,
              totalFat,
              protein,
              totalCarb,
              sugar,
            });
          }
        });
      }
    });
  }
};

/*
export const getPosts = (req, res) => {
  console.log('Getting posts');
  Post.find()
  .sort('-created_at')
  .populate('author')
  .exec((error, posts) => {
    res.json(posts.map(post => {
      if (post.author) {
        return { id: post._id, title: post.title, tags: post.tags, author: post.author.full_name, author_id: post.author._id };
      } else {
        return { id: post._id, title: post.title, tags: post.tags, author: 'Anonymous' };
      }
    }));
  });
};

export const getPost = (req, res) => {
  // Limits the response to 1 post
  Post.findOne({ _id: req.params.id }).populate('author').exec((error, post) => {
    if (post) {
      if (post.author) {
        res.json({ id: post._id, title: post.title, tags: post.tags, content: post.content, author: post.author.full_name, author_id: post.author._id });
      } else {
        res.json({ id: post._id, title: post.title, tags: post.tags, content: post.content, author: 'Anonymous' });
      }
    } else {
      res.json(error);
    }
  });
};

export const deletePost = (req, res) => {
  console.log('Removing post...');
  Post.remove({ _id: req.params.id }, (error, posts) => {
    if (error === null) {
      res.json({ message: 'Post deleted!' });
    } else {
      res.json({ error });
    }
  });
};

export const updatePost = (req, res) => {
  console.log('Updating with info');
  console.log(req.body);
  Post.update({ _id: req.params.id }, { title: cleanTitle(req.body.title), tags: req.body.tags, content: req.body.content }, {}, (error, raw) => {
    if (error === null) {
      res.json({ message: 'Post updated!' });
    } else {
      res.json({ error });
    }
  });
};
*/
