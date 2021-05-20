import User from "./api/components/auth/db/model"

export const mockUsers = () => {
    let promises = []
    console.log('Processing...');
    // for(let i = 972; i < 1000; i++) {
    //     promises.push(UserService.create({
    //         firstName: 'Dude',
    //         lastName: 'Dude',
    //         username: `Dude${i+1}`,
    //         email: `Dude${i+1}@gmail.com`,
    //         password: '12345'
    //     }))
    // }
    
    // Promise.all(promises)
    //         .then(data => console.log(`Finished, ${data.length} users created.`))
    //         .catch(err => console.log(err))

    User.countDocuments({ firstName: 'Dude' }).then(res => console.log(res))
}

// export const mockUserData = async() => {
//     try {
//         const tables = await UserData.findById("60a1bf23cf97af0e6c067b47")
//         let promises = []
//         for(let i = 3; i <= 100) {
//             promises.push(
//                 User.findOne({ username: `Dude{}` })
//             )   
//         }
//         const user = await 
        
//         if(user) {
//             const usEntry = new UserData({
//                 transfer_suggested: false,
//                 user: user._id,
//                 tables: tables.tables
//             })
    
//             await usEntry.save()
    
//             console.log('Entry created');
//         }
        
//         else {
//             console.log('no User');
//         }
//     }   
//     catch(err) {
//         console.log(err);
//     }
// }