import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    bg: "blackAlpha.300",
    backdropFilter: "blur(5px) hue-rotate(10deg)",
  },
  dialog: {
    borderRadius: "xl",
    bg: "#0f172a",
    color: "#f1f5f9",
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
