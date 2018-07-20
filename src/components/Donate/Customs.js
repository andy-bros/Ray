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
export function InputCredentials({ title, handleChange, name }) {
  return (
    <div>
      <h3>
        {title}:<span require="true">*</span>
      </h3>
      <input
        name={name}
        className="sexy-input"
        onChange={event => handleChange({ event, value: event.target.value })}
      />
    </div>
  );
}
export function SelectBox(props) {
  return (
    <select className="sexy-input" required>
      <option value selected disabled>
        Please Select
      </option>
      <option value="TN"> Tennessee</option>
      <option value="TX"> Texas</option>
      <option value="TN"> Arkansas</option>
      <option value="W"> Wisconsin</option>
      <option value="AL"> Alabama</option>
      <option value="FL"> Florid</option>
      <option value="NY"> NY</option>
      <option value="WOW"> Tennessee</option>
      <option value="AHHA"> Tennessee</option>
    </select>
  );
}
export function HamburgerBun() {
  return <h1>HamburgerBun</h1>;
}
