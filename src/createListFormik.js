import { DashboardLayout } from "components/DashboardLayout";
import { Upload } from "../components/Upload";
import { useFormik } from "formik";
import React from "react";
import { createList } from "utils/schema";

export const CreateListing = () => {
  const formik = useFormik({
    initialValues: {
      type: "rent",
      propertyName: "A Good apartment",
      beds: 1,
      bathrooms: 1,
      parks: "yes",
      furnished: "no",
      address: "Enter an address",
      description: "Describe this",
      offer: "yes",
      price: 1,
      discountPrice: 1,
      images: [],
    },
    validationSchema: createList,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handlePicValue = (pic) => {
    const picArr = formik.values.images;
    picArr.push(pic);
    formik.setFieldValue("images", picArr);
  };

  return (
    <DashboardLayout>
      <section className="flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl font-bold uppercase">Create a Listing</h1>
        <div className="mt-6 w-full  sm:w-[70%] md:w-[50%] px-3 mx-auto">
          <Upload picValue={(pic) => handlePicValue(pic)} />

          <form onSubmit={formik.handleSubmit}>
            <p className="text-lg text-[#c69963] font-semibold">Sell / Rent</p>
            <div className="flex space-x-3">
              <button
                type="button"
                value="sale"
                name="type"
                onClick={formik.handleChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus::shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                  formik.values.type === "rent"
                    ? "bg-[#f6f7f9] text-black"
                    : "bg-[#101d2c] text-white"
                }`}
              >
                Sell
              </button>
              <button
                type="button"
                value="rent"
                name="type"
                onClick={formik.handleChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus::shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                  formik.values.type === "sale"
                    ? "bg-[#f6f7f9] text-black"
                    : "bg-[#101d2c] text-white"
                }`}
              >
                Rent
              </button>
            </div>

            <div className="mt-6">
              <label
                htmlFor="propertyName"
                className="text-lg text-[#c69963] font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                id="propertyName"
                name="propertyName"
                placeholder="Property name"
                className="w-full px-4 py-2 rounded text-xl bg-white border border-gray-300 transition duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                {...formik.getFieldProps("propertyName")}
              />
              {formik.touched.propertyName && formik.errors.propertyName && (
                <div className="text-red-500">{formik.errors.propertyName}</div>
              )}
            </div>
            <div className="mt-6">
              <div className="">
                <label
                  htmlFor="beds"
                  className="text-lg font-semibold text-[#c69963]"
                >
                  Beds
                </label>
                <input
                  type="number"
                  id="beds"
                  name="beds"
                  className="w-full px-4 py-2"
                  value={formik.values.beds}
                  {...formik.getFieldProps("beds")}
                />
                {formik.touched.beds && formik.errors.beds && (
                  <div className="text-red-500">{formik.errors.beds}</div>
                )}
              </div>
            </div>
            <div className="mt-6">
              <div className="">
                <label
                  htmlFor="bathrooms"
                  className="text-lg font-semibold text-[#c69963]"
                >
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  className="w-full px-4 py-2"
                  value={formik.values.bathrooms}
                  {...formik.getFieldProps("bathrooms")}
                />
                {formik.touched.bathrooms && formik.errors.bathrooms && (
                  <div className="text-red-500">{formik.errors.bathrooms}</div>
                )}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-lg text-[#c69963] font-semibold">
                Parking Spot
              </p>
              <div className="flex space-x-3">
                <button
                  type="button"
                  value="yes"
                  name="parks"
                  onClick={formik.handleChange}
                  className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus::shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                    formik.values.parks === "no"
                      ? "bg-[#f6f7f9] text-black"
                      : "bg-[#101d2c] text-white"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  value="no"
                  name="parks"
                  onClick={formik.handleChange}
                  className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus::shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                    formik.values.parks === "yes"
                      ? "bg-[#f6f7f9] text-black"
                      : "bg-[#101d2c] text-white"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-lg text-[#c69963] font-semibold">Furnished</p>
              <div className="flex space-x-3">
                <button
                  type="button"
                  value="yes"
                  name="furnished"
                  onClick={formik.handleChange}
                  className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus::shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                    formik.values.furnished === "no"
                      ? "bg-[#f6f7f9] text-black"
                      : "bg-[#101d2c] text-white"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  value="no"
                  name="furnished"
                  onClick={formik.handleChange}
                  className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus::shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                    formik.values.furnished === "yes"
                      ? "bg-[#f6f7f9] text-black"
                      : "bg-[#101d2c] text-white"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="address"
                className="text-lg text-[#c69963] font-semibold"
              >
                Address
              </label>
              <textarea
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                className="w-full px-4 py-2 rounded text-xl bg-white border border-gray-300 transition duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                {...formik.getFieldProps("address")}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500">{formik.errors.address}</div>
              )}
            </div>
            <div className="mt-6">
              <label
                htmlFor="description"
                className="text-lg text-[#c69963] font-semibold"
              >
                Description
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                className="w-full px-4 py-2 rounded text-xl bg-white border border-gray-300 transition duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500">{formik.errors.description}</div>
              )}
            </div>
            <div className="mt-6">
              <p className="text-lg text-[#c69963] font-semibold">Offers</p>
              <div className="flex space-x-3">
                <button
                  type="button"
                  value="yes"
                  name="offer"
                  onClick={formik.handleChange}
                  className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus::shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                    formik.values.offer === "no"
                      ? "bg-[#f6f7f9] text-black"
                      : "bg-[#101d2c] text-white"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  value="no"
                  name="offer"
                  onClick={formik.handleChange}
                  className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus::shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                    formik.values.offer === "yes"
                      ? "bg-[#f6f7f9] text-black"
                      : "bg-[#101d2c] text-white"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
            <div className="mt-6 flex items-center ">
              <div className="">
                <label
                  htmlFor="price"
                  className="text-lg font-semibold text-[#c69963]"
                >
                  Price
                </label>
                <div className="flex justify-center items-center space-x-6">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="w-full px-4 py-2"
                    value={formik.values.price}
                    {...formik.getFieldProps("price")}
                  />
                  {formik.values.type === "rent" && (
                    <div className="">
                      <p className="text-md w-full font-semibold whitespace-nowrap">
                        $/Month
                      </p>
                    </div>
                  )}
                </div>
                {formik.touched.price && formik.errors.price && (
                  <div className="text-red-500">{formik.errors.price}</div>
                )}
              </div>
            </div>
            {formik.values.offer === "yes" && (
              <div className="mt-6 flex items-center">
                <div className="">
                  <label
                    htmlFor="discountPrice"
                    className="text-lg font-semibold text-[#c69963]"
                  >
                    Discount Price
                  </label>
                  <input
                    type="number"
                    id="discountPrice"
                    name="discountPrice"
                    className="w-full px-4 py-2"
                    value={formik.values.discountPrice}
                    {...formik.getFieldProps("discountPrice")}
                  />
                  {formik.touched.discountPrice &&
                    formik.errors.discountPrice && (
                      <div className="text-red-500">
                        {formik.errors.discountPrice}
                      </div>
                    )}
                </div>
              </div>
            )}
            <div className="">
              {/* <p className="text-lg font-semibold">Images</p>
              <p className="text-gray-600">
                The first image will be use as the cover(max 6){" "}
              </p> */}
              {/* <input
                type="file"
                id="images"
                accept=".jpg,.png,.jpeg"
                multiple
                className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:bg-white focus:border-slate-600 "
                {...formik.getFieldProps("images")}
              /> */}
              {/* <input
                id="file"
                name="file"
                type="file"
                accept=".jpg,.png,.jpeg"
                multiple
                className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:bg-white focus:border-slate-600 "
                onChange={(e) => formik.setFieldValue("pic", e.target.files[0])}
              /> */}
            </div>
            <button
              type="submit"
              className="mb-6 mt-6 w-full px-7 py-3 bg-[#101d2c] text-white font-medium uppercase rounded focus:shadow-lg
               hover:bg-slate-600 transition duration-200"
            >
              Create Listing
            </button>
          </form>
        </div>
      </section>
    </DashboardLayout>
  );
};
