import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Pessoa } from '../model/pessoa';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PessoaService {

    public url = '/ws/pessoa';

    constructor(private http: Http) {
        console.log('construtor pessoa service');
    }

    salvar(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.post(this.url + '/salvar', pessoa).pipe(
            map((res: Response) => {return res.json()}));
    }

    // alterar(pessoa: Pessoa): Observable<Pessoa> {
    //     return this.http.post(this.url + '/alterar', pessoa).pipe(
    //         map((res: Response) => {return res.json()}));
    // }   

    getTodos(): Observable<Array<Pessoa>> {
        return this.http.post(this.url + '/gettodos', {}).pipe(
            map((res: Response) => {return res.json()}));
    }

    remover(id: number): Observable<Pessoa> {
        return this.http.get(this.url + '/remover?idpessoa=' + id).pipe(
            map((res: Response) => {return res.json()}));
    }    

}
