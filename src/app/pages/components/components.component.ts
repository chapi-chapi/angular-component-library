import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Observable, forkJoin } from 'rxjs';
import { IACLLibrary } from '../../shared/models/IACLLibrary';
import { Router } from '@angular/router';
import { ICard } from '../../modules/card/ICard';
import { map } from 'rxjs/operators';
import sdk from '@stackblitz/sdk';
import { HttpClient } from '@angular/common/http';
import { CardLinkDelegate } from 'src/app/modules/card/card-list/card-list.component';

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
      map((components: IACLLibrary[]) =>
        components.map((component) => {
          const card: ICard = {
            title: component.name,
            subtitle: component.subtitle,
            avatarIcon: 'code',
            id: component.id,
            body: component.description,
          };
          return card;
        })
      )
    );
  }

  getDetailsLink : CardLinkDelegate = (card: ICard) => `/component-details/${card.title.toLowerCase()}`;
}
