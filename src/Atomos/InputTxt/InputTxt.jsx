import "./InputTxt.css";

export function InputTxt({
  id,
  type,
  placeholder,
  register,
  validaciones,
  value,
  onChange,
  isDisabled,

  variant
}) {
  // Desestructura las funciones de RHF
  const {
    onChange: rhfOnChange,
    onBlur,
    name,
    ref,
  } = register(id, validaciones);

  return (
    <input
      className="inputTxt-atomo"

      data-variant={variant}

      id={id}
      name={name}
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      
      disabled={isDisabled}

      

      onChange={(e) => {
        // Primero ejecuta tu onChange personalizado (si existe)
        if (onChange) onChange(e);
        // Luego llama al onChange de RHF
        rhfOnChange(e);
      }}
    />
  );
}
