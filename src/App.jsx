import { Dock, Home, Navbar, Welcome,} from "#components";
import { Contact, Finder, Resume, Safari, Terminal, Text } from "./windows";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Contact />
      <Home />
    </main>
  )
}

export default App