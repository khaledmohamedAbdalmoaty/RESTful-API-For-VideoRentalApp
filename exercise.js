const { promiseImpl } = require("ejs");
const { reject, get } = require("lodash");

function getCustomer(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({
                id:id,
                name:"khaled",
                isGold:true,
                email:"khaled abdalmoaty@yahoo.com"
            })
        },980)
    })
}
function getTopMovie(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(['movie 1','movie 2'])
        },980)
    })
}
function sendEmail(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Email sent....")
        },980)
    })
}
async function notifyCustomer(){
    const customer=await getCustomer(1);
    console.log("customer:"+customer.name)

    if(customer.isGold){
        const movie=await getTopMovie();
        console.log("Top Movie:"+movie);
        await sendEmail().then((result)=>{
            console.log(result)
        });

    }
}
notifyCustomer();