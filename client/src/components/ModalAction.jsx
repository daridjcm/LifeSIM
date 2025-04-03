import { useEffect } from "react";
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
  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  if (!item) return null;

  // Define the list header dynamic
  let dynamicHeader = [];
  switch (item.name) {
    case "Work":
      dynamicHeader = ["Profession", "Work Experience", "Company", "Money earn per day"];
      break;
    case "Bank":
      dynamicHeader = ["Savings Account", "Current Account", "Money Inverted", "Debt"];
      break;
    case "Hospital":
      dynamicHeader = ["Health"];
      break;
    default:
      dynamicHeader = [];
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-3">
      <Card className="h-full w-full lg:max-h-[75%] lg:max-w-6xl p-2" radius="md" shadow="md">
        <CardHeader className="pb-0 pt-2 px-4 flex-row items-center justify-between">
          <div className="w-24">
          <Image
            alt={item.name}
            className="object-cover rounded-xl"
            src={item.img}
            width={150}
            height={50}
            />
            <div className="flex flex-col text-xl">
              <p className="text-default-500 mr-2">Inside the</p>
              <h4 id="itemTitle" className="font-bold text-large">{item.name}</h4>
            </div>
          </div>
            <ul className="flex flex-row gap-x-28">
              {dynamicHeader.map((element, index) => (
                <li key={index} className="bg-blue-200 px-5 py-1 rounded-full">{element}:</li>
              ))}
          </ul>
        </CardHeader>
        <CardBody
          className={item.name === "Work" ? "py-2 max-h-[60vh] min-h-full" : "max-h-full overflow-auto"}
        >
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
          <Button color="danger" variant="flat" size="sm" isPressible onPress={onClose}>
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>,
    document.body
  );
}
