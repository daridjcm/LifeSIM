import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
} from '@heroui/react';

import ContentWork from './ContentModal/Work/Index.jsx';
import ContentBank from './ContentModal/Bank/Index.jsx';
import ContentGrocery from './ContentModal/Grocery/Index.jsx';
import ContentHospital from './ContentModal/Hospital/Index.jsx';
import { useUser } from '../context/UserContext.jsx';

export default function ModalAction({ item, onClose, listHeader = [] }) {
  const [isClosing, setIsClosing] = useState(false);
  const [data, setData] = useState(null);
  const { user } = useUser();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 1000);
  };

  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id || !item?.name) return;

      try {
        let endpoint = '';
        switch (item.name) {
          case 'Bank':
            endpoint = `http://localhost:3000/api/bank/${user?.id}`;
            break;
          case 'Work':
            endpoint = `http://localhost:3000/api/work/${user?.id}`;
            break;
          case 'Hospital':
            endpoint = `http://localhost:3000/api/health/${user?.id}`;
            break;
          default:
            return;
        }

        const response = await fetch(endpoint);
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('❌ Error fetching data for modal:', err);
      }
    };

    fetchData();
  }, [item, user]);

  if (!item) return null;

  let dynamicHeader = [];
  switch (item.name) {
    case 'Work':
      dynamicHeader = ['Profession', 'Work Experience', 'Company', 'Income'];
      break;
    case 'Bank':
      dynamicHeader = ['Savings', 'Current', 'Inverted', 'Debt'];
      break;
    case 'Hospital':
      dynamicHeader = ['Health'];
      break;
    default:
      dynamicHeader = [];
  }

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-3 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Card
        className={`h-full w-full lg:max-h-screen lg:max-w-full p-2 transform transition-transform duration-300 ${
          isClosing ? 'scale-95' : 'scale-100'
        }`}
        radius='md'
        shadow='md'
      >
        <CardHeader className='pb-0 pt-2 px-4 flex-row items-center justify-between'>
          <div className='w-fit'>
            <Image
              alt={item.name}
              className='object-cover rounded-xl'
              src={item.img}
              width={150}
              height={50}
            />
            <div className='flex flex-row text-xl'>
              <p className='text-default-500 mr-2'>Inside the</p>
              <h4 id='itemTitle' className='font-bold text-large'>
                {item.name}
              </h4>
            </div>
          </div>
          <ul className='flex sm:flex-col md:flex-col lg:flex-row gap-x-28 gap-y-2'>
            {dynamicHeader.map((element, index) => (
              <li key={index} className='bg-blue-200 w-fit px-3 rounded-full'>
                {element}:
              </li>
            ))}
          </ul>
        </CardHeader>
        <CardBody className='max-h-full overflow-auto'>
          {item.name === 'Work' ? (
            <ContentWork data={data} />
          ) : item.name === 'Bank' ? (
            <ContentBank data={data} />
          ) : item.name === 'Hospital' ? (
            <ContentHospital data={data} />
          ) : (
            <ContentGrocery data={data} />
          )}
        </CardBody>
        <CardFooter className='flex justify-end'>
          <Button
            color='danger'
            variant='flat'
            size='sm'
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
