import React, { useState, useEffect } from "react";
import { NavContainer } from "./navContainer.js";
import { Logo } from "./logo.js";
import { MenuToggle } from "./menuToggle.js";
import { MenuLinks } from "./menuLinks.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountInfo,
  accountData,
} from "../../../app/features/account/accountSlice.js";

const NavBar = () => {
  const isAuth = sessionStorage.getItem("session_id");
  const dispatch = useDispatch();
  const account = useSelector(accountData);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    isAuth && dispatch(getAccountInfo());
  });

  return (
    <NavContainer>
      <Logo />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} accountInfo={account} isAuth={isAuth} />
    </NavContainer>
  );
};

export default NavBar;
