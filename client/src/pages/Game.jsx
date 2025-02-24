import Navbar from "../components/Navbar";
import CardList from "../components/CardList";
import NeedsPanel from "../components/NeedsPanel";
import { TimeProvider } from "../context/TimeContext";
import { activitiesUser } from "../utils/data";
import { UserProvider } from "../context/UserContext";

export default function Game() {
  return (
    <>
      <TimeProvider>
        <UserProvider>
          <Navbar />
          <CardList
            statusCard={"activitiesUser"}
            itemsToDisplay={activitiesUser}
            iconShow={true}
            />
        </UserProvider>
        <NeedsPanel />
      </TimeProvider>
    </>
  );
}
