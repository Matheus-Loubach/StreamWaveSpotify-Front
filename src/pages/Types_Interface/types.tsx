
//Login

export type LoginFormInputs = {
    name: string;
    password: string;
};

interface NavLink {
    to: string;
    children: string;
    activeClassName: string;
}
export const Signup: NavLink = {
    to: '/register',
    children: 'register',
    activeClassName: 'active',
};
export const Signin: NavLink = {
    to: '/login',
    children: 'login',
    activeClassName: 'active',
};



//Register

export type RegisterFormInputs = {
    name: string;
    email: string;
    password: string;
    passwordconf: string;
};