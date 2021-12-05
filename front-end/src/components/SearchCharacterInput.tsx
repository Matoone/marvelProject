import { SyntheticEvent, useState } from "react";
import { Button, TextField } from "ui-neumorphism";

export default function SearchCharacterInput({
  nameText,
  setNameText,
  onSubmit,
}: {
  nameText: string;
  setNameText: (val: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="f-center">
      <TextField
        //loading
        label="Name"
        value={nameText}
        onKeyDown={(e: any) => {
          console.log(`${e.key}`);
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
        onChange={(e: HTMLInputElement) => setNameText(e.value)}
      />{" "}
      <Button onClick={onSubmit} color="var(--primary)">
        Search
      </Button>{" "}
    </div>
  );
}
