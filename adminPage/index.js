const jwt = require('jsonwebtoken');

function isTokenExpired(token) {
    try {
        const decoded = jwt.decode(token);

        if (!decoded || !decoded.exp) {
            return true; 
        }

        const currentTime = Math.floor(Date.now() / 1000); 
        
        return decoded.exp < currentTime;
    } catch (error) {
        return true; 
    }
}
