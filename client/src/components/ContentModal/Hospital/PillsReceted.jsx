import React, { useEffect, useState } from 'react';
import CustomButton from '../../CustomButton.jsx';
import { Chip, ScrollShadow } from '@heroui/react';
import { diseases } from '../../../utils/data.js';
import SearchBox from '../../SearchBox.jsx';

export default function PillsReceted() {
  const [pills, setPills] = useState([]);
  const [pills2, setPills2] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBuy = (name, tablets, price) => {
    // TODO: Handle buy logic here
    console.log(`Buying ${name} x ${tablets} for $${price}`);
  };

  useEffect(() => {
    const fetchPills = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/appointments/report',
          { method: 'GET', headers: { 'Content-Type': 'application/json' } },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch pills data');
        }

        const data = await response.json();
        const treatments = data.reports.flatMap((report) => report.treatments);
        setPills(treatments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pills:', error);
        setLoading(false);
      }
    };

    const fetchPills2 = async () => {
      const allTreatments = diseases.flatMap((disease) => disease.treatments);
      setPills2(allTreatments);
      setLoading(false);
    };
    console.log(pills2);

    fetchPills();
    fetchPills2();
  }, []);

  if (loading) {
    return <p>Loading pills...</p>;
  }

  // TODO: Implement the search box functionality for the pills

  return (
    <div className="flex sm:flex-col md:flex-row lg:flex-row justify-between w-full h-full gap-5">
      {/* Comercial Pills Section */}
      <div className="bg-zinc-100 sm:w-full md:w-[50%] lg:w-[50%] p-2">
        <p className="font-semibold">Pills Comercial</p>
        {<SearchBox />}
        <div className="flex justify-between bg-zinc-200 p-4 mt-4 rounded-lg">
          <ScrollShadow
            hideScrollBar
            className="sm:h-[550px] md:h-[400px] lg:h-[500px]"
          >
            {pills2.map((pill, index) => (
              <div className="mb-4" key={index}>
                <p className="text-xl text-blue-500">{pill.pill_name}</p>
                <Chip
                  className="capitalize"
                  color="primary"
                  size="sm"
                  variant="flat"
                >
                  {pill.pill_tablets} tablets
                </Chip>
                <p className="text-sm">{pill.pill_description}</p>
                <CustomButton
                  label={`Collect it ($${pill.pill_price})`}
                  variant="solid"
                  size="sm"
                  onPress={() =>
                    handleBuy(
                      pill.pill_name,
                      pill.pill_tablets,
                      pill.pill_price,
                    )
                  }
                />
              </div>
            ))}
          </ScrollShadow>
        </div>
      </div>

      {/* Receted Pills Section */}
      <div className="bg-zinc-100 sm:w-full md:w-[50%] lg:w-[50%] p-2">
        <p className="font-semibold">Pills Receted</p>
        {<SearchBox />}
        <div className="flex justify-between bg-zinc-200 p-4 mt-4 rounded-lg">
          <ScrollShadow
            hideScrollBar
            className="sm:h-[550px] md:h-[400px] lg:h-[500px]"
          >
            {pills.map((pill, index) => (
              <div className="mb-4" key={index}>
                <p className="text-xl text-blue-500">{pill.pill_name}</p>
                <Chip
                  className="capitalize"
                  color="primary"
                  size="sm"
                  variant="flat"
                >
                  {pill.pill_tablets} tablets
                </Chip>
                <p className="text-sm">{pill.pill_description}</p>
                <CustomButton
                  label={`Collect it ($${pill.pill_price})`}
                  variant="solid"
                  size="sm"
                />
              </div>
            ))}
          </ScrollShadow>
        </div>
      </div>
    </div>
  );
}
