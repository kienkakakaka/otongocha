import React, { useContext, useState } from "react";
import style from "../form/form.module.scss";
import { MyContext } from "../../usecontex/usecontex1";
import Select from "react-select";
const Oveplayevent = () => {
  //   const [hinderTable, setHinderTable] = useState(false);
  const { itemsNote, hinderOverplay, setHinderOverplay } =
    useContext(MyContext);

  return (
    <>
      {hinderOverplay && (
        <div className={style.oveplay}>
          <div style={{ overflow: "auto" }} className={style.oveplayconten}>
            <button
              className="btn btn-primary"
              style={{ float: "right" }}
              onClick={() => setHinderOverplay(false)}>
              close
            </button>

            <table className=" table table-bordered border-black">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tag</th>
                  <th>KTV</th>
                  <th>Ghi chú</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {itemsNote &&
                  itemsNote.map((item, index) => (
                    <tr
                      onClick={() => {
                        // setIndexItem(index);
                      }}>
                      <td>{index + 1}</td>
                      <td>{item.name_item}</td>
                      <td>{item.price}</td>
                      <td>
                        {item.quantity} {item.unit}
                      </td>
                      <td>{item.tag || ""}</td>
                      {/* {hinderEdit && ( */}
                      <td>
                        <Select
                          isMulti
                          value={item.ktv}
                          name="colors"
                          // onChange={(option) => {
                          //   handerSelect(option);
                          // }}
                          // options={datauserktv}
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      </td>
                      {/* )} */}
                      <td
                      //   onClick={() => setOpentex(true)}
                      >
                        {item.text}{" "}
                        {
                          console.log(item.text)
                          /* {opentext && (
                      <input
                        type="text"
                        // onChange={(e) => setchangeInput(e.target.value)}
                      />
                    )} */
                        }
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            // editItems(index);
                          }}>
                          Lưu
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Oveplayevent;
