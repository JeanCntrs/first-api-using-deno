import { Request, Response, Body } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface User {
    id: string;
    name: string;
}

let users: User[] = [
    {
        id: v4.generate(),
        name: "Ryan Ray",
    }
];

export const getUser = ({ params, response }: { params: { id: string }, response: Response }) => {
    const userFound = users.find(user => user.id === params.id);

    if (!userFound) {
        response.status = 404;
        response.body = {
            message: 'User not found'
        }
        return;
    }

    response.status = 200;
    response.body = {
        message: 'You got a single user',
        userFound
    }
};

export const getUsers = ({ response }: { response: Response }) => {
    response.body = {
        message: 'Get Users',
        users
    }
};

export const createUser = async ({ request, response }: { request: Request, response: Response }) => {
    const body: Body = await request.body();

    if (!request.hasBody) {
        response.status = 404;
        response.body = {
            message: 'Body is required'
        }
        return;
    }

    const newUser: User = body.value;
    newUser.id = v4.generate();

    users.push(newUser);

    /* users.push({
        id: v4.generate(),
        name: newUser.name
    }); */

    response.status = 200;

    response.body = {
        message: 'New user created',
        newUser
    }
};

export const updateUser = async ({ params, request, response }: { params: { id: string }, request: Request, response: Response }) => {
    const userFound = users.find(user => user.id === params.id);

    if (!userFound) {
        response.status = 404;
        response.body = {
            message: 'User not found'
        }
        return
    }

    const body = await request.body();
    const updateUser = body.value;

    users = users.map(user => user.id === params.id ? { ...user, ...updateUser } : user);

    response.status = 200;
    response.body = {
        users
    }
};

export const deleteUser = ({ params, response }: { params: { id: string }, response: Response }) => {
    users = users.filter(user => user.id !== params.id);
    response.status = 200;
    response.body = {
        message: 'User deleted successfully',
        users
    }
};
