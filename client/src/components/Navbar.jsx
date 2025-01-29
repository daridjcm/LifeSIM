import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Avatar,
} from "@heroui/react";
import Clock from "./Clock";

// note: if the gender is females, the color Username and more buttons will (purple), if males, it will be (blue).
export default function Nav() {
  return (
    <Navbar
      isBlurred="true"
      isBordered="true"
      className="bg-zinc-50"
      maxWidth="full"
    >
      <NavbarBrand>
        <p className="font-bold text-2xl text-inherit">LifeSIM</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link aria-current="page" color="secondary">
            @Username
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Clock />
      </NavbarContent>
    </Navbar>
  );
}
