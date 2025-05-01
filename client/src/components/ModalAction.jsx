import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
  ScrollShadow,
} from "@heroui/react";

// Content Modal
import ContentWork from "./ContentModal/Work/Index.jsx";
import ContentBank from "./ContentModal/Bank/Index.jsx";
import ContentGrocery from "./ContentModal/Grocery/Index.jsx";
import ContentHospital from "./ContentModal/Hospital/Index.jsx";

export default function ModalAction({ item, onClose, listHeader = [] }) {
  const [isClosing, setIsClosing] = useState(false);

  // Handle close for the modal
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 1000);
  };

  // If the user clicks Escape key
  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  if (!item) return null;

  let dynamicHeader = [];

  // Define dynamic header based on item name
  switch (item.name) {
    case "Work":
      dynamicHeader = [
        "Profession",
        "Work Experience",
        "Company",
        "Money earn per day",
      ];
      break;
    case "Bank":
      dynamicHeader = [
        "Savings Account",
        "Current Account",
        "Money Inverted",
        "Debt",
      ];
      break;
    case "Hospital":
      dynamicHeader = ["Health"];
      break;
    default:
      dynamicHeader = [];
  }

  // Render view based on item name
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-3 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <Card
        className={`h-full w-full lg:max-h-screen lg:max-w-full p-2 transform transition-transform duration-300 ${
          isClosing ? "scale-95" : "scale-100"
        }`}
        radius="md"
        shadow="md"
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-row items-center justify-between">
          <div className="w-fit">
            <Image
              alt={item.name}
              className="object-cover rounded-xl"
              src={item.img}
              width={150}
              height={50}
            />
            <div className="flex flex-row text-xl">
              <p className="text-default-500 mr-2">Inside the</p>
              <h4 id="itemTitle" className="font-bold text-large">
                {item.name}
              </h4>
            </div>
          </div>
          <ul className="flex sm:flex-col md:flex-col lg:flex-row gap-x-28 gap-y-2">
            {dynamicHeader.map((element, index) => (
              <li key={index} className="bg-blue-200 w-fit px-3 rounded-full">
                {element}:
              </li>
            ))}
          </ul>
        </CardHeader>
        <CardBody
          className={
            item.name === "Work"
              ? "py-2 max-h-[60vh] min-h-full"
              : "max-h-full overflow-auto"
          }
        >
          // Render content based on item name
          {item.name === "Work" ? (
            <ContentWork />
          ) : item.name === "Bank" ? (
            <ContentBank />
          ) : item.name === "Hospital" ? (
            <ContentHospital />
          ) : (
            <ContentGrocery />
          )}
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button
            color="danger"
            variant="flat"
            size="sm"
            isPressible
            onPress={handleClose}
          >
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>,
    document.body,
  );
}
