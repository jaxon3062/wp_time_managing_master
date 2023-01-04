const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPassword = 'asd';
const testPassword = 'password2';
const myHash ='$2b$10$Ii0DAbr2qUVFfMElKVkaSec.fLTgaJITTCnFMn84G1uj4o.dk3WdC';

(async () => {

    const hash = await bcrypt.hash(myPassword, saltRounds);
    const hash1 = await bcrypt.hash(myPassword, saltRounds);
    console.log(hash);
    console.log(hash1);
    console.log(myPassword);
    
    const res = await bcrypt.compare(myPassword, hash);
    const res1 = await bcrypt.compare(myPassword, hash1);
    console.log(res);
    console.log(res1);
    
    const res2 = await bcrypt.compare(testPassword, hash);
    console.log(res2);
})()
