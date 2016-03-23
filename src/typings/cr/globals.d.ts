interface Global {
  loadEditor: (pathToContext: string, options?: Object) => void;
  loadGlobal: (name: string, pathToContext: string) => void;
}

interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

declare var global: Global;

declare module 'babel-core' {
  var babel: any;
  export default babel;
}
