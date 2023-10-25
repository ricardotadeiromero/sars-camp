export type AlunoPayload = {
    sub: number;
    username: string;
    name: string,
    iat?: number;
    exp?: number;
}