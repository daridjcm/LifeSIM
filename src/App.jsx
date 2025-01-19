import './css/index.css';
import './css/output.css';
import {HeroUIProvider} from '@heroui/react';

function App() {
  return (
    <HeroUIProvider>
      <>
        <div id="app">
          <h1 className='text-2xl'>Hello World</h1>
        </div>
      </>
    </HeroUIProvider>
  )
}

export default App;
