import  { z, ZodError } from "zod"

const userEmailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
const userNameSchema = z.object({
    username: z.string().min(3).max(20),
    password:z.string().min(8)
})

const isEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };


const loginValidate = (req,res,next) => {
    if(isEmail(req.body.email)){
        const result = userEmailSchema.safeParse({
            email : req.body.email ,
            password : req.body.password,
        });
        if(result.success){
            next();
        }
        else{
            return res.status(400).send({ error: 'Validation error', details: result.error.errors });
        }
    }
    else{
        const result = userNameSchema.safeParse({
            username : req.body.username,
            password : req.body.password,
        });
        if(result.success){
            next();
        }
        else{
           return res.status(400).send({ error: 'Validation error', details: result.errors });
        }
    }
};

export default loginValidate
