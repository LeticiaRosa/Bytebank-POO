export class Armazenador {
  private constructor() {}
  static salvar<T>(chave: string, valor: T): void {
    const valorComoString = JSON.stringify(valor);
    localStorage.setItem(chave, valorComoString);
  }

  static obter<T>(
    chave: string,
    reviver?: (this: unknown, key: string, value: unknown ) => unknown 
  ): T | null {
    const valor = localStorage.getItem(chave);
    if (valor === null) {
      return null;
    }
    if (reviver) {
      return JSON.parse(valor, reviver) as T;
    }
    return JSON.parse(valor) as T;
  }
}
