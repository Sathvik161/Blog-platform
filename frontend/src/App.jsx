import {
  BrowserRouter,
  Route,
  Routes,
  Navigate, // Import Navigate for redirection
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { PostList } from "./pages/PostList"; // Import PostList
import { CreatePost } from "./pages/CreatePost"; // Import CreatePost
import { PostView } from "./pages/PostView"; // Import PostView component
import { EditPost } from "./pages/EditPost"; // Import EditPost component

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} /> {/* Redirect root to signin */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/posts" element={<PostList />} /> {/* Add PostList route */}
          <Route path="/create-post" element={<CreatePost />} /> {/* Add CreatePost route */}
          <Route path="/posts/:id" element={<PostView />} /> {/* View single post */}
          <Route path="/edit-post/:id" element={<EditPost />} /> {/* Edit single post */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
