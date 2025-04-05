// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let terminal: vscode.Terminal;
let command: string = '';
let settingsConfig;
let server_port: string = '';
let server_host: string = '';
let backend_store_uri: string = '';
let artifact_store_uri: string = '';


function startMLFlowServer() {

	// Read settings from extension settings
	settingsConfig = vscode.workspace.getConfiguration();

	server_port = String(settingsConfig.get('mflow.server_port', 0));
	server_host = 'http://' + settingsConfig.get('mflow.server_host','');
	backend_store_uri = settingsConfig.get('mflow.artifact_uri','');
	artifact_store_uri = settingsConfig.get('mflow.backend_uri','');

	// Notifications
	vscode.window.showInformationMessage(`Starting MLFlow server on port (${server_port})...`);

	// Create new terminal and launch the server
	terminal = vscode.window.createTerminal("mlflow-server");

	// Activate python evironment where MlFlow is installed
	command = "conda activate mlflow";
	terminal.sendText(command);

	// Start the MLFlow server
	command = `mlflow ui --host ${server_host} --port ${server_port} --backend-store-uri ${backend_store_uri} --default-artifact-root ${artifact_store_uri}`;
	terminal.sendText(command);

	// Launch the Tracking UI inside VSCode
	vscode.commands.executeCommand("simpleBrowser.show", `${server_host}:${server_port}`);

};


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	vscode.window.showInformationMessage(`TRYING TO ACTIVATE.`);
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	console.log('Extension "mflow" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('mflow.startServer', () => {

		// Run MLFlow Server with provided settings
		startMLFlowServer();
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
