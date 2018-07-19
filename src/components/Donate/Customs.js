import React from "react";

export function RadioBtn({ value, label, handleSelection, checked }) {
  return (
    <aside>
      <input
        type="radio"
        name="checked"
        value={value}
        checked={checked == value}
        onChange={event =>
          handleSelection({ event, value: event.target.value })
        }
      />
      <label>{label}</label>
    </aside>
  );
}
export function InputCredentials(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <input placeholder={props.title} />
    </div>
  );
}
