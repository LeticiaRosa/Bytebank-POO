export function ValidaDeposito(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
){
  const originalMethod = descriptor.value;
  descriptor.value = function (valorDoDeposito: number) {
    if (valorDoDeposito <= 0) {
      throw new Error(
        "O valor a ser depositado precisa ser maior do que zero !"
      );
    }
    return originalMethod.apply(this, [valorDoDeposito]);
  }
  return descriptor;
}