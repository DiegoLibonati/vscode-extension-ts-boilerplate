import type * as vscode from "vscode";

import { activate, deactivate } from "@/extension";
import { registerAliveCommand } from "@/commands/aliveCommand";

import { mockExtensionContext } from "@__tests__/__mocks__/extensionContext.mock";

const mockDisposable: vscode.Disposable = { dispose: jest.fn() };

jest.mock("@/commands/aliveCommand");

describe("extension", () => {
  beforeEach(() => {
    mockExtensionContext.subscriptions.length = 0;
    (registerAliveCommand as jest.Mock).mockReturnValue(mockDisposable);
  });

  describe("activate", () => {
    it("registers the alive command and pushes its disposable to subscriptions", () => {
      activate(mockExtensionContext);

      expect(registerAliveCommand).toHaveBeenCalledTimes(1);
      expect(mockExtensionContext.subscriptions).toContain(mockDisposable);
    });
  });

  describe("deactivate", () => {
    it("runs without throwing", () => {
      expect(() => {
        deactivate();
      }).not.toThrow();
    });
  });
});
