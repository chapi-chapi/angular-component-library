import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import sdk from '@stackblitz/sdk';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'acl-library-details',
  templateUrl: './library-details.component.html',
  styleUrls: ['./library-details.component.scss']
})
export class LibraryDetailsComponent implements OnInit {
  libraryName: string;
  files: IFile[] = [];
  constructor(private route: ActivatedRoute, private api: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.libraryName = paramMap.get('library');
      this.api.getLibraryDetails(this.libraryName).subscribe((response: any) => {
        this.embedIde(response.directory, response.fileNames);
      });
    });
  }

  embedIde(directory: string, fileNames: string[]) {
    const requests = fileNames.map(file => this.http.get(`${directory}/${file}`, {responseType: 'text'}));
    forkJoin(requests).subscribe((responses: string[]) => {
      const filesObj: any = {};
      for (let index = 0; index < fileNames.length; index++) {
        this.files.push({fileName: fileNames[index], fileContents: responses[index]});
        filesObj[`src/modules/${fileNames[index]}`] = responses[index];
      }
      sdk.embedProject(
        'library-details-ide',
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
