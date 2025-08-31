import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Import your pages
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Upload from "./pages/Upload";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Toaster should be inside BrowserRouter to ensure proper context */}
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;