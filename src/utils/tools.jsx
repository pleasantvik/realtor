import { toast } from "react-toastify";

export const ShowToast = (type, msg) => {
  switch (type) {
    case "SUCCESS":
      toast.success(msg, {});
      break;
    case "ERROR":
      toast.error(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      break;

    default:
      return false;
  }
};
