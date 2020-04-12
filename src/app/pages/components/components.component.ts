import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Observable } from 'rxjs';
import { IProduct } from '../../shared/models/IProduct';
import { Router } from '@angular/router';
import { ICard } from '../../modules/card/ICard';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ProductsComponent implements OnInit {
  public products$ : Observable<ICard[]>

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.products$ = this.api.getProducts().pipe(map((products: IProduct[]) => products.map(product => {
      const card : ICard = {
        title: product.name,
        created: product.insertedUtc,
        updated: product.updatedUtc,
        avatarIcon: 'face',
        id: product.id,
        body: product.description
      };
      return card;
    })));
  }

  openUpdatePage(product: IProduct) {
    this.router.navigate(['/update-product', JSON.stringify(product)]);
  }
}
