require('dotenv').config();
const mongoose = require('mongoose');

const Schema = mongoose.Schema

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const homerSimpson = new Person({
    name: "Homer Simpson", 
    age: 40, 
    favoriteFoods: ["donuts", "beer"]
  });

  homerSimpson.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const arrayOfPeople = [
  {name: "Bart Simpson", age: 10, favoriteFoods: ["candy"]},
  {name: "Lisa Simpson", age: 8, favoriteFoods: ["veggies"]},
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, person) => {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save(function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({ name: nameToRemove }, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch }).sort({ name: -1 }).limit(2).select({ age: 0 }).exec(function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
