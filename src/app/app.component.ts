import {Component, TemplateRef, ViewChild} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {PostService} from "./services/post.service";
import {LikePost} from "./models/like-post";
import {NgxLoadingComponent, ngxLoadingAnimationTypes} from "ngx-loading";
import {DomSanitizer} from "@angular/platform-browser";

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('ngxLoading', { static: false }) ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = true;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = false;
  public loadingTemplate: TemplateRef<any>;
  public config = { animationType: ngxLoadingAnimationTypes.none, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };
  title = 'FEDA';
  constructor(private sanitizer: DomSanitizer) { }

  public toggleColours(): void {
    this.coloursEnabled = !this.coloursEnabled;

    if (this.coloursEnabled) {
      this.primaryColour = PrimaryRed;
      this.secondaryColour = SecondaryBlue;
    } else {
      this.primaryColour = PrimaryWhite;
      this.secondaryColour = SecondaryGrey;
    }
  }

  toggleTemplate(): void {
    if (this.loadingTemplate) {
      this.loadingTemplate = null;
    } else {
      this.loadingTemplate = this.customLoadingTemplate;
    }
  }

  public showAlert(): void {
    alert('ngx-loading rocks!');
  }
  stopLoad() {
    this.loading = false;
  }
}
