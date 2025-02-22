import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import "./InputDate.css";

export function InputDate({ 
  id, 
  type = "date", 
  register, 
  validaciones, 
  isDisabled, 
  rangeMode = null, // "past", "future", "both", o null
  rangeDays = 4, // Días límite
  baseDateName = null, // Nombre del otro input en React Hook Form (opcional)
  control = null // Pasar el control de useForm() (opcional)
}) {
  // Si `baseDateName` y `control` existen, usamos `useWatch`; de lo contrario, baseDate será `null`
  const baseDate = baseDateName && control ? useWatch({ control, name: baseDateName }) : null;
  const [selectedDate, setSelectedDate] = useState("");
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  // Función para obtener una fecha formateada con un offset en días
  const getFormattedDate = (offsetDays, base = new Date()) => {
    const date = new Date(base);
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().split("T")[0];
  };

  // Actualizar la fecha seleccionada y los límites cuando cambie baseDate
  useEffect(() => {
    let initialDate;

    if (baseDate) {
      try {
        initialDate = getFormattedDate(60, new Date(baseDate)); // 60 días después de la fecha base
      } catch (error) {
        console.error("Error al procesar baseDate:", baseDate, error);
        initialDate = getFormattedDate(60); // Si hay error, usa la fecha actual como base
      }
    } else {
      initialDate = getFormattedDate(0); // Si no hay baseDate, usa la fecha actual
    }

    setSelectedDate(initialDate);
    register(id, validaciones).onChange({ target: { value: initialDate } });

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
  }, [baseDate, rangeMode, rangeDays]);

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
