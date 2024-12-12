const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Obtém o token do header Authorization
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    // Verifica o token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // Atribui o userId no req para uso posterior
        req.userId = decoded.id;  // O id do usuário foi armazenado no token durante o login
        next();
    });
};

module.exports = verificarToken;
