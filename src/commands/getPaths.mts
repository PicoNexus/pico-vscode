import { CommandWithResult } from "./command.mjs";
import { workspace } from "vscode";
import {
  getPythonPath, getPath, getCMakePath, getNinjaPath
} from "../utils/cmakeUtil.mjs";
import Settings, { SettingsKey } from "../settings.mjs";
import { homedir } from "os";

export class GetPythonPathCommand
                      extends CommandWithResult<string> {
  constructor() {
    super("getPythonPath");
  }

  async execute(): Promise<string> {
    if (
      workspace.workspaceFolders === undefined ||
      workspace.workspaceFolders.length === 0
    ) {
      return "";
    }

    const isWindows = process.platform === "win32";
    const pythonPath = await getPythonPath(isWindows);

    return pythonPath;
  }
}

export class GetEnvPathCommand
                      extends CommandWithResult<string> {
  constructor() {
    super("getEnvPath");
  }

  async execute(): Promise<string> {
    if (
      workspace.workspaceFolders === undefined ||
      workspace.workspaceFolders.length === 0
    ) {
      return "";
    }

    const path = await getPath();

    return path;
  }
}

export class GetCMakePathCommand
                      extends CommandWithResult<string> {
  constructor() {
    super("getCMakePath");
  }

  async execute(): Promise<string> {
    if (
      workspace.workspaceFolders === undefined ||
      workspace.workspaceFolders.length === 0
    ) {
      return "";
    }

    const isWindows = process.platform === "win32";
    const path = await getCMakePath();


    return path;
  }
}

export class GetNinjaPathCommand
                      extends CommandWithResult<string> {
  constructor() {
    super("getNinjaPath");
  }

  async execute(): Promise<string> {
    if (
      workspace.workspaceFolders === undefined ||
      workspace.workspaceFolders.length === 0
    ) {
      return "";
    }

    const isWindows = process.platform === "win32";
    const path = await getNinjaPath();

    
    return path;
  }
}

export class GetSdkPathCommand
                      extends CommandWithResult<string> {
  constructor() {
    super("getSdkPath");
  }

  execute(): string {
    if (
      workspace.workspaceFolders === undefined ||
      workspace.workspaceFolders.length === 0
    ) {
      return "";
    }

    const settings = Settings.getInstance();
    if (settings === undefined) {
      return "";
    }

    const path = `${
      homedir().replaceAll("\\", "/")
    }/.pico-sdk/sdk/${
      settings.getString(SettingsKey.sdkVersion)
    }`;

    return path;
  }
}

export class GetToolchainPathCommand
                      extends CommandWithResult<string> {
  constructor() {
    super("getToolchainPath");
  }

  execute(): string {
    if (
      workspace.workspaceFolders === undefined ||
      workspace.workspaceFolders.length === 0
    ) {
      return "";
    }

    const settings = Settings.getInstance();
    if (settings === undefined) {
      return "";
    }

    const path = `${
      homedir().replaceAll("\\", "/")
    }/.pico-sdk/toolchain/${
      settings.getString(SettingsKey.toolchainVersion)
    }`;

    return path;
  }
}

export class GetCompilerPathCommand
                      extends CommandWithResult<string> {
  constructor() {
    super("getCompilerPath");
  }

  execute(): string {
    if (
      workspace.workspaceFolders === undefined ||
      workspace.workspaceFolders.length === 0
    ) {
      return "";
    }

    const settings = Settings.getInstance();
    if (settings === undefined) {
      return "";
    }
    
    const isWindows = process.platform === "win32";

    const path = `${
      homedir().replaceAll("\\", "/")
    }/.pico-sdk/toolchain/${
      settings.getString(SettingsKey.toolchainVersion)
    }/bin/arm-none-eabi-gcc${isWindows ? ".exe" : ""}`;

    return path;
  }
}

export class GetGdbPathCommand
                      extends CommandWithResult<string> {
  constructor() {
    super("getGdbPath");
  }

  execute(): string {
    if (
      workspace.workspaceFolders === undefined ||
      workspace.workspaceFolders.length === 0
    ) {
      return "";
    }

    const settings = Settings.getInstance();
    if (settings === undefined) {
      return "";
    }
    
    const isWindows = process.platform === "win32";
    const isMac = process.platform === "darwin";

    if (!isMac && !isWindows) {
      return "gdb";
    }

    const path = `${
      homedir().replaceAll("\\", "/")
    }/.pico-sdk/toolchain/${
      settings.getString(SettingsKey.toolchainVersion)
    }/bin/arm-none-eabi-gdb${isWindows ? ".exe" : ""}`;

    return path;
  }
}
