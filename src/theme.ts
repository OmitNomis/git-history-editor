import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// A git-flavoured orange brand scale used for primary actions and accents.
const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#fff4ed",
      100: "#ffe6d5",
      200: "#feccaa",
      300: "#fdac74",
      400: "#fb833c",
      500: "#f05033",
      600: "#e13d16",
      700: "#ba2d10",
      800: "#942615",
      900: "#7a2415",
    },
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "semibold",
        borderRadius: "lg",
      },
    },
  },
});

export default theme;
