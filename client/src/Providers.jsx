// ToDo: Replace Toast of HeroUI to Sonner.

import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";

export default function Providers({ children }) {
  const closeIcon = (
    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );

  return (
    <HeroUIProvider>
      <ToastProvider
        toastProps={{
          variant: 'bordered',
          color: "default",
          promise: new Promise((res) => setTimeout(res, 2000)).then(() => console.log("Promise resolved")),
          timeout: 4000,
          classNames: {
            closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
          },
          closeIcon: closeIcon,
          onClose: () => console.log("Toast closed"),
        }}
      />
      {children}
    </HeroUIProvider>
  )
}
