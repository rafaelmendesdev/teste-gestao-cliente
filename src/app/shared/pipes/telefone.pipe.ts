import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {
  transform(valor: string): string {
    if (!valor) return '';
    const numeros = valor.replace(/\D/g, '');

    // Celular (XX) XXXXX-XXXX
    if (numeros.length === 11) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    // Fixo (XX) XXXX-XXXX
    if (numeros.length === 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return valor;
  }
}