import { Box } from "@mui/material";
import PieChart from "../../../components/PieChart";
import Header from "../../../components/Header";
import PieChart2 from "../../../components/PieChart2";

const Home = () => {
  return (
    <Box>
      <Box m="20px">
        <Box display="flex" justifyContent="space-around">
          <Header subtitle="Desk 1" />
          <Header subtitle="Desk 2" />
        </Box>
      </Box>
      <Box m="20px">
        <Box height="50vh" display="flex">
          <PieChart />
          <PieChart2 />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
