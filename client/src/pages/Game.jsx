import React, { useMemo } from "react";
import Navbar from "../components/Navbar.jsx";
import CardList from "../components/CardList.jsx";
import NeedsPanel from "../components/NeedsPanel";
import { TimeProvider } from "../context/TimeContext.jsx";
import { activitiesUser } from "../utils/data.js";
import { UserProvider } from "../context/UserContext.jsx";

export default function Game() {
  const memoizedActivities = useMemo(() => activitiesUser, []);
  return (
    <>
      <TimeProvider>
        <UserProvider>
          <Navbar />
          <CardList
            statusCard={"activitiesUser"}
            itemsToDisplay={memoizedActivities}
            iconShow={true}
          />
        </UserProvider>
        <NeedsPanel />
      </TimeProvider>
    </>
  );
}
