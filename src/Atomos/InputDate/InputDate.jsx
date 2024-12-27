import React, { useEffect, useState } from "react";
import "./InputDate.css";

export function InputDate({ id, type, register, validaciones, defaultDate}) {
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (defaultDate) {
      const today = new Date().toISOString().split("T")[0]; // Formato "YYYY-MM-DD"
      setSelectedDate(today);
    }
  }, [defaultDate]);

  return (
    <input
      id={id}
      type={type}
      value={selectedDate} 
      {...register(id, validaciones)}
      onChange={(e) => setSelectedDate(e.target.value)}
    />
  );
}