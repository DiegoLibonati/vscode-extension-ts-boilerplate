import * as vscode from "vscode";

const aliveCommand = (): void => {
  vscode.window.showInformationMessage(
    "Hello world from VSCode Extension Ts Boilerplate."
  );
};

export const registerAliveCommand = (): vscode.Disposable => {
  return vscode.commands.registerCommand(
    "vscode-extension-ts-boilerplate.alive",
    aliveCommand
  );
};
