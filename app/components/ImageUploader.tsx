import React, { useCallback, useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { uploadFromBlobAsync } from "@/services/UploadService";

const containerStyle = {
  background: "#dadada",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 50,
  textAlign: "center",
};

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

interface FileWithPreview extends File {
  preview: string;
}

function ImageUploader({
  onChange,
  folder = "avatars",
  size = 250,
  url = "",
}: {
  url: string;
  folder: string;
  size: number;
  onChange: (filepath: string) => void;
}) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [, setLoading] = useState(false);
  const [initialUrl, setInitialUrl] = useState<string>("");
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    await uploadFromBlobAsync(
      acceptedFiles[0],
      folder,
      (url) => {
        setLoading(false);
        onChange(url);
      },
      () => {
        setLoading(false);
        toast.error("Something wrong..., check your network?", {
          containerId: "error-toast",
        });
      }
    );
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (url) {
      setInitialUrl(url);
    }
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  }, [url]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });
  const renderPreview = () => {
    if (files.length !== 0 || initialUrl !== "") {
      return (
        <img
          src={files?.[0]?.preview || initialUrl}
          alt="preview"
          style={{ maxWidth: "100%" }}
        />
      );
    }
    return isDragActive ? (
      <p>Drop the files here ...</p>
    ) : (
      <p>Drag 'n' drop some files here, or click to select files</p>
    );
  };
  return (
    <Paper
      sx={{
        ...containerStyle,
        width: size,
        height: size,
        maxHeight: size,
        minHeight: size,
      }}
      {...getRootProps({ style: baseStyle })}
    >
      <input {...getInputProps()} />
      {renderPreview()}
    </Paper>
  );
}

export default ImageUploader;
