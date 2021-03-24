import { Box, Text, Button, Center, Flex, Link } from "@chakra-ui/react";
import { MySns } from "./MySns";
import { THIS_GITHUB } from "../constants";

export function Navbar() {
  return (
    <Box p={2}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="900" fontSize="1.5rem">
          Sorting Algorithm Animation
        </Text>
        <Center>
          <Link
            href={THIS_GITHUB}
            isExternal
            _hover={{ textDecoration: "none" }}
          >
            <Button>GitHub</Button>
          </Link>
          <MySns />
        </Center>
      </Flex>
    </Box>
  );
}
