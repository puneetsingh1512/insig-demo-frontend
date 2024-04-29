import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebare from "./scenes/global/Sidebar";
import Desk1 from "./scenes/dashboard/desk1";
import Desk2 from "./scenes/dashboard/desk2";
import { Routes, Route } from "react-router-dom";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <Sidebare /> */}
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/desk1" element={<Desk1 />} />
              <Route path="/desk2" element={<Desk2 />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
