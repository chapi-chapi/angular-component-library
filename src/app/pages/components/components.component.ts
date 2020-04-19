import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Observable, forkJoin } from 'rxjs';
import { IAclComponent } from '../../shared/models/IAclComponent';
import { Router } from '@angular/router';
import { ICard } from '../../modules/card/ICard';
import { map } from 'rxjs/operators';
import sdk from '@stackblitz/sdk';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {
  public components$: Observable<ICard[]>;

  constructor(
    private api: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.components$ = this.api.getComponents().pipe(
      map((components: IAclComponent[]) =>
        components.map((component) => {
          const card: ICard = {
            title: component.name,
            subtitle: component.subtitle,
            created: component.insertedUtc,
            updated: component.updatedUtc,
            avatarIcon: 'code',
            id: component.id,
            body: component.description,
          };
          return card;
        })
      )
    );

    this.embedIde();
  }

  openUpdatePage(product: IAclComponent) {
    this.router.navigate(['/update-product', JSON.stringify(product)]);
  }

  embedIde() {
    const directory = 'modules/card';
    const fileNames = ['card/card.component.html', 'card/card.component.scss', 'card/card.component.ts'];
    const requests = fileNames.map(file => this.http.get(`app/${directory}/${file}`, {responseType: 'text'}));
    forkJoin(requests).subscribe((responses: string[]) => {
      const files : any = {};
      for (let index = 0; index < fileNames.length; index++) {
        files[fileNames[index]] = responses[index];
      }
      sdk.embedProject(
        'components-list-ide',
        {
          title: 'Card List',
          description: 'test',
          template: 'angular-cli',
          files
        },
        { height: 500 }
      );
    });
  }
}
