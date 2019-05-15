export class JWTModel {
    header: JWTheader;
    payload: JWTPayload;
    signature: string;
}

export class JWTheader {
    alg: string;
    kid: string;
    type: string;
    x5t: string;
}

export class JWTPayload {
    nbf: string;
    exp: string;
    iss: string;
    aud: string;
    iat: string;
    at_hash: string;
    sid: string;
    sub: string;
    auth_time: string;
    idp: string;
    amr: string[];
}
