import FormComp from "../components/Form";

export default function SignUp() {
  return (
    <>
      <FormComp
        title="Create your life"
        name1="username"
        label1="Username"
        placeholder1="Create your username"
        name2="email"
        label2="Email"
        placeholder2="Enter your email"
        name3="password"
        label3="Password"
        placeholder3="Create your password"
        askAccount="false"
      />
    </>
  );
}
