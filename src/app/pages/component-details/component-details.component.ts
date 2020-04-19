import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import sdk from '@stackblitz/sdk';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss']
})
export class ComponentDetailsComponent implements OnInit {

  files: IFile[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.embedIde();
  }

  embedIde() {
    const directory = 'modules/card';
    const fileNames = ['card/card.component.html', 'card/card.component.scss', 'card/card.component.ts'];
    const requests = fileNames.map(file => this.http.get(`app/${directory}/${file}`, {responseType: 'text'}));
    forkJoin(requests).subscribe((responses: string[]) => {
      // const files : any = {};
      for (let index = 0; index < fileNames.length; index++) {
        this.files.push({fileName: fileNames[index], fileContents: responses[index]});
      }
      // sdk.embedProject(
      //   'components-list-ide',
      //   {
      //     title: 'Card List',
      //     description: 'test',
      //     template: 'angular-cli',
      //     files
      //   },
      //   { height: 500 }
      // );
    });
  }

}

export interface IFile {
  fileName: string;
  fileContents: string;
}