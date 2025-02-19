import React, { useEffect, useState } from "react";
import "./InputDate.css";

export function InputDate({ 
  id, 
  type, 
  register, 
  validaciones, 
  defaultDate, 
  isDisabled, 
  rangeMode = null, // "past", "future", "both", o null
  rangeDays = 4 // Días limite
}) {
  const [selectedDate, setSelectedDate] = useState("");

  const getFormattedDate = (offsetDays) => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().split("T")[0];
  };

  let minDate = null;
  let maxDate = null;

  if (rangeMode === "past") {
    minDate = getFormattedDate(-rangeDays);
    maxDate = getFormattedDate(0); 
  } else if (rangeMode === "future") {
    minDate = getFormattedDate(0); 
    maxDate = getFormattedDate(rangeDays);
  } else if (rangeMode === "both") {
    minDate = getFormattedDate(-rangeDays);
    maxDate = getFormattedDate(rangeDays);
  }

  useEffect(() => {
    if (defaultDate) {
      const today = new Date().toISOString().split("T")[0]; 
      setSelectedDate(today);
      register(id, validaciones).onChange({ target: { value: today } });
    }
  }, [defaultDate]);

  return (
    <input
      id={id}
      type={type}
      {...register(id, validaciones)}
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      disabled={isDisabled}
      min={minDate || undefined}
      max={maxDate || undefined}
    />
  );
}
