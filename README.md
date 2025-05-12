# TypeScript+Python Hybrid Monorepo Template

## Replace names
Globally search for word `whatever` and replace them all with your project name.
Update file names with `whatever` to your project name, too.

## Setup with Devcontainer
1. Install `Dev Containers` (id: ms-vscode-remote.remote-containers) extension for your editor.
2. Open the command palette (Ctrl+Shift+P or Cmd+Shift+P) and select `Dev Containers: Install devcontainer CLI`. [documentation](https://code.visualstudio.com/docs/devcontainers/devcontainer-cli#_installation)
3. Open the terminal, navigate to the project root and run the following command. It will create a docker image named `whatever:latest`.
```
devcontainer build --workspace-folder ./devImages/base --image-name whatever
```
> We separate the `devcontainer.json` into two parts, mainly because each time `devcontainer.json` is updated, the docker image will be rebuilt. Therefore, we will install the time-consuming features to rebuild (in a poor network environment) in a separate `devcontainer.json`, to obtain an intermediate docker image (`whatever:latest`). Subsequently, we will use this image to create the actual docker image intended for development.
4. Open the code workspace
```
cursor whatever.code-workspace
```
5. A prompt should pop up, asking you to `reopen in container`. Alternatively, you can open the command palette and select `Dev Containers: Reopen in Container`.
> In this step, the editor is checking the file `.devcontainer/devcontainer.json`, in that file, we configure multiple extensions and the base image (`whatever:latest`), so that the editor can create the actual development environment.
> If updating OhMyZsh hangs (because of the network), you can press `Ctrl+C` to cancel the installation and manually run `omz update` in the container at any time.
6. Now you can start developing in a containerized environment.

## Install dependencies
```
npm i -g concurrently
pnpm initialize
```
When the container is just built, `ms-vscode.js-debug/bootloader.js` may be not found and all node executables are not available. This is [a known issue](https://github.com/microsoft/vscode/issues/137794#issuecomment-978093998) with devcontainer.

To fix this, manually find "auto attach" at the bottom of the editor, adjust it to `Always`, then adjust it back to `Only With Flag`.

Alternatively, you can open the command pallette (Ctrl+Shift+P or Cmd+Shift+P) and select `Toggle Auto Attach`.

## Check Python environment is correctly configured
Reopen the terminal, then execute
```
which python # ${workspaceFolder}/.venv/bin/python
```
Ideally, the python should be the one in the virtual environment installed by uv, if not, you need to check if the initial `uv sync` (triggered by `pnpm initialize`) is successful.

## Development
```
pnpm dev
```