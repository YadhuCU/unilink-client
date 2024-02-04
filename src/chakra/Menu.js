import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    py: "4",
    borderRadius: "xl",
    border: "none",
    bg: "#1e293b",
  },
  item: {
    color: "#cbd5e1",
    bg: "none",
    _hover: {
      bg: "#334155",
    },
    _focus: {
      bg: "#334155",
    },
  },
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });
