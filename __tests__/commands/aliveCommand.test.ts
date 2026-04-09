import { registerAliveCommand } from "@/commands/aliveCommand";

import { commands, window } from "@__tests__/__mocks__/vscode.mock";

describe("aliveCommand", () => {
  it("registers the command with the correct ID", () => {
    registerAliveCommand();

    expect(commands.registerCommand).toHaveBeenCalledWith(
      "template-vscode-extension.alive",
      expect.any(Function)
    );
  });

  it("shows an information message when the command is executed", () => {
    registerAliveCommand();

    const [, callback] = commands.registerCommand.mock.calls[0] as [
      string,
      () => void,
    ];

    callback();

    expect(window.showInformationMessage).toHaveBeenCalledWith(
      "Hello world from Template VSCode Extension."
    );
  });
});
