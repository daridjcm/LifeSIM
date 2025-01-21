import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import list from '../utils/List';
import {ArrowLeftEndOnRectangleIcon} from '@heroicons/react/24/outline' 

export default function CardList() {
  function getColor(item) {
    return(
      item.title === 'Work' ? 'text-blue-800 bg-blue-400' :
      item.title === 'Bank' ? 'text-cyan-800 bg-cyan-400' :
      item.title === 'Grocery' ? 'text-green-800 bg-green-400' : 
      item.title === 'Ocean Mall' ? 'text-gray-800 bg-gray-400' : 
      item.title === 'Social' ? 'text-orange-800 bg-orange-400' : 
      item.title === 'Home' ? 'text-red-800 bg-red-400' : 'text-zinc-300 bg-zinc-900'
    )
  }
  
  function handleActions(item) {
    return(`You called action: ${item.title}`)
  }
  
  return (
    <div className="gap-x-1 gap-y-5 mt-5 mb-5 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
      {list.map((item, index) => (
        <Card key={index} shadow="sm" className="m-auto max-w-[90%]">
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="object-cover"
              radius="md"
              shadow="sm"
              width={'100%'}
              src={item.img}
              isBlurred
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <p className="text-default-500">{item.desc}</p>
            <Button size='sm' isPressible onPress={handleActions(item)} key={item.title} className={[getColor(item), 'w-[60%] text-sm']}>{item.title}<span><ArrowLeftEndOnRectangleIcon className="size-5 text-zinc-100 opacity-60" /></span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
