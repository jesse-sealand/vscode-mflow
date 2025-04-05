// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let terminal: vscode.Terminal;
let command: string = '';
let settingsConfig;
let server_port: string = '';
let server_host: string = '';
let conda_env: string = '';
let backend_store_uri: string = '';
let artifact_store_uri: string = '';


function startMLFlowServer() {

	// Read settings from extension settings
	settingsConfig = vscode.workspace.getConfiguration();

	server_port = String(settingsConfig.get('mflow.server_port', 0));
	server_host = 'http://' + settingsConfig.get('mflow.server_host','');
	conda_env = settingsConfig.get('mflow.conda_env','');
	backend_store_uri = settingsConfig.get('mflow.artifact_uri','');
	artifact_store_uri = settingsConfig.get('mflow.backend_uri','');


	// Create new terminal and launch the server
	//vscode.window.showInformationMessage("MFlow: Creating terminal - 'mlflow-server'");
	vscode.window.showInformationMessage("MFlow: Creating terminal - 'mlflow-server'");
	terminal = vscode.window.createTerminal("mlflow-server");

	// Activate python evironment where MlFlow is installed
	vscode.window.showInformationMessage(`MFlow: Activating conda environment - '${conda_env}'`);
	command = `conda activate ${conda_env}`;
	terminal.sendText(command);

	// Start the MLFlow server
	vscode.window.showInformationMessage(`MFlow: Starting MLFlow server on port (${server_port})...`);
	command = `mlflow ui --host ${server_host} --port ${server_port} --backend-store-uri ${backend_store_uri} --default-artifact-root ${artifact_store_uri}`;
	terminal.sendText(command);

	// Launch the Tracking UI inside VSCode
	vscode.window.showInformationMessage(`MFlow: Launching browser`);
	vscode.commands.executeCommand("simpleBrowser.show", `${server_host}:${server_port}`);

};


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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
