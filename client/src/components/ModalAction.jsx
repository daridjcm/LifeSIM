import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, CardHeader, CardBody, Image, CardFooter, Button, ScrollShadow } from "@heroui/react";
// Content Modal
import ContentWork from "./ContentModal/Work/Work";
import ContentBank from "./ContentModal/Bank/Bank";
import ContentGrocery from "./ContentModal/Grocery"

export default function ModalAction({ item, onClose }) {
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

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-3">
        <Card className="h-full w-full lg:h-fit lg:w-fit p-2" radius="md" shadow="md" >
          <CardHeader className="pb-0 pt-2 px-4 flex-row items-center justify-between">
            <div>
              <p className="text-default-500">Inside the</p>
              <h4 id="itemTitle" className="font-bold text-large">{item.title}</h4>
            </div>
              <Image
                alt={item.title}
                className="object-cover rounded-xl"
                src={item.img}
                width={80}
              />
          </CardHeader>
          <CardBody className={item.title == "Work" ? "py-2 max-h-[60vh] min-h-full" : "max-h-full"}>
              {
                item.title == "Work" ? <ScrollShadow hideScrollBar><ContentWork /></ScrollShadow> :
                item.title == "Bank" ? <ContentBank /> : <ContentGrocery />
              }
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
