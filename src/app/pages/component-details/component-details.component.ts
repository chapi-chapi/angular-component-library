import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import sdk from '@stackblitz/sdk';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss']
})
export class ComponentDetailsComponent implements OnInit {
  componentName: string;
  files: IFile[] = [];
  constructor(private route: ActivatedRoute, private api: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.componentName = paramMap.get('component');
      this.api.getComponentDetails(this.componentName).subscribe((response: any) => {
        this.embedIde(response.directory, response.fileNames);
      });
    });
  }

  embedIde(directory: string, fileNames: string[]) {
    const requests = fileNames.map(file => this.http.get(`app/${directory}/${file}`, {responseType: 'text'}));
    forkJoin(requests).subscribe((responses: string[]) => {
      const filesObj: any = {};
      for (let index = 0; index < fileNames.length; index++) {
        this.files.push({fileName: fileNames[index], fileContents: responses[index]});
        filesObj[`src/modules/${fileNames[index]}`] = responses[index];
      }
      sdk.embedProject(
        'components-list-ide',
        {
          title: 'Card List',
          description: 'test',
          template: 'angular-cli',
          files: filesObj
        },
        { height: 600, view: 'editor', hideNavigation: true,
        openFile: `src/modules/${this.files.filter(x => x.fileName.toLowerCase().indexOf('module.ts') > -1)[0].fileName}` }
      );
    });
  }

}

export interface IFile {
  fileName: string;
  fileContents: string;
}
