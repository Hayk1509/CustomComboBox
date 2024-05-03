import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <MantineProvider>
      <MainPage />
    </MantineProvider>
  );
}
