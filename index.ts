import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';
import chalk from 'chalk';

interface User {
    id:number
    pin:number
    name:string
    accountNumber:number
    balance:number
}

const createUser = ()=>{
    let users:User[] = []

    for (let i=0;i<5;i++){
        let user:User={
            id:i,
            pin:1000+i,
            name:faker.person.fullName(),
            accountNumber:Math.floor(100000000*Math.random()*900000000),
            balance:1000000*i
        }

        users.push(user)
    }

    return users
};


const atmMachine =async(users:User[])=>{
    const res = await inquirer.prompt({
        type:"number",
        message:"Enter pin code",
        name:"pin"
    })
    
    
    const user = users.find(val => val.pin ==res.pin)

    if(user){
        console.log(chalk.yellow(`Welcome ${user.name}`));
        atmFun(user);
        return;
    }
    console.log(chalk.red("Invalid user pin"));
    
    
};

const atmFun=async(user:User)=>{
    const ans = await inquirer.prompt({
        type:"list",
        name:"select",
        message:"What you want to do",
        choices:["withdraw","balance","deposit","exit"]
    })

    if(ans.select=="withdraw"){
        const amount = await inquirer.prompt({
            type:"number",
            message:"Enter amount",
            name:"Rupee"
        })
        if(amount.Rupee>user.balance){
            return console.log(chalk.red("You have insufficient balance."));
        }
        if(amount.Rupee>30000){
            return console.log(chalk.red("You cannot withdraw more than 30,000 rupees"));
        }
        console.log(chalk.red(`withdraw amount: ${amount.Rupee}`));
        console.log(chalk.green(`Balance: ${user.balance-amount.Rupee}`));
        
    }
    if(ans.select=="balance"){
        console.log(chalk.cyanBright(`Balance: ${user.balance}`));
        return
    }
    if(ans.select=="deposit"){
        const deposit = await inquirer.prompt({
            type:"number",
            message:"Amount to be deposited",
            name:"rupee"
        })
        console.log(chalk.white(`Deposit amount: ${deposit.rupee}`));
        console.log(chalk.green(`Total Balance : ${user.balance + deposit.rupee}`));
        
        
    }
    if(ans.select=="exit"){
        //console.log("Thanks for using ATM");
        
    }
    //console.log(ans);
    console.log(chalk.yellow("Thanks for using ATM."));
}


const users=createUser();

atmMachine(users);

//console.log(users);
