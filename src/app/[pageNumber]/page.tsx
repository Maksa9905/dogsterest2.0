import Main from "../components/Main/Main";
import Image from "next/image";

export default function Home({ params }) {
  return <Main page={params.pageNumber}></Main>;
}
