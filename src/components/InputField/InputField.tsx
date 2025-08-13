interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export default function InputField({ id, ...props }: InputFieldProps) {
  return <input id={id} {...props} />;
}