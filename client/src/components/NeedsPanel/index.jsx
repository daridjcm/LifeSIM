import NeedsPanel from './NeedsPanel.jsx';
import Inventory from './Inventory.jsx';

export default function PanelBar() {
  return (
    <div className="flex justify-end items-end gap-1 z-10 fixed bottom-0 right-0 p-3">
      <NeedsPanel />
      <Inventory />
    </div>
  );
}
