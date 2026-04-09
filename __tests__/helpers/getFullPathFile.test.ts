import path from "path";

import { getFullPathFile } from "@/helpers/getFullPathFile";

describe("getFullPathFile", () => {
  it("joins directory and filename into a full path", () => {
    const result = getFullPathFile("/some/dir", "file.ts");

    expect(result).toBe(path.join("/some/dir", "file.ts"));
  });

  it("handles nested filenames", () => {
    const result = getFullPathFile("/root/sub", "nested/file.ts");

    expect(result).toBe(path.join("/root/sub", "nested/file.ts"));
  });
});
