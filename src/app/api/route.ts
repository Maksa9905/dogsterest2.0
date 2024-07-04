import mongoose from "mongoose";
import { DogImageModel } from "./DogImageModel";
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Enter MONGODB_URI at .env file");
}

mongoose.connect(MONGODB_URI);

type PostRequestBody = string[];

export async function POST(req) {
  const requestBody: PostRequestBody = await req.json();
  const length = requestBody.length;

  for (let i = 0; i < length; i++) {
    const currentPage = Math.floor(i / 20) + 1;
    const newUrl = new DogImageModel({
      _id: new mongoose.Types.ObjectId(),
      url: requestBody[i],
      pageNumber: currentPage,
      liked: false,
    });

    await newUrl.save();
  }
  console.log("MONGODB: " + `Added ${length} entities`);
  return new Response("200");
}

type GetRequestBody = {
  _id: string;
  url: string;
  pageNumber: number;
  liked: boolean;
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const _id = searchParams.get("id");
  const length = Math.round((await DogImageModel.countDocuments({})) / 20);

  if (_id) {
    const image = await DogImageModel.findOne({ _id: _id });
    return new Response(JSON.stringify({ image: image }));
  } else if (page) {
    const pageNumber = parseInt(page);
    const images: GetRequestBody[] = await DogImageModel.find({
      pageNumber: pageNumber,
    });
    return new Response(JSON.stringify({ images: images, length: length }));
  } else {
    const pageNumber = 1;
    const images: GetRequestBody[] = await DogImageModel.find({
      pageNumber: pageNumber,
    });
    return new Response(JSON.stringify({ images: images, length: length }));
  }
}

type PutRequestBody = {
  _id: string;
  liked: boolean;
};

export async function PUT(req) {
  const requestBody: PutRequestBody = await req.json();
  await DogImageModel.findOneAndUpdate(
    { _id: requestBody._id },
    { liked: !requestBody.liked }
  );
  console.log("MONGODB: " + `Updated ${requestBody._id}`);
  return new Response("200");
}
