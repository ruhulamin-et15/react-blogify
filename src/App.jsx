import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import EditBlog from "./pages/EditBlog";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewBlog from "./pages/NewBlog";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import RegisterPage from "./pages/RegisterPage";
import SingleProfile from "./pages/SingleProfile";
import PrivateRoutes from "./routes/PrivateRoutes";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Profile />} path="/profile" />
          <Route element={<NewBlog />} path="/create-blog" />
          <Route element={<EditBlog />} path="/edit-blog/:id" />
        </Route>

        <Route element={<HomePage />} path="/" exact />
        <Route element={<BlogDetailsPage />} path="/blog-details/:id" />
        <Route element={<SingleProfile />} path="/profile/:id" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<NotFound />} path="*" />
      </Routes>
      <Footer />
    </div>
  );
}
