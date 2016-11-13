# starter express app template from cs52 16X

* node with babel
* expressjs
* airbnb eslint rules

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)

# backend data structure

# food table
(name, calories, totalFat, protein, totalCarb, sugar)
* POST [adminKey, name, calories, ..., sugar] -> /api/food
* GET [name] -> /api/food/FOOD_NAME returns [name, calories, ..., sugar]

# meal table
(user, food, date)
* POST [smsKey, phone, foodName] -> /api/meal
* GET [smsKey, phone] -> /api/meal

Sample output:

{
  "meals":
    [
      {"id":"5827f73a9485b42fe7aa2968","foodName":"Big Bad Junior"},
      {"id":"5827f73a9485b42fe7aa2967","foodName":"Big Bad Junior"},
      {"id":"5827f7399485b42fe7aa2966","foodName":"Big Bad Junior"},
      {"id":"5827f7389485b42fe7aa2965","foodName":"Big Bad Junior"},
      {"id":"5827f7379485b42fe7aa2964","foodName":"Big Bad Junior"},
      {"id":"5827f7149485b42fe7aa2963","foodName":"Big Bad Junior"}],
  "calories":5460,
  "totalFat":342,
  "protein":276,
  "totalCarb":318,
  "sugar":96
}

# user table
(phone, password)
* POST [phone, password] -> /api/signup (returns token)
* POST [phone, password] -> /api/signin (returns token)


return data.intents && data.intents.length > 0 && data.intents[0].intent === 'add_food';
