const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const basicAuth = async (req, res, next) => { 
    const authHeader = req.headers['authorization']; 
    if (!authHeader) { 
        req.user = null;
        return next();
    }

    // TODO:
    // 1. Parse authHeader to extract the username and password.
    // 2. Check the database for the user with matching username and password.
    // 3. If found, set req.user to it and allow the next middleware to run.
    // 4. If not, immediate respond with status code 401 and this JSON data: { message: "Invalid credentials" } 


    // 1. Parse authHeader to extract the username and password.
    if (!authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = authHeader.slice(6); // remove "Basic "
    let creds;
    try {
        creds = Buffer.from(token, 'base64').toString('utf8'); // "username:password"
        console.log(creds);
    } catch {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Check the database for the user with matching username and password.
    const [username, password] = creds.split(':');

    const user = await prisma.user.findUnique({
        where: { username: username }
    });

    // 3. If found, set req.user to it and allow the next middleware to run.
    if (user && user.password === password) {
        req.user = { id: user.id, username: user.username };
        return next();
    } else {
        // 4. If not, immediate respond with status code 401 and this JSON data: { message: "Invalid credentials" } 
        return res.status(401).json({ message: 'Invalid credentials' });
    }
}; 

module.exports = basicAuth;