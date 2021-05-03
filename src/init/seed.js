import fs from 'fs'
import User from '../api/components/auth/db/model'
import path from 'path'
import { hashString } from '../api/components/auth/utils'

const filePath = path.resolve('deploy', 'users.json')

const startup = () => {
    
    try {
        if(!fs.existsSync(filePath)) {
            console.log("Startup skipped");
            return;
        }

        console.log("Starting admins initialization...");
        fs.readFile(filePath, 'utf8', async function(err, dataBinary) {
            if(err) throw err

            const userConf = JSON.parse(dataBinary);
            await createUsers(userConf.admins)

            console.log("Admins initialization completed!");

            deleteAdminsFile()
        })
    }

    catch(err) {
        console.log(err);
    }
}

const createUsers = async(admins) => {
    for(let admin of admins) {
        const user = await User.findOne({ email: admin.email })
        
        if(!user) {
            const newUser = new User({
                ...admin,
                password: await hashString(admin.password),
                isAdmin: true
            })

            await newUser.save()
            console.log(`Created ${admin.username} successfully`);
        }
    }  
}

const deleteAdminsFile = () => {
    fs.unlink(filePath, err => {
        if(err) {
            throw err
        }
    })
}

export default startup