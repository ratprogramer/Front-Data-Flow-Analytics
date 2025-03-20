import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import "./InputDate.css";
import { useThemeContext } from "../../context/ThemeContext";

export function InputDate({ 
  id, 
  type = "date", 
  register, 
  validaciones, 
  isDisabled, 
  rangeMode = null, // "past", "future", "both", o null
  rangeDays = 4, // Días límite
}) {
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  const { contextTheme } = useThemeContext();

  // Función para obtener una fecha formateada con un offset en días
  const getFormattedDate = (offsetDays, base = new Date()) => {
    const date = new Date(base);
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().split("T")[0];
  };

  // Actualizar la fecha seleccionada y los límites cuando cambie baseDate
  useEffect(() => {
    let initialDate = new Date().toISOString().split("T")[0];;
    let newMinDate = null;
    let newMaxDate = null;

    if (rangeMode === "past") {
      newMinDate = getFormattedDate(-rangeDays, initialDate);
      newMaxDate = initialDate;
    } else if (rangeMode === "future") {
      newMinDate = initialDate;
      newMaxDate = getFormattedDate(rangeDays, initialDate);
    } else if (rangeMode === "both") {
      newMinDate = getFormattedDate(-rangeDays, initialDate);
      newMaxDate = getFormattedDate(rangeDays, initialDate);
    }

    setMinDate(newMinDate);
    setMaxDate(newMaxDate);
  }, [rangeMode, rangeDays]);

  return (
    <input
      id={id}
      type={type}
      {...register(id, validaciones)}
      disabled={isDisabled}
      min={minDate || undefined}
      max={maxDate || undefined}
    />
  );
}
