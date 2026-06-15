function Card({
  children,
  className = "",
}) {

  return (
    <div
      className={`
      bg-white
      rounded-2xl
      border
      border-gray-200
      shadow-[0_2px_8px_rgba(0,0,0,.04)]
      p-5
      ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;