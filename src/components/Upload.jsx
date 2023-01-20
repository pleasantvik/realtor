import { Fragment, useState } from "react";
// import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { useUploadProductImageMutation } from "store/apiSlice";

export const Upload = ({ picValue }) => {
  const [loading, setLoading] = useState(false);

  //   const [uploadImg] = useUploadProductImageMutation();

  // const token = localStorage.getItem("waveToken");

  const formikUpload = useFormik({
    initialValues: {
      pic: "",
    },
    validationSchema: Yup.object({
      pic: Yup.mixed().required("A file is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", values.pic);

      try {
        // const file = await uploadImg(formData).unwrap();
        // const file = await uploadImg("/api/products/upload", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // console.log(file);
        picValue(values?.pic?.name);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
      console.log(values);
    },
  });
  return (
    <Fragment>
      {/* {loading && <LoadingSpinner />} */}
      {!loading && (
        <form onSubmit={formikUpload.handleSubmit} className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
            The first image will be use as the cover(max 6)
          </p>
          <input
            id="file"
            name="file"
            type="file"
            accept=".jpg,.png,.jpeg"
            multiple
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:bg-white focus:border-slate-600 "
            onChange={(e) =>
              formikUpload.setFieldValue("pic", e.target.files[0])
            }
          />
          {formikUpload.errors.pic && formikUpload.touched.pic && (
            <div>Error</div>
          )}

          <button
            className="mb-6 mt-6 w-full px-7 py-3 bg-[#101d2c] text-white font-medium uppercase rounded"
            type="submit"
            style={{
              color: "#fff",
              marginTop: "1rem",
              background: "#101d2c",
            }}
          >
            Upload Image
          </button>
        </form>
      )}
    </Fragment>
  );
};
