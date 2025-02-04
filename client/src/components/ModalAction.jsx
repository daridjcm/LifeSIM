import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, CardHeader, CardBody, Image, CardFooter, Button } from "@heroui/react";

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
        <Card className="w-4/6 h-auto p-2" radius="md" shadow="md">
          <CardHeader className="pb-0 pt-2 px-4 flex-row items-center justify-between">
            <div>
              <p className="text-default-500">Inside the</p>
              <h4 className="font-bold text-large">{item.title}</h4>
            </div>
              <Image
                alt={item.title}
                className="object-cover rounded-xl"
                src={item.img}
                width={120}
              />
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex justify-center">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero vero numquam, necessitatibus aut impedit quia, soluta quae quod eaque a est asperiores. Sapiente, quos distinctio! Iusto saepe quidem eaque blanditiis?</p>
          </CardBody>
          <CardFooter className="flex justify-end">
            <Button color="danger" variant="flat" size="sm" onPress={onClose}>
              Cerrar
            </Button>
          </CardFooter>
        </Card>
    </div>,
    document.body // Asegura que el modal se renderice en el cuerpo del documento
  );
}
