import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { cloudStorage } from "configs/firebase";

export const uploadFromBlobAsync = async (
  file: File,
  folder: string,
  onSuccess: (url: string) => void,
  onError = (err: Error) => {}
) => {
  if (!file) return null;
  const storageRef = ref(cloudStorage, `/${folder}/${Date.now()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  /*
  console.log(uploadTask)
  uploadTask.then(() => {
    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      onSuccess(url);
    });
  }).catch((err) => {
    console.log(err)
  })
 */
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    onError,
    () => {
      // download url
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
        onSuccess(url);
      });
    }
  );
};
