//Decorators
export function Autobind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod: Function = descriptor.value;
    const boundMethod: PropertyDescriptor = {
        enumerable: false,
        configurable: true,
        get(): any {
            return originalMethod.bind(this);
        }
    };
    return boundMethod;
}
