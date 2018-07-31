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
        {title.label}:<span
          require={currentValue || title.notRequired ? "false" : "true"}
        >
          *
        </span>
      </h3>
      <input
        name={name}
        className="sexy-input"
        placeholder={title.notRequired && "optional"}
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
export function DonateBtn() {
  return <button className="btn-donate">Donate</button>;
}
export function Card({ text, size, img }) {
  return (
    <div className="pic-and-card">
      <img className="picture-container" src={img} width="300px" />
      <section className="card-container">{text}</section>,
    </div>
  );
}
