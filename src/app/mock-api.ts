import { IMockInterceptorData } from "./modules/mock-api/models/IMockInterceptorData";

export const mockApi : IMockInterceptorData[] = [
  {
    url: "/api/components",
    httpVerb: "GET",
    data: [
      {
        name: "Loading",
        subtitle: "Interceptor",
        description: "Provides functionality for displaying loading indicators.",
        insertedUtc: new Date(),
        updatedUtc: new Date(),
      },
    ],
  },
  {
    url: "/api/components/loading",
    httpVerb: "GET",
    data:
      {
        directory: 'modules/loading',
        fileNames: ['README.md', 'loading.module.ts',
        'components/loader/loader.component.html', 'components/loader/loader.component.scss', 'components/loader/loader.component.ts',
        'interceptors/loading.interceptor.ts',
        'services/loading.service.ts']
      }
  }
];
