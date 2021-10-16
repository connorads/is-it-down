import React from "react";
import styles from '../styles/TextForm.module.css'

interface TextFormProps {
    handleSubmit?: (text: string) => void
    defaultValue?: string
  }
  
  const TextForm = ({ handleSubmit, defaultValue }: TextFormProps) => {
    const [text, setText] = React.useState(defaultValue ?? "");
  
    const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
      setText(event.target.value);
    }
  
    const onSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      console.log("onSubmit", text)
      if (handleSubmit) handleSubmit(text);
    }
  
    return (
      <form onSubmit={onSubmit}>
        <input className={styles.input} type="text" value={text} onChange={handleChange} />
        <input className={styles.button} type="submit" value="Go" />
      </form>
    );
  }

export default TextForm;