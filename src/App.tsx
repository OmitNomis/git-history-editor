import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Flex } from "@chakra-ui/react"
import { AppContent } from "./screen/AppContent"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Flex direction="column" height="100vh">
      <ToastContainer />
      <Header />
      <Flex as={'section'} flexGrow={1} bg={"gray.200"} px={10}>
        <AppContent />
      </Flex>
      <Footer />
    </Flex>
  )
}

export default App