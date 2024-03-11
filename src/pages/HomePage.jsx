import BlogContents from "../components/blogs/BlogContents";
import SideBar from "../components/sidebar/SideBar";
import useTitle from "../hooks/useTitle";

const HomePage = () => {
  useTitle("Home | Learn with Sumit");
  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <BlogContents />
            <SideBar />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
