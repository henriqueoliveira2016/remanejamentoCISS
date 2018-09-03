import {Component} from '@angular/core';
import { PessoaModel } from '../model/pessoa';
import { PessoaService } from '../services/pessoa.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';

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
  public mask = [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  selected = 'Masculino';

  constructor(private pessoaService:PessoaService, public dialog: MatDialog) {

    this.getTodos();

  }

  email = new FormControl('', [Validators.required, Validators.email]);  
  nome = new FormControl('', [Validators.required]);  
  getErrorMessage() {
    return this.email.hasError('required') ? 'Digite seu e-mail' : this.email.hasError('email') ? 'Não é um e-mail válido!' :'';
  }  

  isValidForm() {
    if(this.pessoa.nome != null &&
        this.pessoa.email != null &&
        this.pessoa.dataNascimento != null) {
        return true;
    } else {
      return false; 
    }    
  }

  public salvar(pessoa: PessoaModel) {
    if (this.isValidForm()) {
      this.pessoa.sexo = this.selected;                          
      this.pessoaService.salvar(pessoa)
          .subscribe(
              data => {              
                console.log('Salvou Pessoa:'+ data);
                this.getTodos();
                this.pessoa.dataNascimento = null;
                this.pessoa.email = null;
                this.pessoa.idPessoa = null;                
                this.pessoa.nome = null;
                this.selected = `Masculino`;
              },
              err => {                
                console.log('Erro ao salvar'+ err);
              }
          );
    } else {      
      this.openDialog();
      this.pessoa.nome = null;
      this.pessoa.email = null;
      this.pessoa.dataNascimento = null;
    }     
  }

  public remover(idpessoa) {   
    this.pessoaService.excluir(idpessoa).subscribe(
        data => {            
          console.log('Pessoa excluída!');
          this.getTodos();
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
    this.pessoaService.getById(idpessoa)
      .subscribe(
        data => {          
          console.log('Buscou pelo id!');
          this.pessoa.dataNascimento = data.dataNascimento;
          this.pessoa.email = data.email;
          this.pessoa.idPessoa = data.idPessoa;
          this.pessoa.sexo = data.sexo;
          this.pessoa.nome = data.nome;
          this.selected = data.sexo;
        },
        error => {
          console.log(error);
        }
      )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Fechou a dialog');
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}