import React from "react";
import styles from '../styles/TextForm.module.css'

interface TextFormProps {
    onSubmit?: (text: string) => void
    defaultValue?: string
  }
  
  const TextForm = ({ onSubmit, defaultValue }: TextFormProps) => {
    const [text, setText] = React.useState(defaultValue ?? "");
  
    const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
      setText(event.target.value);
    }
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (onSubmit) onSubmit(text);
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input className={styles.input} type="text" value={text} onChange={handleChange} />
        <input className={styles.button} type="submit" value="Go" />
      </form>
    );
  }

export default TextForm;