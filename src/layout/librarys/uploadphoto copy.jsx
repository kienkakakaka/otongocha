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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    // Your initial file list here
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const newImages = newFileList.map((file) => file.originFileObj);
    setImages([...images, ...newImages]);
  };
  console.log(images);
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
            console.log("File available at", downloadURL);
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}>
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        onOk={handleUpload}
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      {progress.map((value, index) => (
        <div key={index}>
          <progress value={value} max="100" />
        </div>
      ))}
    </>
  );
};

export default ImageUpload;
