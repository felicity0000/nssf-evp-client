import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import SignIn from "./pages/SignIn";
import AddFeedback from "./pages/AddFeedback";
import ProtectedRoute from "./components/ProtectedRoute";
import AssignConcern from "./pages/AssignConcern";
import Feedbacks from "./pages/Feedbacks";
import Pending from "./pages/pending";
import InProgress from "./pages/Inprogress";
import Dashboard from "./pages/Dashboard";
import Resolving from "./pages/Resolving";
import Resolved from "./pages/Resolved";
import FeedbackDetails from "./pages/FeedbackDetails";
import MoodPage from "./pages/MoodPage";
import AdminApproval from "./pages/AdminApproval";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        
        {/* Protected route for employees only */}
        <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
          <Route path="/mood" element={<Layout><MoodPage /></Layout>} />
          <Route path="/add-feedback" element={<Layout><AddFeedback /></Layout>} />
          <Route path="/resolve" element={<Layout><Resolving/></Layout>}/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
          <Route path="/admin-assign" element={<Layout><AssignConcern/></Layout>}/>
          <Route path="/admin-dashboard" element={<Layout><Dashboard/></Layout>}/>
          <Route path="/admin-approval" element={<Layout><AdminApproval/></Layout>}/>
        </Route>
        
        <Route path="/all-feedbacks" element={<Layout><Feedbacks /></Layout>} />
        <Route path="/pending" element={<Layout><Pending/></Layout>}/>
        <Route path="/in-progress" element={<Layout><InProgress/></Layout>}/>
        <Route path="/resolved" element={<Layout><Resolved/></Layout>}/>
        <Route path="/feedback/:id" element={<Layout><FeedbackDetails/></Layout>}/>
      </Routes>
    </Router>
  );
};

export default App;
