import { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          width: "100%",
          height: "100%",
          color: "#303030",
          fontSize: 24,
          fontFamily: "monospace",
          backgroundColor: 'blanchedalmond'
        }}
      >
        Try Hovering on Me✨
      </div>
    ),
  },
};
