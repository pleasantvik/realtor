import { Fragment, useState } from "react";
// import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "./Spinner";

// import { useUploadProductImageMutation } from "store/apiSlice";

export const Upload = ({ picValue }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

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
        await storeImage(picValue(values?.pic?.name));
        // console.log(file);
        // const file = await uploadImg(formData).unwrap();
        // const file = await uploadImg("/api/products/upload", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // console.log(file);

        // picValue(file?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
      console.log(values);
      setLoading(false);
    },
  });

  async function storeImage(image) {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const filename = `${auth?.currentUser?.uid}-${image?.name}-${uuidv4()}`;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot?.bytesTransferred / snapshot?.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;

            default:
              return "";
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask?.snapshot?.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }
  return (
    <Fragment>
      {loading && <Spinner />}

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
          onChange={(e) => formikUpload.setFieldValue("pic", e.target.files[0])}
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
    </Fragment>
  );
};
