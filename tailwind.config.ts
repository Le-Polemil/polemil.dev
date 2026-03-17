import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          white: "#FAFAF9",
        },
        beige: {
          300: "#EADBBD",
        },
        purplish: {
          400: "#BD98A2",
          500: "#AF838F",
          600: "#A06A78",
          700: "#895865",
          800: "#704852",
          900: "#955F6E",
          950: "#895865",
        },
        greenish: {
          400: "#97A58D",
          500: "#7F9172",
        },
        khaki: {
          400: "#C4C0AB",
          500: "#B4AE93",
          600: "#A39C7B",
          700: "#908965",
          800: "#716D59",
          900: "#5C573E",
        },
      },
      screens: {
        "3xl": "1780px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        bukhari: "Bukhari", // logo only
        bukhariAlt: "BukhariAlt", // logo only
        archivo: "Archivo", // titles
        rubikBold: "RubikBold",
        rubikReg: "RubikReg",
      },
    },
  },
  safelist: [
    "order-1",
    "order-2",
    "order-3",
    "order-4",
    "order-5",
    "order-6",
    "order-7",
    "order-8",
    "order-9",
    "order-10",
    "lg:order-1",
    "lg:order-2",
    "lg:order-3",
    "lg:order-4",
    "lg:order-5",
    "lg:order-6",
    "lg:order-7",
    "lg:order-8",
    "lg:order-9",
    "lg:order-10",
  ],
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          area: (value) => {
            const [v1, v2, v3, v4] = value.split(/_?\/_?/)
            if (v2) {
              if (v3 && v4) {
                return {
                  gridArea: `${v1} / ${v2} / ${v3} / ${v4}`,
                }
              }
              return { gridArea: `${v1} / ${v1} / ${v2} / ${v2}` }
            }
            return { gridArea: value }
          },
          template: (cssVarName) => ({
            gridTemplate: `var(--${cssVarName})`,
          }),
        },
        // Default values.
        // `flattenColorPalette` required to support native Tailwind color classes like `red-500`, `amber-300`, etc.
        // In most cases you may just pass `theme('config-key')`, where `config-key` could be any (`spacing`, `fontFamily`, `foo`, `bar`)
        { values: theme("config-key") }
      )
    }),
  ],
}
export default config
