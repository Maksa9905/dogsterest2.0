"use client";

import style from "./Main.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { useGetImagesQuery } from "@/app/reduxApi/reduxapi";
import Loading from "../Loading/Loading";
import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";

async function getImages(page: number) {
  const response = await fetch(`http://localhost:3000/api?page=${page}`);
  return await response.json();
}

const handleChange = (
  event: React.ChangeEvent<unknown>,
  value: number,
  router: any
) => {
  router.push(`/${value}`);
};

export default function Main({ page }: { page: number }) {
  const { data, isFetching } = useGetImagesQuery(page);

  const images = data?.images;
  const length = data?.length;
  console.log(length);

  const router = useRouter();

  if (isFetching) {
    return <Loading />;
  }
  if (images) {
    return (
      <main>
        <div className={`${style.main__inner} container`}>
          {images.map((image) => (
            <ImageCard
              liked={image.liked}
              key={image._id}
              imageName={image.url}
              id={image._id}
            />
          ))}
        </div>
        <Pagination
          className="container"
          style={{ display: "flex", justifyContent: "center" }}
          count={length}
          page={page}
          color="primary"
          onChange={(event, value: number) =>
            handleChange(event, +value, router)
          }
        ></Pagination>
      </main>
    );
  }
}
