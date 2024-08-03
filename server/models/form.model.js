const {prisma}= require('../prisma/prismaClient')

async function findForm(query){
    try{
        const form= await prisma.form.findMany({
            where: {
                petType: query.petType.toUpperCase()
            },
            select: {
                petType: true,
                questionType: true,
                question: true,
                answerOptions: true, 
            }
        })
        return form
    } catch(err){
        return ({error: err})
    }
}

module.exports= {
    findForm
}