import CompForm from "../components/Form";

export default function Login() {
  return (
    <>
      <CompForm
        title="Welcome to"
        name1="username"
        name2="email"
        label1="Username"
        label2="Email"
        placeholder1="Enter your username"
        placeholder2="Enter your email"
        askAccount="true"
      />
    </>
  )
}
