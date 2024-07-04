import style from "./ImageCard.module.css";
import Checkbox from "@mui/material/Checkbox";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import {
  useGetImagesQuery,
  useLikeImageMutation,
} from "@/app/reduxApi/reduxapi";
import { useSelector } from "react-redux";

export default function ImageCard({
  imageName,
  id,
  liked,
}: {
  imageName: string;
  liked: boolean;
  id: string;
}) {
  const imageUrl = `https://random.dog/${imageName}`;
  const width = 310;
  const height = 310;
  const [likeImage, {}] = useLikeImageMutation();

  if (imageName.slice(-3) === "mp4" || imageName.slice(-4) === "webm") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <video
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={style.imageBox}
          key={id}
          width={310}
          height={310}
          autoPlay
          loop
          muted
        >
          <source type="video/mp4" src={`https://random.dog/${imageName}`} />
        </video>
        <Checkbox
          checked={liked}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          onClick={async (event) => await likeImage({ _id: id, liked: liked })}
        />
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={style.imageBox}
      ></div>
      <Checkbox
        checked={liked}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        onClick={async (event) => await likeImage({ _id: id, liked: liked })}
      />
    </div>
  );
}
