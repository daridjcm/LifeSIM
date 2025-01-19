import CompForm from "../components/Form";

export default function SignUp() {
  return (
    <>
      <CompForm
        title="Create your life"
        name1="username"
        name2="email"
        label1="Username"
        label2="Email"
        placeholder1="Create your username"
        placeholder2="Enter your email"
        askAccount="false"
      />
    </>
  )
}
