import mongoose from "mongoose";

const DogImageSchema = new mongoose.Schema({
  _id: String,
  url: String,
  pageNumber: Number,
  liked: Boolean,
});

export const DogImageModel =
  mongoose.models.DogImageModel ||
  mongoose.model("DogImageModel", DogImageSchema);
