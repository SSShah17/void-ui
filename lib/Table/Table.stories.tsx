import { Meta, StoryObj } from "@storybook/react";

import { Table } from "./Table";

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    data: [
      {
        name: "Cy Ganderton",
        job: "Quality Control Specialist",
        location: "Canada",
        date: new Date("12/7/2015"),
      },
      {
        name: "Hart Hagerty",
        job: "Desktop Support Technician",
        location: "United States",
        date: new Date("12/7/2015"),
      },
      {
        name: "Brice Swyre",
        job: "Tax Accountant",
        location: "China",
        date: new Date("12/7/2015"),
      },
    ],
    columns: [
      {
        key: "name",
        title: "Name",
        width: "200px",
      },
      {
        key: "job",
        title: "Job",
        width: "200px",
      },
      {
        key: "location",
        title: "Color",
        width: "200px",
      },
      {
        key: "date",
        title: "Date",
        width: "150px",
      },
    ],
    altRowColor: "#ecf59d",
    accentColor: "#f7ba02",
  },
};
