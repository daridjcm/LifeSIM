import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Avatar,
} from "@heroui/react";

// note: if the gender is females, the color Avatar is warning.
export default function Nav() {
  return (
    <Navbar>
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
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </NavbarContent>
    </Navbar>
  );
}
