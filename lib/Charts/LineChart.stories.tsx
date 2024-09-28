import { Meta, StoryObj } from "@storybook/react";

import { LineChart } from "./LineChart";

const meta: Meta<typeof LineChart> = {
  component: LineChart,
};

export default meta;

type Story = StoryObj<typeof LineChart>;

export const Default: Story = {
  args: {
    data: [
      { label: "Jan", data: 0 },
      { label: "Feb", data: 400 },
      { label: "Mar", data: 300 },
      { label: "Apr", data: 100 },
      { label: "May", data: 400 },
      { label: "Jun", data: 500 },
      { label: "Jul", data: 400 },
    ],
    showXAxisGridLines: true,
    showYAxisGridLines: true,
    xAxisText: "Month",
    yAxisText: "Sales",
    width: 800,
    height: 450,
  },
};
