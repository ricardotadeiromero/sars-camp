import { Aluno } from "./aluno";


export interface AuthAlunoRequest extends Request {
    user: Aluno;
}