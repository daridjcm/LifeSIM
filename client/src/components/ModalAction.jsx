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
import ContentHome from './ContentModal/Home/Index.jsx';
import { useUser } from '../context/UserContext.jsx';

const HEADER_MAPPING = {
  Work: ['Job', 'Work Experience', 'Company', 'Salary'],
  Bank: ['Savings', 'Current', 'Inverted', 'Debt'],
  Hospital: ['Health', 'Blood Type'],
  Home: ['Public Services Payment Date', 'Public Services Total Cost'],
};

const DATA_KEY_MAPPING = {
  Savings: 'savings_account',
  Current: 'current_account',
  Inverted: 'money_inverted',
  Debt: 'debt',
  Health: 'health',
  BloodType: 'blood_type',
  Job: 'job',
  WorkExperience: 'work_experience',
  Company: 'company',
  Salary: 'salary',
};

export default function ModalAction({ item, onClose }) {
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
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  const token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id || !item?.name) return;

      const ENDPOINTS = {
        Bank: 'http://localhost:3000/api/bank',
        Work: 'http://localhost:3000/api/work',
        Hospital: 'http://localhost:3000/api/me',
        Home: 'http://localhost:3000/api/home',
      };

      try {
        const response = await fetch(ENDPOINTS[item.name], options);
        const result = await response.json();
        setData(result);
        console.log('Data fetched:', result);
      } catch (err) {
        console.error(`❌ Fetch error for ${item.name}:`, err);
      }
    };
    
    fetchData();
  }, [item, user]);
  
  if (!item) return null;

  return ReactDOM.createPortal(
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-3 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <Card className={`h-full w-full lg:max-h-screen lg:max-w-full p-2 transform transition-transform duration-300 ${isClosing ? 'scale-95' : 'scale-100'}`} radius="md" shadow="md">
        <CardHeader className="pb-0 pt-2 px-4 flex-row items-center justify-between">
          <div className="w-fit">
            <Image alt={item.name} className="object-cover rounded-xl" src={item.img} width={150} height={50} />
            <div className="flex flex-row text-xl">
              <p className="text-default-500 mr-2">Inside the</p>
              <h4 id="itemTitle" className="font-bold text-large">{item.name}</h4>
            </div>
          </div>

          <ul className="flex sm:flex-col md:flex-col lg:flex-row gap-x-28 gap-y-2">
            {HEADER_MAPPING[item.name]?.map((element, index) => {
              const dataKey = DATA_KEY_MAPPING[element] ?? element.toLowerCase().replace(/\s/g, '_');
              
              // Dynamically check if the data exists in bankAccounts, user, or another source
              const value =
                data?.bankAccounts?.[0]?.[dataKey] ??
                data?.user?.[dataKey] ??
                data?.work?.[0]?.[dataKey] ??
                data?.home?.[0]?.[dataKey] ??
                'N/A';
                
              return (
                <li key={index} className="bg-blue-200 w-fit px-3 rounded-full">
                  {element}: {value}
                </li>
              );
            })}
          </ul>
        </CardHeader>

        <CardBody className="max-h-full overflow-auto">
          {
            item.name === 'Work' ? <ContentWork data={data} /> :
              item.name === 'Bank' ? <ContentBank data={data} /> :
                item.name === 'Hospital' ? <ContentHospital data={data} /> :
                  item.name === 'Home' ? <ContentHome data={data} /> :
                    <ContentGrocery data={data} />
          }
        </CardBody>

        <CardFooter className="flex justify-end">
          <Button color="danger" variant="flat" size="sm" isPressible onPress={handleClose}>
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>,
    document.body,
  );
}