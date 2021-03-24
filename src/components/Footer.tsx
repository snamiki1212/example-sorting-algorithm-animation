import { COPYRIGHT_TEXT } from "../constants";
import { Center, Divider } from "@chakra-ui/react";

export function Footer() {
  return (
    <div>
      <Divider />
      <Center color="gray.400">{COPYRIGHT_TEXT}</Center>
    </div>
  );
}
