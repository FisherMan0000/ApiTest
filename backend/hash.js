const bcrypt = require('bcryptjs');

const hashPassword = async () => {
    const password = 'password123';  
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
};

hashPassword();
