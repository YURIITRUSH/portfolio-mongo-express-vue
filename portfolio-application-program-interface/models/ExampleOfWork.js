const mongoose = require('mongoose')
var slugify = require('slugify')
const exampleOfWorkSchema = mongoose.Schema({
  title: {
    type: String,
    required: "Заголовок обов'язковий"
  },
  slug: {
    type: String,
    required: true,

  },
  link: {
    type: String,
    lowercase: true 
  },
  desc: {
    type: String,
    required: "Опис обов'язковий",
    minlength: 1
  },
  image: {
    type: String,
    required: "Зображення обов'язкове"
  },
  price: {
    type: String,
    required: "Витрати обов'язкові"
  },
  usedSkills: {
    type: String,
    required: "Використанні технології обов'язкові"
  },
})
exampleOfWorkSchema.pre('validate',function () {
  this.slug = slugify(this.title).toLowerCase()
})

exampleOfWorkSchema.path('slug').validate(function (value, respond) {
return mongoose.model('ExampleOfWork').count({ slug: value }).exec().then(function (count) {
    return !count;
  })
  .catch(function (err) {
    throw err;
  });
}, 'Page already exists');

const ExampleOfWork = mongoose.model('ExampleOfWork', exampleOfWorkSchema)

module.exports = ExampleOfWork
