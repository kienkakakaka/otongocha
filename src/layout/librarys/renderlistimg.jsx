import React, { useContext, useEffect, useState, useRef } from "react";
import { Image, Card, Avatar, Button, Modal, Col, Divider, Row } from "antd";
import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  FileAddOutlined,
  FolderAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { UserContext } from "../../usecontex/usecontex";
import { getDatabase, push, ref as dbRef, set } from "firebase/database";
import ImageUpload from "./uploadphoto";
const { Meta } = Card;
const Renderlistimg = () => {
  const inputRef = useRef(null);
  //  const [images, setImages] = useState([]);
  const { readDatabase } = useContext(UserContext);
  const [nameInput, setNameInput] = useState("");
  const [titel, setTitel] = useState("");
  const [openInput, setOpenInput] = useState(false);
  const [openSelectFile, setOpenSelectFile] = useState(false);
  const [urlInput, setUrlInput] = useState(null);
  const [typeInput, setTypeInput] = useState("folder");
  const [pathInput, setPathInput] = useState("/home");
  const [dataImg, setDataImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    inputRef.current && inputRef.current.focus();
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setNameInput("");
    saveToDatabase();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    readDatabase("/home", setDataImg);
  }, []);
  let list = [];
  if (dataImg !== null) {
    list = Object.values(dataImg).filter((item) => item.path === pathInput);
  }

  const saveToDatabase = () => {
    if (nameInput === "") return;
    const data = {
      name: nameInput,
      url: urlInput,
      type: typeInput,
      path: pathInput,
      time: new Date(),
    };
    const newImageRef = push(dbRef(getDatabase(), "/home"));
    set(newImageRef, data);
  };
  const addFolder = (e) => {
    e.preventDefault();
    setTitel("Hãy đặt tên cho thư mục");
    setOpenSelectFile(false);
    inputRef.current && inputRef.current.focus();
    setOpenInput(true);
    setIsModalOpen(true);
  };
  const addfile = (e) => {
    e.preventDefault();
    setTitel("Hãy thêm file vào");
    setOpenSelectFile(true);
    setOpenInput(false);
    setIsModalOpen(true);
  };
  const hander_click_button = (path) => {
    // e.preventDefault();

    setPathInput((pre) => {
      return `${pre}/${path}`;
    });
  };

  return (
    <div className=" container">
      <div style={{ float: "right" }}>
        <Button
          onClick={addfile}
          type="primary"
          icon={<FileAddOutlined />}
          size={"large"}
        />
        <Button
          onClick={addFolder}
          type="primary"
          icon={<FolderAddOutlined />}
          size={"large"}
        />
      </div>
      <h1>
        {pathInput.split("/").map((item, index) => (
          <a
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              if (index === 0) return;
              setPathInput(
                pathInput
                  .split("/")
                  .slice(0, index + 1)
                  .join("/")
              );
            }}>
            {item}/
          </a>
        ))}
      </h1>
      <Modal
        title={titel}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        {openSelectFile && <ImageUpload path={pathInput} />}
        {openInput && (
          <input
            ref={inputRef}
            type="text"
            value={nameInput}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleOk();
              }
            }}
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
          />
        )}
      </Modal>

      {list && dataImg && list.length === 0 && (
        <Button onClick={addFolder} type="primary">
          Thêm thư mục
        </Button>
      )}
      <Row gutter={16}>
        {list &&
          list.map((item) => {
            if (item.type === "folder") {
              return (
                <Col
                  className="gutter-row"
                  span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Button
                    block
                    onClick={() => hander_click_button(item.name)}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      height: 50,
                    }}>
                    {item.name}
                  </Button>
                  {/* <div type="primary"></div> */}
                </Col>
              );
            }
          })}
      </Row>

      <Row gutter={32}>
        {list &&
          list.map((item) => {
            if (item.type === "img") {
              return (
                <Col
                  className="gutter-row"
                  span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Card
                    style={{ margin: 10 }}
                    bodyStyle={{ padding: 0 }}
                    cover={
                      <Image
                        width={200}
                        style={{ height: "150px" }}
                        src={item.url}
                      />
                    }
                    actions={[
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}>
                    <Meta description={item.name} />
                  </Card>
                </Col>
              );
            }
          })}
      </Row>
    </div>
  );
};

export default Renderlistimg;
