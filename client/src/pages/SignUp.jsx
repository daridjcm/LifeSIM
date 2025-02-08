import FormComp from "../components/Form";

export default function SignUp() {
  return (
    <div className="flex justify-center items-center h-screen">
      <FormComp
        title="Create your life"
        name1="username"
        label1="Username"
        placeholder1="Create your username"
        name2="email"
        label2="Email"
        placeholder2="Enter your email"
        name3="gender"
        label3="Gender"
        items3={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }]}
        placeholder3="Select your gender"
        name4="password"
        label4="Password"
        placeholder4="Create your password"
        askAccount={false}
      />
    </div>
  );
}
