import { Flex } from "@mantine/core";
import ClientSideSearch from "./components/ClientSideSearch";
import ServerSideSearch from "./components/ServerSideSearch";

const MainPage = () => {
  return (
    <Flex gap={50}>
      <ClientSideSearch />
      <ServerSideSearch />
    </Flex>
  );
};
export default MainPage;
