import  { z, ZodError } from "zod"

const userSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(3).max(1000),
});

const contentValidate = (req,res,next) => {

    const result = userSchema.safeParse({
        title: req.body.title,
        content: req.body.content,
    });
    if(result.success){
        next()
    }
    else{
        res.status(400).send({ error: 'Validation error', details: result.error.errors });
    }
};
export default contentValidate;
