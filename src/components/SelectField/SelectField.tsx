interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  options: string[];
}

export default function SelectField({ id, options, ...props }: SelectFieldProps) {
  return (
    <select id={id} {...props}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}