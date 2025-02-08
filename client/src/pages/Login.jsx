import FormComp from "../components/Form";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <FormComp
        title="Welcome again to "
        name1="username"
        label1="Username"
        placeholder1="Enter your username"
        name2="email"
        label2="Email"
        placeholder2="Enter your email"
        name4="password"
        label4="Password"
        placeholder4="**********"
        askAccount={true}
      />
    </div>
  );
}
