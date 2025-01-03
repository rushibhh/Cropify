"use client";
import React, { useRef, FormEvent } from "react";

const UncontrolledForm: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const firstName = firstNameRef?.current?.value || "";
    const lastName = lastNameRef?.current?.value || "";

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);

    console.log(12345);

    if (firstNameRef.current) firstNameRef.current.value = "";
    if (lastNameRef.current) lastNameRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" ref={firstNameRef} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" ref={lastNameRef} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
