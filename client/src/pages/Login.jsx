import CompForm from "../components/Form";

export default function Login() {
  return (
    <>
      <CompForm
        title="Welcome to"
        name1="username"
        label1="Username"
        placeholder1="Enter your username"
        name3="password"
        label3="Password"
        placeholder3="**********"
        askAccount="true"
      />
    </>
  )
}
