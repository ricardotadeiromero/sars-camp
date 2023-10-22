export type AlunoPayload = {
    sub: number;
    username: string;
    iat?: number;
    exp?: number;
}