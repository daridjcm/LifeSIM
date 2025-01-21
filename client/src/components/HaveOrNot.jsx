export function Have() {
  return (
    <a className="text-xs m-auto underline cursor-pointer transition-all hover:text-blue-500" href="/login">Do you have an account?</a>
  )
}

export function NotHave() {
  return (
    <a className="text-xs m-auto underline cursor-pointer transition-all hover:text-blue-500" href="/signup">Do you not have an account?</a>
  )
}
