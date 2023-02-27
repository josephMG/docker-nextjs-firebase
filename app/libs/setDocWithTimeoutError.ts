import { doc, setDoc } from "firebase/firestore";
import { db } from "@/configs/firebase";

const setDocWithTimeoutError = (
  path: string,
  data: Record<string, any>,
  options?: { timeout: number }
) => {
  const timeoutMS = options?.timeout || 5000;
  const setDocPromise = setDoc(doc(db, path), data, { merge: true });

  return Promise.race([
    setDocPromise,
    new Promise((_, reject) =>
      setTimeout(reject, timeoutMS, new Error("timeout"))
    ),
  ]);
};

export default setDocWithTimeoutError;
