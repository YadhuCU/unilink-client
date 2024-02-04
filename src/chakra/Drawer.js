import { drawerAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  overlay: {
    bg: "blackAlpha.200", //change the background
    backdropFilter: "blur(5px) hue-rotate(10deg)",
  },
  dialog: {
    borderRadius: "md",
    bg: "#0f172a",
    color: "#f1f5f9",
  },
});

export const drawerTheme = defineMultiStyleConfig({
  baseStyle,
});
