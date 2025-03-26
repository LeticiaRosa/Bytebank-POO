export function DomInject(selector: string){
  return function(
    target: any,
    descriptor: PropertyKey
  ){
    let element: HTMLElement;
    const getter = function(){
      if(!element){
        element = document.querySelector(selector) as HTMLElement;
      }
      return element;
    }
    Object.defineProperty(target, descriptor,{
      get: getter
    })
  }
}