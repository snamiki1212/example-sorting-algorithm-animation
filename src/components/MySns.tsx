import {
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  Button,
  MenuItem,
  Link,
} from "@chakra-ui/react";
import { SNS, MY_AVATOR } from "../constants";

const SNS_LINKS = [
  { text: "GitHub", href: SNS.MY_GITHUB },
  { text: "Linkedin", href: SNS.MY_LINKEDIN },
] as const;

export function MySns() {
  return (
    <Menu>
      <MenuButton as={Button} variant={"link"} cursor={"pointer"}>
        <Avatar size="sm" src={MY_AVATOR} />
      </MenuButton>
      <MenuList>
        {SNS_LINKS.map((snsLink, idx) => (
          <MenuItem
            key={idx}
            as={Link}
            isExternal
            href={snsLink.href}
            _hover={{ textDecor: "none" }}
          >
            {snsLink.text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
