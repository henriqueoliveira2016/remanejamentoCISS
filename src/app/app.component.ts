import {Component} from '@angular/core';
import { PessoaModel } from '../model/pessoa';
import { PessoaService } from '../services/pessoa.service';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ PessoaService ]
})

export class AppComponent {
  
  public pessoa: PessoaModel = new PessoaModel();
  public selectedOptions: string[] = [];
  public listaPessoas: Array<PessoaModel> = new Array<PessoaModel>();
  public formGroup: FormGroup;
  public mask = [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];

  constructor(private pessoaService:PessoaService, private formBuilder: FormBuilder) {

    // this.formGroup = this.formBuilder.group({
    //   nome: ['', Validators.required],
    //   email: ['', Validators.required],
    //   datanascimento: ['', Validators.required],
    //   sexo: ['', Validators.required]
    // });

    this.getTodos();

  }

  // salvar(pessoa) {
  //   this.listaPessoas.push(pessoa);
  // }

  
  // isValidForm() {
  //   if(this.formGroup.valid && 
  //     this.pessoa.nome != null &&
  //     this.pessoa.email != null &&
  //     this.pessoa.datanascimento != null &&      
  //     this.pessoa.sexo != null) {
  //     return true;
  //   } else {
  //     return false; 
  //   }      
  // }

  public salvar(pessoa: PessoaModel) {
    // if (this.isValidForm()) {                              
      this.pessoaService.salvar(pessoa)
          .subscribe(
              data => {              
                console.log('Salvou Pessoa:'+ data);
                this.getTodos();
                this.pessoa.dataNascimento = null;
                this.pessoa.email = null;
                this.pessoa.idPessoa = null;
                this.pessoa.sexo = null;
                this.pessoa.nome = null;
              },
              err => {                
                console.log('Erro ao salvar'+ err);
              }
          );
                   
    // } else {
        // alert('Algo deu errado! Revise seu cadastro');        
    // }     

  }

  public remover(idpessoa) {   
    this.pessoaService.remover(idpessoa).subscribe(
        data => {            
          console.log('Pessoa excluída!');
        }, err => {            
            console.log(err);
        }
    );
  }

  public getTodos() {
    this.pessoaService.getTodos()
            .subscribe(
            data => {                
              this.listaPessoas = data;
            },
            error => {
                console.log(error);
            }
        )
  }

  public editar(idpessoa) {
    var me;
    me = this;
    this.pessoaService.getById(idpessoa)
      .subscribe(
        data => {          
          console.log('Buscou pelo id!');
          this.pessoa.dataNascimento = data.dataNascimento;
          this.pessoa.email = data.email;
          this.pessoa.idPessoa = data.idPessoa;
          this.pessoa.sexo = data.sexo;
          this.pessoa.nome = data.nome;
        },
        error => {
          console.log(error);
        }
      )
  }

}
