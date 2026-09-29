import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavContainer } from "./navContainer.js";
import { Logo } from "./logo.js";
import { MenuToggle } from "./menuToggle.js";
import { MenuLinks } from "./menuLinks.js";
import {
  getAccountInfo,
  accountData,
} from "../../../app/features/account/accountSlice.js";

const NavBar = () => {
  const dispatch = useDispatch();
  const account = useSelector(accountData);
  const [isOpen, setIsOpen] = useState(false);

  const isAuth = Boolean(sessionStorage.getItem("session_id"));
  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isAuth) {
      dispatch(getAccountInfo());
    }
  }, [dispatch, isAuth]);

  return (
    <NavContainer>
      <Logo />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} accountInfo={account} isAuth={isAuth} />
    </NavContainer>
  );
};

export default NavBar;
