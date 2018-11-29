import React from "react";
import { storiesOf } from "@storybook/react";
import { Title } from "../src";

storiesOf("Title", module).add("Title - custom", () => <Title label="Test" />, {
  notes: "A very simple component"
});
storiesOf("Title", module).add(
  "Title - custom with icon",
  () => <Title label="Test" icon="object" />,
  { notes: "A very simple component" }
);
