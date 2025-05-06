import React from 'react';
import { Alert } from '@heroui/react';

export default function App({ title, description }) {
  const [isVisible, setIsVisible] = React.useState(true);
  return (
    <div className="flex flex-col gap-4">
      {isVisible && (
        <Alert
          description={description}
          isVisible={isVisible}
          title={title}
          variant="faded"
          onClose={() => setIsVisible(false)}
        />
      )}
    </div>
  );
}
