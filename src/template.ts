import camelcase from 'camelcase'
import { IPropDef } from "./baseInterfaces";


export function classTemplate(name: string, props: IPropDef[], imports: string[]) {
  return `
  ${imports.map(imp => {
    return `import { ${imp} } from '../definitions/${imp}'\n`
  }).join('')}
  `
}
/** 类属性模板 */
export function classPropsTemplate(name: string, type: string, description: string) {
  return `
  /** ${description || ''} */
  ${name}:${type};
  `
}

/** 类属性模板 */
export function classConstructorTemplate(name: string) {
  return `this['${name}'] = data['${name}'];\n`
}

/** 枚举 */
export function enumTemplate(name: string, enumString: string, prefix?: string) {
  return `
  export enum ${name}{
    ${enumString}
  }
  `
}

interface IRequestSchema {
  summary: string
  parameters: string
  responseType: string
  method: string
  contentType: string
  path: string
  pathReplace: string
  parsedParameters: any
  formData: string
}

/** requestTemplate */
export function requestTemplate(name: string, requestSchema: IRequestSchema, options: any) {
  let {
    summary = '',
    parameters = '',
    method = '',
    contentType = 'multipart/form-data',
    path = '',
    pathReplace = '',
    parsedParameters = <any>{},
    formData = ''
  } = requestSchema

  const { queryParameters = [], bodyParameters = [] } = parsedParameters

  return `
/**
 * ${summary || ''}
 */
${options.useStaticMethod ? 'static' : ''} ${camelcase(name)}(${parameters}options = {}) {
  return new Promise((resolve, reject) => {
    const configs = {...options, method: "${method}" };
    configs.headers = {
      ...options.headers,
      'Content-Type':'${contentType}'
    }
    let url = '${path}'
    ${pathReplace}
    configs.url = url
    ${parsedParameters && queryParameters.length > 0
      ? 'configs.params = {' + queryParameters.join(',') + '}'
      : ''
    }

    ${contentType === 'multipart/form-data' ? formData : ''}
    configs.data = ${parsedParameters && bodyParameters.length > 0 ? 'params' : 'null'};

    this.axios(configs).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  });
}`;
}

/** serviceTemplate */
export function serviceTemplate(name: string, body: string) {
  return `
  export class ${name} {
    static axios;

    ${body}
  }
  `
}

export const serviceHeader = `/** Generate by swagger-axios-codegen-es6 */`

export const customerServiceHeader = `/** Generate by swagger-axios-codegen es6 */`
