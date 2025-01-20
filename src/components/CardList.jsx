import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import list from '../utils/List'

export default function CardList() {
  function getColor(item) {
    return(
      item.title === 'Work' ? 'bg-blue-400' :
      item.title === 'Bank' ? 'bg-yellow-400' :
      item.title === 'SuperMarket' ? 'bg-green-400' : 
      item.title === 'Ocean Mall' ? 'bg-purple-400' : 
      item.title === 'Social' ? 'bg-orange-400' : 
      item.title === 'Home' ? 'bg-red-400' : 'bg-gray-200'
    )
  }
  
  return (
    <div className="gap-2 p-5 grid grid-cols-3 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card key={index} shadow="sm">
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.desc}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <p className="text-default-500">{item.desc}</p>
            <Button size='sm' isPressible key={item.title} className={getColor(item)}>{item.title}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
