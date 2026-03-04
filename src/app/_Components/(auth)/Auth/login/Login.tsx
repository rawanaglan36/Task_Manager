"use client";
import React, { useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import Loader from "@/app/_Components/Loading/Loading";
import { useRouter } from "next/navigation";
import generalFields from "@/app/_utils/genralFeilds";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    email,
    password,
  }: {
    email: yup.StringSchema<string, yup.AnyObject, undefined, "">;
    password: yup.StringSchema<string, yup.AnyObject, undefined, "">;
  } = generalFields();
  const validationSchema = yup.object().shape({
    email: email,
    password: password,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
          values
        );
        if (data.status_code === 200) {
          toast.success(data.message);
          localStorage.setItem("token", data.data.token);
          router.push("/dashboard"); // or wherever you want to redirect after login
        }
      } catch (error) {
        const err = error as AxiosError<Error>;
  
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "An error occurred. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <Card className="w-full max-w-md shadow-xl border-0">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Task Manager
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage your tasks
          </p>
        </div>

        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div>
            <Label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <TextInput
              id="email"
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="you@example.com"
              required
              color={formik.errors.email && formik.touched.email ? "failure" : "gray"}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="mt-1 text-xs text-red-600">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="relative">
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="••••••••"
                required
                color={formik.errors.password && formik.touched.password ? "failure" : "gray"}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaRegEyeSlash size={18} />
                )}
              </button>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="mt-1 text-xs text-red-600">{formik.errors.password}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <span className="text-sm text-blue-600 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            {isLoading ? <Loader width="5" height="5" /> : "Sign in"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              className="font-medium text-blue-600 cursor-pointer hover:underline"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </span>
          </p>
        </form>
      </Card>
    </div>
  );
}
