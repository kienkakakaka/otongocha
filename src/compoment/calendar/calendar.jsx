import style from "./calendar.module.scss";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../config";
import { Card, Col, Row } from "antd";
import { set, ref, onValue } from "firebase/database";
import { UserContext } from "../../usecontex/usecontex";
import { MyContext } from "../../usecontex/usecontex1";
import Notifications from "./notifications";

const Calendar = () => {
  const { Messenger } = useContext(MyContext);
  const uid = uuidv4();
  const username = localStorage.getItem("user");
  const [arrDate, setArrDate] = useState([]);
  // const [notOff, setNotOff] = useState(0);
  const { readDatabase, writeDatabase } = useContext(UserContext);
  const [today, setToday] = useState(new Date());
  const [daysss, setday] = useState(today.getDay());
  const [dataDayOff, setDataDayOff] = useState([]);
  const [whyoffday, setWhyoffday] = useState("");
  const [date, setDate] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [hours, setHours] = useState(today.getHours());
  const [minutes, setMinutes] = useState(today.getMinutes());

  const [arrLastDate, setarrLastDate] = useState([]);
  const [arrNextDate, setarrNextDate] = useState([]);
  const [events, setEvents] = useState();
  const [valueEvent, setValueEvent] = useState();
  const [dayEvent, setDayEvent] = useState();
  const [valueSelect, setValueSelect] = useState("nooff");
  const [valueOffday, setvalueOffday] = useState([]);
  let indexEditDay;
  const months = [
    "Tháng Một",
    "Tháng Hai",
    "Tháng Ba",
    "Tháng Tư",
    "Tháng Năm",
    "Tháng Sáu",
    "Tháng Bảy",
    "Tháng Tám",
    "Tháng Chín",
    "Tháng Mười",
    "Tháng Mười Một",
    "Tháng Mười Hai",
  ];

  let arrr = [];
  let arrDates = [];

  useEffect(() => {
    readDatabase(`datadayoff/data`, setDataDayOff);
    readDatabase(`user/${username}/value/data`, setArrDate);
  }, []);
  if (arrDate && arrDate.length !== 0) {
    if (arrDate !== undefined && arrDate !== undefined && arrDate !== null) {
      indexEditDay = arrDate.findIndex(
        (data) => data.month === month && data.year === year
      );
    }

    if (
      arrDate &&
      indexEditDay !== -1 &&
      indexEditDay !== undefined &&
      arrDate[indexEditDay]
    ) {
      // console.log(indexEditDay);
      arrDates = arrDate[indexEditDay].value;
    }
  }
  if (arrDate[indexEditDay]) {
    const arrr = [...arrDate];
    console.log(arrDate[indexEditDay]);
    const items = arrr[indexEditDay].value;
    for (let i = 0; i < items.length; i++) {
      const element = items[i];

      if (!element.isSelect && element.value < date) {
        element.isSelect = "nooff";
        console.log(element);
      }
    }
    writeDatabase(`/user/${username}/value`, arrr);
  }
  console.log(arrDate);
  useEffect(() => {
    const firstDay = new Date(year, month, 1).getDay(); //ngày đầu tiên của tháng trước là thứ mấy(5)
    const prevDay = new Date(year, month, 0).getDate(); // ngày cuối cùng của tháng trước (31)
    const lastDay = new Date(year, month + 1, 0).getDate(); // ngày cuối cùng của tháng  này(30)
    const firsPrevDay = new Date(year, month + 1, 0).getDay();
    const nextDays = 7 - firsPrevDay;
    let arrLastDates = [];
    const arrNextDates = [];
    for (let i = firstDay; i > 0; i--) {
      arrLastDates.push(
        <div key={i} className={style.prevday}>
          {prevDay - i + 1}
        </div>
      );
    }

    setarrNextDate(arrLastDates);
    for (let i = 1; i < nextDays; i++) {
      arrNextDates.push(
        <div key={i} className={style.prevday}>
          {i}
        </div>
      );
    }

    setarrLastDate(arrNextDates);
    let values = [];
    if (username) {
      for (let i = 1; i <= lastDay; i++) {
        if (
          year < today.getFullYear() ||
          (month < today.getMonth() && year === today.getFullYear())
        ) {
          values.push({ value: i, key: i, isSelect: "nooff" });
        } else if (
          year === today.getFullYear() &&
          month === today.getMonth() &&
          i < today.getDate()
        ) {
          values.push({ value: i, key: i, isSelect: "nooff" });
        } else values.push({ value: i, key: i });
      }

      if (arrDate === null) {
        arrr = [{ month: month, year: year, value: values }];

        writeDatabase(`/user/${username}/value`, arrr);
      }

      if (indexEditDay === -1) {
        let Arrdata = [...arrDate, { month: month, year: year, value: values }];

        writeDatabase(`/user/${username}/value`, Arrdata);
      }
    }
  }, [today, year, month, arrDate]);

  const handerClick = (i) => {
    setDayEvent(i);
    setvalueOffday(
      dataDayOff &&
        dataDayOff.filter(
          (data) => data.day === i && data.month === month && data.year === year
        )
    );
    Messenger("info", "Chọn loại nghỉ và viết lý do");
  };

  const handerClickprev = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear(year - 1);
        return 11;
      } else {
        return prev - 1;
      }
    });
    Messenger("success", "Thành công");
  };
  const handerClicknext = () => {
    setMonth((prev) => {
      if (prev < 11) {
        return prev + 1;
      } else {
        setYear(year + 1);
        return 0;
      }
    });
    Messenger("success", "Thành công");
  };

  let calculatedResult = useMemo(() => {
    return (
      arrDates &&
      arrDates.reduce((acc, day) => {
        if (day.success === "ok" && day.isSelect === "offmorning") {
          return acc + 0.5;
        } else if (day.success === "ok" && day.isSelect === "offafternoon") {
          return acc + 0.5;
        } else if (
          day.isSelect === "nooff" ||
          (day.success === "no" && day.isSelect === "nooff")
          // (day.success === "no" && day.isSelect === "nooff")
        ) {
          return acc + 1;
        }
        return acc;
      }, 0)
    );
  }, [arrDates]);

  let calculatedResult2 = useMemo(() => {
    return (
      arrDates &&
      arrDates.reduce((acc, day) => {
        if (day.success === "ok" && day.isSelect === "offmorning") {
          return acc + 0.5;
        } else if (day.success === "ok" && day.isSelect === "offafternoon") {
          return acc + 0.5;
        } else if (day.success === "ok" && day.isSelect === "offfullday") {
          return acc + 1;
        }
        return acc;
      }, 0)
    );
  }, [arrDates]);

  const addEvent = () => {
    let arrday = [...arrDate];
    if (!arrday[indexEditDay].value[dayEvent]) {
      Messenger("error", "Chưa chọn ngày");
      return;
    }
    arrday[indexEditDay].value[dayEvent].isSelect = valueSelect;
    arrday[indexEditDay].value[dayEvent].success = "wait";
    // arrday[indexEditDay].value[dayEvent].success = false;

    writeDatabase(`/user/${username}/value`, arrday);

    // let indexValueoffdate;
    // if (dataDayOff !== null) {
    //   indexValueoffdate = dataDayOff.findIndex(
    //     (day) =>
    //       day.username === username &&
    //       day.day === dayEvent &&
    //       day.month === month &&
    //       day.year === year
    //   );
    // }

    // console.log(indexValueoffdate);

    if (dataDayOff !== null) {
      const indexValueoffdate = dataDayOff.findIndex(
        (day) =>
          day.username === username &&
          day.day === dayEvent &&
          day.month === month &&
          day.year === year
      );
      if (indexValueoffdate !== -1) {
        let data = [...dataDayOff];
        data[indexValueoffdate].success = "wait";
        writeDatabase(`datadayoff`, data);
      } else {
        let dataEventDay = [
          ...dataDayOff,
          {
            username: username,
            titel: valueSelect,
            timeHours: hours,
            timeMinutes: minutes,
            day: dayEvent,
            dayevent: date,
            month: month,
            year: year,
            text: whyoffday,
            milisecend: today.getMilliseconds(),

            success: "wait",
          },
        ];
        writeDatabase(`datadayoff`, dataEventDay);
      }
    } else {
      let dataEventDay = [
        {
          username: username,
          titel: valueSelect,
          timeHours: hours,
          timeMinutes: minutes,
          day: dayEvent,
          dayevent: date,
          month: month,
          year: year,
          text: whyoffday,
          milisecend: today.getMilliseconds(),
          success: "wait",
        },
      ];
      writeDatabase(`datadayoff`, dataEventDay);
    }

    // else {
    //   let dataEventDay = [...dataDayOff];
    //   dataEventDay[indexValueoffdate].success = "wait";
    //   writeDatabase(`datadayoff`, dataEventDay);
    // }

    Messenger("success", "Nộp đơn nghỉ phép thành công");
  };
  const handerSelect = (e) => setValueSelect(e.target.value);

  return (
    <div className="container">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Số ngày công tháng này" bordered={false}>
            <h1>{calculatedResult}</h1>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Số ngày nghỉ" bordered={false}>
            <h1>{calculatedResult2}</h1>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Số ngày nghỉ phép" bordered={false}>
            <h1>đơn nghỉ</h1>
          </Card>
        </Col>
      </Row>
      <div className={style.body}>
        <div className={style.container}>
          <div className={style.month}>
            <i
              onClick={() => handerClickprev()}
              className="fa-solid fa-chevron-left"></i>

            <div>
              {months[month]}
              {year}
            </div>
            <i
              onClick={() => handerClicknext()}
              className="fa-solid fa-chevron-right"></i>
          </div>
          <div className={style.month}>
            <div>CN</div>
            <div>Thứ 2</div>
            <div>Thứ 3</div>
            <div>Thứ 4</div>
            <div>Thứ 5</div>
            <div>Thứ 6</div>
            <div>Thứ 7</div>
          </div>
          <div className={style.days}>
            {arrNextDate}
            {arrDates &&
              arrDates.map((day) => {
                let color;
                if (day.success === "wait") {
                  color = "warr";
                } else if (
                  day.success === "ok" &&
                  day.isSelect === "offfullday"
                ) {
                  color = "offfullday";
                } else if (
                  day.success === "ok" &&
                  day.isSelect === "offmorning"
                ) {
                  color = "offmorning";
                } else if (
                  day.success === "ok" &&
                  day.isSelect === "offafternoon"
                ) {
                  color = "offafternoon";
                } else if (!day.success && day.isSelect == "nooff") {
                  color = "nooff";
                }
                // else if (!day.isSelect) {
                //   color = "";
                // }
                return (
                  <div
                    className={`${day.event && style.active} ${style.day}`}
                    key={day.key}
                    onClick={() => handerClick(day.value - 1)}>
                    <p className={`${style[color]} ${style.colordays}`}>
                      {day.value}
                    </p>
                  </div>
                );
              })}
            {set}
            {arrLastDate}
          </div>
        </div>
        <div className={style.events}>
          <h2>
            {dayEvent &&
              `${hours}:${minutes} ${dayEvent + 1} / ${month + 1} / ${year}`}
          </h2>
          <p className="mb-2">Đăng ký nghỉ :</p>

          <select className="form-select" onChange={handerSelect}>
            <option value="nooff">Không nghỉ</option>
            <option value="offfullday">Nghỉ nguyên ngày</option>
            <option value="offmorning">Nghỉ buổi sáng</option>
            <option value="offafternoon">Nghỉ buổi chiều</option>
          </select>
          <label htmlFor="inputref" className="mt-2">
            Lý do:
          </label>
          <input
            onChange={(e) => setWhyoffday(e.target.value)}
            id="inputref"
            type="text"
            placeholder="Nhập lý do xin nghỉ"
          />
          <label htmlFor="inputref" className="mt-2">
            Đăng ký làm thêm
          </label>
          <input id="inputref" type="numbe" placeholder="Nhập số giờ" />
          <button className="btn btn-primary" onClick={addEvent}>
            Cập nhật
          </button>
          <div>
            {valueOffday &&
              valueOffday.map((data) => {
                return (
                  <p>
                    {data.success === "ok" &&
                      `${data.username} đăng ký nghỉ ${
                        data.titel === "offfullday" ? "Nghỉ nguyên ngày" : ""
                      }${data.titel === "offmorning" ? "Nghỉ buổi sáng" : ""}${
                        data.titel === "offafternoon" ? "Nghỉ buổi chiều" : ""
                      } lúc ${data.timeHours}:${data.timeMinutes} ngày ${
                        data.dayevent
                      }/${data.month + 1}/${data.year}`}
                  </p>
                );
              })}
          </div>
        </div>
      </div>
      <Notifications />
    </div>
  );
};
export default Calendar;
