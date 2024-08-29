// 1. Заблокировать всех не заблокированных юзеров не из China и уменьшить их баланс на 25 EUR

db.users.updateMany( 
    {
        is_blocked: { $ne: true },
        country: { $ne: "China" } 
    },
    {
        $set: { is_blocked: true }, 
        $inc: { balance: -25 } 
    }
)

// 2. Вывести имена и баланс заблокированных юзеров из China и из France, если их баланс находится в диапазоне значений от 10 до 1000 (вкл.)

db.users.aggregate([
    {
        $match: {
            is_blocked: true,  
            country: { $in: ["China", "France"] },  
            balance: { $gte: 10, $lte: 1000 }  
        }
    },
    {
        $project: {
            _id: 0,  
            fullname: 1,  
            balance: 1 
        }
    }
])