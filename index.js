const express=require("express");
const app=express();
app.use(express.json());//middleware
const FULL_NAME="john_doe";
const DOB="17091999";
const EMAIL="john@xyz.com";
const ROLL_NUMBER="ABCD123";
const isNumber=(str)=>/^\d+$/.test(str);//check string is number
const isAlphabet=(str)=>/^[a-zA-Z]+$/.test(str);//check string is alphabet
function alternatingCaps(arr){
    let char=arr.join("");
    let reverse=char.split("").reverse().join("");
    let result="";
    for(let i=0;i<reverse.length;i++){
        if(i%2===0){
            result+=reverse[i].toUpperCase();
        } else{
            result+=reverse[i].toLowerCase();
        }
    }return result;
}
app.post("/bfhl",(req,res)=>{
    try{
       // console.log("Request body received:",req.body);
        const {data}=req.body;
        if(!Array.isArray(data)){
            //console.log("Data is not an arrays");
            return res.status(400).json({is_success:false,message:"Invalid input recieved please give a Array"});
        }//console.log("Data is array",data);
        let odd_numbers=[];
        let even_numbers=[];
        let alphabets=[];
        let special_characters=[];
        let sum=0;
        for(let val of data){
            console.log("processing array:",val);
            if(isNumber(val)){
                let num=parseInt(val,10);//consider number as a decimal
                if(num%2===0) even_numbers.push(val);
                else odd_numbers.push(val);
                sum+=num;
            }
            else if(isAlphabet(val)){
                alphabets.push(val.toUpperCase());
            }else{
                special_characters.push(val);
            }
        }
        return res.status(200).json({
            is_success:true,user_id:`${FULL_NAME}_${DOB}`,
            email:EMAIL,roll_number:ROLL_NUMBER,odd_numbers,even_numbers,alphabets,special_characters,
            sum:sum.toString(),concat_string: alternatingCaps(alphabets),
        });
    }
    catch(error){
        return res.status(500).json({is_success:false,message:error.message});
    }
});
app.get("/",(req,res)=>{res.send("FULL STACK API BY SUDHAMAIE IS RUNNING");});
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});