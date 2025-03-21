export class Armazenador {
  private constructor() {}
  static salvar(chave: string, valor: any): void {
    const valorComoString = JSON.stringify(valor);
    localStorage.setItem(chave, valorComoString);
  }

  static obter<T>(
    chave: string,
    reviver?: (this: any, key: string, value: any) => any
  ): T | null {
    const valor = localStorage.getItem(chave);
    console.log("localStorage",valor);
    if (valor === null) {
      return null;
    }
    if (reviver) {
      console.log(JSON.parse(valor, reviver))
      return JSON.parse(valor, reviver) as T;
    }
    return JSON.parse(valor) as T;
  }
}
