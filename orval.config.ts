import { defineConfig } from "orval";

const BASE_URL =
  "http://ec2-43-201-67-242.ap-northeast-2.compute.amazonaws.com:5000";

export default defineConfig({
  adminApi: {
    input: "http://43.201.67.242:5000/openapi.json",
    output: {
      mode: "split",
      target: "./lib/apis",
      schemas: "./lib/apis/model",
      baseUrl: BASE_URL,
      client: "react-query",
      httpClient: "axios",
      override: {
        mutator: {
          path: "./lib/apis/mutator.ts",
          name: "customInstance",
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
  },
});
