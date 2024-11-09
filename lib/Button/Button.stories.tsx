import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          color: "white",
          fontSize: 24,
          fontFamily: "monospace",
        }}
      >
        Get Started here!
      </div>
    ),
    backgroundColor: "#5dbea3",
    borderColor: "#80669d",
    activeBackgroundColor: "#80669d",
    activerBorderColor: "#5dbea3",
    onClick: () => alert("Hello There!"),
    // width: '200px',
    // height: '200px'
  },
};
