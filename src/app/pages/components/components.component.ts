import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Observable } from 'rxjs';
import { IAclComponent } from '../../shared/models/IAclComponent';
import { Router } from '@angular/router';
import { ICard } from '../../modules/card/ICard';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  public components$ : Observable<ICard[]>

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.components$ = this.api.getComponents().pipe(map((components: IAclComponent[]) => components.map(component => {
      const card : ICard = {
        title: component.name,
        subtitle: component.subtitle,
        created: component.insertedUtc,
        updated: component.updatedUtc,
        avatarIcon: 'code',
        id: component.id,
        body: component.description
      };
      return card;
    })));
  }

  openUpdatePage(product: IAclComponent) {
    this.router.navigate(['/update-product', JSON.stringify(product)]);
  }
}
