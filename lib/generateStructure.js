const fs = require('fs'); 
const path = require('path');

function generateStructure() {
    const directories = ['models', 'controllers', 'services', 'routes'];

    directories.forEach(dir => {
        const dirPath = path.join(process.cwd(), dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
            console.log(`Created directory: ${dirPath}`);
        } else {
            console.log(`Directory already exists: ${dirPath}`);
        }
    }); 

    // Generate app.js
    const appCode = `
    const express = require('express');
    const app = express();
    const router = require('./routes');

    // Use the router for all routes
    app.use(router);

    app.listen(8000, () => {
        console.log('Server is running on http://localhost:8000');
    });
    `;
    fs.writeFileSync(path.join(process.cwd(), 'app.js'), appCode.trim());
    console.log('Created app.js');

    // Generate routes/index.js
    const routesCode = `
    const express = require('express');
    const router = express.Router();
    const { getHelloWorld } = require('../controllers');

    // Define routes
    router.get('/', getHelloWorld);

    module.exports = router;
    `;
    fs.writeFileSync(path.join(process.cwd(), 'routes', 'index.js'), routesCode.trim());
    console.log('Created routes/index.js');

    // Generate controllers/index.js
    const controllersCode = `
    const { helloWorldService } = require('../services');

    // Controller function for handling the '/' route
    function getHelloWorld(req, res) {
        const message = helloWorldService();
        res.send(message);
    }

    module.exports = {
        getHelloWorld
    };
    `;
    fs.writeFileSync(path.join(process.cwd(), 'controllers', 'index.js'), controllersCode.trim());
    console.log('Created controllers/index.js');

    // Generate services/index.js
    const servicesCode = `
    // Service function for generating the "Hello, World!" message
    function helloWorldService() {
        return 'Hello Node!';
    }

    module.exports = {
        helloWorldService
    };
    `;
    fs.writeFileSync(path.join(process.cwd(), 'services', 'index.js'), servicesCode.trim());
    console.log('Created services/index.js');
}

module.exports = { generateStructure };

generateStructure();
