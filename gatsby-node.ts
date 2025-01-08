import { GatsbyNode } from "gatsby";
import path from "path";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
        "@/data": path.resolve(__dirname, "src/data"),
        "@/utils": path.resolve(__dirname, "src/utils"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
      },
    },
  });
};