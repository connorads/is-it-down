import React from "react";

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
        <input type="text" value={text} onChange={handleChange} />
        <input type="submit" value="Go" />
      </form>
    );
  }

export default TextForm;