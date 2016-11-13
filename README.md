# starter express app template from cs52 16X

* node with babel
* expressjs
* airbnb eslint rules

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)

# backend data structure

1. food table (name, calories, totalFat, protein, totalCarb, sugar)
* POST [adminKey, name, calories, ..., sugar] -> /api/food
* GET [name] -> /api/food/FOOD_NAME returns [name, calories, ..., sugar]
2. meal table (user, food, date)
* POST [token, foodName] -> /api/meal
3. user table (phone, password)
* POST [phone, password] -> /api/signup (returns token)
* POST [phone, password] -> /api/signin (returns token)
