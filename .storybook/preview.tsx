import { pretendard } from "@/styles/fonts/pretendard";
import type { Preview } from "@storybook/nextjs";
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={pretendard.className}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
