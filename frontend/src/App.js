import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";

import { LeftSidebar } from "./components/LeftSidebar/LeftSidebar"
import { Dashboard }from "./pages/Dashboard/Dashboard"
import { Analytics } from "./pages/Analytics/Analytics";
import { Settings }from "./pages/Settings/Settings";
import { PageNotFound } from "./pages/PageNoteFound/PageNotFound";
import ReadOnlyPage from "./pages/ReadOnlyPage/ReadOnlyPage";
import Card from "./components/Card/Card";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/leftside" element={<LeftSidebar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/:_id/readOnly" element={<ReadOnlyPage />} />
          <Route path="/card" element={<Card />} />
          {/* <Route path="/logout" element={<PageNotFound />} /> */}

        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
