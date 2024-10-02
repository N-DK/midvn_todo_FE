/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: "var(--theme)",
        prim: "var(--primColor)",
        white: "var(--white)",
        white_07: "var(--white-07)",
        red: "var(--red)",
        transparent: "var(--transparent)",
        blue: "var(--blue)",

        dark_bg: "var(--dark-bg)",
        dark_bg_07: "var(--dark-bg-07)",
        gray_bg: "var(--gray_bg)",

        root_bg_lv1: "var(--root-bg-lv1)",
        root_bg_gray: "var(--root-bg-gray)",
        root_text_color: "var(--root-text-color)",
        root_text_gray_color: "var(--root-text-gray-color)",
        root_text_gray_blue_color: "var(--root-text-gray-blue-color)",
        root_white_text_color: "var(--root-white-text-color)",
        root_border_color: "var(--root-border-color)",

        root_mask_bg: "var(--mask-bg)",

        root_hover_bg: "var(--hover-bg)",
        root_theme_hover: "var(--theme-hover)",
        root_hover_bg_dark: "var(--hover-bg-dark)",

        warning_03: "var(--warning-03)",

        blueBea1: "var(--blue-bea-1)",
        blueBea2: "var(--blue-bea-2)",
      },
    },
  },
  plugins: [],
}
