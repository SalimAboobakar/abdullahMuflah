import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Landing from "./pages/Landing";
import IdeaReview from "./pages/IdeaReview";
import SmartPlan from "./pages/SmartPlan";
import MetricsDashboard from "./pages/MetricsDashboard";
import MentorsAndDeck from "./pages/MentorsAndDeck";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/idea-review" element={<IdeaReview />} />
            <Route path="/smart-plan" element={<SmartPlan />} />
            <Route path="/metrics" element={<MetricsDashboard />} />
            <Route path="/mentors-deck" element={<MentorsAndDeck />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
