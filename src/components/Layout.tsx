import { Box } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    <Box display="grid" gridTemplateRows="auto 1fr auto" height="100vh">
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
}
