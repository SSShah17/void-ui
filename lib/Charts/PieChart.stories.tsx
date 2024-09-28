import { Meta, StoryObj } from "@storybook/react";

import { PieChart } from "./PieChart";

const meta: Meta<typeof PieChart> = {
  component: PieChart,
};

export default meta;

type Story = StoryObj<typeof PieChart>;

export const Default: Story = {
  args: {
    data: [
      { value: 25, title: "School", color: "orangered" },
      { value: 34, title: "Sleeping", color: "dodgerblue" },
      { value: 25, title: "Music", color: "seagreen" },
      { value: 8, title: "Playing", color: "slategray" },
      { value: 8, title: "Studies", color: "orange" },
    ],
  },
};
