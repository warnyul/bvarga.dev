const fs = require('fs');
const path = require('path');

// This transformer will generate a `firebase.json` config file, based on the application
// environment config and custom headers. If you are deploying to a Firebase project with multiple
// sites, set the FIREBASE_TARGET environment variable to match the host created with
// `firebase target:apply hosting target-name resource-name`
module.exports = (headers) => {
    const config = {
        hosting: {
            public: 'dist',
            cleanUrls: true,
            ignore: [
                'firebase.json',
                '**/.*',
                '**/node_modules/**',
            ],
            headers: [
                {
                    source: '**/*.@(ico|jpg|jpeg|gif|png|webp|js.map|js|css|txt|html)',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'max-age=31536000,s-maxage=31536000,immutable',
                        },
                    ],
                },
                {
                    source: '**/*.@(eot|otf|ttf|ttc|woff|woff2|font.css)',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'max-age=31536000,s-maxage=31536000,immutable',
                        },
                    ],
                },
                ...headers,
            ],
        },
    };

    const target = process.env.FIREBASE_TARGET;

    if (target) {
        config.hosting.target = target;
    }

    fs.writeFileSync(
        path.join(__dirname, './firebase.json'),
        JSON.stringify(config, null, 2),
        { encoding: 'utf8' }
    );
};