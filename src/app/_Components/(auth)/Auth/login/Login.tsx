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
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-[#ffffff] px-4">
      <Card className="w-full max-w-md border border-[#BE968E] bg-white shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#BE968E]">
            Task Manager
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Sign in to manage your tasks
          </p>
        </div>

        <form className="mt-2" onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-neutral-800"
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
                className="focus:ring-[#BE968E]/20 focus:border-[#BE968E]"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-neutral-800"
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
                  className="pr-12 focus:ring-[#BE968E]/20 focus:border-[#BE968E]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 bg-transparent border-none p-0"
                >
                  {showPassword ? (
                    <FaRegEye size={16} />
                  ) : (
                    <FaRegEyeSlash size={16} />
                  )}
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="mt-4 text-right">
            <span className="text-sm text-[#BE968E] cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-6 w-full bg-[#BE968E] hover:bg-[#BE968E]/80 focus:ring-[#BE968E]/30"
          >
            {isLoading ? <Loader width="5" height="5" /> : "Sign in"}
          </Button>

          <p className="mt-4 text-center text-sm text-neutral-600">
            Do not have an account?{" "}
            <span
              className="font-medium text-[#BE968E] cursor-pointer hover:underline"
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
