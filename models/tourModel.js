const mongoose = require("mongoose");
const slugify = require("slugify");
//const validator = require("validator");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A Tour name must have less or equal than 40 characters"],
      minlength: [10, "A Tour name must be at least 10 characters"]
      //validate:[validator.isAlpha,"A Tour must only contain alpha characters"]
    },

    slug: String,

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "RatingsAverage has to be above or equal to 1.0"],
      max: [5, "RatingsAverage has to be below or equal to 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A Tour must have a price"],
    },
    priceDiscount: {
      type: Number,
        validate:{
            validator:function (val) {
           // THIS ONLY POINTS TO CURRENT DOC ON NEW DOCUMENT CREATION.
             return val < this.price;
            },
            message:"Discount price ({VALUE}) must be below regular price"
        }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A Tour must have a summary"],
    },
    duration: {
      type: Number,
      required: [true, "A Tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A Tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A Tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficulty"],
        message: "Difficulty is either easy medium or difficult",
      },
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A Tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation:{
      //Geo JSON
      type:{type:String,default:"point",enum:["point"]},
      cordinates:[Number],
      address:String,
      description:String,
    },
    locations:[
      {
        type:{
          type:String,
          default:"point",
          enum:["Point"]
        },
        coordinates:[Number],
        address:String,
        describtion:String,
        day:Number
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationweeks").get(function () {
  return this.duration / 7;
});

//DOCUMENT-MIDDLEWARE: runs before .save() and .create()
tourSchema.pre("save",function (next) {
  this.slug = slugify(this.name,{lower:true});
  next();
});
/*
tourSchema.pre("save",function (next) {
    console.log("Will save document");
    next();
})

tourSchema.post("save",function (doc, next) {
    console.log(doc);
    next();
});
*/

//QUERY-MIDDLEWARE:
tourSchema.pre(/^find/,function (next) {// run this middleware on all query's that start with "find".
    //tourSchema.pre("find",function (next)
    this.find({secretTour:{$ne:true}});
    this.start = Date.now();
    next();
});

tourSchema.post(/^find/,function (docs, next) {// runs after the query has executed.
    console.log(`Query took: ${Date.now() - this.start} miliseconds`);
    next();
});

//AGGREGATION-MIDDLEWARE:
tourSchema.pre("aggregate",function (next) {
    this.pipeline().unshift({$match:{secretTour:{$ne:true}}})
    next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
