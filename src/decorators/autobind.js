//Decorators
export function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const boundMethod = {
        enumerable: false,
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    };
    return boundMethod;
}
//# sourceMappingURL=autobind.js.map