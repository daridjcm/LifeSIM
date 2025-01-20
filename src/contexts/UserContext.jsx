// username = {
//   name: '',
//   // health: 100,
//   // energy: 100,
//   // hygiene: 100,
//   // hungry: 100,
//   // age: 18,
//   // workExp: 0,
//   // money: 0,
// }

import { Component } from "react"

class User extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>
  }

}

export default function RenderClass() {
  return (
    <>
      <User name='daridjcm' />
    </>
  )
}
