import { InputBox } from "../components/InputBox";

export default {
  title: 'Components/InputBox',
  component: InputBox,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {},
};

export const WithContext = {
  render: () => (
    <div className="h-screen flex flex-col justify-end">
      <InputBox />
    </div>
  ),
};