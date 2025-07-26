const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, 'A testimonial must have a quote'],
    trim: true,
    maxlength: [500, 'A testimonial quote must have less than or equal to 500 characters']
  },
  name: {
    type: String,
    required: [true, 'A testimonial must have a name'],
    trim: true,
    maxlength: [100, 'A name must have less than or equal to 100 characters']
  },
  title: {
    type: String,
    required: [true, 'A testimonial must have a title or role'],
    trim: true,
    maxlength: [100, 'A title must have less than or equal to 100 characters']
  },
  avatar: {
    type: String,
    required: [true, 'A testimonial must have an avatar URL'],
    trim: true,
  },
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
module.exports = Testimonial;
