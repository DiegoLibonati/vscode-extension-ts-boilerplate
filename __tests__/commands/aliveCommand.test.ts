import * as vscode from "vscode";

import { registerAliveCommand } from "@/commands/aliveCommand";

describe("registerAliveCommand", () => {
  describe("registration", () => {
    it("should register the command with the correct id", () => {
      registerAliveCommand();

      expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
        "vscode-extension-ts-boilerplate.alive",
        expect.any(Function)
      );
    });

    it("should return the result of registerCommand", () => {
      const mockDisposable = { dispose: jest.fn() };
      (vscode.commands.registerCommand as jest.Mock).mockReturnValueOnce(
        mockDisposable
      );

      const result = registerAliveCommand();

      expect(result).toBe(mockDisposable);
    });
  });

  describe("command callback", () => {
    it("should show an information message when the command is executed", () => {
      let mockCallback: (() => void) | undefined;
      (vscode.commands.registerCommand as jest.Mock).mockImplementation(
        (_id: string, cb: () => void) => {
          mockCallback = cb;
        }
      );

      registerAliveCommand();
      mockCallback?.();

      expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
        "Hello world from VSCode Extension Ts Boilerplate."
      );
    });

    it("should show the information message exactly once per execution", () => {
      let mockCallback: (() => void) | undefined;
      (vscode.commands.registerCommand as jest.Mock).mockImplementation(
        (_id: string, cb: () => void) => {
          mockCallback = cb;
        }
      );

      registerAliveCommand();
      mockCallback?.();

      expect(vscode.window.showInformationMessage).toHaveBeenCalledTimes(1);
    });
  });
});
