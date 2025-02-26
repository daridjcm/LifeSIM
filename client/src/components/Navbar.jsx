import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@heroui/react";
import Clock from "./Clock.jsx";
import {useUser} from "../context/UserContext.jsx"

export default function Nav() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Navbar isBlurred="true" isBordered="true" className="bg-zinc-50" maxWidth="full">
      <NavbarBrand>
        <p className="font-bold text-2xl text-inherit">LifeSIM</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link className="text-3xl" aria-current="page" color="success">
            @{user.username}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Clock />
      </NavbarContent>
    </Navbar>
  );
}
