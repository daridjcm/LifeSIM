import React, { useMemo } from "react";
import Navbar from "../components/Navbar.jsx";
import CardList from "../components/CardList.jsx";
import NeedsPanel from "../components/NeedsPanel";
import { TimeProvider } from "../context/TimeContext.jsx";
import { activitiesUser } from "../utils/data.js";
import { useUser } from "../context/UserContext.jsx";

export default function Game() {
  const memoizedActivities = useMemo(() => activitiesUser, []);
  const { user } = useUser();

  if (!user) {
    return <div>Loading game...</div>;
  }

  return (
    <>
      <TimeProvider>
        <Navbar />
        <CardList
          statusCard={"activitiesUser"}
          itemsToDisplay={memoizedActivities}
          iconShow={true}
        />
        <NeedsPanel />
      </TimeProvider>
    </>
  );
}
