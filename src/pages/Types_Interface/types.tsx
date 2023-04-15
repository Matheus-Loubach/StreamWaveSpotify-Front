
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

//MenuPc

export const home: NavLink = {
    to: "/",
    children: "home",
    activeClassName: 'active',
}

export const search: NavLink = {
    to: "/search",
    children: "search",
    activeClassName: 'active',
}

export const favorites: NavLink = {
    to: "/favorites",
    children: "favorites",
    activeClassName: 'active',
}

export const library: NavLink = {
    to: "/library",
    children: "library",
    activeClassName: 'active',
}
//Register

export type RegisterFormInputs = {
    name: string;
    email: string;
    password: string;
    passwordconf: string;
};