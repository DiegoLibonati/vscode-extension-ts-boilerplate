import * as vscode from "vscode";

const aliveCommand = (): void => {
  vscode.window.showInformationMessage(
    "Hello world from Template VSCode Extension."
  );
};

export const registerAliveCommand = (): vscode.Disposable => {
  return vscode.commands.registerCommand(
    "template-vscode-extension.alive",
    aliveCommand
  );
};
