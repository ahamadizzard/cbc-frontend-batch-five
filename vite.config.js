import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react(), tailwindcss()],
  plugins: [react()],
  //if you want to change the port, you can do it here
  // server:{
  //   port: 4000,
  // }
});
