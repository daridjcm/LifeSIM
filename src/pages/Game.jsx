import Navbar from "../components/Navbar"
import CardList from "../components/CardList"
import RenderClass from "../contexts/UserContext"

export default function Game() {
  return (
    <>
      <Navbar />
      <CardList />
      <RenderClass />
    </>
  )
}
