# MLFlow extension for Visual Studio Code

This extension is designed to help developers simplify the use of MLFlow with their development process.

## Features

- **Launch MLFlow Server from with VS Code**:
<img src="https://github.com/jesse-sealand/vscode-mflow/raw/main/resources/mflow-demo.gif" alt="demo" style="width:480px;"/>

- **Customize and Save MLFLow Server settings**:
<img src="https://github.com/jesse-sealand/vscode-mflow/raw/main/resources/mflow-setings.png" alt="demo" style="width:480px;"/>

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

The following Visual Studio Code settings are available for the mflow extension. These can be set in workspace settings.

- `mflow.server_port`: Preferred port number for the server (default 5000).
- `mflow.server_host`: The network address to listen on (default: 127.0.0.1 - localhost)
- `mflow.artifact_uri`: Path to local directory to store artifacts, for new experiments.
- `mflow.backend_uri`: URI to which to persist experiment and run data.

## Change Log

See the [change log] for a detailed list of changes in each version.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## License

This extension is [licensed under the MIT License].

[change log]: https://github.com/jesse-sealand/vscode-mflow/blob/main/CHANGELOG.md
[licensed under the mit license]: https://github.com/jesse-sealand/vscode-mflow/blob/main/LICENSE.txt
