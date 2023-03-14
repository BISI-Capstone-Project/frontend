import { toast, Flip } from "react-toastify";

const OPTIONS = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
}

export default {
    error: () => toast.error(
        'An error occurred',
        OPTIONS
    ),
    promise: (promise, messages) => toast.promise(
        promise,
        messages,
        OPTIONS
    ),
    info: (message) => toast.info(
        message,
        OPTIONS,
    ),
};
