import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ChatAssistant from "./components/common/ChatAssistant";
import Landing from "./pages/Landing";
import IdeaReview from "./pages/IdeaReview";
import SmartPlan from "./pages/SmartPlan";
import MetricsDashboard from "./pages/MetricsDashboard";
import MentorsAndDeck from "./pages/MentorsAndDeck";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
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
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
        <ChatAssistant />
      </div>
    </Router>
  );
}

export default App;
