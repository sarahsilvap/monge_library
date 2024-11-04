import Catalogo from "./catalogo/page";
import { NextUIProvider } from "@nextui-org/react";

export default function App() {
  return (
    <NextUIProvider>
      <Catalogo />
    </NextUIProvider>
  );
}
