import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Field from "../components/Field";
import useTitle from "../hooks/useTitle";

const RegisterPage = () => {
  useTitle("Registration | Learn with Sumit");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const submitForm = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        formData
      );

      if (response.status === 201) {
        navigate("/login");
        toast.success(`Registrtion successfully with ${formData.email}`);
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `Something went wrong ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <section className="container">
        <div className="w-full min-h-[80vh] md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <form onSubmit={handleSubmit(submitForm)}>
            <Field label="First Name" error={errors.firstName}>
              <input
                {...register("firstName", {
                  required: "First Name is Required!",
                })}
                type="firstName"
                id="firstName"
                name="firstName"
                className={`w-full p-3 bg-[#030317] border ${
                  errors.firstName ? "border-red-500" : "border-white/20"
                }  rounded-md focus:outline-none focus:border-indigo-500`}
              />
            </Field>
            <Field label="Last Name">
              <input
                {...register("lastName")}
                type="lastName"
                id="lastName"
                name="lastName"
                className={`w-full p-3 bg-[#030317] border  border-white/20
                 rounded-md focus:outline-none focus:border-indigo-500`}
              />
            </Field>
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
                className={`w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200 ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
              >
                {loading ? "Creating Account" : "Create Account"}
              </button>
            </Field>
            <p className="text-center">
              Already have account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
