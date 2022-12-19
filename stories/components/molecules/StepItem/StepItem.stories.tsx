import { Meta } from "@storybook/react";
import StepItem, { StepItemProps } from "../../../../components/molecules/StepItem";

export default {
    title: 'Components/Molecules/StepItem',
    component: StepItem,
} as Meta;

const Template = (args: StepItemProps) => <StepItem {...args} />

export const Default = Template.bind({});

Default.args = {
    icon: 'step1',
    title: "tes", 
    desc1: "1",
    desc2: "2" 
}