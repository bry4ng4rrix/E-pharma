import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
 "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react/class-list.json"
  ],
  theme: {
    extend: {
      colors :{
        fond : '#BACDD9',
        fond2 : '#516D73',
        fonddark : '#2F403E',
        vertsombre : "#425944",
        vertclaire : '#738C5A',

        vertgris : '#5D878C',
        vertblanc : '#BBF2F2',
        vert : '#03A64A',
        vertdark : '#027333',
        vertlight : '#05F258'


      },
      fontFamily: {
        istok: ['Istok Web', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [flowbiteReact],
  darkMode:"class",
}