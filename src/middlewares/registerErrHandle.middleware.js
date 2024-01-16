import  { z, ZodError } from "zod"

const userSchema = z.object({
    username: z.string().min(3).max(20),
    fullname: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8),
});


const registrationValidate = (req,res,next) => {

    const result = userSchema.safeParse({
        username:req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password
    });
    if(result.success){
        next()
    }
    else{
        return res.status(400).send({ error: 'Validation error', details: result.error.errors });
    }
};
export default registrationValidate;
