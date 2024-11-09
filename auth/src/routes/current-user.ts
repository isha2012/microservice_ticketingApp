import express from 'express'

//to return the info about the user
export const currentUserRouter = express.Router();

currentUserRouter.get('/api/users/currentUser', () => {
    
})

