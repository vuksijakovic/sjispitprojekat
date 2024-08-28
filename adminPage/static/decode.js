// decode.js
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function isTokenExpired(token) {
    try {
        const decoded = parseJwt(token);
        
        if (!decoded || !decoded.exp) {
            return true; // Ako nema expiration claim, smatramo da je istekao
        }

        const currentTime = Math.floor(Date.now() / 1000); // Trenutno vreme u sekundama
        
        return decoded.exp < currentTime;
    } catch (error) {
        return true; // Ako token ne može da se dekodira, smatramo ga nevažećim
    }
}

// Dodaj funkciju na globalni `window` objekat
window.isTokenExpired = isTokenExpired;
