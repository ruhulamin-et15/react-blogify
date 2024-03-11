import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Field from "../components/Field";
import { useAuth } from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

const LoginPage = () => {
  useTitle("Login Page | Learn with Sumit");
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.accessToken;
          const refreshToken = token.refreshToken;

          setAuth({ user, authToken, refreshToken });
          navigate("/profile");
          toast.success(`Login successfully with ${formData.email}`);
        }
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found`,
      });
    }
  };
  return (
    <main>
      <section className="container">
        <div className="w-full min-h-[80vh] md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit(submitForm)}>
            <Field label="Email" error={errors.email}>
              <input
                {...register("email", { required: "Email is Required!" })}
                type="email"
                id="email"
                name="email"
                className={`w-full p-3 bg-[#030317] border ${
                  errors.email ? "border-red-500" : "border-white/20"
                }  rounded-md focus:outline-none focus:border-indigo-500`}
              />
            </Field>
            <Field label="Password" error={errors.password}>
              <input
                {...register("password", {
                  required: "Password is Required",
                  minLength: {
                    value: 8,
                    message: "Your password must be at least 8 characters",
                  },
                })}
                type="password"
                id="password"
                name="password"
                className={`w-full p-3 bg-[#030317] border ${
                  errors.password ? "border-red-500" : "border-white/20"
                }  rounded-md focus:outline-none focus:border-indigo-500`}
              />
            </Field>
            <p>{errors?.root?.random?.message}</p>
            <Field>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Login
              </button>
            </Field>
            <p className="text-center">
              Don`t have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
