import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        "primary-dark": "hsl(var(--primary-dark))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
      },
    },
  },
  plugins: [],
} satisfies Config;
