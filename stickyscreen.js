
function clientSwitchable(c) {
	return (c.normalWindow || c.dialog || c.splash || c.utility);
}

function StickyScreen() {
	var self = this;
	this.initScreens();

	workspace.clientActivated.connect(function(client) { self.clientActivated(client); });
	workspace.numberScreensChanged.connect(function(num) { self.initScreens(); });
	workspace.numberDesktopsChanged.connect(function(num) { self.initScreens(); });
	workspace.clientAdded.connect(function(client) { self.addClient(client); });

	var clients = workspace.clientList();
	for (var i = 0; i < clients.length; i++) {
		this.addClient(clients[i]);
	}

	this.clientActivated(workspace.activeClient);

	registerShortcut("foooooooo4", "foooooooo4", "Meta+I", function() {
		self.switchScreen();
	});
}

StickyScreen.prototype.initScreens = function() {
	this.screens = {};
	this.screens[0] = {};
};

StickyScreen.prototype.clientActivated = function(client) {
	if (client === null) return;
	if (!clientSwitchable(client)) return;
	if (client.screen == 0) {
		this.screens[0][client.desktop] = client.windowId;
	} else {
		this.screens[client.screen] = client.windowId;
	}
};

StickyScreen.prototype.addClient = function(client) {
	if (!clientSwitchable(client)) return;
	print("Add client: ", client.caption);
	client.screenChanged.connect(function() {
		client.onAllDesktops = client.screen > 0;
		print("screenChanged: ", client, client.onAllDesktops);
	});
};

StickyScreen.prototype.lastActive = function(screen, desk) {
	var clientID = screen == 0 ? this.screens[0][desk] : this.screens[screen];
	var client = workspace.getClient(clientID);
	if (client !== null && client.screen == screen && client.desktop == desk) {
		return client;
	}

	print("lastActive:", screen, desk);
	var clients = workspace.clientList();
	for (var i = 0; i < clients.length; i++) {
		var c = clients[i];
		print("c:", c.screen, c.desktop, clientSwitchable(c), c.caption);
		if (c.screen == screen && c.desktop == desk && clientSwitchable(c)) {
			return c;
		}
	}

	// No suitable window found:
	return undefined;
};

StickyScreen.prototype.switchScreen = function() {
	var active = workspace.activeClient;
	var screen = (active.screen + 1) % workspace.numScreens;
	var desk = screen == 0 ? workspace.currentDesktop : -1;
	var last = this.lastActive(screen, desk);
	print("Switching screens, last:", last);
	if (last !== undefined) workspace.activeClient = last;
	// Otherwise do nothing
};

stickyScreen = new StickyScreen();
