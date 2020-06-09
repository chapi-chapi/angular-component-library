import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'chapichapi-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public showLoader$: BehaviorSubject<boolean>;

  constructor(private loadingService: LoadingService) {
    this.showLoader$ = this.loadingService.isLoading$;
   }

  ngOnInit(): void {
  }

}
