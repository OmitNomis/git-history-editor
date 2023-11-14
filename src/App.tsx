import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Flex } from "@chakra-ui/react";
import { AppContent } from "./screen/AppContent";

const App = () => {
  return (
    <Flex direction="column" height="100vh">
      <Header />
      <Flex
        as={"section"}
        flexGrow={1}
        bg={"gray.200"}
        px={{ base: 2, sm: 4, md: 8 }}>
        <AppContent />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default App;
