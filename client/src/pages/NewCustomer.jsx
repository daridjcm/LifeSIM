import FormComp from "../components/Form";

export default function NewCustomer() {
  return (
    <div className="flex justify-center items-center h-screen">
      <FormComp
        title="Enter the info the customer"
        name1="fullname"
        label1="Full Name"
        placeholder1="Enter full name of customer"
        name2="phone"
        label2="Phone"
        placeholder2="Enter phone number of customer"
        label3="Call Status"
        items3={[{ value: 1, label: "Make call" }, { value: 2, label: "Call rejected" }, { value: 3, label: "Call accepted" }, { value: 4, label: "Call completed" }, { value: 5, label: "No call" }]}
        placeholder3="Select your call status"
        askAccount={'customers'}
      />
    </div>
  );
}