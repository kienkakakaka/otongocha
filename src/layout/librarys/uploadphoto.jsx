import React, { useContext, useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, push, ref as dbRef, set } from "firebase/database";
import { UserContext } from "../../usecontex/usecontex";
import Renderlistimg from "./renderlistimg";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({ path }) => {
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState([]);

  const handleChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);
    setImages([...images, ...newImages]);
  };

  const handleUpload = () => {
    images.forEach((image, index) => {
      const storageRef = ref(getStorage(), `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress((prevProgress) => {
            const updatedProgress = [...prevProgress];
            updatedProgress[index] = progress;
            return updatedProgress;
          });
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImages([]);
            saveImageToDatabase(image.name, downloadURL);
          });
        }
      );
    });
  };

  const saveImageToDatabase = (imageName, downloadURL) => {
    const data = {
      name: imageName,
      path: path,
      type: "img",
      url: downloadURL,
      time: new Date(),
    };
    const newImageRef = push(dbRef(getDatabase(), "/home"));
    set(newImageRef, data);
    setImages([]);
  };

  return (
    <div>
      <input onChange={handleChange} type="file" multiple />
      <button onClick={handleUpload}>Upload</button>
      {progress.map((value, index) => (
        <div key={index}>
          <progress value={value} max="100" />
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;
