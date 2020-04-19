import { IMockInterceptorData } from "./modules/mock-api/models/IMockInterceptorData";

interface IComponentDetails {
  name: string;
  type: string;
  description: string;
  directory: string;
  hasComponent?: boolean;
  hasService?: boolean;
  hasInterceptor?: boolean;
  fileNames?: string[];
}

const componentsToDisplay : IComponentDetails[] = [
  {
    name: 'loading',
    type: 'Interceptor, Service, Component',
    description: 'Provides functionality for displaying loading indicators.',
    directory: 'modules/loading',
    hasComponent: true,
    hasService: true,
    hasInterceptor: true,
    fileNames: ['components/loader/loader.component.html', 'components/loader/loader.component.scss', 'components/loader/loader.component.ts',
    'interceptors/loading.interceptor.ts',
    'services/loading.service.ts']
  },
  {
    name: 'mock-api',
    type: 'Interceptor',
    description: 'Provides functionality for mocking API calls.',
    directory: 'modules/mock-api',
    hasInterceptor: true
  }
]

export const mockApi : IMockInterceptorData[] = [
  {
    url: "/api/components",
    httpVerb: "GET",
    data: componentsToDisplay.map(component => ({
        name: component.name,
        subtitle: component.type,
        description: component.description,
        insertedUtc: new Date(),
        updatedUtc: new Date(),
      }))
  },
  ...componentsToDisplay.map(component => ({
    url: `/api/components/${component.name}`,
    httpVerb: "GET",
    data:
      {
        directory: component.directory,
        fileNames: ['README.md', `${component.name}.module.ts`,
        ...(component.hasInterceptor ? [`interceptors/${component.name}.interceptor.ts`] : []),
        ...(component.hasService ? [`services/${component.name}.service.ts`] : []),
        ...(component.fileNames ? component.fileNames : [])],
      }
  }) as any)
]
