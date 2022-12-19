import { Meta } from "@storybook/react";
import Input, { Inputargs } from "../../../../components/atoms/Input";

export default {
    title: 'Components/Atoms/Input',
    component: Input,
} as Meta;

const Template = (args: Inputargs) => <Input {...args} />

export const Default = Template.bind({});

Default.args = {
    label: "Nama Lengkap",
    placeholder: "Masukkan nama",
    name: "name"
}