const {z} = require("zod");


function zodcheck(req,res,next){
    const requiredbody = z.object({
        email: z.string().min(5).max(50),
        password: z.string().min(5).max(50).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        firstname: z.string().min(3).max(30),
        lastname : z.string().min(3).max(30)
    })
    const parseddata = requiredbody.safeParse(req.body);


    if (!parseddata.success){
        res.status(403).json({
            message: "inorrect format ",
            error : parseddata.error
        })
        return 
    }else{
        next();
    }
}

module.exports = {
    zodcheck
}