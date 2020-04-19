import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Observable } from 'rxjs';
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
    this.http.get('app/pages/components/components.component.html', {responseType: 'text'}).subscribe((data: any) => {
      const code = data;
      sdk.embedProject(
        'components-list-ide',
        {
          title: 'Card List',
          description: 'test',
          template: 'angular-cli',
          files: {
            'components.component.ts': code,
            'components.component.html': code,
          },
        },
        { height: 500 }
      );
    });
  }
}
