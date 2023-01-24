import { DashboardLayout } from "components/DashboardLayout";
import { useFormik } from "formik";
import { createList } from "utils/schema";
import { Spinner } from "components/Spinner";
import { useState } from "react";
import { ShowToast } from "utils/tools";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const EditListing = () => {
  const [geolocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(false);
  const auth = getAuth();

  const { id } = useParams();

  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: listing?.type,
      propertyName: listing?.propertyName,
      beds: listing?.beds,
      bathrooms: listing?.bathrooms,
      parks: listing?.parks,
      furnished: listing?.furnished,
      address: listing?.address,
      description: listing?.description,
      offer: listing?.offer,
      price: listing?.price,
      discountPrice: listing?.discountPrice,
      longitude: listing?.geolocation?.lng,
      latitude: listing?.geolocation?.lat,
      images: {},
    },
    validationSchema: createList,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      onFormSubmit(values);
    },
  });

  const handlePicValue = (e) => {
    const picArr = [];
    picArr.push(e.target.files);

    formik.setFieldValue("images", ...picArr);

    // console.log(formik.values.images);
  };

  async function onFormSubmit(values) {
    setLoading(true);

    if (formik.values.images.length > 6) {
      setLoading(false);
      ShowToast("ERROR", "maximum 6 images are allowed");
      return;
    }
    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${values.address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      if (location === undefined) {
        setLoading(false);
        ShowToast("ERROR", "please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = values.latitude;
      geolocation.lng = values.longitude;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        //Create unique filename with the userId,imagename and uuid
        const filename = `${auth?.currentUser?.uid}-${image.name}-${uuidv4()}`;
        //Storage reference
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...values.images]?.map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      ShowToast("ERROR", "Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...values,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    const docRef = doc(db, "listings", id);

    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    ShowToast("SUCCESS", "Listing Edited successfully");
    // navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    navigate("/listing");
  }

  useEffect(() => {
    setLoading(true);

    const fetchListing = async () => {
      const docRef = doc(db, "listings", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        setListing(docSnap.data());
        setLoading(false);
      } else {
        navigate("/");
        ShowToast("ERROR", "Listing does not exist");
      }
    };
    fetchListing();
  }, [id, navigate]);

  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      ShowToast("ERROR", "You cannot edit this listing");
      navigate("/");
    }
  }, [auth, navigate, listing]);

  console.log(listing, "Listing");
  return (
    <DashboardLayout>
      {loading && <Spinner />}

      {!loading && (
        <section className="flex flex-col justify-center items-center w-full">
          <h1 className="text-3xl font-bold uppercase">Edit Listing</h1>
          <div className="mt-6 w-full  sm:w-[70%] md:w-[50%] px-3 mx-auto">
            <form onSubmit={formik.handleSubmit}>
              <p className="text-lg text-[#c69963] font-semibold">
                Sell / Rent
              </p>
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
                  <div className="text-red-500">
                    {formik.errors.propertyName}
                  </div>
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
                    <div className="text-red-500">
                      {formik.errors.bathrooms}
                    </div>
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
                <p className="text-lg text-[#c69963] font-semibold">
                  Furnished
                </p>
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

                {!geolocationEnabled && (
                  <div className="flex space-x-6 justify-start mb-6">
                    <div className="">
                      <label className="text-lg text-[#c69963] font-semibold">
                        Latitude
                      </label>
                      <input
                        type="number"
                        id="latitude"
                        value={formik.values.latitude}
                        {...formik.getFieldProps("latitude")}
                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
                      />
                      {formik.touched.latitude && formik.errors.latitude && (
                        <div className="text-red-500">
                          {formik.errors.latitude}
                        </div>
                      )}
                    </div>
                    <div className="">
                      <label className="text-lg text-[#c69963] font-semibold">
                        Longitude
                      </label>
                      <input
                        type="number"
                        id="longitude"
                        value={formik.values.longitude}
                        {...formik.getFieldProps("longitude")}
                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
                      />
                      {formik.touched.longitude && formik.errors.longitude && (
                        <div className="text-red-500">
                          {formik.errors.longitude}
                        </div>
                      )}
                    </div>
                  </div>
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
                  <div className="text-red-500">
                    {formik.errors.description}
                  </div>
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

              <div className="mb-6">
                <p className="text-lg font-semibold text-[#c69963]">Images</p>
                <p className="text-gray-600">
                  The first image will be the cover (max 6)
                </p>
                <input
                  type="file"
                  id="images"
                  onChange={handlePicValue}
                  accept=".jpg,.png,.jpeg"
                  multiple
                  required
                  className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
                />
                {formik.errors.images && formik.touched.images && (
                  <div className="text-red-500">{formik.errors.images}</div>
                )}
              </div>

              <button
                type="submit"
                className="mb-6 mt-6 w-full px-7 py-3 bg-[#101d2c] text-white font-medium uppercase rounded focus:shadow-lg
               hover:bg-slate-600 transition duration-200"
              >
                Edit Listing
              </button>
            </form>
          </div>
        </section>
      )}
    </DashboardLayout>
  );
};
