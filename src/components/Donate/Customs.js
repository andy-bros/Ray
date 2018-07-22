import React from "react";

export function RadioBtn({ value, label, handleChange, checked }) {
  return (
    <aside>
      <input
        type="radio"
        name="checked"
        value={value}
        checked={checked == value}
        onChange={event => handleChange({ event, value: event.target.value })}
      />
      <label>{label}</label>
    </aside>
  );
}
export function InputCredentials({ title, handleChange, name, currentValue }) {
  return (
    <div>
      <h3>
        {title}:<span
          require={currentValue || name == "streetAddress2" ? "false" : "true"}
        >
          *
        </span>
      </h3>
      <input
        name={name}
        className="sexy-input"
        onChange={event => handleChange({ event, value: event.target.value })}
      />
    </div>
  );
}
export function SelectBox({ selection, handleChange }) {
  let options = selection.map((e, i) => {
    return (
      <option key={e + i} value={e}>
        {e}
      </option>
    );
  });
  return (
    <select
      className="sexy-input"
      onChange={event => handleChange({ event, value: event.target.value })}
      required="required"
      name="state"
    >
      {options}
    </select>
  );
}
export function SubmitButton() {
  return <input type="submit" value="Submit" className="btn-submit" />;
}
export function HamburgerBun() {
  return <h1>HamburgerBun</h1>;
}
