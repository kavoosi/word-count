import React from "react";

function WordCountTest(props) {
  return (
    <>
      <div />
      <label className="label" htmlFor="name">
        Name
      </label>
      <input
        className="input"
        htmlFor="name"
        id="name"
        name="name"
        data-testid="input-element"
        role="valid-text"
      />
      <div
        data-testid="output-element"
        label="valid-text"
        role="valid-text"
      ></div>
    </>
  );
}

export default WordCountTest;
