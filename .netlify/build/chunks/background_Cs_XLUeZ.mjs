const background = new Proxy({"src":"/_astro/background.BPKAcmfN.svg","width":1440,"height":1024,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/crist/Desktop/ASTRO/api-valorant/src/assets/background.svg";
							}
							
							return target[name];
						}
					});

export { background as b };
