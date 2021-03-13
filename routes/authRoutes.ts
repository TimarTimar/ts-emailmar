import { Express, Request, Response } from 'express';
import passport from 'passport';

module.exports=(app:Express)=>{
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );
    
    app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req:Request,res:Response)=>{
        res.redirect('/surveys');
    }
    );

    app.get('/api/logout', (req:Request,res:Response)=>{
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req:Request, res:Response)=>{
        res.send(req.user);
    });
};

