import path from "path";

import { getFullPathFile } from "@/helpers/getFullPathFile";

describe("getFullPathFile", () => {
  describe("path joining", () => {
    it("should join directory and filename with the path separator", () => {
      const result = getFullPathFile("project", "file.ts");

      expect(result).toBe(`project${path.sep}file.ts`);
    });

    it("should handle nested directory paths", () => {
      const result = getFullPathFile("project/src/commands", "myCommand.ts");

      expect(result).toBe(
        `project${path.sep}src${path.sep}commands${path.sep}myCommand.ts`
      );
    });

    it("should normalize a trailing separator in the directory", () => {
      const result = getFullPathFile("project/src/", "file.ts");

      expect(result).toBe(`project${path.sep}src${path.sep}file.ts`);
    });
  });

  describe("edge cases", () => {
    it("should return filename when directory is an empty string", () => {
      const result = getFullPathFile("", "file.ts");

      expect(result).toBe("file.ts");
    });

    it("should return directory when filename is an empty string", () => {
      const result = getFullPathFile("project", "");

      expect(result).toBe("project");
    });

    it("should return dot when both directory and filename are empty strings", () => {
      const result = getFullPathFile("", "");

      expect(result).toBe(".");
    });
  });
});
