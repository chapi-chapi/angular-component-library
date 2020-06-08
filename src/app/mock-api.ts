import { IMockInterceptorData } from '@chapichapi/ngx-mock-api';

interface ILibraryDetails {
  name: string;
  type: string;
  description: string;
  componentNames?: string[];
  hasService?: boolean;
  hasInterceptor?: boolean;
  fileNames?: string[];
}

const getComponentFileNames = (name: string) => [
  `src/lib/components/${name}/${name}.component.html`,
  `src/lib/components/${name}/${name}.component.scss`,
  `src/lib/components/${name}/${name}.component.ts`
];

const componentsToDisplay: ILibraryDetails[] = [
  {
    name: 'ngx-loading',
    type: 'Interceptor, Service, Component',
    description: 'Provides functionality for displaying loading indicators.',
    componentNames: ['loader'],
    hasService: true,
    hasInterceptor: true
  },
  {
    name: 'ngx-mock-api',
    type: 'Interceptor',
    description: 'Provides functionality for mocking API calls.',
    hasInterceptor: true
  }
];

export const mockApi: IMockInterceptorData[] = [
  {
    url: '/api/libraries',
    httpVerb: 'GET',
    data: componentsToDisplay.map(library => ({
        name: library.name,
        subtitle: library.type,
        description: library.description,
        insertedUtc: new Date(),
        updatedUtc: new Date(),
      }))
  },
  ...componentsToDisplay.map(library => ({
    url: `/api/libraries/${library.name}`,
    httpVerb: 'GET',
    data:
      {
        directory: `assets/${library.name}`,
        fileNames: ['README.md',
        // `${library.name}.module.ts`,
        // ...(library.hasInterceptor ? [`src/lib/interceptors/${library.name}.interceptor.ts`] : []),
        // ...(library.hasService ? [`src/lib/services/${library.name}.service.ts`] : []),
        // ...(library.componentNames ? library.componentNames.map(name => getComponentFileNames(name)).reduce((acc, i) => acc.concat(i)) : []),
        // ...(library.fileNames ? library.fileNames : [])
      ],
      }
  }) as any)
];
