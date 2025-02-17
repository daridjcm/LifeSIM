import Navbar from "../components/Navbar";
import CardList from "../components/CardList";
import NeedsPanel from "../components/NeedsPanel";
import activitiesUser from "../utils/List"

export default function Game() {
  return (
    <>
      <Navbar />
      <CardList 
        statusCard={"activitiesUser"}
        itemsToDisplay={activitiesUser}
        iconShow={true}
      />
      <NeedsPanel />
    </>
  );
}
