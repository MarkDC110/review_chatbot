import { FC, HTMLProps } from 'react';
import "./style.css";

export type InputProps = HTMLProps<HTMLInputElement>;

const Input: FC<InputProps> = ({ ...props }) => {
  return <input className="c-input" {...props} />;
};

export default Input;
