import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { PessoaModel } from '../model/pessoa';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PessoaService {

    public url = '/remanejamento/rest/pessoaws';

    constructor(private http: Http) {
        console.log('construtor pessoa service');
    }

    salvar(pessoa: PessoaModel): Observable<PessoaModel> {
        return this.http.post(this.url + '/salvar', pessoa).pipe(
            map((res: Response) => {return res.json()}));
    }    

    getTodos(): Observable<Array<PessoaModel>> {
        return this.http.post(this.url + '/gettodos', {}).pipe(
            map((res: Response) => {return res.json()}));
    }

    excluir(idPessoa: number): Observable<number> {
        return this.http.get(this.url + '/excluir?idPessoa=' + idPessoa).pipe(
            map((res: Response) => {return res.json()}));
    }    

    getById(idPessoa: number):Observable<PessoaModel> {
        return this.http.get(this.url + '/getById?idPessoa=' + idPessoa).pipe(
            map((res: Response) => {return res.json()}));
    }

}
