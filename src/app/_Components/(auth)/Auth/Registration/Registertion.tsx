"use client";
import React, { useState } from "react";
import { Button, Card, Label, Select, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { RegistertionType } from "@/app/_Components/Types/RegistertionType";
import * as yup from "yup";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import generalFields from "../../../../_utils/genralFeilds";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import Loader from "@/app/_Components/Loading/Loading";
import { useRouter } from "next/navigation";

export default function Registration() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const mobileCodes = [
    { value: "+20", label: "+20 (EG)" },
    { value: "+966", label: "+966 (SA)" },
  ];
  const validationSchema = yup.object().shape({
    ...generalFields,
  });

  const formik = useFormik<RegistertionType>({
    initialValues: {
      name: "",
      email: "",
      mobile_country_code: "+20",
      mobile: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
          values
        );
        if (data.status_code === 200) {
          toast.success(data.message);
          localStorage.setItem("token", data.data.token);
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
            Join Task Manager
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Create an account to start managing your tasks
          </p>
        </div>

        <form className="mt-2" onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            {/* Full name */}
            <div>
              <Label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-neutral-800"
              >
                Full name
              </Label>
              <TextInput
                id="name"
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="John Doe"
                required
                color="gray"
                className="focus:ring-[#BE968E]/20 focus:border-[#BE968E]"
              />
            </div>
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}

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
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
            {/* Phone with mobile code */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <Label
                  htmlFor="mobileCode"
                  className="mb-1 block text-sm font-medium text-neutral-800"
                >
                  Mobile code
                </Label>
                <Select
                  id="mobileCode"
                  name="mobile_country_code"
                  value={formik.values.mobile_country_code}
                  onChange={formik.handleChange}
                  required
                  className="focus:ring-[#BE968E]/20 focus:border-[#BE968E]"
                >
                  {mobileCodes.map((code) => (
                    <option key={code.value} value={code.value}>
                      {code.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="col-span-2">
                <Label
                  htmlFor="mobile"
                  className="mb-1 block text-sm font-medium text-neutral-800"
                >
                  mobile
                </Label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-gray-100 border rounded-lg mx-2  border-gray-300  text-gray-700">
                    {formik.values.mobile_country_code}
                  </span>
                  <TextInput
                    id="mobile"
                    type="tel"
                    name="mobile"
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    placeholder="555 123 4567"
                    required
                    className="rounded-l-none focus:ring-[#BE968E]/20 focus:border-[#BE968E]"
                  />
                </div>
              </div>
            </div>
            {formik.errors.mobile && formik.touched.mobile && (
              <p className="text-red-500 text-sm">{formik.errors.mobile}</p>
            )}
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
                  placeholder=""
                  required
                  minLength={6}
                  className="pr-10 focus:ring-[#BE968E]/20 focus:border-[#BE968E]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-800"
                >
                  {showPassword ? (
                    <FaRegEye size={18} />
                  ) : (
                    <FaRegEyeSlash size={18} />
                  )}
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-medium text-neutral-800"
              >
                Confirm password
              </Label>
              <div className="relative">
                <TextInput
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password_confirmation}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="pr-10 focus:ring-[#BE968E]/20 focus:border-[#BE968E]"
                />
                <button
                  type="button"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-800"
                >
                  {showConfirmPassword ? (
                    <FaRegEye size={18} />
                  ) : (
                    <FaRegEyeSlash size={18} />
                  )}
                </button>
              </div>
              {formik.errors.password_confirmation && formik.touched.password_confirmation && (
                <p className="text-red-500 text-sm">
                  {formik.errors.password_confirmation}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-6 w-full bg-[#BE968E] hover:bg-[#BE968E]/80 focus:ring-[#BE968E]/30"
          >
            {isLoading ? <Loader width="5" height="5" /> : "sign up"}
          </Button>

          <p className="mt-4 text-center text-sm text-neutral-600">
            Already have an account?
            <span className="font-medium hover:underline text-[#BE968E] cursor-pointer" onClick={() => {
              router.push("/login");
            }}>
              Log in
            </span>
          </p>
        </form>
      </Card>
    </div>
  );
}
