import { Flex } from "@mantine/core";
import ClientSideSearch from "./components/ClientSideSearch";
import ServerSideSearch from "./components/ServerSideSearch";
import CustomOption from "./components/CustomOption";
import FifaCoutrySearch from "./components/FifaCoutrySearch";
import FindCountryByCapital from "./components/FindCountryByCapital";
import FindCountryByLanguage from "./components/FindCountryByLanguage";

const MainPage = () => {
  return (
    <Flex gap={50} wrap={'wrap'} style={{padding:"20px"}}>
      <ClientSideSearch />
      <ServerSideSearch />
      <CustomOption />
      <FifaCoutrySearch/>
      <FindCountryByCapital/>
      <FindCountryByLanguage/>
    </Flex>
  );
};
export default MainPage;
