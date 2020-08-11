module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            externals: ['nedb'],
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
                productName: "dbox",
                appId: "org.disble.dbox",
                artifactName: "${productName}-setup-${version}.${ext}",
                publish: [
                    "github"
                ],
                dmg: {
                    contents: [
                        {
                            x: 410,
                            y: 150,
                            type: "link",
                            path: "/Applications"
                        },
                        {
                            x: 130,
                            y: 150,
                            type: "file"
                        }
                    ]
                },
                linux: {
                    target: [
                        "AppImage",
                        "deb"
                    ]
                },
                win: {
                    target: "nsis"
                }
            }
        }
    }
};
