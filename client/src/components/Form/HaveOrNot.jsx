import {useHref} from "react-router"

export function Have() {
  const href = useHref('/login/');
  return (
    <a
      className="text-xs m-auto underline cursor-pointer transition-all hover:text-blue-500"
      href={href}
    >
      Do you have an account?
    </a>
  );
}

export function NotHave() {
  const href = useHref('/signup/');
  return (
    <a
      className="text-xs m-auto underline cursor-pointer transition-all hover:text-blue-500"
      href={href}
    >
      Do you not have an account?
    </a>
  );
}
