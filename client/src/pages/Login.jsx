import FormComp from "../components/Form";

export default function Login() {
  return (
    <>
      <FormComp
        title="Welcome to"
        name1="username"
        label1="Username"
        placeholder1="Enter your username"
        name4="password"
        label4="Password"
        placeholder4="**********"
        askAccount={true}
      />
    </>
  );
}
