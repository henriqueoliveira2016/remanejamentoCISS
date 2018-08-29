import {Component} from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { PessoaService } from '../services/pessoa.service';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ PessoaService ]
})

export class AppComponent {
  
  public pessoa: Pessoa = new Pessoa();
  public listaPessoas: Array<Pessoa> = new Array<Pessoa>();
  public formGroup: FormGroup;
  public mask = [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];

  constructor(private pessoaService:PessoaService, private formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      datanascimento: ['', Validators.required],
      sexo: ['', Validators.required]
    });

    this.getTodos();

  }

  // salvar(pessoa) {
  //   this.listaPessoas.push(pessoa);
  // }

  
  isValidForm() {
    if(this.formGroup.valid && 
      this.pessoa.nome != null &&
      this.pessoa.email != null &&
      this.pessoa.datanascimento != null &&      
      this.pessoa.sexo != null) {
      return true;
    } else {
      return false; 
    }      
  }

  public salvar(pessoa) {
    if (this.isValidForm()) {                         
      this.pessoaService.salvar(pessoa)
          .subscribe(
              (data: Pessoa) => {              
                console.log('Salvou Pessoa');
                this.getTodos();
              },
              err => {                
                console.log(err);
              }
          );
                   
    } else {
        alert('Algo deu errado! Revise seu cadastro');        
    }     

  }

  public remover() {    
    this.pessoaService.remover(this.pessoa.idpessoa).subscribe(
        data => {            
            alert('Publicação excluída!');
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

}
