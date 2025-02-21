import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { isPlatformBrowser } from '@angular/common';
import { FileViewPipe } from './file-view.pipe';
@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    FooterComponent,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    FileViewPipe,
  ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'proyecto_bienestar';
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
