import React, { useEffect, useState } from "react";
import "../css/DateList.css";

const DateList = ({ selectedDate, setSelectedDate }) => {
    const today = new Date();

    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [allDays, setAllDays] = useState([]);

    useEffect(() => {
        setAllDays(getMonthInDays(currentYear, currentMonth));
    }, [currentYear, currentMonth]);

    // 현재 달의 1일부터 마지막 날까지 값 가져오기
    const getMonthInDays = (year, month) => {
        // 인덱싱은 0부터
        // 마지막 일을 가져오는 로직 -> 현재 달의 다음 달을 가져오고, 0을 찾으면 이전달의 마지막 날을 리턴함
        const endDays = new Date(year, month + 1, 0).getDate();

        // 전체 일을 담는 배열 선언
        return Array.from({ length: endDays }, (_, i) => i + 1);
    };

    const handleDayClick = (day) => {
        const newDate = new Date(currentYear, currentMonth, day);
        setSelectedDate(formatDate(newDate));
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handlePreviousMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        if (currentMonth === 0) {
            setCurrentYear((prevYear) => prevYear - 1);
        }
    };

    const handleNextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        if (currentMonth === 11) {
            setCurrentYear((prevYear) => prevYear + 1);
        }
    };

    // 선택한 날짜를 가운데로 보이게
    useEffect(() => {
        const selectedDay = new Date(selectedDate).getDate();
        const selectedElement = document.querySelector(`.day-item[data-day='${selectedDay}']`);
        if (selectedElement) {
            selectedElement.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    }, [selectedDate, allDays]);

    return (
        <div>
            {/* 연도, 월 */}
            <div className="month-selector">
                <button onClick={handlePreviousMonth}>◀</button>
                <span>{`${currentYear}.${String(currentMonth + 1).padStart(2, "0")}`}</span>
                <button onClick={handleNextMonth}>▶</button>
            </div>

            {/* 일 */}
            <div className="day-picker">
                <ul className="days-list">
                    {allDays.map((day) => {
                        const isSelected = day === new Date(selectedDate).getDate();
                        return (
                            <li
                                key={day}
                                data-day={day}
                                className={`day-item ${isSelected ? "selected" : ""}`}
                                onClick={() => handleDayClick(day)}
                            >
                                {day}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default DateList;
