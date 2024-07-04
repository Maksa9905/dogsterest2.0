"use client";
import style from "./Header.module.css";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar-example.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SmsIcon from "@mui/icons-material/Sms";
import { useMediaQuery } from "react-responsive";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";

export default function Header() {
  const md = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const sm = useMediaQuery({
    query: "(min-width: 640px)",
  });

  return (
    <header className={style.header}>
      <Image src={logo} alt="logo" width={32} height={32}></Image>
      {sm && (
        <div className={style.buttonBox}>
          <button className={`${style.button}`}>Главная</button>
          <button className={`${style.transparent} transparent`}>
            Создать
          </button>
        </div>
      )}
      {!sm && (
        <IconButton aria-label="more">
          <MoreHorizIcon />
        </IconButton>
      )}
      {sm && (
        <input type="text" placeholder="Поиск" className={style.searchInput} />
      )}
      {!sm && (
        <IconButton
          onClick={() => setIsSearchOpened((prev) => !prev)}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      )}
      <div className={style.servicesBox}>
        <IconButton aria-label="notifications">
          <NotificationsIcon />
        </IconButton>
        <IconButton aria-label="messages">
          <SmsIcon />
        </IconButton>
      </div>
      <div className={style.profileBox}>
        <Image src={avatar} alt="avatar" width={48} height={48}></Image>
        <IconButton aria-label="more">
          <ExpandMoreIcon />
        </IconButton>
      </div>
      {!sm && isSearchOpened && (
        <input type="text" placeholder="Поиск" className={style.searchInput} />
      )}
    </header>
  );
}
