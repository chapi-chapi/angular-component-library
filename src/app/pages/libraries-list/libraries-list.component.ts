import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../shared/services/api.service";
import { Observable, forkJoin } from "rxjs";
import { IACLLibrary } from "../../shared/models/IACLLibrary";
import { ICard } from "../../modules/card/ICard";
import { map } from "rxjs/operators";
import { CardLinkDelegate } from "src/app/modules/card/card-list/card-list.component";

@Component({
  selector: "acl-libraries-list",
  templateUrl: "./libraries-list.component.html",
  styleUrls: ["./libraries-list.component.scss"],
})
export class LibrariesListComponent implements OnInit {
  public libraries$: Observable<ICard[]>;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.libraries$ = this.api.getLibraries().pipe(
      map((libraries: IACLLibrary[]) =>
        libraries.map((library) => {
          const card: ICard = {
            title: library.name,
            subtitle: library.subtitle,
            avatarIcon: "code",
            id: library.id,
            body: library.description,
          };
          return card;
        })
      )
    );
  }

  getDetailsLink: CardLinkDelegate = (card: ICard) =>
    `/library-details/${card.title.toLowerCase()}`
}
