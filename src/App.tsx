import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Flex } from "@chakra-ui/react"

const App = () => {
  return (
    <Flex direction="column" height="100vh">
      <Header />
      <Flex flexGrow={1}>

      </Flex>
      <Footer />
    </Flex>
  )
}

export default App