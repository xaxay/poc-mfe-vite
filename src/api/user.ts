// !!!! simplified version for testing purposes only !!!!

let userLogin : string = '';
let userPermissions : string[] = [];

export function isGuest() : boolean {
    return userLogin === '';
}

export function isLogined() : boolean {
    return userLogin !== '';
}

export function isAdmin() : boolean {
    return userLogin === 'admin';
}


export function getUserLogin() : string {
    return userLogin;
}


export async function login(name: string, password : string): Promise<boolean> {
    
    // !!!! simplified version for testing purposes only !!!!

    if (name === '' || name !== password) {
        return false; // wrong user name or password
    }

    userLogin = name;
    userPermissions = ['account', 'rumors', 'app4', 'app5', 'app6', 'app7', 'app8', 'app9', 'app10', 'app11', 'app12', 'app13', 'app14', 'app15', 'app16',];

    if (name === 'admin') {
        userPermissions.push('admin');
    }

    return true;
}


export async function logout(): Promise<void> {
    userLogin = '';
}


export async function getUserPermissions() : Promise<string[]> {
    return [...userPermissions]
}